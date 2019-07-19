var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../services/user.js');
var app = getApp();

Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('加载！！')
    console.log(app.globalData)
  },
  onReady: function () {

  },
  onShow: function () {

    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');

    // 页面显示
    /* if (userInfo && token) {
      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
    }

    this.setData({
      userInfo: app.globalData.userInfo,
    }); */
    
    // 页面显示、
    if(userInfo && token){
      this.setData({
        userInfo: userInfo
      })
    }else{
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
  goLogin:function(){
    user.loginByWeixin().then(res => {
      console.log(res.data.userInfo);
      this.setData({
        userInfo: res.data.userInfo
      });
    }).catch((err) => {
      console.log(err)
    });
  },
  exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.AuthLogoutByWeixin, {}, 'POST').then(res => {
            if (res.code == 200) {
              wx.removeStorageSync('token');
              wx.removeStorageSync('userInfo');
              wx.switchTab({
                url: '/pages/index/index'
              });
            }else{
              console.log('登出失败');
            }
          })
        }
      }
    })
  }
})