<template>
    <div>
        <el-container>
            <el-main>
                <div class="header">
                    <span class="mv">MV</span>
                    <span class="mvName">{{mvData.name}}</span>
                    <span class="singers">
                        <span>Author</span>
                        <template  v-for="(item, index) in mvData.artists">
                            <span :key="item.id" v-if="index===0" @click="goSinger(item.id)">{{item.name}}</span>
                            <span :key="item.id" v-else @click="goSinger(item.id)">/{{item.name}}</span>
                        </template>
                    </span>
                </div>
                <div class="video">
                    <i class="el-icon-video-play" v-if="isPlay=false"></i>
                    <video ref="video" :src="mvUrl" controls @play="play" @pause="pause" @ended="pause"></video>
                </div>
            </el-main>
            <el-aside width="300px">
                <div class="simiHeader">视频简介</div>
                <div class="line"></div>
                <div class="word">发布时间：{{publishTime}}</div>
                <div class="word">播放次数：{{mvData.playCount}}次</div>
                <div class="simiHeader">相似视频</div>
                <div class="line"></div>
                <div v-for="(item, index) in similarMv" :key="index" class="sim">
                <img :src="item.cover" alt="">
                <div>
                    <span>{{item.name}}</span><br>
                    <span>by{{item.artists[0].name}}</span>
                </div>
                </div>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
// import commentTable from '../commentTable/commentTable'
export default {
    name: 'playMv',
    components: {
        // componentTable
    },
    created () {
        this.initializeData()
    },
    data () {
        return {
            mvData: {},
            mvUrl: '',
            mvComments: {},
            similarMv: {},
            isPlay: false,
            mvId: this.$route.query.id
        }
    },
    computed: {
        publishTime () {
            return new Date(this.mvData.publishTime).toLocaleDateString()
        }
    },
    methods: {
        initializeData () {
            this.getMvData(this.mvId)
            this.getMvAddress(this.mvId)
            this.getMvComments(this.mvId)
            this.getSimilarMv(this.mvId)
            console.log(this.mvId)
        },
        // 获取mv的信息
        getMvData (id) {
            this.$http.get(`/mv/detail?mvid=${id}`).then(data => {
                this.mvData = data.data
            })
        },
        // 获取mv的播放地址
        getMvAddress (id) {
            this.$http.get(`mv/url?id=${id}`).then(data => {
                this.mvUrl = data.data.url
            })
        },
        // 获得mv的评价信息
        getMvComments (id) {
            this.$http.get(`/comment/video?id=${id}&limit=5`).then(data => {
                this.mvComments = data.comments
            })
        },
        // 获取相似mv
        getSimilarMv (id) {
            this.$http.get(`/simi/mv?mvid=${id}`).then(data => {
                this.similarMv = data.mvs
            })
        },
        // 播放
        play () {
            this.isPlay = true
        },
        // 暂停
        pause () {
            this.isPlay = false
        },
        goSinger (id) {
            console.log('goSinger', id)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .header
        margin-top 20px
        margin-left 22px
        text-algin left
        position relative
        .mv
            position absolute
            top 0
            left 10px
            margin-right 10px
            font-size 20px
            padding-left 2px
            padding-right 2px
            border 1px solid red
            color black
        .mvName
            position absolute
            top 0
            left 90px
            font-size 23px
            margin-right 20px
            font-weight bold
        .singers
            position relative
            top 6px
            left 40px
            font-size 12px
            color black
        :first-child
            color black
            margin-right 5px
        span:hover
            text-decoration underline
            cursor pointer
    .video
        margin 20px 10px
        width 100%
        display flex
        justify-content center
        align-items center
        video
            width 94%
        i
            font-size 80px
            position absolute
    .simiHeader
        text-align left
        margin-top 80px
        margin-bottom 10px
    .word
        width 170px
        font-size 12px
        color #888888
        margin-top 5px
    .sim
        margin 10px 10px 0 10px
        height 65px
        font-size 14px
        position relative
        img
            position absolute
            left 10px
            width 90px
            height auto
            border-radius 4px
        div
            position absolute
            text-align left
            left 110px
            top  0
            width 180px
            cursor pointer
            span
                display inline-block
                width 180px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                ~span
                    font-size 12px
                    color #888888
</style>
