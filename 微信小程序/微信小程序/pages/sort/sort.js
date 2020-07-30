// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopList:[],
      shopinfoList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
    // 分类列表
  shopInfoList:function(e){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://vebcoder.cn:9527/api/search', //仅为示例，并非真实的接口地址
      data: {
        word:e.currentTarget.dataset.shopinfo
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        this.setData({
          shopinfoList:res.data,
        })
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },

  // 跳转详情页面
  getToshopInfo:function(e){
    wx.showLoading({
      title: '加载中...',
    })
    wx.navigateTo({
      url: `../shopinfo/shopinfo?shopid=${e.currentTarget.dataset.shopid}`,
    })
  },

  onLoad: function (options) {
// 请求菜单
wx.showLoading({
  title: '加载中...',
})
wx.request({
  url: 'http://vebcoder.cn:9527/api/getTypeone', //仅为示例，并非真实的接口地址
  data: {
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success: (res)=> {
    // console.log(res.data[0])
    this.setData({
      shopList:res.data,
    })
    wx.hideLoading({
      complete: (res) => {},
    })
  }
})
// 分类开始展示
wx.showLoading({
  title: '加载中...',
})
wx.request({
  url: 'http://vebcoder.cn:9527/api/search', //仅为示例，并非真实的接口地址
  data: {
    word:"咖啡"
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success: (res)=> {
    // console.log(res.data)
    this.setData({
      shopinfoList:res.data,
    })
    wx.hideLoading({
      complete: (res) => {},
    })
  }
})
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.request({
    //   url: 'http://vebcoder.cn:9527/api/search', //仅为示例，并非真实的接口地址
    //   data: {
    //     word:e.currentTarget.dataset.shopinfo
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: (res)=> {
    //     this.setData({
    //       shopinfoList:res.data,
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})