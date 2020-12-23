<template>
    <div class="singerItem" @click="goToSingerDetail(singerId)">
        <img :src="imgUrl" alt="" class="image">
        <div class="name">
            <h5>{{singerName}}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'singerFormat',
        props: {
            imgUrl: String,
            singerName: String,
            singerId: Number
        },
        data () {
            return { }
        },
        methods: {
            goToSingerDetail (singerId) {
                console.log("users' id is ", singerId)
                this.$router.push({
                path: 'singerDetail',
                query: {
                    singerId
                }
            })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .singerItem {
        position relative
        display inline-block
        padding 5px
        width: 90%
        height 90%
        maring 5px
        .image {
            width 80%
            height 75%
            border-radius 5px
            object-fit cover
        }
    }
</style>
