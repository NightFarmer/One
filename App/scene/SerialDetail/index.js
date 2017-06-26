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
                <TopBar title="阅读·连载"/>
                <LoadingContainer style={{flex:1}}
                                  loading={!this.data}
                >
                    {!this.data ? null :
                        <ScrollView>
                            <View style={{margin:15}}>
                                <Text style={{fontSize:25,color:"#333",marginTop:10}}>{this.data.title}</Text>
                                <View
                                    style={{height:3,width:100,backgroundColor:"#333",marginTop:20,marginBottom:20}}/>
                                <Text style={styles.storyAuthor}>文/{this.data.author.user_name}</Text>
                            </View>
                            <WebViewAutoHeight
                                style={styles.webView}
                                source={{html: this.data.content}}
                                userAgent="Android OneApp/1"
                                mixedContentMode="always"
                                injectedJavaScript="window.WebViewJavascriptBridge={callHandler:function(funcName,value){window.postMessage(JSON.stringify({funcName:funcName,value:value}))}}"
                                onMessage={(evnent)=>this.playMusic(evnent.nativeEvent.data)}
                            />
                            <View style={{flexDirection:'row',padding:15}}>
                                <Text style={{flex:1}}>前一章{this.data.lastid}</Text>
                                <Text>后一章:即将更新{this.data.nextid}</Text>
                            </View>
                            <View
                                style={{height:StyleSheet.hairlineWidth,backgroundColor:"#dddddd",margin:15,alignItems:'stretch'}}/>
                            <View style={{marginLeft:15,marginRight:15,marginBottom:15}}>
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

    // http://v3.wufazhuce.com:8000/api/serialcontent/detail/347?version=4.2.2
    //http://v3.wufazhuce.com:8000/api/serial/list/44?channel=pp&version=4.2.2&uuid=&platform=android
    loadData = async() => {
        let url = "http://v3.wufazhuce.com:8000/api/serialcontent/detail/" + this.props.item_id + "?version=4.2.2";
        console.info(url)
        let response = await fetch(url)
        // let response = await fetch("http://v3.wufazhuce.com:8000/api/music/detail/" + 2143 + "?version=4.2.2")
        let resultObj = await response.json()
        resultObj.data.content = resultObj.data.content.replace(/data-source="XIAMI"/g, 'data-source="ONE"')
        InteractionManager.runAfterInteractions(() => {
            this.data = resultObj.data
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