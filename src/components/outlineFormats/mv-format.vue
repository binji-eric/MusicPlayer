<template>
    <div class="songItem">
        <div class="card" @mouseenter="enter" @mouseleave="leave">
            <transition name="playCount">
                <div v-if="isEnter" class="showPlayCount">
                    <h5>{{this.topMsg}}</h5>
                </div>
            </transition>
            <img :src="this.imgUrl" alt="" class="image" :style="{width: myWidth}">
            <transition name="icon">
                <i class="el-icon-video-play" v-if="isEnter" :style="{'font-size':newFont}">
                </i>
            </transition>
        </div>
        <div class="title" :style="{width: myWidth}">
            <h5>{{this.name}}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'mvFormat',
        props: ['imgUrl', 'topMsg', 'name', 'width', 'height', 'id'],
        data () {
            return {
                myWidth: this.width,
                myHeight: this.height,
                isEnter: false,
                myId: this.id
            }
        },
        methods: {
            enter () {
                this.isEnter = true
            },
            leave () {
                this.isEnter = false
            },
            check () {
                console.log(this.imgUrl)
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
        computed: {
            newFont () {
            return `${parseInt(this.myLength) * 0.25}px`
        }
  }
    }
</script>

<style lang="stylus" scoped>
    .songItem {
        display : inline-block;
        padding : 10px 10px;
        height: auto;
        width: auto;
        img {
            position: relative
            height : auto;
            object-fit : cover;
        }
    }
    h5 {
        margin: 0;
        overflow hidden

    }
    .card {
        position relative
    }
    .showPlayCount {
            width 50%
            padding 4px
            position absolute
            left 0
            top 0
            font-size 10px
            background: rgba(0,0,0,0.6)
            z-index 200
    }
    .showPlayCount h5{
        color white
        font-size 10px
    }
    i {
        position absolute
        bottom 0
        right 0
        margin 10px
    }
    .title {
            color : black;
            text-align justify
            overflow: hidden
            width 70%
            height: 40px
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp 2
    }
    .playCount-enter-active, .playCount-leave-active {
        transition opacity 0.5s
    }
    .playCount-enter, .playCount-leave-to {
        opacity : 0;
    }
    .icon-enter-active, .icon-leave-active {
        transition opacity 0.5s
    }
    .icon-enter, .icon-leave-to {
        opacity : 0;
    }

</style>
