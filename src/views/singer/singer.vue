<template>
    <div>
        <div class="header">
             <!-- 按照类型分类 -->
            <div class="title">类型：</div>
            <div class="content">
                <template v-for="(item, index) in types">
                    <el-divider :key="index" direction="vertical" v-if="index !== 0"></el-divider>
                    <span :key="index" @click="selectType(item.value)" :class="{activeClass: item.value === chosenType}">{{item.name}}</span>
                </template>
            </div>
            <!-- 按照地区分类 -->
            <div class="title">地区：</div>
            <div class="content">
                <template v-for="(item, index) in areas">
                    <el-divider :key="index" direction="vertical" v-if="index !== 0"></el-divider>
                    <span :key="index" @click="selectArea(item.value)" :class="{activeClass: item.value === chosenArea}">{{item.name}}</span>
                </template>
            </div>
            <!-- 按照首字母分类 -->
            <div class="title">字母：</div>
            <div class="content">
                <template v-for="number in 26">
                    <el-divider :key="number" direction="vertical" v-if="number !== 1"></el-divider>
                    <span :key="number"
                        @click="selectCharacter(String.fromCharCode(number+64))"
                        :class="{activeClass: String.fromCharCode(number+64) === chosenCharacter}"
                        >{{String.fromCharCode(number+64)}}
                    </span>
                </template>
            </div>
        </div>
        <div class="main">
            <el-row>
                <template v-for="(item, index) in singers">
                        <div v-if="parseInt(index)%4==0" :key="item.name" class="hideLine">-</div>
                        <el-col :span="6" :key="index">
                            <singer-format
                                :imgUrl="item.picUrl"
                                :singerName="item.name"
                                :singerId="item.id"
                            >
                            </singer-format>
                    </el-col>
                </template>
            </el-row>
        </div>
    </div>
</template>

<script>
import singerFormat from '../../components/outlineFormats/singer-format'
export default {
    components: {
        singerFormat
    },
    data () {
        return {
            chosenType: -1,
            chosenArea: -1,
            chosenCharacter: -1,
            singers: [],
            areas: [
                {
                    name: '全部',
                    value: -1
                },
                {
                    name: '华语',
                    value: 7
                },
                {
                    name: '欧美',
                    value: 96
                },
                {
                    name: '日本',
                    value: 8
                },
                {
                    name: '韩国',
                    value: 16
                },
                {
                    name: '其他',
                    value: 0
                }
            ],
            types: [
                {
                    name: '全部',
                    value: -1
                },
                {
                    name: '男歌手',
                    value: 1
                },
                {
                    name: '女歌手',
                    value: 2
                },
                {
                    name: '乐队',
                    value: 3
                }
            ]
        }
    },
    created () {
        this.initialSetup()
    },
    methods: {
        selectType (value) {
            this.chosenType = value
            const url = `/artist/list?type=${this.chosenType}&area=${this.chosenArea}&initial=${this.chosenCharacter}`
            console.log(url)
            this.$http.get(url).then(data => {
                this.singers = data.artists
                console.log(this.singers)
            })
        },
        selectArea (value) {
             this.chosenArea = value
            const url = `/artist/list?type=${this.chosenType}&area=${this.chosenArea}&initial=${this.chosenCharacter}`
            console.log(url)
            this.$http.get(url).then(data => {
                this.singers = data.artists
                console.log(this.singers)
            })
        },
        selectCharacter (value) {
            this.chosenCharacter = value
            const url = `/artist/list?type=${this.chosenType}&area=${this.chosenArea}&initial=${this.chosenCharacter}`
            console.log(url)
            this.$http.get(url).then(data => {
                this.singers = data.artists
                console.log(this.singers)
            })
        },
        initialSetup () {
            const url = `/artist/list?type=${this.chosenType}&area=${this.chosenArea}&initial=${this.chosenCharacter}`
            console.log(url)
            this.$http.get(url).then(data => {
                this.singers = data.artists
                console.log(this.singers)
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .header {
        text-align:  left;
        .title {
            font-size: 20px;
            padding: 10px 10px 0 0;
            font-weight: bold;
        }
        .activeClass {
            color: red;
            font-weight: bold;
        }
        span:hover {
            color: red;
            font-weight: bold;
        }
    }
    .hideLine {
        opacity 0
        border 1px solid transparent
        margin 0
        padding 0
        height 2
    }
</style>
