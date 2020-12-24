<template>
    <table>
        <tr v-for="(item, index) in songs"
            :key="item.id"
            @click="play(item.id, index)"
            :class="{active: index === activedSongId}">
            <td>
                <div class="name">
                    {{item.name}}
                </div>
            </td>
            <td>
                <div class="singers">
                    <template v-for="(ele, index) in item.ar">
                        <span :key="ele.id" @click="goToSinger(ele.id)">{{ele.name}}</span>
                        <span :key="ele.name" v-if="index!=item.ar.length-1">/</span>
                    </template>
                </div>
            </td>
            <td>
                <div class="duration">
                    <span>{{duration(item.dt)}}</span>
                </div>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    name: 'playlist',
    props: {
        songs: {
            type: Array
        },
        activedSongId: {
            type: Number
        }
    },
    computed: {
        name () {
            return this.$store.state.tableName
        }
    },
    methods: {
        duration (time) {
            return `${this.double(Math.floor(time / 60000))}:${this.double(Math.floor(time / 1000 % 60))}`
        },
        double (num) {
            if (num.toString().length !== 2) {
                if (num === 0) {
                return '00'
                }
                return '0' + num
            }
            return num
        },
        goToSinger (id) {
            this.$router.push({
                path: 'singerDetail',
                query: {
                    singerId: id
                }
            })
        },
        play (id, index) {
            if (localStorage.getItem('songs') !== this.songs) {
                this.$store.commit('setSongs', this.songs)
            }
            this.$store.commit('getTotal', this.songs.length)
            this.$store.dispatch('play', {
                num: index,
                name: this.name
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    table
        background-color rgba(165, 160, 160, 1)
        font-size 12px
        height 300px
        width 100%
        border-collapse collapse
        td
            padding 5px 15px
        .singer
            th 100px
        span:hover
            text-decoration underline
            cursor pointer
        .dt
            width 40px
        .name
            width 300px
        div
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
    tr
        cursor pointer
    tr:hover
        background-color pink
    .active
        background-color rgb(196, 70, 58)
</style>
