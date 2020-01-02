// components/search/index.js
import {
  KeywordModel
} from "../../models/keyword.js"
import { BookModel } from "../../models/book.js"

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords:[],
    searching: false,
    dataArray:[],
    q: '',
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then((res)=>{
      this.setData({
        hotWords: res.hot         
      })
    })
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
      this.setData({
        searching: false
      })
    },
    onConfirm(event) {
      this._showResult()
      const q = event.detail.value || event.detail.text
      this.setData({
        q: q
      })
      bookModel.search(0,q).then((res)=>{
        this.setData({
          dataArray: res.books,
        })
        keywordModel.addToHistory(q)
      })
    },

    onDelete(event) {
      this._closeResult()
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
