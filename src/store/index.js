import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前播放音乐的地址，图片，歌曲名，歌手，歌词，在歌单里的位置信息
    playingSong: {
      url: localStorage.getItem('url'),
      img: localStorage.getItem('img'),
      name: localStorage.getItem('name'),
      singer: localStorage.getItem('singer'),
      lyric: localStorage.getItem('lyric'),
      num: localStorage.getItem('num')
    },
     // 音乐是否处于播放状态，决定小图标该显示播放还是暂停
    isPlay: false,
    // 获取的audio dom 元素
    audio: {},
    // 元总播放时长
    stateTotal: 0,
    //  元已经播放的时长
    stateCurrentTime: 0,
    // 音乐是否可用，需要寻查得知
    songCheck: true,
    // 是否是会员歌曲
    memberSong: false,
    // 当前正在播放的歌曲+1，代表暂停
    active: 0,
    // active: localStorage.getItem('active') + 1,
    // 歌曲来源，比如songTable
    type: localStorage.getItem('type'),
    // 所有歌曲（歌单）
    songs: JSON.parse(localStorage.getItem('songs')),
    // 总歌曲数
    total: window.localStorage.getItem('total'),
    // 登录用户的Id，用于添加删除收藏歌曲
    accoutId: localStorage.getItem('accountId') ? localStorage.getItem('accountId') : '',
    // 登录用户的歌单id
    userSongMenuId: localStorage.getItem('userSongMenuId') ? localStorage.getItem('userSongMenuId') : '',
    // songstable还是songs
    tableName: localStorage.getItem('tableName')
  },
  getters: {
    // 播放进度
    percentage (state) {
      if (state.stateTotal === 0) {
        return 0
      }
      return Math.floor(state.stateCurrentTime / state.stateTotal * 100)
    },
    // 播放总时长
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
      return min.concat(':').concat(sec)
    },
    // 已播放的时间
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
      return min.concat(':').concat(sec)
    }
  },
  mutations: {
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
    // 放音乐歌单 musicPlayer
    playSongs (state) {
      if (state.playUrl !== '') {
        console.log(state.active)
        state.audio.play()
        state.isPlay = true
        state.active = state.active - 1
      }
    },
    // 暂停音乐歌单，musicPlayer
    pauseSongs (state) {
      state.isPlay = false
      state.audio.pause()
      console.log(state.active)
      state.active = state.active + 1
    },
     // 上一首播放
    editPreNum (state) {
      if (state.playSong.num === 0) {
        state.playSong.num = state.total - 1
      } else {
        state.playSong.num--
      }
    },
     // 下一首播放
    editNextNum (state) {
      if (state.playingSong.num === state.total - 1) {
        state.playingSong.num = 0
      } else {
        state.playingSong.num++
      }
    },
    isSongCheck (state, value) {
      state.songCheck = value
    },
    isMemberSong (state, value) {
      state.memberSong = value
    },
    // 设置正在播放的歌曲编号
    setActive (state, num) {
      state.active = num
    },
     // 修改活跃主菜单的名称
    editActiveName (state, name) {
      state.activeName = name
    },
    setType (state, name) {
      state.type = name
    },
     // 提交当前播放音乐的地址，图片，歌曲名，歌手，歌词，在歌单里的位置信息并存在storage里面
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
    // 当一首歌播放结束时
    ended (state, num) {
      // 让musicPlayer里面的播放标签变为停止标签
      if (state.playingSong.num === state.total - 1) {
        state.playingSong.num = 0
      } else {
        state.playingSong.num = num + 1
      }
      state.isPlay = false
      state.active = 0
    },
    setSongs (state, songs) {
      localStorage.setItem('songs', JSON.stringify(songs))
      state.songs = songs
    },
    // 设置歌单总数
    setTotal (state, num) {
      localStorage.setItem('total', num)
      state.total = num
    },
     // 得到一个歌单的总的歌曲数并存在session里
     getTotal (state, total) {
      localStorage.setItem('total', total)
      state.total = total
    },
     // 得到元已经播放的时间
    getCurrentTime (state) {
      state.stateCurrentTime = state.audio.currentTime
    },
     // 得到元总时长
    setDuration (state, audio) {
      state.stateTotal = audio.duration
      state.stateCurrentTime = audio.currentTime
      state.audio = audio
    },
     // 修改是哪一种类型的歌曲列表
    editName (state, name) {
      state.tableName = name
    },
    // 存储用户歌单Id
    storeSongMenuId (state, value) {
      state.userSongMenuId = value
      window.localStorage.setItem('userSongMenuId', value)
    },
    // 存储用户Id
    storeAccountId (state, value) {
      state.accoudId = value
      window.localStorage.setItem('accountId', value)
    },
    // 下面这三种还不知道什么意思
    editCheckFalse (state, value) {
      state.checkFalse = value
    },
    editMemberSong (state, value) {
      state.memberSong = value
    },
    addSongs (state, value) {
      localStorage.setItem('total', state.total + 1)
      state.total = state.total + 1
      state.songs.push(value)
      console.log(state.songs)
    }
  },
  actions: {
    play (context, payload) {
      context.commit('isSongCheck', true)
      context.commit('isMemberSong', false)
      // get specific song by index
      console.log(payload.num, context.state.songs[payload.num])
      const songObject = context.state.songs[payload.num]
      // 查看音乐是否可用
      const url1 = `/check/music?id=${songObject.id}`
      const url2 = `/song/url?id=${songObject.id}`
      const url3 = `/lyric?id=${songObject.id}`
      axios.get(url1).then(() => {
        axios.all([axios.get(url2), axios.get(url3)]).then(
          axios.spread((songUrlRes, lyricRes) => {
            if (songUrlRes.data[0].url == null) {
              // 歌是会员歌曲
              context.commit('isMemberSong', true)
            } else {
              localStorage.setItem('active', context.state.songs[payload.num].id)
              context.commit('setActive', context.state.songs[payload.num].id)
              context.commit('setType', payload.name)
              console.log('ready To Set tableName--->')
              localStorage.setItem('tableName', payload.name)
              this.state.tableName = payload.name
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
                console.log('something else', payload.name)
              }
            }
          })
        )
      }).catch(() => {
        // 音乐不可用
        console.log('这首歌目前无法播放')
        context.commit('isSongCheck', false)
      })
    }
  },
  modules: {
  }
})
