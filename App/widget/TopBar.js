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
import Theme, {StyleHolder} from '../theme'
import {observer} from 'mobx-react'

@observer
class TopBar extends Component {

    render() {
        let styles = styleHolder.styles;
        return (
            <View style={styles.topBar}>
                <StatusBar backgroundColor={Theme.statusBarColor}/>
                {!this.props.hideBackButton &&
                <TouchableOpacity onPress={()=>Actions.pop()} style={{position:"absolute"}}>
                    <Text style={styles.topBarText}>返回</Text>
                </TouchableOpacity>
                }
                <Text style={styles.topBarTitle}>{this.props.title}</Text>
            </View>
        )
    }
}

const styleHolder = StyleHolder.create(() => {
    return {
        topBar: {
            backgroundColor: Theme.primaryColor,
            height: 50,
            justifyContent: "center"
        },
        topBarText: {
            color: "#FFF"
        },
        topBarTitle: {
            color: "#FFF",
            alignSelf: "center",
            fontSize: 20
        }
    }
})

export default TopBar

