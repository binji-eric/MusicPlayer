<template>
    <div>
        <div class="lyric"
            :class="{active: key === delayTime}"
            v-for="(item, key) in createdLyric"
            :key="key">
            {{item}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'lyrics',
    props: {
        lyric: {
            type: Object
        },
        time: {
            type: String
        }
    },
    data () {
        return {
            createdLyric: {},
            delayTime: {
                type: String,
                default: ''
            }
        }
    },
    methods: {
        createLyric () {
            const lyricsList = this.lyric.lrc.lyric.split('\n')
            this.createdLyric = {}
            lyricsList.forEach(value => {
                if (value) {
                    // a是被截取出的歌词内容
                    const a = value.split(']')[1]
                    // console.log(a);
                    const b = value.split(']')[0].split('[')[1].split('.')[0]
                    // console.log(b)
                    if (a !== 'null' && a.length !== 0) {
                        this.createdLyric[b] = a
                    }
                }
            })
            console.log(this.createdLyric)
        }
    },
    created () {
        this.createLyric()
    },
    watch: {
        lyric () {
            console.log('lyric changed')
            this.createLyric()
        },
        time (newValue) {
            if (newValue in this.createdLyric) {
                this.$emit('startScroll', 20)
                this.delayTime = newValue
            }
        }
    }

}
</script>

<style lang="stylus" scoped>
  .lyric
    padding 8px
    background-color rgba(165, 160, 160, 1)
    text-align center
    font-size 12px
    color rgba(0, 0, 0, 1)
  .active
    font-size 14px
    color rgb(196, 70, 58)
    font-weight bold
</style>
