/**
 * Created by zhangfan on 2017/6/18.
 */
import {
    StyleSheet,
} from 'react-native';
import {observable, computed} from 'mobx'
class StyleHolder {

    @observable
    styles;

    constructor(getStyle) {
        let stylesSheet = computed(() => {
            return StyleSheet.create(getStyle())
        });
        this.styles = stylesSheet.get();
        stylesSheet.observe(change => {
            this.styles = stylesSheet.get()
        })
    }

    static create = (styleRender) => {
        return new StyleHolder(styleRender)
    }
}

export default StyleHolder