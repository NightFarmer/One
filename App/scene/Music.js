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
class Music extends Component {

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
                    data={this.pageData}
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
            let url = `http://v3.wufazhuce.com:8000/api/channel/music/more/0?version=4.2.2`;
            console.info(url)
            let response = await fetch(url);
            console.info(111)
            let newVar = await response.text();
            let parse = JSON.parse(newVar);
            // let resultObj = await response.json();
            this.onResult(parse);
        } catch (e) {
            console.info(4444)
        } finally {
            // console.info(555)
            this.refreshing = false
        }
    };

    @action
    onResult(resultObj) {
        // console.info(1111)
        this.pageData = resultObj.data;
        this.refreshing = false
    }

}

const styles = StyleHolder.create(() => {
    return {}
});

export default Music