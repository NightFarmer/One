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
import MusicInfoView from './MusicInfoView'

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
                <TopBar title="一个音乐"/>
                <LoadingContainer style={{flex:1}}
                                  loading={!this.data}
                >
                    {!this.data ? null :
                        <ScrollView>
                            {this.renderArticleInfoView()}
                            <WebViewAutoHeight
                                style={styles.webView}
                                source={{html: this.data.story}}
                                userAgent="Android OneApp/1"
                                mixedContentMode="always"
                                injectedJavaScript="window.WebViewJavascriptBridge={callHandler:function(funcName,value){window.postMessage(JSON.stringify({funcName:funcName,value:value}))}}"
                                onMessage={(evnent)=>this.playMusic(evnent.nativeEvent.data)}
                            />
                            <View style={{marginLeft:15,marginRight:15,marginBottom:15}}>
                                <Text style={{padding:5,fontSize:15,color:"#333"}}>作者</Text>
                                <View style={{height:3,width:80,backgroundColor:"#333"}}/>
                                <View style={{flexDirection:"row",alignItems: "center",paddingTop:10}}>
                                    <Image source={{uri:this.data.story_author.web_url}} style={styles.authorPhoto}/>
                                    <View style={{marginLeft:10}}>
                                        <Text
                                            style={styles.authorName}>{this.data.story_author.user_name} {this.data.story_author.wb_name}</Text>
                                        <Text style={styles.authorSummary}>{this.data.story_author.summary}</Text>
                                    </View>
                                </View>
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
        let url = "http://v3.wufazhuce.com:8000/api/music/detail/" + this.props.item_id + "?version=4.2.2";
        console.info(url)
        let response = await fetch(url)
        // let response = await fetch("http://v3.wufazhuce.com:8000/api/music/detail/" + 2143 + "?version=4.2.2")
        let resultObj = await response.json()
        resultObj.data.story = resultObj.data.story.replace(/data-source="XIAMI"/g, 'data-source="ONE"')
        if (MusicPlay.state == MusicPlay.PLAYING) {
            this.data = resultObj.data
        } else {
            InteractionManager.runAfterInteractions(() => {
                this.data = resultObj.data
            })
        }
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
        }
    }
});

export default ArticleDetail
// http://v3.wufazhuce.com:8000/api/music/detail/2144?version=4.2.2