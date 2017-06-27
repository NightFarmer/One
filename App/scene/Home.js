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

import Daily from './Daily'
import Reading from './Reading'
import Music from './Music'
import Movie from './Movie'

import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';

import CustomTabBar from '../widget/MainTabBar'

class Home extends Component {

    render() {
        return (
            <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>Actions.themeSetting()}>
                    <Text>设置主题颜色</Text>
                </TouchableOpacity>
                <ScrollableTabView
                    locked={true}
                    scrollWithoutAnimation={true}
                    tabBarPosition="bottom"
                    renderTabBar={()=><CustomTabBar/>}
                >
                    <Daily tabLabel="每日"/>
                    <Reading tabLabel="阅读"/>
                    <Music tabLabel="音乐"/>
                    <Movie tabLabel="电影"/>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleHolder.create(() => {
    return {}
});

export default Home