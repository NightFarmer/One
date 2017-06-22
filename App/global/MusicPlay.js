/**
 * Created by zhangfan on 17-6-21.
 */

import {observable, action} from 'mobx'
import Sound from 'react-native-sound';

class MusicPlayDefine {

    @observable
    audio_url;//唯一标识，字段由接口固定，所以是这么名字

    @observable
    url = "";

    @observable
    name = "";

    @observable
    artists = "";

    @observable
    state = MusicPlay.IDLE;

    IDLE = 0;
    LOADING = 1;
    PLAYING = 2;
    PAUSED = 3;

    async parseUrl(artists, name) {
        console.info(artists, name)
        let url = "";
        let response = await fetch("http://music.nightfarmer.win/search?keywords=" + name);
        let resultObj = await response.json();
        if (resultObj.code == 200 && resultObj.result.songCount > 0) {
            let id = resultObj.result.songs[0].id;
            for (let song of resultObj.result.songs) {
                if (song.artists[0].name == name) {
                    id = song.id;
                    break;
                }
            }
            response = await fetch("http://music.nightfarmer.win/music/url?id=" + id)
            resultObj = await response.json()
            if (resultObj.code == 200 && resultObj.data.length > 0) {
                url = resultObj.data[0].url
            }
        }
        return url
    }

    async togglePlay(artists, name, audio_url) {
        let url;
        if (this.audio_url == audio_url) {
            url = this.url
        } else {
            url = await this.parseUrl(artists, name)
            if (!url) {
                console.info("解析播放地址失败")
                return;
            }
        }

        if (!this.currentSound) {
            this.play(url, name, artists, audio_url)
            return
        }
        if (this.audio_url != audio_url) {
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
    play(url, name, artists, audio_url) {
        this.url = url
        this.name = name
        this.artists = artists
        this.audio_url = audio_url
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