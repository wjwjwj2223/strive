import {config as conf} from '../config.js'

const tips = {
  1: '出现了一个错误',
  1005: 'appkey 无效',
  3000: '期刊不存在'
}

class HTTP {

  request(params) {
    
  }

  request(params) {
      wx.request({
        url: conf.api_base_url + params.url,
        method: params.method,
        data: params.data,
        header: {
          "content-type": "application/json",
          "appkey":conf.appKey
        },
        success:(res)=>{
          let code = res.statusCode.toString()
          if (code.startsWith('2')) {
            params.success && params.success(res.data)
          } else {
            let error_code = res.data.error_code
            this._showError(error_code)
          }
        },
        fail:(err)=>{
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