/**
 * Created by zhangfan on 17-6-19.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {StyleHolder} from '../../theme'

import Painting from './Painting'
import Music from './Music'
import Common from './Common'


const OneItem = ({item}) => {
    switch (parseInt(item.category)) {
        case 0:
            return <Painting item={item}/>
        case 4:
            return <Music item={item}/>
        case 1:
        case 2:
        case 3:
        case 5:
        case 6:
        case 7: {
            return <Common item={item}/>
        }
        default:
            return <View/>
    }
};

export default OneItem