<template>
    <div>
        <!-- banner -->
        <el-carousel :interval="5000" type="card" height="200px">
            <el-carousel-item v-for="(item, index) in banner" :key="index">
                <img :src="item.imageUrl" :alt="item.typeTitle" class="bannerImage">
            </el-carousel-item>
        </el-carousel>
        <!-- recommend Song List -->
        <div style="text-align: left" @click="print('fuck')">推荐歌单<i class="el-icon-caret-right"></i></div>
        <el-row>
            <template v-for="(item, index) in recommendList">
                <el-col :span="4" :key=index>
                    <song-format :imgUrl="item.picUrl"
                                 :topMsg="item.playCount"
                                 :name="item.name"
                                 :id="item.id"
                                  width="100%"
                                  @click="print(item.id)"
                                  height="90%">
                    </song-format>
                </el-col>
            </template>
        </el-row>
         <!-- 独家放送 -->
        <div style="text-align: left">独家放送<i class="el-icon-caret-right"></i></div>
        <el-row>
            <template v-for="(item, index) in specialList">
                <el-col :span="7" :key=index>
                    <song-format :imgUrl="item.picUrl"
                                 :topMsg="item.copywriter"
                                 :name="item.name"
                                  width="100%"
                                  height="100%">
                    </song-format>
                </el-col>
            </template>
        </el-row>
         <!-- 新歌速递 -->
        <div style="text-align: left">新歌速递<i class="el-icon-caret-right"></i></div>
        <el-row>
            <template v-for="(item, index) in topSongList">
                <el-col :span="12" :key=index v-if="index < 12">
                    <new-song-format :singleMusic="item">
                    </new-song-format>
                </el-col>
            </template>
        </el-row>
        <!-- recommend MV -->
        <div style="text-align: left">推荐MV<i class="el-icon-caret-right"></i></div>
        <el-row>
            <div v-for="(item, index) in recommendMV" :key=index @click="goToMv(item.id, item.type)">
                <el-col :span="6">
                    <mv-format :imgUrl="item.picUrl"
                                :topMsg="item.playCount"
                                :name="item.name"
                                width="100%"
                                height="100%">
                    </mv-format>
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script>
import songFormat from '../components/outlineFormats/song-format'
import mvFormat from '../components/outlineFormats/mv-format'
import newSongFormat from '../components/outlineFormats/new-song-format'
export default {
    name: 'recommend',
    components: {
        songFormat,
        newSongFormat,
        mvFormat
    },
    data () {
        return {
            banner: [],
            recommendList: [],
            specialList: [],
            topSongList: [],
            recommendMV: []
        }
    },
    beforeCreate () {
        // console.log('hello recommend')
    },
    created () {
        console.log('recommend3 created')
        this.getBannerInfo()
        this.getTop()
        this.getSpecial()
        this.getTopSong()
        this.getMV()
        // console.log('recommend created')
    },
    methods: {
        getBannerInfo () {
            this.$http.get('/banner').then(data => {
                this.banner = data.banners
            })
        },
        getTop () {
            this.$http.get('/personalized?limit=12').then(data => {
                this.recommendList = data.result
                // console.log('top', data.result)
            })
        },
        getSpecial () {
            this.$http.get('/personalized/privatecontent').then(data => {
                this.specialList = data.result
            })
        },
        getTopSong () {
            this.$http.get('/top/song').then(data => {
                this.topSongList = data.data
                // console.log(data.data)
            })
        },
        getMV () {
            this.$http.get('/personalized/mv').then(data => {
                this.recommendMV = data.result
            })
        },
        goToSongDetail (id) {
            // console.log('in the songList', id)
            this.$router.push({
                path: 'songListDetail',
                query: {
                    id
                }
            })
        },
        goToMv (id, type) {
            console.log('id', id)
            this.$router.push({
                    path: '/mv',
                    query: {
                        id,
                        type
                    }
            })
        },
        print (sth) {
            // console.log('hello', sth)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .bannerImage {
        height: 200px;
        width: 400px;
        object-fit : cover;
        border-radius : 10px;
    }
</style>
