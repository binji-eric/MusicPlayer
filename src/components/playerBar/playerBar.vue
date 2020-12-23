<template>
    <div>
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
                <el-progress :percentage="percentage" color="red"></el-progress>
            </div>
            <div>
                <span>{{currentTime}}/{{totalTime}}</span>
            </div>
            <audio :src="playingSong.url" ref="audio" autoplay @ended="ended" @canplay="setDuration"
               @timeupdate="getCurrentTime"></audio>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
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
            },
            playNext () {
            },
            // 当音乐播放完毕后
            ended () {
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .bottom {
        float left
        display flex
        flex-direction row
        justify-content flex-start
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
