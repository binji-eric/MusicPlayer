<template>
    <div>
        <div v-if="highQualityList.length !== 0" class="header">
            <el-row>
                <img :src="highQualityList[0].coverImgUrl" alt="" @click="goToHighQuality" class="highImage">
                <div>
                    <button @click="goToHighQuality">精品歌单</button>
                    <span class="name">{{highQualityList[0].name}}</span>
                    <span class="copywriter">{{highQualityList[0].copywriter}}</span>
                </div>
            </el-row>
        </div>
        <div>
            <el-row>
                <el-popover
                    placement="left"
                    width="800px"
                    trigger="click"
                    >
                    <el-button slot="reference" id="menuButton">
                        <span>选择分类</span>
                        <i class="el-icon-arrow-right"></i>
                    </el-button>
                    <el-row v-for="(item, index) in bigCategories" :key="index">
                        <div class="smallCategory">
                             <i :class="iconList[index]" class="iconClass">
                                <span>{{item}}</span>
                            </i>
                            <span v-for="(second, index2) in categoryRes[index]" :key="index2">
                                <span
                                    class="secondCategory"
                                    @click="setCategory(second.name)">
                                    {{second.name}}
                                </span>
                                <span v-if="index2 !== categoryRes[index].length -1 "> | </span>
                            </span>
                        </div>
                    </el-row>
                </el-popover>
                <el-link
                    v-for="(item, index) in hotPlayList"
                    :key="index"
                    style="margin: 0 5px; float: right"
                    @click="setCategory(item.name)">
                    <span>{{item.name}}</span>
                </el-link>
            </el-row>
        </div>
        <div style="margin-top: 10px">
            <el-row>
                <template v-for="(item, index) in this.hotSongList">
                    <el-col :span="6" :key=index>
                        <div @click="goToSongDetail(item.id)">
                            <song-format :imgUrl="item.coverImgUrl"
                                        :topMsg= "item.playCount"
                                        :name="item.name"
                                        width="100%"
                                        height="100%">
                            </song-format>
                        </div>
                    </el-col>
                </template>
            </el-row>
        </div>
    </div>
</template>

<script>
import songFormat from '../../components/outlineFormats/song-format'
export default {
    name: 'songList',
    components: {
        songFormat
    },
    data () {
        return {
            iconList: ['el-icon-discover', 'el-icon-magic-stick', 'el-icon-goblet-full', 'el-icon-sunny', 'el-icon-headset'],
            highQualityList: [],
            categoryName: '',
            totalPage: 0,
            bigCategories: {},
            smallCategories: [],
            hotPlayList: [],
            hotSongList: []
        }
    },
    computed: {
        categoryRes () {
            const list = [0, 1, 2, 3, 4]
            const result = list.map(item => {
                const cate = this.smallCategories.filter(one => {
                    return one.category === item
                })
                return cate
             })
             return result
        }
    },
    methods: {
        getHighQuality (category) {
            let cate = ''
            if (category === undefined) {
                cate = '全部'
            } else {
                cate = category
            }
            this.$http.get(`top/playlist/highquality?cat=${cate}&limit=1`).then(data => {
                if (Object.keys(data.playlists).length >= 1) {
                    this.highQualityList = data.playlists
                } else {
                    this.highQualityList = []
                }
            })
        },
        goToHighQuality () {
            // console.log('I will go to high quality')
        },
        getCategory () {
            this.$http.get('/playlist/catlist').then(data => {
                this.bigCategories = data.categories
                this.smallCategories = data.sub
                // console.log(this.bigCategories)
            })
        },
        getPlayList () {
            this.$http.get('/playlist/hot').then(data => {
                this.hotPlayList = data.tags
            })
        },
        getTopPlayList () {
            this.$http.get('/top/playlist?limit=20&order=hot').then(data => {
                this.hotSongList = data.playlists
            })
        },
        setCategory (category, offset) {
            let link = ''
            if (offset === undefined) {
                link = `/top/playlist?cat=${category}&limit=20`
            } else {
                 link = `/top/playlist?cat=${category}&limit=20&offest=${20 * (offset - 1)}`
            }
            this.$http.get(link).then(data => {
                this.hotSongList = data.playlists
                this.categoryName = category
                this.totalPage = data.total
            })
            this.getHighQuality(category)
        },
        goToSongDetail (id) {
            console.log('in the songList', id)
            this.$router.push({
                path: 'songListDetail',
                query: {
                    id
                }
            })
        }
    },
    created () {
        this.getHighQuality()
        this.getCategory()
        this.getPlayList()
        this.getTopPlayList()
    }
}
</script>

<style lang="stylus" scoped>
    .header {
        position relative
        margin 10px
        .highImage {
            height 150px
            width 150px
            float left
            border-radius 10px
        }
        button {
            position absolute
            top 20px
            left 220px
            font-size 15px
            color orange
        }
        .name {
            position absolute
            top 70px
            left 220px
            font-weight bold
        }
        .copywriter {
            position absolute
            top 120px
            left 220px
        }
    }
    #menuButton {
        float left
    }
    .smallCategory {
        width 700px
        margin: 10px
    }
    .iconClass {
        font-size 20px
        font-weight bold
        margin-right 20px
    }
    .secondCategory:hover {
        color red
    }
</style>
