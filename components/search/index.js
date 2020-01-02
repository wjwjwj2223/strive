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
    hotWords:[]
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
    },
    onConfirm(event) {
      const word = event.detail.value
      keywordModel.addToHistory(word)

      const q = event.detail.value
      bookModel.search(0,q).then((res)=>{

      })
    }
  }
})
