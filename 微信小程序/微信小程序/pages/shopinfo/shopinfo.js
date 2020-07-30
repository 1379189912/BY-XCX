// pages/shopinfo/shopinfo.js
// var utli=require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopinfo:[],
    title:'',
    show:false,
    token:'',
    addcar:'',
    // 添加数量
    num:0,
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  onChange(event) {
    console.log(event.detail);
  },

// 添加购物车
addCar:function(){
  if(this.data.token===''){
    wx.showToast({
      title: '请先登录！', // 标题
      icon: 'none',  // 图标类型，默认success
      duration: 1500  // 提示窗停留时间，默认1500ms
    })
  }else{
    wx.request({
      url: `http://vebcoder.cn:9527/api/add`,//仅为示例，并非真实的接口地址
      data: {
        token:this.data.token,
        goodId:this.data.shopinfo[0].Id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        // console.log(res.data)
        this.setData({
          addcar:res.data,
          num:this.data.num+1

        }),
        
        
        wx.showToast({
          title: '添加成功！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
      }
    })
  }
},
tanchuang:function(){
  wx.showModal({
    title: '提示',
    content: '请先进行登录',
    success: function (res) {
      if (res.confirm) {//这里是点击了确定以后
        console.log('用户点击确定')
      } else {//这里是点击了取消以后
        
      }
    }
  })
},

// 点击购物车图标跳转到购物车
shopcar:function(){
  wx.showLoading({
    title: '加载中',
  })
  wx.switchTab({
    url: '/pages/shoppcart/shoppcart',
    success(res){
      wx.hideLoading({
        complete: (res) => {},
      })
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: `http://vebcoder.cn:9527/api/detail?goodId=${this.options.shopid}`,//仅为示例，并非真实的接口地址
      data: {
      },
      
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        // console.log(res.data)

        // con sole.log(this);
        
        this.setData({
          shopinfo:res.data,
        }),
        // console.log()


      //   wx.setNavigationBarTitle({
      //     title: this.options.shopid
      // })
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
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      token:wx.getStorageSync('key')
    })
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