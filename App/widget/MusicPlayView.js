/**
 * Created by zhangfan on 17-6-23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
    Animated,
    Easing
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import {observable, action, autorun} from 'mobx'
import {observer} from 'mobx-react'
import Theme, {StyleHolder} from '../theme'

let winWidth = Dimensions.get("window").width;

import {MusicPlay} from '../global'

import TriangleView from '../widget/TriangleView'
import PauseView from '../widget/PauseView'

@observer
class MusicPlayView extends Component {

    runningAnim = null

    carRotate = new Animated.Value(0)

    playViewCacheState = -1;

    modifyAnim = () => {
        if (MusicPlay.id != this.props.id) {
            return
        }
        switch (MusicPlay.state) {
            case MusicPlay.IDLE:
            case MusicPlay.PAUSED:
                console.info("状态变更-dile-pause")
                this.carRotate.stopAnimation((value) => {
                    // this.carRotate.setValue(value)
                    this.playViewCacheState = MusicPlay.state
                })
                break;
            case MusicPlay.PLAYING:
                console.info("状态变更-play")
                if (this.playViewCacheState != MusicPlay.PLAYING) {
                    this.playAnim()
                    this.playViewCacheState = MusicPlay.PLAYING
                }
                break;
        }
    }

    componentDidMount() {
        this.modifyAnim()
    }

    componentDidUpdate() {
        this.modifyAnim()
    }

    render() {
        let size = this.props.size;
        let buttonSize = size / 5.5;
        return (
            <View style={[this.props.style,{alignItems:"center",justifyContent:"center"}]}>
                <Animated.Image source={{uri:this.props.image}}
                                style={{height: size,width:size,borderRadius:size/2,alignSelf:"center",transform:[{rotate:this.carRotate.interpolate({
                                    inputRange:[0,360],
                                    outputRange:["0deg","360deg"]
                                })}]}}/>
                <View
                    style={{position:"absolute",left:0,top:0,right:0,bottom:0,alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity
                        style={{height:buttonSize,width:buttonSize,alignItems:"center",justifyContent:"center"}}
                        onPress={this.togglePlay}>
                        <View
                            style={{width:buttonSize,height:buttonSize,backgroundColor:"#000",opacity:0.5,borderRadius:buttonSize/2,position:"absolute"}}/>
                        {MusicPlay.state == MusicPlay.PLAYING ?
                            <PauseView sideLength={buttonSize/2} color="white"/>
                            :
                            <TriangleView sideLength={buttonSize/2} color="white"
                                          style={{transform:[{rotate:"90deg"}]}}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    togglePlay = () => {
        // let a = {
        // url: 'http://m10.music.126.net/20170622180018/6e26b3c95190076ddcf7c98b563b0325/ymusic/16c3/284e/6135/9d88a978c172bffeb8b94047a072c584.mp3',
        // artists: "陈一发儿",
        // name: "童话镇",
        // }
        let a = {
            // url: 'http://m10.music.126.net/20170622180018/6e26b3c95190076ddcf7c98b563b0325/ymusic/16c3/284e/6135/9d88a978c172bffeb8b94047a072c584.mp3',
            artists: "杨宗纬",
            name: "初爱",
        }
        // MusicPlay.togglePlay(a.url, a.title)
        MusicPlay.togglePlay(this.props.author, this.props.name, this.props.id)
    }

    playAnim = () => {
        this.runningAnim = Animated.timing(this.carRotate, {
            toValue: 360,
            duration: (360 - this.carRotate._value) / 360 * 10000,
            easing: Easing.linear
        })
        this.runningAnim.start(() => {
            // console.info(url)
            if (this.props.id == MusicPlay.id && MusicPlay.state == MusicPlay.PLAYING) {
                // if (MusicPlay.state == MusicPlay.PLAYING) {
                this.carRotate.setValue(0)
                this.playAnim()
            }
            if (MusicPlay.state == MusicPlay.IDLE) {
                this.carRotate.setValue(0)
            }
        })
    }
}

const styleHolder = StyleHolder.create(() => {
    return {
        category: {
            padding: 10,
            fontSize: 12,
            textAlign: "center"
        },
        title: {
            color: Theme.primaryText,
            fontSize: 18
        },
        titleLight: {
            color: Theme.primaryTextLight,
            fontSize: 14,
            paddingTop: 10,
            paddingBottom: 10
        },
        detail: {
            lineHeight: 30
        },
        musicInfo: {
            fontSize: 12,
            color: "#d4d4d4",
            lineHeight: 30
        }
    }
})

export default MusicPlayView