<template>
    <div>
         <!-- Ranking Song List -->
        <div style="text-align: left">排行榜<i class="el-icon-caret-right"></i></div>
        <el-row>
            <template v-for="(item, index) in rankingList">
                <el-col :span="6" :key=index>
                    <div @click="goToSongDetail(item.id)">
                        <song-format :imgUrl="item.coverImgUrl"
                                    :topMsg="item.playCount"
                                    :name="item.name"
                                    width="100%"
                                    height="100%">
                        </song-format>
                    </div>
                </el-col>
            </template>
        </el-row>
    </div>
</template>

<script>
import songFormat from '../components/outlineFormats/song-format'
export default {
    data () {
        return {
            // 总的排行顺序
            rankingList: []
        }
    },
    components: {
        songFormat
    },
    created () {
        this.getRankingList()
    },
    methods: {
        getRankingList () {
            this.$http.get('/toplist/detail').then(data => {
                this.rankingList = data.list
            })
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
    }
}
</script>

<style lang="stylus" scoped>

</style>
