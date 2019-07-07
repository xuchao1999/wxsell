var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
  data: {
    openId: '',
    cartGoods: [],
    selectItems: [],
    isEditCart: false,
    checkedAllStatus: true,
    editCartList: [],
    cartTotal: {
      checkedGoodsCount: 0,
      checkedGoodsAmount: 0
    }
    
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.getCartList();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onLoad: function (options) {
    this.setData({
      openId: wx.getStorageSync('openid')
    })
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
    this.getCartList();
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  getCartList: function () {
    let that = this;
    util.request(api.CartList, {openId : wx.getStorageSync('openid')}).then(function (res) {
      console.log(res);
      if (res.code === 200) {
        console.log(res.data);
        that.setData({
          cartGoods: res.data,
        });
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });
  },
  isCheckedAll: function () {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  checkedItem: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let that = this;   
  
    let tmpCartData = this.data.cartGoods.map(function (element, index, array) {
      console.log('element:', element);
      console.log('index:', index);
      console.log('array:', array);
      if (index == itemIndex) {
        element.checked = !element.checked;
        if(element.checked == true){
          that.data.cartTotal.checkedGoodsAmount += element.productInfo.productPrice * element.productQuantity;
        }else{
          that.data.cartTotal.checkedGoodsAmount -= element.productInfo.productPrice * element.productQuantity;
        }
      }
      return element;
    });
    that.setData({
      cartGoods: tmpCartData,
      checkedAllStatus: that.isCheckedAll(),
      'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount(),
      'cartTotal.checkedGoodsAmount':   that.data.cartTotal.checkedGoodsAmount

    });
    
    

    // if (!that.data.isEditCart) {

    //   if (selectItems.indexOf(itemIndex) == -1) {
    //     that.data.selectItems.push(itemIndex);
    //   }else{
    //     that.selectItems.pop(selectItems.indexOf(itemIndex))
    //   }
    //   that.setData({
    //     selectItems: that.selectItems
    //   })
    //   // util.request(api.CartChecked, { productIds: that.data.cartGoods[itemIndex].product_id, isChecked: that.data.cartGoods[itemIndex].checked ? 0 : 1 }, 'POST').then(function (res) {
    //   //   if (res.errno === 0) {
    //   //     console.log(res.data);
    //   //     that.setData({
    //   //       cartGoods: res.data.cartList,
    //   //       cartTotal: res.data.cartTotal
    //   //     });
    //   //   }

    //   //   that.setData({
    //   //     checkedAllStatus: that.isCheckedAll()
    //   //   });
    //   // });
    // } else {
    //   //编辑状态
    //   let tmpCartData = this.data.cartGoods.map(function (element, index, array) {
    //     console.log('element:', element);
    //     console.log('index:', index);
    //     console.log('array:', array);
    //     if (index == itemIndex){
    //       element.checked = !element.checked;
    //     }
        
    //     return element;
    //   });

    //   that.setData({
    //     cartGoods: tmpCartData,
    //     checkedAllStatus: that.isCheckedAll(),
    //     'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
    //   });
    // }
  },
  getCheckedGoodsCount: function(){
    let checkedGoodsCount = 0;
    this.data.cartGoods.forEach(function (v) {
      if (v.checked === true) {
        checkedGoodsCount += v.productQuantity;
      }
    });
    console.log(checkedGoodsCount);
    return checkedGoodsCount;
  },
  checkedAll: function () {
    let that = this;

    if (!this.data.isEditCart) {
      var productIds = this.data.cartGoods.map(function (v) {
        return v.productId;
      });
      util.request(api.CartChecked, { productIds: productIds.join(','), isChecked: that.isCheckedAll() ? 0 : 1 }, 'POST').then(function (res) {
        if (res.errno === 0) {
          console.log(res.data);
          that.setData({
            cartGoods: res.data.cartList,
            cartTotal: res.data.cartTotal
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    } else {
      //编辑状态
      let checkedAllStatus = that.isCheckedAll();
      let tmpCartData = this.data.cartGoods.map(function (v) {
        v.checked = !checkedAllStatus;
        return v;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }

  },
  editCart: function () {
    var that = this;
    if (this.data.isEditCart) {
      this.getCartList();
      this.setData({
        isEditCart: !this.data.isEditCart
      });
    } else {
      //编辑状态
      let tmpCartList = this.data.cartGoods.map(function (v) {
        v.checked = false;
        return v;
      });
      this.setData({
        editCartList: that.data.cartGoods,
        cartGoods: tmpCartList,
        isEditCart: !that.data.isEditCart,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
      // this.updateCart()
    }

  },
  updateCart: function (openId, productId, productQuantity) {
    let that = this;

    util.request(api.CartUpdate, {
      openId: openId,
      productId: productId,
      productQuantity: productQuantity,
    }, 'POST').then(function (res) {
      if (res.code === 200) {
        console.log(res.data);
        that.setData({
          cartGoods: res.data,
        });
      }

      that.getCartList();
      // that.setData({
      //   checkedAllStatus: that.isCheckedAll()
      // });
    });
    

  },
  cutNumber: function (event) {

    let that = this;
    let itemIndex = event.target.dataset.itemIndex;
    console.log(itemIndex);
    let cartItem = this.data.cartGoods[itemIndex];
    let number = (cartItem.productQuantity - 1 > 1) ? cartItem.productQuantity - 1 : 1;
    cartItem.productQuantity = number;

    this.updateCart(this.data.openId, cartItem.productInfo.productId, cartItem.productQuantity);
    

  },
  addNumber: function (event) {
    let that = this;
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = cartItem.productQuantity + 1;
    cartItem.productQuantity = number;

    this.updateCart(this.data.openId, cartItem.productInfo.productId, cartItem.productQuantity);
    
    // console.log(this.data.cartGoods);
    // this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);

  },
  checkoutOrder: function () {
    //获取已选择的商品
    let that = this;

    var checkedGoods = this.data.cartGoods.filter(function (element, index, array) {
      if (element.checked == true) {
        return element;
      } 
    });

    if (checkedGoods.length <= 0) {
      return false;
    }


    wx.navigateTo({
      url: '../shopping/checkout/checkout?checkedGoods=' + JSON.stringify(checkedGoods)
    })
  },
  deleteCart: function () {
    //获取已选择的商品
    let that = this;

    let productIds = this.data.cartGoods.filter(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });

    if (productIds.length <= 0) {
      return false;
    }

    productIds = productIds.map(function (element, index, array) {
      if (element.checked == true) {
        return element.product_id;
      }
    });


    util.request(api.CartDelete, {
      productIds: productIds.join(',')
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        console.log(res.data);
        let cartList = res.data.cartList.map(v => {
          console.log(v);
          v.checked = false;
          return v;
        });

        that.setData({
          cartGoods: cartList,
          cartTotal: res.data.cartTotal
        });
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });
  }
})