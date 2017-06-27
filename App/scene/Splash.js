/**
 * Created by zhangfan on 2017/6/18.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    Dimensions
} from 'react-native';
import {Actions} from 'react-native-router-flux'

const winWidth = Dimensions.get("window").width

class Splash extends Component {

    render() {
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Image source={require("../resource/img/splash/opening_title_image.png")}
                       style={{width:winWidth/3,height:winWidth/5}} resizeMode="contain"/>
                <Image source={this.getTodayImage()}
                       style={{width:winWidth/1.5,height:winWidth/1.3,marginBottom:winWidth/8}} resizeMode="contain"/>
                <Text style={{
                    position:"absolute",
                    right:0,
                    bottom: 0,
                    padding:15
                }}>{this.getNow()}</Text>
            </View>
        )
    }

    getNow = () => {
        let date = new Date();
        let fullYear = date.getFullYear();
        let yearStr = "";
        for (let i = 1; fullYear > 0; i++) {
            let num = fullYear % 10
            yearStr = this.numMap[num] + yearStr
            fullYear = Math.floor(fullYear / 10)
        }
        let month = date.getMonth() + 1;
        let monthStr = "";
        for (let i = 1; month > 0; i++) {
            let num = month % 10
            monthStr = this.numMap[num] + this.uniMap[i] + monthStr
            month = Math.floor(month / 10)
        }
        let day = date.getDate();
        let dayStr = "";
        for (let i = 1; day > 0; i++) {
            let num = day % 10
            dayStr = this.numMap[num] + this.uniMap[i] + dayStr
            day = Math.floor(day / 10)
        }

        return `地球历${yearStr}年${monthStr}月${dayStr}日`
    };

    uniMap = {
        1: "",
        2: "十",
        3: "百",
        //....
    }

    numMap = {
        0: "〇",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九",
    }

    getTodayImage = () => {
        let weekDay = new Date().getDay();
        switch (weekDay) {
            case 0:
                return require("../resource/img/splash/opening_sunday.png");
            case 1:
                return require("../resource/img/splash/opening_monday.png");
            case 2:
                return require("../resource/img/splash/opening_tuesday.png");
            case 3:
                return require("../resource/img/splash/opening_wednesday.png");
            case 4:
                return require("../resource/img/splash/opening_thursday.png");
            case 5:
                return require("../resource/img/splash/opening_friday.png");
            case 6:
                return require("../resource/img/splash/opening_saturday.png");
        }
    }

    componentDidMount() {
        setTimeout(() => {
            Actions.home()
        }, 3000)
    }
}


export default Splash