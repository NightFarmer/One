/**
 * Created by zhangfan on 17-6-21.
 */

import {observable, action} from 'mobx'
import Sound from 'react-native-sound';

class MusicPlayDefine {

    @observable
    url = "";

    @observable
    name = "";

    @observable
    state = MusicPlay.IDLE;

    IDLE = 0;
    PLAYING = 1;

    @action
    play(url, name) {
        this.url = url
        this.name = name
        console.info("invoke play")
        this.playSound()
    }

    @action
    setState(state) {
        console.info("set state" + state)
        this.state = state
    }

    playSound(testInfo, component) {
        //准备
        const callback = (error, sound) => {
            if (error) {
                //失败
                return;
            }
            //播放中
            console.info("开始播放")
            this.setState(this.PLAYING)
            sound.play(() => {
                //结束
                console.info("播放完成")
                this.setState(this.IDLE)
                sound.release();
            });
        };
        const sound = new Sound(this.url, "", error => callback(error, sound));
    }
}

const MusicPlay = new MusicPlayDefine();

export default MusicPlay