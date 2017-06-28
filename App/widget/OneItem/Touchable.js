/**
 * Created by zhangfan on 17-6-28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';

const winWidth = Dimensions.get("window").width

class Touchable extends Component {

    render() {
        return (
            <View style={{paddingLeft:winWidth*0.05,paddingRight:winWidth*0.05}}>
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    {this.props.children}
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

export default Touchable