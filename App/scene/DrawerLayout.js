/**
 * Created by zhangfan on 17-6-28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Image,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import Drawer from 'react-native-drawer'

import Theme, {StyleHolder} from '../theme'
import {observer} from 'mobx-react'

@observer
class DrawerLayout extends Component {

    render() {
        let styles = styleHolder.styles;
        return (
            <View style={{backgroundColor:"#FFF",flex:1}}>
                <View
                    style={{backgroundColor:Theme.primaryColor,height:160,justifyContent:"center",alignItems:"center"}}>
                    <Image style={{width:60,height:60,borderRadius:30}}
                           source={require("../resource/img/main/head.png")}/>
                </View>
                <ScrollView>
                    <TouchableHighlight onPress={()=>Actions.themeSetting()} style={styles.itemRow}
                                        underlayColor="#ddd"
                    >
                        <Text style={styles.itemText}>设置主题颜色</Text>
                    </TouchableHighlight>

                </ScrollView>
            </View>
        )
    }
}

const styleHolder = StyleHolder.create(() => {
    return {
        itemRow: {
            height: 50,
            justifyContent: "center"
        },
        itemText: {
            color: Theme.primaryColor,
            marginLeft: 20
        }
    }
})

export default DrawerLayout