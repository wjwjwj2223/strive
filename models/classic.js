
import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP {

  getLatest(sCallback) {
    this.request({
      url: "classic/latest",
      success:(res)=>{
        sCallback(res)
        this._setLatestIndex(res.index)
        wx.setStorageSync(this._getKey(res.index), res)
      }
    })
 
  }

  getClassic(index,nextOrPrevious,sCallback) {
    //先从缓存查找
    let ind = nextOrPrevious == 'next' ? index+1 : index-1;
    let classic = wx.getStorageSync(this._getKey(ind))
    if (classic && classic != "") {
      sCallback(classic)
      return
    }
    let path = 'classic/${index}/${nextOrPrevious}'
    this.request({
      url: path,
      success: (res)=> {
        sCallback(res)
        wx.setStorageSync(this._getKey(ind), res)
      }
    })
  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index == latestIndex
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }

}

export {
  ClassicModel
}