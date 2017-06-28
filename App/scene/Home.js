/**
 * Created by zhangfan on 2017/6/18.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Animated
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import Drawer from 'react-native-drawer'

import {StyleHolder} from '../theme'

import TopBar from '../widget/TopBar'

import Daily from './Daily'
import Reading from './Reading'
import Music from './Music'
import Movie from './Movie'

import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';

import CustomTabBar from '../widget/MainTabBar'

import DrawerLayout from './DrawerLayout'

const drawerStyles = {
    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
}

class Home extends Component {

    maskOpacity = new Animated.Value(0)

    tweenHandler = (ratio) => {
        this.maskOpacity.setValue(ratio * 0.3)
        console.info(ratio)
        let drawerShadow = ratio < .2 ? ratio * 5 * 5 : 5
        return {
            drawer: {
                shadowRadius: drawerShadow,
                elevation: 15
            },
            // main: {
            //     opacity: (2 - ratio) / 2,
            // },
        }
    }

    DrawerParam = {
        "type": "overlay",
        "openDrawerOffset": 100,
        "closedDrawerOffset": 0,
        "panOpenMask": 0.05,
        "panCloseMask": 0.9,
        "relativeDrag": false,
        "panThreshold": 0.25,
        "tweenHandlerOn": false,
        "tweenDuration": 150,
        "tweenEasing": "linear",
        "disabled": false,
        //"tweenHandlerPreset": "material",
        "acceptDoubleTap": false,
        "acceptTap": false,
        "acceptPan": true,
        "tapToClose": true,
        "negotiatePan": false,
        "side": "left",
        tweenHandler: this.tweenHandler.bind(this)
    }

    render() {
        return (
            <Drawer
                {...this.DrawerParam}
                content={<DrawerLayout />}

            >
                <View style={{flex:1}}>
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
                    <Animated.View style={[maskStyle,{backgroundColor: "#000",opacity:this.maskOpacity}]}
                                   pointerEvents="box-none"
                                   ref={(it)=>this.mask=it}/>
                </View>
            </Drawer>
        )
    }
}

const maskStyle = {
    position: "absolute",
    left: 0, top: 0, right: 0, bottom: 0
}

const styles = StyleHolder.create(() => {
    return {}
});

export default Home