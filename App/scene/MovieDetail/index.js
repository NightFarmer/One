/**
 * Created by zhangfan on 17-6-23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    Animated,
    Dimensions,
    WebView,
    ScrollView,
    InteractionManager
} from 'react-native';

import {Actions} from 'react-native-router-flux'

import {StyleHolder} from '../../theme'

import TopBar from '../../widget/TopBar'

import {observable} from 'mobx'
import {observer} from 'mobx-react'

import {MusicPlay} from '../../global'
import MusicPlayView from '../../widget/MusicPlayView'
import WebViewAutoHeight from '../../widget/WebViewAutoHeight'
import LoadingContainer from '../../widget/LoadingContainer'

let winWidth = Dimensions.get("window").width
let playSize = winWidth;


@observer
class ArticleDetail extends Component {

    carRotate = new Animated.Value(0)
    playViewCacheState = -1;

    @observable
    data = null;

    render() {
        let styles = styleHolder.styles;
        return (
            <View style={{flex:1}}>
                <TopBar hideBackButton={true} title="一个影视"/>
                <LoadingContainer style={{flex:1}}
                                  loading={!this.data}
                >
                    {!this.data ? null :
                        <ScrollView>
                            <Text>{this.data.photoList.length}</Text>
                            <View style={{margin:15}}>
                                <Text style={{fontSize:25,color:"#333",marginTop:10}}>{this.data.title}</Text>
                                <View
                                    style={{height:3,width:100,backgroundColor:"#333",marginTop:20,marginBottom:20}}/>
                                <Text style={styles.storyAuthor}>文/{this.data.user.user_name}</Text>
                            </View>
                            <WebViewAutoHeight
                                style={styles.webView}
                                source={{html: this.data.content}}
                                userAgent="Android OneApp/1"
                                mixedContentMode="always"
                                injectedJavaScript="window.WebViewJavascriptBridge={callHandler:function(funcName,value){window.postMessage(JSON.stringify({funcName:funcName,value:value}))}}"
                                onMessage={(evnent)=>this.playMusic(evnent.nativeEvent.data)}
                            />
                            <View style={{margin:15}}>
                                <Text style={{padding:5,fontSize:15,color:"#333"}}>作者</Text>
                                <View style={{height:3,width:80,backgroundColor:"#333"}}/>
                                {this.data.author_list.map((author, index) =>
                                    <View style={{flexDirection:"row",alignItems: "center",paddingTop:10}} key={index}>
                                        <Image source={{uri:author.web_url}} style={styles.authorPhoto}/>
                                        <View style={{marginLeft:10}}>
                                            <Text
                                                style={styles.authorName}>{author.user_name} {author.wb_name}</Text>
                                            <Text style={styles.authorSummary}>{author.summary}</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    }
                </LoadingContainer>
            </View>
        )
    }

    renderArticleInfoView = () => {
        return <MusicInfoView data={this.data}/>
    }

//http://resource.wufazhuce.com/one-webview.js?v=4.2.0.18  详情页载入的外部js，包含了js通讯

    playMusic = (data) => {
        let dataObj = JSON.parse(data)
        console.info(dataObj)
        if (dataObj.funcName == 'playAudio') {
            let musicInfo = dataObj.value
            if (musicInfo.type == "MUSIC") {
                MusicPlay.togglePlay(musicInfo.artistName, musicInfo.name, musicInfo.url)
            }
        } else if (dataObj.funcName == 'stopAudio') {
            MusicPlay.stop()
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async() => {
        let url = "http://v3.wufazhuce.com:8000/api/movie/detail/" + this.props.item_id + "?version=4.2.2";
        console.info(url)
        let response = await fetch(url)
        // let response = await fetch("http://v3.wufazhuce.com:8000/api/music/detail/" + 2143 + "?version=4.2.2")
        let resultObj = await response.json()
        // resultObj.data.hp_content = resultObj.data.hp_content.replace(/data-source="XIAMI"/g, 'data-source="ONE"')

        let url2 = "http://v3.wufazhuce.com:8000/api/movie/" + this.props.item_id + "/story/1/0?version=4.2.2"
        console.info(url2)
        response = await fetch(url2)
        let resultObj2 = await response.json()
        // resultObj.data.hp_content = resultObj2.data.data[0].content
        resultObj2.data.data[0].content = resultObj2.data.data[0].content.replace(/data-source="XIAMI"/g, 'data-source="ONE"')

        let photoList = [];
        photoList.push(resultObj.data.detailcover);
        photoList = photoList.concat(resultObj.data.photo)
        resultObj2.data.data[0].photoList = photoList
        InteractionManager.runAfterInteractions(() => {
            // this.data = resultObj.data
            this.data = resultObj2.data.data[0]
        })
    }
}

const styleHolder = StyleHolder.create(() => {
    return {
        webView: {
            margin: 15,
            alignSelf: "stretch",
        },
        authorPhoto: {
            height: 50,
            width: 50,
            borderRadius: 25
        },
        authorName: {
            fontSize: 16,
            color: "#333"
        },
        authorSummary: {
            color: "#b7b7b7",
            fontSize: 12
        },
        storyAuthor: {
            fontSize: 16,
            color: "#333"
        },
    }
});

export default ArticleDetail
// http://v3.wufazhuce.com:8000/api/music/detail/2144?version=4.2.2