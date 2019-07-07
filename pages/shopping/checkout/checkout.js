var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const pay = require('../../../services/pay.js');

var app = getApp();

Page({
  data: {
    openId: '',
    checkedGoodsList: [],
    checkedAddress: {},
    checkedCoupon: [],
    couponList: [],
    goodsTotalPrice: 0.00, //商品总价
    freightPrice: 0.00,    //快递费
    couponPrice: 0.00,     //优惠券的价格
    deductionPrice: 0.00,   //积分数量
    orderTotalPrice: 0.00,  //订单总价
    actualPrice: 0.00,     //实际需要支付的总价
    addressId: 0,
    couponId: 0,
    checked: false
  },
  onLoad: function (options) {

    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    this.data.checkedGoodsList = JSON.parse(options.checkedGoods);    
    this.data.checkedGoodsList.forEach((v) => {
      this.data.goodsTotalPrice += v.productInfo.productPrice * v.productQuantity;
    })
    try {
      var addressId = wx.getStorageSync('addressId');
      console.log('addressid:');
      console.log(addressId);
      if (addressId) {
        this.setData({
          'addressId': addressId,
          'openId': wx.getStorageSync('openid'),
          checkedGoodsList: that.data.checkedGoodsList,
          goodsTotalPrice: that.data.goodsTotalPrice
        });
      }

      var couponId = wx.getStorageSync('couponId');
      if (couponId) {
        this.setData({
          'couponId': couponId
        });
      }
    } catch (e) {
      // Do something when catch error
    }


  },
  getCheckoutInfo: function () {
    let that = this;
    console.log(that.data.addressId);
    util.request(api.CartCheckout, { addressId: that.data.addressId, couponId: that.data.couponId, checked: that.data.checked }).then(function (res) {
      if (res.errno === 0) {
        
        that.setData({
          checkedGoodsList: res.data.checkedGoodsList,
          checkedAddress: res.data.checkedAddress,
          actualPrice: res.data.actualPrice,
          checkedCoupon: res.data.checkedCoupon,
          // couponList: res.data.couponList,
          // couponPrice: res.data.couponPrice,
          deductionPrice: res.data.deductionPrice,
          // freightPrice: res.data.freightPrice,
          goodsTotalPrice: res.data.goodsTotalPrice,
          orderTotalPrice: res.data.orderTotalPrice
        });
        
        console.log(that.data);
      }
      wx.hideLoading();
    });
  },
  selectAddress() {
    wx.navigateTo({
      url: '/pages/shopping/address/address',
    })
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/shopping/addressAdd/addressAdd',
    })
  },
  checkedItem: function(event){
    const that = this;
    let itemIndex = event.target.dataset.itemIndex;
    console.log(itemIndex);
    if(itemIndex == '0'){
      if (that.data.checked == false) {
        console.log(that.data.checked);
        that.data.checked = true;
        that.setData({
          checked: true
        })
        that.getCheckoutInfo();
        
      } else {
        console.log(that.data.checked);
        that.data.checked = false;
        that.setData({
          checked: false
        })
      
        that.getCheckoutInfo();
        
      }
    }
    
  },
  onReady: function () {
    // 页面渲染完成

  },

  onShow: function () {
    // 页面显示
    // wx.showLoading({
    //   title: '加载中...',
    // })
    this.getCheckoutInfo();

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  submitOrder: function () {
    let that = this;
    if (this.data.addressId <= 0) {
      util.showErrorToast('请选择收货地址');
      return false;
    }
    let items = []
    this.data.checkedGoodsList.forEach((v) => {
      let item = {};
      item.productId = v.productInfo.productId;
      item.productQuantity = v.productQuantity;
      items.push(item);
    })

    util.request(api.OrderSubmit, { openId: this.data.openId, addressId: this.data.addressId, items:  JSON.stringify(items)}, 'POST').then(res => {
      /*if (res.errno === 0) {
        const orderId = res.data.orderInfo.id;
        pay.payOrder(parseInt(orderId)).then(res => {
          wx.redirectTo({
            url: '/pages/payResult/payResult?status=1&orderId=' + orderId
          });
        }).catch(res => {
          wx.redirectTo({
            url: '/pages/payResult/payResult?status=0&orderId=' + orderId
          });
        });
      } else {
        util.showErrorToast('下单失败');
      }*/
      //积分扣除
      console.log(res);
      if(res.code === 200){
        wx.redirectTo({
          url: '/pages/ucenter/order/order',
        })
      }
      // if(res.errno === 0){
      //   util.request(api.moveDeduction, { orderId: res.data.orderInfo.id }).then(function (res) {
      //     if (res.errno === 0) {
      //       console.log(res.data);
      //     }
          
      //   })

      //   wx.redirectTo({
      //     url: '/pages/ucenter/order/order'
      //   })
      // }
      
    });
  }
})