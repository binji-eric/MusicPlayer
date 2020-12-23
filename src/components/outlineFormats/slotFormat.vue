<template>
    <div class="main">
        <div :style="{width: myWidth, height: myHeight}"
            class="imgOutline"
            @mouseenter="enter"
            @mouseleave="leave"
        >
            <slot name="image" :style="{width: myWidth, height: myHeight}"></slot>
            <transition name="icon">
                <i class="el-icon-video-play"
                    v-if="isActive"
                    :style="{'font-size': myFont, top: myTop, left: myLeft}"
                >
                </i>
            </transition>
        </div>
        <div class="title" :style="{width: myWidth}">
            <slot name="name"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'slotFormat',
        props: {
            myHeight: {
                default: '150px',
                type: String
            },
            myWidth: {
                default: '100px',
                type: String
            }
        },
        created () {
            this.printSome()
        },
        data () {
            return {
                isActive: false
            }
        },
        computed: {
            myFont () {
                return `${parseInt(this.myHeight) * 0.4}px`
            },
            myTop () {
                return `${parseInt(this.myHeight) * 0.3}px`
            },
            myLeft () {
                return `${(parseInt(this.myWidth) - parseInt(this.myHeight) * 0.4) / 2}px`
            }
        },
        methods: {
            enter () {
                this.isActive = true
            },
            leave () {
                this.isActive = false
            },
            printSome () {
                console.log(this.myWidth)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .main {
        display inline-block
        margin 10px
        .imgOutline {
            position relative
        }
        .title {
            color black
            font-size 15px
            cursor pointer
            div {
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
            }
        }
        img {
            object-fit cover
            width: 100%
            height: 90%
        }
    }
    .icon-enter-active, .icon-leave-active {
        transition opacity 0.5s
    }
    .icon-enter-active, .icon-leave-active {
        opacity 0
    }
    i {
        position absolute
        margin 5px
    }

</style>
