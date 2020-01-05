const paginationBev = Behavior({

  data: {
    dataArray:[],
    total: 0,
    loading: false,
    noneResult: false,
  },

  methods: {

    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    getCurrentStart(){
      return this.data.dataArray.length
    },

    hasMore() {
      const has = this.data.dataArray.length <= this.data.total
      return has
    },

    setTotal(total) {
      this.data.total = total
      if (total == 0) {
        this.setData({
            noneResult: true
        })
      }
    },

    initialize() {
      this.setData({
        dataArray:[],
        noneResult: false,
        loading:false,
      })
      this.data.total = null
    },

    locked() {
      this.setData({
          loading: true
      })
    },

    unLocked() {
      this.setData({
          loading: false
      })
    },

    isLocked() {
      return this.data.loading ? true : false
    },
    

  }

})

export {
  paginationBev
}