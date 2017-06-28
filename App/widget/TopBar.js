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
    StatusBar,
    Image
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Theme, {StyleHolder} from '../theme'
import {observer} from 'mobx-react'

@observer
class TopBar extends Component {

    static contextTypes = {drawer: React.PropTypes.object}

    render() {
        let styles = styleHolder.styles;
        return (
            <View style={styles.topBar}>
                <StatusBar backgroundColor={Theme.statusBarColor}/>
                {this.props.hideBackButton ?
                    <TouchableOpacity onPress={()=>{this.context.drawer.open()}} style={{position:"absolute"}}>
                        <Image source={require('../resource/img/main/drawerIcon.png')}
                               style={{tintColor:"#FFF",height:20,width:20,margin:13}}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=>Actions.pop()} style={{position:"absolute"}}>
                        <Image source={require('../resource/img/main/topbar_back.png')}
                               style={{tintColor:"#FFF",height:20,width:20,margin:13}} resizeMode='contain'/>
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
            height: 46,
            justifyContent: "center"
        },
        topBarText: {
            color: "#FFF"
        },
        topBarTitle: {
            color: "#FFF",
            alignSelf: "center",
            fontSize: 16
        }
    }
})

export default TopBar

