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
    Easing,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import {observable, action, autorun} from 'mobx'
import {observer} from 'mobx-react'
import Theme, {StyleHolder} from '../../theme'

let winWidth = Dimensions.get("window").width;

import {MusicPlay} from '../../global'

import TriangleView from '../../widget/TriangleView'
import PauseView from '../../widget/PauseView'
import MusicPlayView from '../../widget/MusicPlayView'

import Touchable from './Touchable'
@observer
class Music extends Component {

    render() {
        let playSize = winWidth / 2
        let item = this.props.item
        // console.info(JSON.stringify(item))
        let styles = styleHolder.styles
        return <Touchable onPress={()=>Actions.MusicDetail({item_id:item.item_id})}>
            <View>
                <Text style={styles.category}>- 音乐 -</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.titleLight}>文/{item.author.user_name}</Text>
                <MusicPlayView style={{alignSelf:"center",height:playSize,width:playSize}}
                               id={item.item_id}
                               image={item.img_url}
                               name={item.music_name}
                               author={item.audio_author}
                               size={playSize}
                />
                <Text style={styles.musicInfo}>{item.music_name} · {item.audio_author} | {item.audio_album}</Text>
                <Text style={styles.detail}>{item.forward}</Text>
                <View style={{paddingTop:20,flexDirection:"row",paddingBottom:10}}>
                    <Text style={{flex:1}}>{item.last_update_date}</Text>
                    <Text>喜欢{item.like_count}</Text>
                </View>
            </View>
        </Touchable>
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

export default Music