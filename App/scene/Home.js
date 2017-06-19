/**
 * Created by zhangfan on 2017/6/18.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar
} from 'react-native';

import {Actions} from 'react-native-router-flux'

import {StyleHolder} from '../theme'

import TopBar from '../widget/TopBar'

import Dayly from './Dayly'

class Home extends Component {

    render() {
        return (
            <View>
                <TopBar hideBackButton={true} title="One"/>
                <TouchableOpacity onPress={()=>Actions.themeSetting()}>
                    <Text>设置主题颜色</Text>
                </TouchableOpacity>
                <Dayly/>
            </View>
        )
    }
}

const styles = StyleHolder.create(() => {
    return {}
});

export default Home