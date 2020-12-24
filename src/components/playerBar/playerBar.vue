<template>
    <div>
        <el-container v-show="show">
            <el-main v-if="songs != null" id="elMain" >
                <div style="position: relative; height: 20px">
                    <div style="position: absolute; left: 10px; ">
                        播放列表({{songs.length}})
                    </div>
                </div>
                <div class="scroll">
                    <playlist :songs="songs" :activedSongId="Number(playingSong.num)"></playlist>
                </div>
            </el-main>
            <el-aside id="elSide" width="35%">
                <!-- 这里是歌词 -->
                <div v-if="lyric && lyric.lrc">
                    <div>{{playingSong.name}}</div>
                    <div ref="scroll" class="scroll">
                        <lyrics :lyric="lyric" :time="currentTime" @startScroll="scrollLyric"></lyrics>
                    </div>
                </div>
                <div v-else>
                    暂无歌词
                </div>
            </el-aside>
        </el-container>
        <div class="bottom">
            <div class="icon-group" >
                <i class="el-icon-arrow-left" @click="playPrev"></i>
                <i class="el-icon-video-pause" v-if="isPlay" @click="pauseMusic"></i>
                <i class="el-icon-video-play" v-else @click="playMusic"></i>
                <i class="el-icon-arrow-right" @click="playNext"></i>
            </div>
            <img :src="playingSong.img" alt="" >
            <div class="songInfo" style="max-length: 150px">
                <span>{{playingSong.name}}</span>
            </div>
            <div class="time" >
                <el-progress :percentage="percentage" color="rgb(196, 70, 58)"></el-progress>
            </div>
            <div>
                <span>{{currentTime}}/{{totalTime}}</span>
            </div>
            <div @click="showSongListAndLyrics">
                <i class="el-icon-caret-top" v-if="!this.show"></i>
                <i class="el-icon-caret-bottom" v-else></i>
            </div>
            <audio :src="playingSong.url" ref="audio" autoplay @ended="ended" @canplay="setDuration"
               @timeupdate="getCurrentTime"></audio>
        </div>
    </div>
</template>

<script>
    import playlist from './playlist'
    import lyrics from './lyrics'
    export default {
        name: 'playerBar',
        components: {
            playlist,
            lyrics
        },
        data () {
            return {
                show: false
            }
        },
        computed: {
            isPlay () {
                return this.$store.state.isPlay
            },
            playingSong () {
                if (this.$store.state.url !== null) {
                    console.log(this.$store.state.playingSong)
                    return this.$store.state.playingSong
                }
                return {
                    name: ' 暂无音乐可以播放'
                }
            },
            currentTime () {
                // console.log('currentTime', this.$store.getters.currentTime)
                return this.$store.getters.currentTime
            },
            totalTime () {
                // console.log('totalTime', this.$store.getters.total)
                return this.$store.getters.total
            },
            percentage () {
                return this.$store.getters.percentage
            },
            songs () {
                return this.$store.state.songs
            },
            lyric () {
                console.log('lyric is there playerBar', this.$store.state.playingSong.lyric)
                return this.$store.state.playingSong.lyric
            }
        },
        methods: {
            playMusic () {
                if (this.songs !== null) {
                    this.$store.commit('playMusic')
                } else {
                    console.log('无播放歌曲')
                }
            },
            pauseMusic () {
                this.$store.commit('pauseMusic')
            },
            getCurrentTime () {
                this.$store.commit('getCurrentTime')
            },
            setDuration () {
                this.$store.commit('setDuration', this.$refs.audio)
            },
            playPrev () {
                 if (this.$store.state.playingSong.num === 0) {
                    this.$store.dispatch('play', {
                        num: this.$store.state.total - 1,
                        name: 'songTable'
                    })
                } else {
                     this.$store.dispatch('play', {
                        num: this.$store.state.playingSong.num - 1,
                        name: 'songTable'
                    })
                }
            },
            playNext () {
                console.log('going to play next')
                // if (this.songs !== null) {
                //     console.log('going to editNextNum')
                //     this.$store.commit('editNextNum')
                // } else {
                //     this.$message.warning('暂无播放歌曲')
                // }
                if (this.$store.state.playingSong.num === this.$store.state.total - 1) {
                    this.$store.dispatch('play', {
                        num: 0,
                        name: 'songTable'
                    })
                } else {
                     this.$store.dispatch('play', {
                        num: this.$store.state.playingSong.num + 1,
                        name: 'songTable'
                    })
                }
            },
            showSongListAndLyrics () {
                if (this.songs !== null) {
                    this.show = !this.show
                } else {
                    this.$message.warning('没有播放歌词')
                }
            },
            scrollLyric (value) {
                console.log('scroll Value', value)
                this.$refs.scroll.scrollBy(0, value)
            },
            // 当音乐播放完毕后
            ended () {
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #elMain
        padding 5px
    #elSide
        padding 5px
    .scroll
        width: 100%
        margin 10px 0 0 0
        height 200px
        border-radius 5px
        overflow scroll
    .bottom {
        float left
        width 100%
        display flex
        flex-direction row
        justify-content space-around
        align-items center
        .icon-group {
            display inline-block
            flex 1 1 4
            padding 10 20px
            background-color transparent
            i {
                font-size 30px
            }
        }
        img {
            flex 1 1 4
            width 40px
            height 40px
            margin 10px 10px 10px 10px
        }
        .songInfo {
            text-align center
        }
        .time {
            width 600px
            font-szie 15px
            color red
        }
    }
</style>
