/**
 * Created by zhangfan on 2017/6/18.
 */
import React, {Component} from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import Splash from './Splash'
import Home from './Home'
import ThemeSetting from './ThemeSetting'
import MusicDetail from './MusicDetail'

const scenes = Actions.create(
    <Scene key="root" hideNavBar={true}>
        <Scene key="splash" component={Splash} title="Login"/>
        <Scene key="home" component={Home} type="reset"/>
        <Scene key="themeSetting" component={ThemeSetting}/>
        <Scene key="MusicDetail" component={MusicDetail}/>
    </Scene>
);

export default scenes