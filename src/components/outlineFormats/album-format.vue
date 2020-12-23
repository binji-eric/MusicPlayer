<template>
    <div class="album_main" @mouseenter="enter" @mouseleave="leave">
        <img :src="imgUrl" alt="" @click="goToAlbumDetail">
        <transition name="icon">
            <i class="el-icon-video-play myIcon"
                v-if="isActive"
            >
            </i>
        </transition>
        <h5 class="albumName">{{albumName}}</h5>
    </div>
</template>

<script>
    export default {
        props: {
            imgUrl: String,
            albumId: Number,
            albumName: String
        },
        data () {
            return {
                isActive: false
            }
        },
        methods: {
            goToAlbumDetail () {
                console.log(this.albumId)
                const content = this.albumId
                this.$router.push({
                    path: '/singerAlbumDetail',
                    query: {
                        content
                    }
                })
            },
            enter () {
                this.isActive = true
            },
            leave () {
                this.isActive = false
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .album_main {
        width 250px
        height 250px
        position relative
        img {
            width 200px
            height 200px
            position relative
        }
        .albumName {
            font-weigth bold
            position relative
            bottom 20px
            text-align center
        }
        .myIcon {
            position relative
            bottom 10px
            right 30px
            font-size 30px
        }
    }
</style>
