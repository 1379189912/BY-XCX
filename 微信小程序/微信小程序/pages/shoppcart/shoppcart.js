// pages/shoppcart/shoppcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 令牌
      token:'',
      // 请求到的信息
      addcar:'',
      b:"false",
      // 总价
      total:0,
      // 商品id
      shopid:'',
      // 提交栏显示
      submit:true,
      card:true,
      a:[],
      // 复选框选中状态
      checked:false,
      // 跟换编辑和删除按钮
      checkedId:true,
  },

// 复选框
checkboxChange: function (e) {
  console.log(this.data.a)
  // 判断点击后的值
  if(e.detail.value.length===0){
   
    // 循环判断数组中是否有值，有的话删除
    for(var a=0;a<this.data.a.length;a++){
      if(this.data.a[a]===e.target.dataset.a){
        this.data.a.splice(a,1)
        break;
      }else{
        continue;
      }
    }
    console.log(this.data.a)
  }else{
    // 向数组中添加点击的值
    // includes 判断数组中是否有这个值
    if(this.data.a.includes(e.target.dataset.a)){

    }else{
      this.data.a.push(e.target.dataset.a)
    }
  }
},
// 全选
selectall:function(e){
  
  if(e.currentTarget.dataset.so===false){
    this.setData({
      checked:true,
      
    })
  }
  console.log(this.data.checked);
  
  if(this.data.checked===false){
    this.setData({
      checked:true,
      checkedId:false
    })
  }
  else{
    this.setData({
      checked:false
    })
  }
},


// 编辑
bianJi:function(){
  this.setData({
    checkedId:false,
    checked:true
  })
},
// 取消
canCel:function(){
  this.setData({
    checkedId:true,
    checked:false
  })
},
// 删除全部
delAll:function(){
  let $this=this
wx.showModal({
    title: '全部删除',
    content: '您确定要全部删除吗？',
    showCancel: true, //是否显示取消按钮-----》false去掉取消按钮
    cancelText: "否", //默认是“取消”
    cancelColor: 'red', //取消文字的颜色
    confirmText: "是", //默认是“确定”
    confirmColor: 'skyblue', //确定文字的颜色
     success: function(res) {
        var numList=$this.data.a
        if (res.cancel) {          
        } else if(res.confirm){
            if($this.data.checked===true){
              for(var b =0;b<numList.length;b++){
                wx.request({
                  url: `http://vebcoder.cn:9527/api/del`,//仅为示例，并非真实的接口地址
                  data: {
                    token:$this.data.token,
                    goodId:numList[b]
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: (res)=> {
                    $this.setData({
                      a:[],
                      checkedId:true,
                      checked:false
                    })
                    if(res.data.code===1){
                      wx.showToast({
                        title: '删除成功！', // 标题
                        icon: 'success',  // 图标类型，默认success
                        duration: 1500  // 提示窗停留时间，默认1500ms
                      })
                      $this.shopcar()
                    }else{
                      wx.showToast({
                        title: '删除失败！', // 标题
                        icon: 'success',  // 图标类型，默认success
                        duration: 1500  // 提示窗停留时间，默认1500ms
                      })
                    }
                  }
                })
              }
          }      
        }
     }
})
  
},
// 请求购物车
shopcar:function(){
  wx.request({
    url: `http://vebcoder.cn:9527/api/shoplist`,//仅为示例，并非真实的接口地址
    data: {
      token:this.data.token,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res)=> {
      // 循环请求到的数据
      for(var a=0;a<res.data.length;a++){
          // 判断并存储商品Id
          if(this.data.a.includes(res.data[a].Id)){
            
          }else{
            this.data.a.push(res.data[a].Id)
            
          }  
      }
      // console.log(res.data)
      this.setData({
        addcar:res.data,
      })
      var num=0
      for(var a=0;a<this.data.addcar.length;a++){
        // console.log(this.data.addcar[a].count*this.data.addcar[a].price)
          num+=this.data.addcar[a].count*this.data.addcar[a].price
      }
      this.setData({
        total:num
      })
    }
  })
},
// 删除商品信息
delShopinfo:function(e){
  wx.request({
    url: `http://vebcoder.cn:9527/api/del`,//仅为示例，并非真实的接口地址
    data: {
      token:this.data.token,
      goodId:e.currentTarget.dataset.shopid
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res)=> {
      this.setData({
        a:[]
      })
      if(res.data.code===1){
        wx.showToast({
          title: '删除成功！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
        this.shopcar()
      }else{
        wx.showToast({
          title: '删除失败！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
      }
    }
  })
},
// 判断是否登录和显示提交按钮
submit:function(){
  if(this.data.token===''){
    this.setData({
      submit:false,
      card:false
    })
  }else{
    this.setData({
      submit:true,
      card:true
    })
  }
},
// 数量加减
// 增加数量
addNum:function(e){
  wx.request({
    url: `http://vebcoder.cn:9527/api/add`,//仅为示例，并非真实的接口地址
    data: {
      token:this.data.token,
      goodId:e.currentTarget.dataset.shoopid
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res)=> {
      this.shopcar()
    }
  })
},
// 减少数量
remNum:function(e){
  wx.request({
    url: `http://vebcoder.cn:9527/api/remove`,//仅为示例，并非真实的接口地址
    data: {
      token:this.data.token,
      goodId:e.currentTarget.dataset.shoopid
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res)=> {
      this.shopcar()
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.submit()
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
      token: wx.getStorageSync('key'),
  })
    this.shopcar()
    this.submit()
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