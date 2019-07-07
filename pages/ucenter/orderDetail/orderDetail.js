var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    orderId: 0,
    orderInfo: {},
    // orderGoods: [],
    handleOption: ''
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.getOrderDetail();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    this.setData({
      orderId: options.orderId,
      'handleOption': options.handleOption
    });
    
    this.getOrderDetail();
    wx.showShareMenu({
      withShareTicket: true,
      success: function(res){
        //分享成功
        console.log('shareMenu share success');
        console.log('分享');
        console.log(res);
      },
      fail: function(res){
        //分享失败
        console.log(res);
      }
    })
  },
  getOrderDetail() {
    let that = this;
    util.request(api.OrderDetail, {openId: wx.getStorageSync('openid'),
      orderId: that.data.orderId
    }).then(function (res) {
      if (res.code === 200) {
        console.log(res.data);
        that.setData({
          orderInfo: res.data,
          // orderGoods: res.data.orderGoods,
          // handleOption: res.data.handleOption,
        });
        
        //that.payTimer();
      }
    });
  },
  payTimer() {
    let that = this;
    let orderInfo = that.data.orderInfo;

    setInterval(() => {
      console.log(orderInfo);
      orderInfo.add_time -= 1;
      that.setData({
        orderInfo: orderInfo,
      });
    }, 1000);
  },
  cancelOrder: function(){
    console.log('dddd');
    let that = this;
    util.request(api.OrderCancel,{orderId: that.data.orderId})
    .then(function(res){
      if(res.errno === 0){
        console.log(res);
        wx.redirectTo({
          url: '/pages/ucenter/order/order'
        });
        
      }

    })
  
  }
  ,
  payOrder() {
    let that = this;
    /*util.request(api.PayPrepayId, {
      orderId: that.data.orderId || 15
    }).then(function (res) {
      if (res.errno === 0) {
        const payParam = res.data;
        wx.requestPayment({
          'timeStamp': payParam.timeStamp,
          'nonceStr': payParam.nonceStr,
          'package': payParam.package,
          'signType': payParam.signType,
          'paySign': payParam.paySign,
          'success': function (res) {
            console.log(res)
          },
          'fail': function (res) {
            console.log(res)
          }
        });
        //付款成功增加积分
        util.request(api.AddDeduction, { orderId: that.data.orderId }).then(function (res) {
          if (res.errno === 0) {
            console.log(res.data);
          }
        })

        wx.redirectTo({
          url: '/pages/payResult/payResult?status=true',
        })
      }
    });*/
    

    

    let Url = '/pages/pay/pay?orderId=' + that.data.orderId + '&actualPrice=' + that.data.orderInfo.actual_price;

    wx.redirectTo({
      url: Url,
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        //分享成功
        console.log(res);
      },
      fail: function (res) {
        //分享失败
        console.log(res);
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //分享功能
  onShareAppMessage: function () {
    const that = this;
    return {
      title: 'NideShop',
      desc: that.data.orderGoods[0].goods_name,
      path: '/pages/ucenter/orderDetail/orderDetail?orderId=' + that.data.orderId,
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function(res){
  
            console.log(res.encryptedData);  /*解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID；
            解密后 data: {
              openGId: 'tGcRou5TMZ9yzUWM2BxRd8-fgrSIc',
                watermark: { timestamp: 1519648201, appid: ' }
            }）*/
            console.log(res.errMsg);//错误信息
            console.log(res.iv);//加密算法的初始向量
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    }
  }
  
})