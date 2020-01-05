// components/search/index.js
import {
  KeywordModel
} from "../../models/keyword.js"

import { 
  BookModel 
} from "../../models/book.js"

import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  behaviors:[paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
      // true, true, true,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords:[],
    searching: false,
    q: '',
    loadingCenter: false
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
      this.initialize()
      this.triggerEvent('cancel', {}, {})
      this.setData({
        searching: false
      })
    },
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      const q = event.detail.value || event.detail.text
      this.setData({
        q: q
      })
      bookModel.search(0,q).then((res)=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    onDelete(event) {
      this.initialize()
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
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (!this.hasMore()) {
        return
      }
      this.locked()
      bookModel.search(this.getCurrentStart(),this.data.q).then(res=>{
        this.setMoreData(res.books)
        this.unLocked()
      },() => {
        this.unLocked()
      })
    },
  }
})
