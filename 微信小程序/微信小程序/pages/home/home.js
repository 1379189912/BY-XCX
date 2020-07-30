// pages/home/home.js
var time=require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      year:'',
      day:'',
      pages:0,
      homeShoplist:[],
      // 搜索框数据
      talks:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
// 请求商品列表
getShopList:function(){
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: 'http://vebcoder.cn:9527/api/goodList', //仅为示例，并非真实的接口地址
    data: {
      page:this.data.pages +=1
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res)=> {
      // console.log(this.data.pages)
      this.setData({
        homeShoplist:this.data.homeShoplist.concat(res.data)
      })
      // console.log(this.data.homeShoplist.concat(res.data));getShopInfo
      
      wx.hideLoading({
        complete: (res) => {},
      })
    }
  })
},
// 请求商品详情
getShopInfo:function(e){
  console.log(e);
  
  // 获取点击元素的id
  wx.navigateTo({
    url: `../shopinfo/shopinfo?shopid=${e.currentTarget.dataset.shopid}`,
  })
},
  onLoad: function (options) {
    // console.log(wx.getStorageSync('key'))

    var date =time.formatDate(new Date());
    var year= date.substring(0,2)
    var day = date.substring(2,6)
    this.setData({
      year:year,
      day:day,
      // shopList:'',
    })

    // 请求首页商品列表
    this.getShopList();
  },

// 搜索
talk:function(e){
  // console.log(e)
  this.setData({
    talks:e.detail.value
   
   
 }) 
//  console.log(e.detail.value);
},
//  搜索按钮
seek:function(){
  wx.navigateTo({
    url: `../seek/seek?shopname=${this.data.talks}`,
  })
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    this.getShopList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})