<template>
    <div class="songItem">
        <img :src="singleMusic.album.picUrl" alt="" class="image">
        <div class="name">
            <h5>{{singleMusic.name}}</h5>
        </div>
        <div class="singers">
            <template v-for="(artist, index) in singleMusic.artists">
                <span :key="index" v-if="index === 0" @click="goToSinger(artist.id)">{{artist.name}}</span>
                <span :key="index" v-else @click="goToSinger(artist.id)">-{{artist.name}}</span>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'newSongFormat',
        props: { singleMusic: Object },
        data () {
            return { }
        },
        methods: {
            goToSinger (singerId) {
                console.log("users' id is ", singerId)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .songItem {
        position relative
        padding 5px
        .image {
            width 80px
            height 80px
            float left
        }
        .name {
            position absolute
            left 100px
            top 0px
            font-size 10px bold
            color black
            span:hover {
                color red
            }
        }
        .singers {
            position absolute
            left 100px
            top 60px
            font-size 12px
            color #888888
        }
    }
</style>
