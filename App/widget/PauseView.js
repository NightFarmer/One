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

function calcStyle(sideLength, color) {
    let height = sideLength / 4 * 3;
    let width = height / 3;
    return {
        height: height,
        width: width,
        backgroundColor: color,
    }
}

const TriangleView = ({sideLength, color, style}) => <View
    style={[style,{height:sideLength,width:sideLength,backgroundColor:"transparent",flexDirection:"row",alignItems:"center",justifyContent:"center"}]}>
    <View style={calcStyle(sideLength,color)}/>
    <View style={calcStyle(sideLength,"transparent")}/>
    <View style={calcStyle(sideLength,color)}/>
</View>;

export default TriangleView