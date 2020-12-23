<template>
  <el-card class="loginCard">
      <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号">
              </el-input>
          </el-form-item>
          <el-form-item prop="password">
              <el-input v-model="form.password" placeholder="请输入密码">
              </el-input>
          </el-form-item>
          <div class="center">
              <el-button type="danger" @click="login">登录</el-button>
          </div>
      </el-form>
  </el-card>
</template>

<script>
export default {
    name: 'phoneLogin',
    data () {
        return {
            form: {
                phone: '',
                password: ''
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        login () {
            this.$refs.form.validate((valid) => {
                if (!valid) {
                    return this.$message.error('信息不完整')
                }
                // 得到token，用户id
                this.$http.get('/login/cellphone', { params: this.form })
                .then(data => {
                    window.localStorage.setItem('token', data.token)
                    // 得到用户的歌单id
                    this.$http.get(`/user/playlist?uid=${data.account.id}`).then(data => {
                        this.$store.commit('storeSongMenuId', data.playlist[0].id)
                    })
                    this.$message.success('登录成功')
                    this.$store.commit('storeAccountId', data.account.id)
                    window.localStorage.setItem('phone', this.form.phone)
                    window.localStorage.setItem('password', this.form.password)
                    console.log(data.profile.avatarUrl)
                    window.localStorage.setItem('imgUrl', data.profile.avatarUrl)
                    // 子组件向父组件传值，使用emit
                    this.$emit('success', data.profile.avatarUrl, data.profile.nickname, data.account.id)
                }).catch(() => {
                    this.$message.error('密码错误')
                })
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .loginCard
        display flex
        justify-content center
        align-items center
        width 400px
</style>
