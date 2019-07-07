var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const pay = require('../../services/pay.js');

var app = getApp();
Page({
  data: {
    status: '',
    orderId: 0,
    actualPrice: 0.00
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh({

    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    this.setData({
      orderId: options.orderId,
      status: options.status,
      actualPrice: options.actualPrice
    })
  },
  onReady: function () {

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
  payOrder() {
    pay.payOrder(this.data.orderId).then(res => {
      this.setData({
        status: true
      });
    }).catch(res => {
      util.showErrorToast('支付失败');
    });
  }
})