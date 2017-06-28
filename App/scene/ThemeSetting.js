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

import Theme, {StyleHolder, ThemePink, ThemeLight} from '../theme'
import TopBar from '../widget/TopBar'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

import {MusicPlay} from '../global'

@observer
class ThemeSetting extends Component {

    render() {
        let styles = styleHolder.styles
        return (
            <View>
                <TopBar title="设置主题"/>
                {
                    MusicPlay.state == MusicPlay.PLAYING ? <Text>音乐播放中</Text> : null
                }
                <TouchableOpacity onPress={()=>this.setTheme(ThemeLight)}>
                    <Text style={styles.lightButton}>默认</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setTheme(ThemePink)}>
                    <Text style={styles.pinkButton}>粉色</Text>
                </TouchableOpacity>
            </View>
        )
    }

    setTheme = (theme) => {
        Theme.setTheme(theme)
    }
}

const styleHolder = StyleHolder.create(() => {
    return {
        pinkButton: {
            color: ThemePink.primaryText,
            fontSize: 30
        },
        lightButton: {
            color: ThemeLight.primaryText,
            fontSize: 30
        }
    }
})

export default ThemeSetting