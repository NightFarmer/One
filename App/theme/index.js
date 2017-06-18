/**
 * Created by zhangfan on 2017/6/18.
 */
import {observable, action} from 'mobx'

import StyleHolder from './StyleHolder'
import ThemeDefault from './ThemeDefault'
import ThemeDark from './ThemeDark'


class CurrentStyle {

    @observable
    primaryColor;

    @observable
    backgroundColor;

    @observable
    primaryText;

    @observable
    statusBarColor;

    @observable
    statusBarStyle;

    @action
    setTheme(newTheme) {
        for (let key in this) {
            if (newTheme.hasOwnProperty(key)) {
                this[key] = newTheme[key];
            }
        }
    }
}

let currentStyle = new CurrentStyle();
currentStyle.setTheme(ThemeDefault);

export default currentStyle

export {
    StyleHolder,
    ThemeDefault,
    ThemeDark
}
