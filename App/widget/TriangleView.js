/**
 * Created by zhangfan on 17-6-22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions
} from 'react-native';

function calcTriangleStyle(sideLength,color) {
    let height = sideLength * Math.tan(60 * Math.PI / 180) / 2
    return {
        height: 0,
        width: 0,
        borderTopWidth: 0,
        borderRightWidth: sideLength / 2,
        borderLeftWidth: sideLength / 2,
        borderBottomWidth: height,
        // borderTopColor: '#F00',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor: color,
        // backgroundColor: '#0f0',
    }
}

const TriangleView = ({sideLength, color, style}) => <View
    style={[style,{height:sideLength,width:sideLength,backgroundColor:"transparent"}]}>
    <View style={calcTriangleStyle(sideLength,color)}>

    </View>
</View>;

export default TriangleView