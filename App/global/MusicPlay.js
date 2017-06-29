/**
 * Created by zhangfan on 17-6-21.
 */

import {observable, action} from 'mobx'
import Sound from 'react-native-sound';
import Toast from 'react-native-nightfarmer-toast'

class MusicPlayDefine {

    @observable
    id;//唯一标识

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
                if (song.artists[0].name == artists) {
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

    async stop(reset) {
        this.currentSound && this.currentSound.pause(() => {
            if (reset) {
                this.state = this.IDLE
            }else {
                this.state = this.PAUSED
            }
        })
    }

    async togglePlay(artists, name, id) {
        let url = this.url;
        if (this.id != id) {
            await this.stop(true)
            Toast.show("开始加载-" + name)
            console.info("开始加载" + name)
            url = await this.parseUrl(artists, name)
            if (!url) {
                console.info("解析播放地址失败")
                Toast.show("因版权问题，播放地址解析失败")
                return;
            }
            console.info("新地址:", url)
            this.currentSound && this.currentSound.stop()
            this.play(url, name, artists, id)
            return
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
    play(url, name, artists, id) {
        this.url = url
        this.name = name
        this.artists = artists
        this.id = id
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