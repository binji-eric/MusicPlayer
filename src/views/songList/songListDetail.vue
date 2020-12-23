<template>
    <div class="container">
        <el-container>
            <el-main style="width: 75%">
                <div class="top">
                    <img :src="songListDetail.coverImgUrl" alt="" id="songImg">
                    <div id="imgRight">
                        <span id="title"><h4>歌单 | {{songListDetail.name}}</h4></span>
                        <div class="creatorClass">
                            <img :src="songListDetail.creator.avatarUrl" alt="" id="authorImg">
                            <span id="nicknameStyle">{{songListDetail.creator.nickname}}</span>
                            <span id="timeStyle">{{getTimeString}}</span>
                        </div>
                        <div class="tags">
                            <el-button type="danger" round size="small"><i class="el-icon-video-play"></i>播放全部</el-button>
                            <i class="el-icon-star-off" style="margin: auto 20px; font-size: 20px"></i>
                        </div>
                        <div class="tags">
                            <span class="bold">标签：</span>
                            <span v-for="(item, index) in songListDetail.tags" :key="index">
                                <el-button type="info" round size="small">{{item}}</el-button>
                            </span>
                        </div>
                        <div class="description">
                            <span style="font-weight: bold">介绍</span>
                            <p>{{songListDetail.description}}</p>
                        </div>
                    </div>
                </div>
                <div class="songHead">
                    <h4 style="float: left">歌曲列表</h4>
                    <h4 style="float: left">{{songListDetail.trackCount}}首歌</h4>
                    <h4 style="float: right">播放：{{songListDetail.playCount}} 次</h4>
                </div>
                <song-table :songs="songListDetail.tracks"></song-table>
                <!-- <div class="mainContent" style="display: block">
                    <song-table :songs="songListDetail.tracks"></song-table>
                </div> -->
                <div id="comments">
                    <div><h4>全部评论</h4></div>
                    <comment-table
                        :comments="comments"
                    >
                    </comment-table>
                </div>
            </el-main>
            <el-aside style="width: 25%">
                <div class="sideHead">相似歌单</div>
                <hr style="color: red"/>
                <div v-for="(item, index) in relatedList" :key="index" class="sideCell">
                    <img :src="item.coverImgUrl" alt="">
                    <div class="sideCellContent" >
                        <span>{{item.name}}</span>
                        <span>{{item.creator.nickname}}</span>
                    </div>
                </div>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
import songTable from '../../components/songTable/songTable.vue'
import commentTable from '../../components/commentTable/commentTable.vue'
    export default {
        name: 'songListDetail',
        components: {
            songTable,
            commentTable
        },
        created () {
            this.initializeData(this.$route.query.id)
        },
        data () {
            return {
                songListId: '',
                songListDetail: {
                    creator: {}
                },
                relatedList: [],
                comments: []
            }
        },
        computed: {
            getTimeString () {
                const time = new Date(this.songListDetail.createTime)
                return time.toLocaleString()
            }
        },
        watch: {
            $route: {
                handler (to) {
                    // to：目标路由对象
                    this.initializeData(this.$route.query.id) // 查询数据
                }
            }
        },
        methods: {
            initializeData (id) {
                console.log('the detail needs id is', id)
                // get all the data in details by id
                // 获取歌单详细信息
                this.$http.get(`/playlist/detail?id=${id}`).then(data => {
                    this.songListId = id
                    this.songListDetail = data.playlist
                })
                // 获取歌单评论
                this.$http.get(`/comment/playlist?id=${id}`).then(data => {
                    this.comments = data.comments
                    console.log('in the deatail', this.comments)
                })
                // 获取相似歌单
                this.$http.get(`/related/playlist?id=${id}`).then(data => {
                    this.relatedList = data.playlists
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .top {
        position relative
        height auto
        min-height 320px
        #songImg {
            width 200px
            height 200px
            position absolute
            left 10px
            top 10px
            border-radius 10px
        }
        #imgRight {
            position absolute
            left 250px
            top 10px
            text-align left
            #tilte {
                font-weight bold
                display inline
            }
            .creatorClass {
                align-items center
                position relative
                #nicknameStyle {
                    display inline-block
                    font-size 14px
                    font-weight bold
                    position absolute
                    top 15px
                    left 80px
                }
                #timeStyle {
                    display inline-block
                    position absolute
                    top 15px
                    left 200px
                    font-size 14px
                }
                #authorImg {
                    width 50px
                    height 50px
                    margin auto
                }
            }
            .tags {
                margin 10px 0
                .bold {
                    font-weight bold
                }
            }
            .description {
                height: 100px
                overflow hidden
                text-overflow ellipsis
                white-space nowarp
            }
        }
    }
    .songHead {
        display relative
        margin-buttom 10px
        height 80px
    }
    .mainContent {
        position relative
        width 100%
    }
    .sideCell {
        cursor pointer
        margin 10px 0
        height 70px
        font-size 12px
        position relative
        img {
            width 60px
            heigth 60px
            float left
        }
        .sideCellContent {
            position absolute
            left 80px
            float left
            text-align  left
            span {
                display inline-block
                width 150px
            }
        }
    }
    #comments {
        position relative
        div {
            position relative
            text-align left
            color black
            margin 20px
        }
    }
</style>
