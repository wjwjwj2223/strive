import {HTTP} from '../util/http.js'

class LikeModel extends HTTP {

  like(behavior, artID, category) {
    let path = behavior == 'like' ? 'like' : 'like/cancel'
    this.request({
      url: path,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  getClassicLikeStatus(artID,category,sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }

}

export {LikeModel}