/**
 * Created by zhangfan on 17-6-26.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    Animated,
    Dimensions,
    WebView,
    ScrollView,
    InteractionManager
} from 'react-native';

import {Actions} from 'react-native-router-flux'

import {StyleHolder} from '../../theme'

import TopBar from '../../widget/TopBar'

import {observable} from 'mobx'
import {observer} from 'mobx-react'

import {MusicPlay} from '../../global'
import MusicPlayView from '../../widget/MusicPlayView'
import WebViewAutoHeight from '../../widget/WebViewAutoHeight'
import LoadingContainer from '../../widget/LoadingContainer'

let winWidth = Dimensions.get("window").width
let playSize = winWidth;


class MusicInfoView extends Component {

    render() {
        let styles = styleHolder.styles
        let data = this.props.data
        return (
            <View>
                <View style={{height:playSize-playSize/3}}>
                    <MusicPlayView
                        style={styles.playView}
                        id={data.id}
                        image={data.cover}
                        name={data.title}
                        author={data.author.user_name}
                        size={playSize}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.musicInfo}>· {data.title} ·</Text>
                    <Text style={styles.musicInfo}>{data.author.user_name} | {data.album}</Text>
                    <Text style={styles.storyTitle}>{data.story_title}</Text>
                    <Text style={styles.storyAuthor}>文/{data.story_author.user_name}</Text>
                </View>
            </View>
        )
    }
}

const styleHolder = StyleHolder.create(() => {
    return {
        playView: {
            alignSelf: "center",
            height: playSize,
            width: playSize,
            transform: [
                {
                    translateX: -playSize / 3,
                },
                {
                    translateY: -playSize / 2.7,
                }
            ],
            zIndex: -1,
        },
        infoContainer: {
            alignItems: "center"
        },
        musicInfo: {
            color: "#b7b7b7",
            fontSize: 12
        },
        storyTitle: {
            fontSize: 20,
            color: "#333",
            margin: 15
        },
        storyAuthor: {
            fontSize: 16,
            color: "#333"
        },
    }
});

export default MusicInfoView