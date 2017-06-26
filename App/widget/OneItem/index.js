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
import Essay from './Essay'
import Serial from './Serial'
import Question from './Question'
import Movie from './Movie'


const OneItem = ({item}) => {
    switch (parseInt(item.category)) {
        case 0:
            return <Painting item={item}/>
        case 1:
            return <Essay item={item}/>
        case 2:
            return <Serial item={item}/>
        case 3:
            return <Question item={item}/>
        case 4:
            return <Music item={item}/>
        case 5:
            return <Movie item={item}/>
        case 6:
        case 7: {
            return <Common item={item}/>
        }
        default:
            return <View/>
    }
};

export default OneItem