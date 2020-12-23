import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playingSong: {
      url: localStorage.getItem('url'),
      img: localStorage.getItem('img'),
      name: localStorage.getItem('name'),
      singer: localStorage.getItem('singer'),
      lyric: localStorage.getItem('lyric'),
      num: localStorage.getItem('num')
    },
    isPlay: false,
    audio: {},
    // 元总播放时长
    stateTotal: 0,
    //  元已经播放的时长
    stateCurrentTime: 0,
    songCheck: true,
    memberSong: false,
    // 当前正在播放的歌曲+1，代表暂停
    active: 0,
    // active: localStorage.getItem('active') + 1,
    // 歌曲来源，比如songTable
    type: localStorage.getItem('type'),
    // 所有歌曲（歌单）
    songs: JSON.parse(localStorage.getItem('songs')),
    // 歌单内数量
    total: localStorage.getItem('total'),
    // 登录用户的Id
    accoutId: localStorage.hasOwnProperty('accountId')? localStorage.getItem('accountId'): '',
    // 登录用户的歌单id
    userSongMenuId: localStorage.hasOwnProperty('userSongMenuId')? localStorage.getItem('userSongMenuId'): ''

  },
  getters: {
    percentage (state) {
      if (state.stateTotal === 0) {
        return 0
      }
      return Math.floor(state.stateCurrentTime / state.stateTotal * 100)
    },
    total (state) {
      const twoDigit = (num) => {
        if (num.toString().length < 2) {
          if (num === 0) {
            return '00'
          }
          return '0' + num
        }
        return num
      }
      const min = twoDigit(Math.floor(state.stateTotal / 60))
      const sec = twoDigit(Math.floor(state.stateTotal % 60))
      return min.concat(' : ').concat(sec)
    },
    currentTime (state) {
      const twoDigit = (num) => {
        if (num.toString().length < 2) {
          if (num === 0) {
            return '00'
          } else {
            return '0' + num
          }
        }
        return num
      }
      const min = twoDigit(Math.floor(state.stateCurrentTime / 60))
      const sec = twoDigit(Math.floor(state.stateCurrentTime % 60))
      return min.concat(' : ').concat(sec)
    }
  },
  mutations: {
    playSongs (state) {
    },
    playMusic (state) {
      if (state.playingSong !== '') {
        state.audio.play()
        state.isPlay = true
      }
    },
    pauseMusic (state) {
      state.audio.pause()
      state.isPlay = false
    },
    isSongCheck (state, value) {
      state.songCheck = value
    },
    isMemberSong (state, value) {
      state.memberSong = value
    },
    // 设置正在播放的歌曲编号
    setActive (state, id) {
      state.active = id
    },
    setType (state, name) {
      state.type = name
    },
    setPlayingSong (state, payload) {
      state.playingSong.url = payload.url
      state.playingSong.img = payload.img
      state.playingSong.name = payload.name
      state.playingSong.singer = payload.singer
      state.playingSong.lyric = payload.lyric
      state.playingSong.num = payload.num
      state.isPlay = true
      localStorage.setItem('url', payload.url)
      localStorage.setItem('img', payload.img)
      localStorage.setItem('name', payload.name)
      localStorage.setItem('singer', payload.singer)
      localStorage.setItem('lyric', payload.lyric)
      localStorage.setItem('num', payload.num)
    },
    setSongs (state, songs) {
      localStorage.setItem('songs', JSON.stringify(songs))
      state.songs = songs
    },
    setTotal (state, num) {
      localStorage.setItem('total', num)
      state.total = num
    },
     // 得到元已经播放的时间
     getCurrentTime (state) {
      state.stateCurrentTime = state.audio.currentTime
    },
    setDuration (state, audio) {
      state.stateTotal = audio.duration
      state.stateCurrentTime = audio.currentTime
      state.audio = audio
    },
    storeSongMenuId (state, value) {
      state.userSongMenuId = value
      window.localStorage.setItem('userSongMenuId', value)
    },
    storeAccountId (state, value) {
      state.accoudId = value
      window.localStorage.setItem('accountId', value)
    }
  },
  actions: {
    play (context, payload) {
      context.commit('isSongCheck', true)
      context.commit('isMemberSong', false)
      // get specific song by index
      console.log(context.state.songs[payload.num])
      const songObject = context.state.songs[payload.num]
      const url1 = `/check/music?id=${songObject.id}`
      const url2 = `/song/url?id=${songObject.id}`
      const url3 = `/lyric?id=${songObject.id}`
      axios.get(url1).then(() => {
        axios.all([axios.get(url2), axios.get(url3)]).then(
          axios.spread((songUrlRes, lyricRes) => {
            if (songUrlRes.data[0].url == null) {
              context.commit('isMemberSong', true)
            } else {
              localStorage.setItem('active', context.state.songs[payload.num].id)
              context.commit('setActive', context.state.songs[payload.num].id)
              context.commit('setType', payload.name)
              if (payload.name === 'songTable') {
                context.commit('setPlayingSong', {
                  url: songUrlRes.data[0].url,
                  img: context.state.songs[payload.num].al.picUrl,
                  name: context.state.songs[payload.num].name,
                  singer: context.state.songs[payload.num].al.name,
                  lyric: lyricRes,
                  num: payload.num
                })
              } else {
                console.log('something else')
              }
            }
          })
        )
      }).catch(() => {
        context.commit('isSongCheck', false)
      })
    }
  },
  modules: {
  }
})
