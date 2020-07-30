// pages/mine/mine.js
// import Toast from '../../miniprogram_npm/index/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:'',
      password:'',
      // 错误信息
      massage:'',
      // 是否勾选注册
      checked: false,
      // 令牌
      token:'',
      // 页面是否显示
      q:true,
      // 判断显示登陆还是注册按钮
      login:true
      
 
  },
// 正则条件匹配
  // var name=new RegExp(/^[\w\u4e00-\u9fa5]{6,12}$/)
  // var pass= new RegExp(/^[\w]{6,12}$/)
  // var userName=name.test(this.data.name)
  // var passWord=pass.exec(this.data.password)

// 监听用户名
bindinputWeight:function(e){
  this.setData({
      name:e.detail
  })
},
// 监听密码框
bindpassword:function(e){
  this.setData({
    password:e.detail
  })
},
// 退出登录
taa:function(){
  this.setData({
    token:wx.removeStorageSync('key'),
    name:wx.removeStorageSync('name'),
    q:true
  })
},
// 登录注册请求接口
Login:function(logindata){
  wx.request({
    // url: `http://vebcoder.cn:9527/api/${logindata}`, //仅为示例，并非真实的接口地址
    url: "http://vebcoder.cn:9527/api/"+logindata,
    data: {
      userName:this.data.name,
      password:this.data.password
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res)=> {
      console.log(logindata)
      // 判断传入的参数
      if(logindata==="login"){
        // 判断返回的值
        if(res.data.token===null){
          wx.showToast({
            title: `用户名或密码错误!`, // 标题
            icon: 'none',  // 图标类型，默认success
            duration: 1500  // 提示窗停留时间，默认1500ms
          })
        } else{
          this.setData({
            token:res.data.token,
            q:false
          })   
            wx.setStorageSync('key', this.data.token)
            wx.setStorageSync('name', this.data.name)
        }
      }else{
        if(res.data.code===0){
          wx.showToast({
            title: `用户名被占用!`, // 标题
            icon: 'none',  // 图标类型，默认success
            duration: 1500  // 提示窗停留时间，默认1500ms
          })
        } else{
          // 注册成功调用登录接口（注册及登录）
          this.Login("login")
          console.log(res.data)
        }
        // console.log(this.data.a)
      }
      
    }
  })
},
// 点击登录
userName:function(){
  if(this.data.name==='' && this.data.password===''){
    wx.showToast({
      title: `用户名或密码不能为空!`, // 标题
      icon: 'none',  // 图标类型，默认success
      duration: 1500  // 提示窗停留时间，默认1500ms
    })
  }else{
    if(this.data.checked!=true){
      this.Login("login")
  }else{
    this.Login("register")
  }
  
  }
  },
// 协议选择(单选框)
onChange:function(event) {
  this.setData({
    checked: event.detail,
    massage:'',
    login:!event.detail
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.name)
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
    // 判断是否为登录状态
    this.setData({
      token:wx.getStorageSync('key'),
      name:wx.getStorageSync('name')
    })
    if(this.data.token!=''){
      this.setData({
        q:false
      })
    }
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