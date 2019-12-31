import {classicBeh} from "../classic-beh.js"

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  detached: function() {
    // mMgr.pause()
  },

  attached: function() {
    this._recoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      if (!this.data.playing) {
        this._setPlay(true)
        mMgr.title = this.properties.title
        mMgr.src = this.properties.src
      } else {
        this._setPlay(false)
        mMgr.pause()
      }
    },

    _recoverStatus:function() {
      if (mMgr.paused) {
        this._setPlay(false)
        return
      }
      if (mMgr.src == this.properties.src) {
        this._setPlay(true)
        return
      }
      this._setPlay(false)
    },

    _setPlay:function(status) {
      this.setData({
        playing:status
      })
    },

    _monitorSwitch:function() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }

  }



})
