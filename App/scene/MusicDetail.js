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
    ScrollView
} from 'react-native';

import {Actions} from 'react-native-router-flux'

import {StyleHolder} from '../theme'

import TopBar from '../widget/TopBar'

import {observable} from 'mobx'
import {observer} from 'mobx-react'

import {MusicPlay} from '../global'
import MusicPlayView from '../widget/MusicPlayView'
import WebViewAutoHeight from '../widget/WebViewAutoHeight'

let winWidth = Dimensions.get("window").width
let playSize = winWidth;


@observer
class MusicDetail extends Component {

    carRotate = new Animated.Value(0)
    playViewCacheState = -1;

    @observable
    data = null;

    render() {
        let styles = styleHolder.styles;
        return (
            <View style={{flex:1}}>
                <TopBar hideBackButton={true} title="一个音乐"/>
                {!this.data ? null :
                    <ScrollView style={{flex:1}}>
                        <View style={{height:playSize-playSize/2.7}}>
                            <MusicPlayView
                                style={styles.playView}
                                id={this.data.id}
                                image={this.data.cover}
                                name={this.data.title}
                                author={this.data.author.user_name}
                                size={playSize}
                            />
                        </View>
                        <WebViewAutoHeight
                            style={styles.webView}
                            source={{html: this.data.story}}
                            userAgent="Android OneApp/1"
                            mixedContentMode="always"
                            injectedJavaScript="window.WebViewJavascriptBridge={callHandler:function(funcName,value){window.postMessage(JSON.stringify({funcName:funcName,value:value}))}}"
                            onMessage={(evnent)=>this.playMusic(evnent.nativeEvent.data)}
                        />
                        <Text>其他内容</Text>
                        <Text>其他内容</Text>
                        <Text>其他内容</Text>
                        <Text>其他内容</Text>
                    </ScrollView>
                }
            </View>
        )
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
        let response = await fetch("http://v3.wufazhuce.com:8000/api/music/detail/" + this.props.item_id + "?version=4.2.2")
        // let response = await fetch("http://v3.wufazhuce.com:8000/api/music/detail/" + 2143 + "?version=4.2.2")
        let resultObj = await response.json()
        resultObj.data.story = resultObj.data.story.replace(/data-source="XIAMI"/g, 'data-source="ONE"')
        this.data = resultObj.data
    }
}

const styleHolder = StyleHolder.create(() => {
    return {
        playView: {
            alignSelf: "center",
            height: playSize,
            width: playSize,
            transform: [
                {
                    translateX: -playSize / 3,
                },
                {
                    translateY: -playSize / 2.7,
                }
            ],
            zIndex: -1,
        },
        webView: {
            margin: 15,
            alignSelf: "stretch",
        },
    }
});

export default MusicDetail
// http://v3.wufazhuce.com:8000/api/music/detail/2144?version=4.2.2