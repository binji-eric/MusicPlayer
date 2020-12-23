<template>
    <div class="mainClass" :style="{width: myWidth}">
        <div class="commentCell" v-for="(item, index) in comments" :key="index">
            <hr>
            <img :src="item.user.avatarUrl" alt="">
            <div class="nameAndComment">
                <span class="nickName">{{item.user.nickname}}</span>
                <span> : {{item.content}}</span>
            </div>
            <span class="time">{{getTimeString(item.time)}}</span>
            <span class="likeCount"><i class="el-icon-thumb"></i>{{item.likedCount}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'commentTable',
        props: {
            comments: {
                type: Array
            },
            myWidth: {
                type: String,
                default: '800px'
            }
        },
        created () {
        },
        data () {
            return {
                collected: {}
            }
        },
        methods: {
            getTimeString (input) {
                const time = new Date(input)
                return time.toLocaleString()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .mainClass {
        display block
        .commentCell {
            position relative
            text-align left
            img {
                width 60px
                height 60px
                border-radius 5px
            }
            .nameAndComment {
                position absolute
                top 10px
                left 80px
                .nickName {
                    color rgb(176,70 58)
                    font-weight bold
                }
                .nickName:hover {
                    color red
                }
            }
            .time {
                position absolute
                top 50px
                left 80px
            }
            .likeCount {
                position absolute
                top 50px
                right 50px
            }
        }
    }
</style>
