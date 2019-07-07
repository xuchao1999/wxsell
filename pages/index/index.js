const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    list: []
  },
  onPullDownRefresh: function(){
    wx.showNavigationBarLoading();
    this.getIndexData();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onShareAppMessage: function () {
    return {
      title: 'NideShop',
      desc: '对酒当歌',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      console.log(res);
      if (res.code == 200) {
        that.setData({
          list: res.data
        });
      }
    });
  },
  onLoad: function (options) {
    this.getIndexData();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})
