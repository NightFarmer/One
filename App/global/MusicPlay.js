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
    LOADING = 1;
    PLAYING = 2;
    PAUSED = 3;


    togglePlay(url, name) {
        if (!this.currentSound) {
            this.play(url, name)
            return
        }
        if (this.url != url) {
            this.currentSound.stop()
        }
        this.currentSound.getCurrentTime((seconds, isPlaying) => {
            if (isPlaying) {
                this.currentSound.pause(() => {
                    this.state = this.PAUSED
                })
            } else {
                if (this.state == this.IDLE) {
                    this.currentSound.setCurrentTime(0)
                }
                this.state = this.PLAYING
                this.currentSound.play(this.playFinishCallback);
            }
        })
    }

    playFinishCallback = () => {
        //结束
        console.info("播放完成")
        this.setState(this.IDLE)
        // this.currentSound.release();
    };

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

    playSound() {
        //准备
        const callback = (error, sound, preSound) => {
            if (error) {
                //失败
                return;
            }
            if (preSound) {
                preSound.release()
            }
            //播放中
            console.info("开始播放");
            this.setState(this.PLAYING);
            sound.play(this.playFinishCallback);
        };
        let preSound = this.currentSound;
        let sound = new Sound(this.url, "", error => callback(error, sound, preSound));
        this.currentSound = sound;
    }

    currentSound = null
}

const MusicPlay = new MusicPlayDefine();

export default MusicPlay