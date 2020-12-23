import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 完整的引入element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'
import './axios/axios'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
