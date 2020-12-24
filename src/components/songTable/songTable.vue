<template>
    <div>
        <table class="detailTable">
            <thead>
                <tr>
                    <td></td>
                    <td class="playButton"></td>
                    <td class="song">歌曲标题</td>
                    <td class="duration">时长</td>
                    <td class="singer">歌手</td>
                    <td class="album">专辑</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in songs" :key="item.name">
                    <td>{{index + 1}}</td>
                    <td>
                        <div @click="playSong(item.id, index)" class="playButton">
                            <i class="el-icon-video-pause" v-if="active == item.id"></i>
                            <i class="el-icon-video-play" v-else></i>
                        </div>
                    </td>
                    <!-- 歌曲标题 -->
                    <td class="song">
                        <span>{{item.name}}</span>
                    </td>
                    <!-- 时长 -->
                    <td class="duration">
                        <span>{{getTime(item.dt)}}</span>
                    </td>
                    <!-- 歌手 -->
                    <td class="singer">
                        <template v-for="(singer, index) in item.ar">
                            <span :key="index" @click="goToSinger(singer.id)">{{singer.name}}</span>
                            <span :key="singer.id" v-if="index !== item.ar.length -1 ">/</span>
                        </template>
                    </td>
                    <!-- 专辑 -->
                    <td class="album">
                        <span  @clic="goToAlbum(item.al.id)">{{item.al.name}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'songTable',
        props: {
            songs: {
                type: Array
            }
        },
        data () {
            return {
                collected: {}
            }
        },
        computed: {
            active () {
                return this.$store.state.active
            }
        },
        methods: {
            doubleNumber (num) {
                if (num.toString().length < 2) {
                    if (num === 0) {
                        return '00'
                    }
                    return '0' + num
                }
                return num
            },
            getTime (time) {
                const min = this.doubleNumber(Math.floor(time / 60000))
                const sec = this.doubleNumber(Math.floor(time / 1000 % 60))
                return min.toString() + ':' + sec.toString()
            },
            goToSinger (id) {
                console.log("the singer's id is ", id)
            },
            goToAlbum (id) {
                console.log("the album's id is ", id)
            },
            playSong (id, index) {
                // 证明当前正在播放该歌曲
                if (this.active === id) {
                    this.$store.commit('setActive', id + 1)
                    this.$store.commit('pauseMusic')
                } else if (this.active === id + 1) {
                    this.$store.commit('playMusic')
                    this.$store.commit('setActive', id)
                } else {
                    if (localStorage.getItem('songs') !== this.songs) {
                        this.$store.commit('setSongs', this.songs)
                    }
                    this.$store.commit('setTotal', this.songs.length)
                    console.log('in the songTable')
                    this.$store.dispatch('play', { num: index, name: 'songTable' })
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    table tbody tr:nth-child(odd)
        background-color #F0F0F0
    table tbody tr:nth-child(even)
        color black
    .deatailTable {
        width 100%
        margin 10px 0 0 0
        text-align left
    }
    .playButton {
        width 6%
        text-align left
        font-size 20px
    }
    .song {
        width 30%
        text-align left
    }
    .duration {
        width 10%
        text-align left
    }
    .singer {
        width 15%
        text-align left
    }
    .album {
        width 30%
        text-align left
    }
</style>
