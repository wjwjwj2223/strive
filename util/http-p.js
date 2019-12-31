import {config as conf} from '../config.js'

const tips = {
  1: '出现了一个错误',
  1005: 'appkey 无效',
  3000: '期刊不存在'
}

class HTTP {

  request({url,data={},method='GET'}) {
    return new Promise((resolve, reject)=> {
      this._request(url,resolve,reject,data,method)
    })
  }


  _request(url,resolve, reject, data={}, method='GET') {
      wx.request({
        url: conf.api_base_url + url,
        method: method,
        data: data,
        header: {
          "content-type": "application/json",
          "appkey":conf.appKey
        },
        success:(res)=>{
          let code = res.statusCode.toString()
          if (code.startsWith('2')) {
            resolve(res.data)
          } else {
            reject()
            let error_code = res.data.error_code
            this._showError(error_code)
          }
        },
        fail:(err)=>{
          reject()
          this._showError(1)
        }
      })
  }

  _showError(error_code) {
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }

}

export {
  HTTP
}