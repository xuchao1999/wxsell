var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data:{
    orderList: [],
    orderStatusList: ['待付款', '待发货', '待收货', '已收货'],
    currentStatus: '待付款',
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.getOrderList();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    this.getOrderList();
  },

  switchCate: function (event) {
    // console.log(event);
    if (this.data.currentStatus == event.currentTarget.dataset.id) {
      return false;
    }
    var that = this;
    var clientX = event.detail.x;
    var currentTarget = event.currentTarget;
    if (clientX < 60) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      });
    } else if (clientX > 330) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft
      });
    }
    this.setData({
      currentStatus: event.currentTarget.dataset.id
    });

    this.getOrderList();
  },


  getOrderList(){
    let that = this;
    util.request(api.OrderList, {openId: wx.getStorageSync('openid')}).then(function (res) {
      console.log(res);
      if (res.code === 200) {
        that.setData({
          orderList: res.data
        });
      }
    });
  },
  payOrder: function(event){
    const that = this;
    const orderIndex = event.target.dataset.orderIndex;
  
    let Url = '/pages/pay/pay?orderId=' + that.data.orderList[orderIndex].id + '&actualPrice=' + that.data.orderList[orderIndex].order_price;

    /* wx.redirectTo({
      url: Url,
    }) */
    wx.navigateTo({
      url: Url,
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})