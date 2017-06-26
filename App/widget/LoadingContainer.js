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
    ActivityIndicator
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Theme, {StyleHolder} from '../theme'
import {observer} from 'mobx-react'

@observer
class LoadingContainer extends Component {

    render() {
        let styles = styleHolder.styles;
        return (
            <View style={this.props.style}>
                {this.props.loading ?
                    <View style={styles.loadingViewContainer}>
                        {this.renderLoadingView()}
                    </View>
                    :
                    this.props.children
                }
            </View>
        )
    }

    renderLoadingView = () => {
        return <ActivityIndicator color={Theme.primaryColor} size="large"/>
    }
}

const styleHolder = StyleHolder.create(() => {
    return {
        loadingViewContainer: {
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignSelf: "center",
        }
    }
})

export default LoadingContainer
