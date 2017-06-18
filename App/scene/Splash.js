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

class Splash extends Component {

    render() {
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:50}}>One</Text>
                <TouchableOpacity onPress={()=>Actions.home()}>
                    <Text>进入</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default Splash