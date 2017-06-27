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
    Image,
    RefreshControl
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import Theme, {StyleHolder} from '../theme'

import OneItem from '../widget/OneItem'

import TopBar from '../widget/TopBar'

@observer
class Music extends Component {

    @observable
    pageData = []

    @observable
    refreshing = true

    loadingMore = false

    render() {
        console.info("render..music")
        return (
            <View style={{flex:1}}>
                <TopBar hideBackButton={true} title="一个音乐"/>
                <FlatList
                    style={{flex:1}}
                    data={this.pageData}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={this.ItemSeparatorComponent}
                    initialNumToRender={3}
                    //onRefresh={this.loadDayData}
                    //refreshing={this.refreshing}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.refreshing}
                            onRefresh={this.loadDayData}
                            title="刷新"
                            titleColor={Theme.primaryColor}
                            tintColor={Theme.primaryColor}
                            colors={[Theme.primaryColor]}
                        />
                    }
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={3}
                />
            </View>
        )
    }

    onEndReached = () => {
        if (!this.refreshing && !this.loadingMore) {
            console.info("onEndReached")
            this.loadingMore = true
            this.loadDayData()
        }
    }

    ItemSeparatorComponent = () => <View style={{height:10,backgroundColor:"#ebebeb"}}/>

    _keyExtractor = (item, index) => item.id;

    renderItem = ({item}) => {
        return <OneItem item={item}/>
    }

    componentDidMount() {
        this.loadDayData()
    }

    loadDayData = async() => {
        try {
            let fromId = 0;
            if (this.pageData.length > 0 && this.loadingMore) {
                fromId = this.pageData[this.pageData.length - 1].id
            }
            let url = `http://v3.wufazhuce.com:8000/api/channel/music/more/${fromId}?version=4.2.2`;
            console.info(url)
            let response = await fetch(url);
            let resultObj = await response.json();
            this.onResult(resultObj, fromId == 0);
        } catch (e) {
            console.info(4444)
        } finally {
            // console.info(555)
            this.refreshing = false
        }
    };

    @action
    onResult(resultObj, init) {
        // console.info(1111)
        if (init) {
            this.pageData = resultObj.data;
        } else {
            this.pageData = this.pageData.concat(resultObj.data);
            this.loadingMore = false
        }
        this.refreshing = false
    }

}

const styles = StyleHolder.create(() => {
    return {}
});

export default Music