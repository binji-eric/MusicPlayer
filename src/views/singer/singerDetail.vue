<template>
    <div>
        <el-container>
            <el-header height="300px">
                <img :src="basicInfo.picUrl" alt="singerImage">
                <el-button v-if="collected" icon="el-icon-star-on">已收藏</el-button>
                <el-button v-else icon="el-icon-star-off">收藏</el-button>
            </el-header>
            <el-main>
                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                    <el-tab-pane label="热门歌曲" name="hotSongs">
                        <song-table :songs="hotSongs"></song-table>
                    </el-tab-pane>
                    <el-tab-pane label="相关专辑" name="relatedAlbums">
                          <el-row>
                            <template v-for="(item, index) in hotAlbums">
                                <el-col :span="6" :key=index>
                                    <album-format
                                        :imgUrl="item.picUrl"
                                        :albumName="item.name"
                                        :albumId="item.id"
                                        width="100%"
                                        height="100%">
                                    </album-format>
                                </el-col>
                            </template>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="相关MV" name="relatedMvs">
                        <div class="grid-3">
                            <template v-for="(item, index) in mvs">
                                <slot-format :key="index" myWidth="240px" myHeight="150px" @click="goToMvDetail(item.id)">
                                    <template v-slot:image>
                                        <img :src="item.imgurl16v9" alt="">
                                    </template>
                                    <template v-slot:name>
                                        <div>{{item.name}}</div>
                                    </template>
                                </slot-format>
                            </template>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="歌手资料" name="singerMaterial">
                        <h3>{{basicInfo.name}}</h3>
                        <el-tabs
                            tab-position="right"
                            style="height: auto"
                            v-for="(item, index) in singerIntro"
                            :key="index"
                            v-model="activeName2"
                        >
                            <el-tab-pane :label="item.ti" :name="item.ti" :key="index">
                                <div class="infoItem">
                                    {{item.txt}}
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="相似歌手" name="similarSingers">
                        <h3>暂无相似歌手</h3>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import songTable from '../../components/songTable/songTable.vue'
import albumFormat from '../../components/outlineFormats/album-format'
import slotFormat from '../../components/outlineFormats/slotFormat'
    export default {
        name: 'singerDetail',
        components: {
            songTable,
            albumFormat,
            slotFormat
        },
        data () {
            return {
                basicInfo: Object,
                hotSongs: [],
                hotAlbums: Array,
                singerIntro: [],
                mvs: [],
                collected: false,
                activeName: 'hotSongs',
                activeName2: String
            }
        },
        created () {
            this.getSongs(this.$route.query.singerId)
            this.getIntro(this.$route.query.singerId)
            this.getAlbums(this.$route.query.singerId)
            this.getMvs(this.$route.query.singerId)
        },
        methods: {
            getSongs (singerId) {
                const url = `/artists?id=${singerId}`
                this.$http.get(url).then(data => {
                    this.basicInfo = data.artist
                    this.hotSongs = data.hotSongs
                })
            },
            getAlbums (singerId) {
                const url = `/artist/album?id=${singerId}`
                this.$http.get(url).then(data => {
                    this.hotAlbums = data.hotAlbums
                })
            },
            getIntro (singerId) {
                const url = `/artist/desc?id=${singerId}`
                this.$http.get(url).then(data => {
                    this.singerIntro = data.introduction
                    if (this.singerIntro.length > 0) {
                        this.activeName2 = this.singerIntro[0].ti
                        console.log(this.activeName2)
                    }
                })
            },
            getMvs (singerId) {
                const url = `/artist/mv?id=${singerId}`
                this.$http.get(url).then(data => {
                    this.mvs = data.mvs
                })
            },
            handleClick (tab, event) {
                console.log(tab, event)
            },
            goToMvDetail (id) {
                console.log('hei')
                console.log(id)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .el-header {
        color black
        background-color white
        line-height 400px
        position relative
        img {
            width: 90%
            height: 100%
            object-fit cover
        }
        .el-button {
            position absolute
            bottom 60px
            right 100px
        }
    }
    .infoItem {
        text-align left
    }
</style>
