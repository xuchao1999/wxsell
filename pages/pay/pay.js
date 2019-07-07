var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var pay = require('../../services/pay');

Page({
  data: {
    orderId: 0,
    actualPrice: 0.00
  },
  onPullDownRefresh: function () {
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.orderId,
      actualPrice: options.actualPrice
    })
  },
  onReady: function() {

  },
  onShow: function() {
    // 页面显示

  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  //向服务请求支付参数
  requestPayParam() {
    let that = this;
    console.log('111111111111111111111111');
    pay.payOrder(that.data.orderId).then(function(res) {
      //增加积分和修改订单状态
      util.request(api.AddDeduction, {
        orderId: that.data.orderId
      }).then(function(res) {
        if (res.errno === 0) {
          console.log(res.data);
        }
      })
      wx.redirectTo({
        url: '/pages/payResult/payResult?status=true&&orderId=' + that.data.orderId
      })
    }).catch(function(res) {
      wx.redirectTo({
        url: '/pages/payResult/payResult?status=false&&orderId=' + that.data.orderId
      })
    })
    //  util.request(api.PayPrepayId, { orderId: that.data.orderId, payType: 1 }).then(function (res) {
    //    console.log('api.PayPrepayId')
    //     console.log(res);
    //     if (res.errno === 0) {
    //       let payParam = res.data;
    //       console.log(payParam);
    //       wx.requestPayment({
    //         'timeStamp': payParam.timeStamp,
    //         'nonceStr': payParam.nonceStr,
    //         'package': payParam.package,
    //         'signType': payParam.signType,
    //         'paySign': payParam.paySign,
    //         'success': function (res) {
    //           console.log('33333333');
    //           //增加积分和修改订单状态
    //           util.request(api.AddDeduction, { orderId: that.data.orderId }).then(function (res) {
    //             if (res.errno === 0) {
    //               console.log(res.data);
    //             }
    //           })

    //           wx.redirectTo({
    //             url: '/pages/payResult/payResult?status=true&&orderId=' + that.data.orderId + '&&actualPrice=' + that.data.actualPrice
    //           })
    //         },
    //         'fail': function (res) {
    //           console.log(res);
    //           wx.redirectTo({
    //             url: '/pages/payResult/payResult?status=false&&orderId' + that.data.orderId + '&&actualPrice=' + that.data.actualPrice
    //           }) 
    //         }
    //       })

    //       // util.request(api.AddDeduction, { orderId: that.data.orderId }).then(function (res) {
    //       //   if (res.errno === 0) {
    //       //     console.log(res.data);
    //       //   }
    //       // })

    //       // wx.redirectTo({
    //       //   url: '/pages/payResult/payResult?status=true',
    //       // })


    //     }
    //   })

  },
  startPay() {
    this.requestPayParam();
  }
});