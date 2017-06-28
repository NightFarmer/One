import React, {Component} from 'react'

import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import Theme, {StyleHolder} from '../theme'

const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback
} = ReactNative;

const tabIcons = [
    require("../resource/img/main/home.png"),
    require("../resource/img/main/reading.png"),
    require("../resource/img/main/music.png"),
    require("../resource/img/main/movie.png"),
];
const tabActIcons = [
    require("../resource/img/main/home_active.png"),
    require("../resource/img/main/reading_active.png"),
    require("../resource/img/main/music_active.png"),
    require("../resource/img/main/movie_active.png"),
];

const DefaultTabBar = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        backgroundColor: React.PropTypes.string,
        activeTextColor: React.PropTypes.string,
        inactiveTextColor: React.PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: View.propTypes.style,
        renderTab: React.PropTypes.func,
        underlineStyle: View.propTypes.style,
    },

    getDefaultProps() {
        return {
            activeTextColor: 'navy',
            inactiveTextColor: 'black',
            backgroundColor: null,
        };
    },

    renderTabOption(name, page) {
    },

    renderTab(name, page, isTabActive, onPressHandler) {
        const {activeTextColor, inactiveTextColor, textStyle,} = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';

        let source = tabIcons;
        if (isTabActive) {
            source = tabActIcons
        }
        let img = source[page]
        return <TouchableWithoutFeedback
            style={styles.flexOne}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
        >
            <View style={[styles.tab, this.props.tabStyle, ]}>
                <TabImage img={img}/>
                {/*<Text style={[{color: textColor, fontWeight, }, textStyle, ]}>*/}
                {/*{name}*/}
                {/*</Text>*/}
            </View>
        </TouchableWithoutFeedback>;
    },

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: containerWidth / numberOfTabs,
            height: 4,
            backgroundColor: 'navy',
            bottom: 0,
        };

        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1,], outputRange: [0, containerWidth / numberOfTabs,],
        });
        return (
            <View style={{borderTopWidth:StyleSheet.hairlineWidth,borderColor:"#cacaca"}}>
                <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                    {this.props.tabs.map((name, page) => {
                        const isTabActive = this.props.activeTab === page;
                        const renderTab = this.props.renderTab || this.renderTab;
                        return renderTab(name, page, isTabActive, this.props.goToPage);
                    })}
                </View>
            </View>
        );
    },
});

@observer
class TabImage extends Component {

    render() {
        let styles = tabItemStyleHolder.styles;
        return <Image source={this.props.img} resizeMode="contain" style={styles.tab}/>
    }
}

const tabItemStyleHolder = StyleHolder.create(() => {
    return {
        tab: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            tintColor: Theme.primaryColor,
            //backgroundColor:"#FF0"
        },
    }
})

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexOne: {
        flex: 1,
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
});

module.exports = DefaultTabBar;
