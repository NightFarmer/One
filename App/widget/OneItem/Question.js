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
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import Theme, {StyleHolder} from '../../theme'

import Touchable from './Touchable'
let winWidth = Dimensions.get("window").width;

@observer
class Common extends Component {
    render() {
        let width = winWidth - 40
        let item = this.props.item
        let height = width * 0.59
        let styles = styleHolder.styles
        return <Touchable onPress={()=>Actions.QuestionDetail({item_id:item.item_id})}>
            <View>
                <Text style={styles.category}>- 问答 -</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.titleLight}>{item.answerer.user_name} 答</Text>
                <Image source={{uri:item.img_url}} style={{height:height,width:width}}/>
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
        }
    }
})

export default Common