/**
 * Created by zhangfan on 17-6-19.
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
import Theme, {StyleHolder} from '../../theme'

let winWidth = Dimensions.get("window").width;

import {MusicPlay} from '../../global'

import TriangleView from '../../widget/TriangleView'
import PauseView from '../../widget/PauseView'

@observer
class Music extends Component {

    carRotate = new Animated.Value(0)

    playViewCacheState = -1;

    modifyAnim = () => {
        if (MusicPlay.url != this.props.item.url) {
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

    componentDidUpdate() {
        // console.info("updatre...")
        this.modifyAnim()
    }

    render() {
        this.props.item.url = "http://orh51lve9.bkt.clouddn.com/1770127757_10582545_l.mp3"

        let width = winWidth / 2
        let item = this.props.item
        // console.info(JSON.stringify(item))
        let height = width
        let styles = styleHolder.styles
        return <View style={{paddingLeft:20,paddingRight:20}}>
            <Text style={styles.category}>- 音乐 -</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.titleLight}>文/{item.author.user_name}</Text>
            <View>
                <Animated.Image source={{uri:item.img_url}}
                                style={{height:height,width:width,borderRadius:height/2,alignSelf:"center",transform:[{rotate:this.carRotate.interpolate({
                                    inputRange:[0,360],
                                    outputRange:["0deg","360deg"]
                                })}]}}/>
                <View
                    style={{position:"absolute",left:0,top:0,right:0,bottom:0,alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity style={{height:40,width:40,alignItems:"center",justifyContent:"center"}}
                                      onPress={this.togglePlay}>
                        <View
                            style={{width:40,height:40,backgroundColor:"#000",opacity:0.5,borderRadius:20,position:"absolute"}}/>
                        {MusicPlay.state == MusicPlay.PLAYING ?
                            <PauseView sideLength={20} color="white"/>
                            :
                            <TriangleView sideLength={20} color="white" style={{transform:[{rotate:"90deg"}]}}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.detail}>{item.forward}</Text>
            <View style={{paddingTop:20,flexDirection:"row",paddingBottom:10}}>
                <Text style={{flex:1}}>{item.last_update_date}</Text>
                <Text>喜欢{item.like_count}</Text>
            </View>
        </View>
    }

    runningAnim = null

    togglePlay = () => {
        let a = {
            title: 'mp3 remote download',
            url: 'http://orh51lve9.bkt.clouddn.com/1770127757_10582545_l.mp3',
        }
        MusicPlay.togglePlay(a.url, a.title)
    }

    playAnim = () => {
        this.runningAnim = Animated.timing(this.carRotate, {
            toValue: 360,
            duration: (360 - this.carRotate._value) / 360 * 10000,
            easing: Easing.linear
        })
        this.runningAnim.start(() => {
            // console.info(url)
            if (this.props.item.url == MusicPlay.url && MusicPlay.state == MusicPlay.PLAYING) {
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
        }
    }
})

export default Music