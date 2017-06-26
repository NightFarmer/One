/**
 * Created by zhangfan on 2017/6/18.
 */
import React, {Component} from 'react';
import {
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

const ScrollableTabView = require('react-native-scrollable-tab-view');

// import CustomTabBar from '../widget/TabBar'

// const tabLabels = [
//     '每日',
//     '阅读',
//     '音乐',
//     '电影'
// ]

// const tabIcons = [
//     require("../resource/img/home.png"),
//     require("../resource/img/reading.png"),
//     require("../resource/img/music.png"),
//     require("../resource/img/movie.png"),
// ];
// const tabActIcons = [
//     require("../resource/img/home_active.png"),
//     require("../resource/img/reading_active.png"),
//     require("../resource/img/music_active.png"),
//     require("../resource/img/movie_active.png"),
// ];
const tabIcons = ['ios-home', 'ios-compass', 'ios-heart', 'ios-contact'];
const tabNames = ["推荐", "榜单", "分类", "书架"];
class Home extends Component {

    render() {
        return (
            <View style={{flex:1}}>
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