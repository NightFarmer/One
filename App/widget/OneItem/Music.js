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
    Dimensions
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import Theme, {StyleHolder} from '../../theme'

let winWidth = Dimensions.get("window").width;

import {MusicPlay} from '../../global'

@observer
class Music extends Component {

    componentDidMount() {
        let a = {
            title: 'mp3 remote download',
            url: 'http://orh51lve9.bkt.clouddn.com/1770127757_10582545_l.mp3',
        }
        setTimeout(() => {
            MusicPlay.play(a.url, a.title)
        }, 3000)
    }

    render() {
        let width = winWidth / 2
        let item = this.props.item
        // console.info(JSON.stringify(item))
        let height = width
        let styles = styleHolder.styles
        return <View style={{paddingLeft:20,paddingRight:20}}>
            <Text style={styles.category}>- 音乐 -</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.titleLight}>文/{item.author.user_name}</Text>
            <Image source={{uri:item.img_url}}
                   style={{height:height,width:width,borderRadius:height/2,alignSelf:"center"}}/>
            <Text style={styles.detail}>{item.forward}</Text>
            <View style={{paddingTop:20,flexDirection:"row",paddingBottom:10}}>
                <Text style={{flex:1}}>{item.last_update_date}</Text>
                <Text>喜欢{item.like_count}</Text>
            </View>
        </View>
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