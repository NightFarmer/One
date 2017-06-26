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

@observer
class Home extends Component {

    dayIdList;

    // @observable
    dayId;

    // @observable
    // listData = [];

    @observable
    pageData = {}

    @observable
    refreshing = true

    render() {
        console.info("render..")
        return (
            <View style={{flex:1}}>
                <FlatList
                    style={{flex:1}}
                    data={this.pageData.content_list}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={this.ItemSeparatorComponent}
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
                />
            </View>
        )
    }

    ItemSeparatorComponent = () => <View style={{height:10,backgroundColor:"#e4e4e4"}}/>

    _keyExtractor = (item, index) => item.id;

    renderItem = ({item}) => {
        // console.info(item.title,JSON.stringify(item.last_update_date))
        return <OneItem item={item}/>
    }

    componentDidMount() {
        this.loadDayList()
    }

    loadDayList = async() => {
        try {
            let response = await fetch("http://v3.wufazhuce.com:8000/api/onelist/idlist?version=4.2.2")
            let resultObj = await response.json()
            this.dayIdList = resultObj.data
            this.dayId = this.dayIdList[0];
            await this.loadDayData()
        } catch (e) {
        } finally {
            this.refreshing = false
        }
    };

    loadDayData = async() => {
        try {
            if (!this.dayIdList) {
                await this.loadDayList()
            }
            let url = `http://v3.wufazhuce.com:8000/api/onelist/${this.dayId}/0?version=4.2.2`;
            console.info(url)
            let response = await fetch(url);
            let resultObj = await response.json();
            this.onResult(resultObj);
        } catch (e) {
        } finally {
            this.refreshing = false
        }
    };

    @action
    onResult(resultObj) {
        this.pageData = resultObj.data;
        // if (Math.random() > 0.5) {
        //     this.pageData.content_list = []
        // }
        this.refreshing = false
    }

    // setPageData = (pageData) => {
    //     this.listData = pageData.data.content_list
    //
    // }
}

const styles = StyleHolder.create(() => {
    return {}
});

export default Home