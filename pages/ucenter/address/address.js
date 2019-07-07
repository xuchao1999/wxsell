var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    addressList: [],
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.getAddressList();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getAddressList();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示

  },
  getAddressList: function(){
    let that = this;
    util.request(api.AddressList, {openId: wx.getStorageSync('openid')}).then(function (res) {
      if (res.code === 200) {
        that.setData({
          addressList: res.data
        });
      }
    });
  },
  addressAddOrUpdate: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/ucenter/addressAdd/addressAdd?id=' + event.currentTarget.dataset.addressId
    })
  },
  deleteAddress: function(event){
    console.log(event.target)
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function (res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId;
          util.request(api.AddressDelete, { id: addressId }, 'POST').then(function (res) {
            if (res.errno === 0) {
              if(res.data){
                wx.setStorageSync('addressId', res.data);
              }else{
                wx.setStorageSync('addressId', 0);
              } 
              that.getAddressList();
            }
          });
          console.log('用户点击确定')
        }
      }
    })
    return false;
    
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})