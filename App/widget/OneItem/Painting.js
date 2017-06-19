/**
 * Created by zhangfan on 17-6-19.
 */
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

const Painting = ({item}) => {

    let height = winWidth * 0.8
    if (item.orientation == "1") {
        height = winWidth / 0.95
    }
    let styles = styleHolder.styles
    return <View>
        <Image source={{uri:item.img_url}} style={{height:height,width:winWidth}}/>
        <Text style={styles.info}>绘画 | {item.pic_info}</Text>
        <Text style={styles.detail}>{item.forward}</Text>
        <Text style={styles.info}>{item.words_info}</Text>
        <View style={{paddingTop:20,flexDirection:"row",paddingBottom:10,paddingLeft:20}}>
            <Text>喜欢{item.like_count}</Text>
        </View>
    </View>
}


const styleHolder = StyleHolder.create(() => {
    return {
        info: {
            padding: 10,
            fontSize: 12,
            textAlign: "center"
        },
        detail: {
            lineHeight: 30,
            paddingLeft: 40,
            paddingRight: 40
        }
    }
})

// class Painting extends Component{
//
//     render(){
//         let item = this.props.item;
//         return <View style={{height:100,width:100}}>
//             <Text>{item.title}</Text>
//             <Text>文/{item.author.user_name}</Text>
//             <Image source={{uri:item.img_url}} style={{height:200,width:"100%"}}/>
//             <Text>{item.forward}</Text>
//             <View>
//                 <Text>喜欢{item.like_count}</Text>
//             </View>
//         </View>
//     }
// }

export default Painting