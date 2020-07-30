//app.js
App({
//   car: {
//     num:''
//   },

// carinfo:function(data){
//   wx.request({
//     url: `http://vebcoder.cn:9527/api/shoplist`,//仅为示例，并非真实的接口地址
//     data: {
//       token:data
//     },
//     header: {
//       'content-type': 'application/json' // 默认值
//     },
//     success: (res)=> {
//       console.log(res.data)
//       this.setData({
//         num:res.data
//       }),
//       // console.log(this.data.addcar)
//       wx.hideLoading({
//         complete: (res) => {},
//       })
//     }
//   })
// },


  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close();
        });
        break;
    }
  },
  globalData: {
    userInfo: null
  }
})