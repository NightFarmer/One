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
import {StyleHolder} from '../theme'

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
            <View>
                <FlatList
                    style={{height:500}}
                    refreshing={this.refreshing}
                    data={this.pageData.content_list}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}
                    onRefresh={this.loadDayData}
                    ItemSeparatorComponent={this.ItemSeparatorComponent}
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
            let response = await fetch(`http://v3.wufazhuce.com:8000/api/onelist/${this.dayId}/0?version=4.2.2`);
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