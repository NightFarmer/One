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

import Theme, {StyleHolder, ThemeDefault, ThemeDark} from '../theme'
import TopBar from '../widget/TopBar'

class ThemeSetting extends Component {

    render() {
        let styles = styleHolder.styles
        return (
            <View>
                <TopBar title="设置主题"/>
                <TouchableOpacity onPress={()=>this.setTheme(ThemeDefault)}>
                    <Text style={styles.defButton}>默认</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setTheme(ThemeDark)}>
                    <Text style={styles.darkButton}>暗色</Text>
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
        defButton: {
            color: ThemeDefault.primaryText
        },
        darkButton: {
            color: ThemeDark.primaryText
        }
    }
})

export default ThemeSetting