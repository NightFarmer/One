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

import Theme, {StyleHolder, ThemePink, ThemeDark} from '../theme'
import TopBar from '../widget/TopBar'

class ThemeSetting extends Component {

    render() {
        let styles = styleHolder.styles
        return (
            <View>
                <TopBar title="设置主题"/>
                <TouchableOpacity onPress={()=>this.setTheme(ThemeDark)}>
                    <Text style={styles.darkButton}>暗色默认</Text>
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
        darkButton: {
            color: ThemeDark.primaryText,
            fontSize: 30
        }
    }
})

export default ThemeSetting