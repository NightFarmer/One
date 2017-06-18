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

import {observable, autorun, computed} from 'mobx'
import {observer} from 'mobx-react'

import theme, {StyleHolder, ThemeDefault, ThemeDark} from './theme'

import {Router} from 'react-native-router-flux';
import scenes from './scene'

@observer
class One extends Component {

    @observable
    count = 1;

    render() {
        console.info("render")
        let styles = styleHolder.styles
        // let styles = styleHolder.styles
        // console.info(1111,styles.constructor)
        // console.info(styles.container)
        return (
            <View style={[styles.container]}>
                <StatusBar backgroundColor={theme.statusBarColor} barStyle={theme.statusBarStyle}/>
                <Text style={styles.welcome}>
                    Welcome to One!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <TouchableOpacity onPress={()=>{
                    this.count++
                    if(this.count%2==0){
                        theme.setTheme(ThemeDark)
                    }else {
                        theme.setTheme(ThemeDefault)
                    }
                }}>
                    <Text>{this.count}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styleHolder = StyleHolder.create(() => {
    return {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        instructions: {
            textAlign: 'center',
            color: theme.primaryText,
            marginBottom: 5,
        },
    }
});

class App extends Component {
    render() {
        return <Router scenes={scenes}/>
    }
}

export default App
