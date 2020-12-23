<template>
    <div>
        <el-header>
            <!-- <h1>This is header</h1> -->
            <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                background-color="rgb(228, 228, 228)"
                text-color="black"
                active-text-color="red"
                >
                <el-menu-item index="1">
                    <router-link to="/recommend">
                        Recommend
                    </router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="/ranking">
                        Ranking
                    </router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link to="/songList">
                        Song List
                    </router-link>
                </el-menu-item>
                <el-menu-item index="4">
                    <router-link to="singer">
                        Singer
                    </router-link>
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
             <!-- 当点击登录时，弹出登录选项 -->
            <el-dialog
                :title="loginTitle"
                :visible.sync="isLoginVisible"
                width="500px">
                <!-- <span>这是一段信息</span> -->
                <el-card v-if="loginOrRegister != 0">
                    <phone-login v-if="loginOrRegister ==  1"  @success="isLogined"></phone-login>
                </el-card>
                <span class="button-group" v-if="loginOrRegister == 0">
                    <el-button type="primary" @click="goToPhone()">手机登录</el-button>
                    <el-button type="primary" @click="goToRegister()">快来注册</el-button>
                </span>
            </el-dialog>
            <el-aside width="200px">
               <!-- 一直显示 -->
                <div id="loginAlways">
                    <img :src="loginImgUrl" alt="iconForLogin" class="loginIcon" @click="goToLogin()">
                    <div @click="goToLogin()"><h4>{{loginMsg}}</h4></div>
                    <div class="selfInfo" @click="goMyMusic('singer')"><i class="el-icon-user"></i>我的歌手</div>
                    <div class="selfInfo" @click="goMyMusic('video')"><i class="el-icon-video-camera"></i>我的视频</div>
                </div>
                  <!-- 当登录成功后，显示该用户收藏的表单列表 -->
                <div v-for="(item, index) in playlists" :key="index" class="asideSong" @click="goToSongDetail(item.id)">
                    <img :src="item.coverImgUrl" alt="">
                    <div>
                        <span>{{item.name}}</span><br>
                        <span>{{item.trackCount}}首 by{{item.creator.nickname}}</span>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-footer>
             <h1>This is footer</h1>
        </el-footer>
        <music-bar class="musicBar"></music-bar>
    </div>
</template>

<script>
import musicBar from '../components/playerBar/playerBar.vue'
import phoneLogin from '../components/phoneLogin/phoneLogin.vue'
export default {
    components: {
        musicBar,
        phoneLogin
    },
    data () {
        return {
            activeIndex: '1',
            isLoginVisible: false,
            loginOrRegister: 0,
            loginTitle: '登录还是注册，这是个问题',
            loginImgUrl: require('../assets/usc.png'),
            loginMsg: '请登录',
            accountId: '',
            playlists: []
        }
    },
    beforeCreate () {
        console.log('main vue before created')
    },
    created () {
        // this.loginImgUrl = '../assets/usc.png'
    },
    mounted () {
        console.log('main vue mounted')
    },
    methods: {
        goToMyMusic (content) {
            console.log(content)
        },
        goToLogin () {
            this.isLoginVisible = true
        },
        goToPhone () {
            this.loginOrRegister = 1
            this.loginTitle = '手机登录'
        },
        goToRegister () {
            this.loginOrRegister = 2
            this.loginTitle = '来注册一个'
        },
        isLogined (value, nickname, accountId) {
            console.log('received msg from children')
            this.isLoginVisible = false
            this.loginImgUrl = value
            this.loginMsg = nickname
            // this.accountId = this.$store.state.accountId
            this.$http.get(`/user/playlist?uid=${accountId}`).then(data => {
                this.playlists = data.playlist
            })
        },
        goToSongDetail (id) {
            console.log('in the songList', id)
            this.$router.push({
                path: 'songListDetail',
                query: {
                    id
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    a {
        text-decoration: none;
    }
    .router-link-active {
        text-decoration: none;
    }
    .musicBar {
        width 100%
        position fixed
        left 0
        right 0
        bottom 0
        background-color rgb(198,198,198)
        box-shadow  0 -4px 10px #888888;
        margin-left 0
        margin-right 0
        padding-lef 0
        padding-right 0
    }
    #loginAlways {
        .selfInfo {
            color #888888
            font-size 14px
            box-sizing border-box
            padding 5px 20px 5px 20px
            cursor pointer
        }
        .loginIcon {
            width 50px
            height 50px
            border-radius 50%
            margin 10px auto
            cursor pointer
        }
        #notify {
            margin auto
        }
    }
    .el-header {
        padding 0
        margin 0
    }
    .el-menu
        display flex
        justify-content center
        span
            cursor pointer
            position relative
            margin auto 0
            font-size 10px
            color #909399
    .el-aside
        background-color rgb(228,228,228)
        position fixed
        left 0
        top 10px
        height 100%
        padding 0
        margin 70px 0
    .el-main
        position relative
        margin-left 220px
        margin-top 20px
        padding 0px
    .el-dialog
        z-index 1
    .asideSong
        cursor pointer
        padding 10px 10px 0 10px
        height 50px
        font-size 12px
        text-align left
        img
            position relative
            width 40px
            height 40px
            float left
            border-radius 3px
        div
            position relative
            left 45px
            top -40px
            width 150px
            span
                display inline-block
                width 150px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                ~span
                    font-size 12px
                    color #888888

</style>
