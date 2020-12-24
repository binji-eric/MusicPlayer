import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/recommend',
    children: [
      {
        path: '/recommend',
        name: 'Recommend',
        component: () => import(/* webpackChunkName: "about" */ '../views/recommend.vue')
      },
      {
        path: '/ranking',
        name: 'Ranking',
        component: () => import(/* webpackChunkName: "about" */ '../views/ranking.vue')
      },
      {
        path: '/songList',
        name: 'SongList',
        component: () => import(/* webpackChunkName: "about" */ '../views/songList/songList.vue')
      },
      {
        path: '/songListDetail',
        name: 'SongListDetail',
        component: () => import(/* webpackChunkName: "about" */ '../views/songList/songListDetail.vue')
      },
      {
        path: '/singer',
        name: 'Singer',
        component: () => import(/* webpackChunkName: "about" */ '../views/singer/singer.vue')
      },
      {
        path: '/singerDetail',
        name: 'SingerDetail',
        component: () => import(/* webpackChunkName: "about" */ '../views/singer/singerDetail.vue')
      },
      {
        path: '/singerAlbumDetail',
        name: 'SingerAlbumDetail',
        component: () => import(/* webpackChunkName: "about" */ '../views/singer/singerAlbumDetail.vue')
      }
    ]
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import(/* webpackChunkName: "about" */ '../components/playMv/playMv.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
