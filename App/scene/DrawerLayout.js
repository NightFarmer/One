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
    ScrollView
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import Drawer from 'react-native-drawer'

import Theme, {StyleHolder} from '../theme'

class DrawerLayout extends Component {

    render() {
        return (
            <View style={{backgroundColor:"#FFF",flex:1}}>
                <View style={{backgroundColor:Theme.primaryColor,height:100}}>

                </View>
                <ScrollView>
                    <Text>123</Text>

                    <TouchableOpacity onPress={()=>Actions.themeSetting()}>
                        <Text>设置主题颜色</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

export default DrawerLayout