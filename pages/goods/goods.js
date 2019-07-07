var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    productId: 0,
    goods: {},
    openId: '',
    // gallery: [],
    // attribute: [],
    // issueList: [],
    // comment: [],
    // brand: {},
    // specificationList: [],
    // productList: [],
    // relatedGoods: [],
    cartGoodsCount: 0,
    // userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png",
    // animationData: {},
    showModalStatus: false
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.getGoodsInfo();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  getGoodsInfo: function () {
    let that = this;
    util.request(api.GoodsDetail, { productId: that.data.productId }).then(function (res) {
      console.log(res);
      if (res.code === 200) {
        that.setData({
          goods: res.data,
          // issueList: res.data.issue,
          // userHasCollect: res.data.userHasCollect
        });
        
        if (res.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }

        // that.getGoodsRelated();
      }
    });

  },

  // 获取相似商品列表
  // getGoodsRelated: function () {
  //   let that = this;
  //   util.request(api.GoodsRelated, { id: that.data.id }).then(function (res) {
  //     if (res.errno === 0) {
  //       console.log(res)
  //       that.setData({
  //         relatedGoods: res.data.goodsList,
  //       });
  //     }
  //   });
  // },
  // clickSkuValue: function (event) {
  //   let that = this;
  //   let specNameId = event.currentTarget.dataset.nameId;
  //   let specValueId = event.currentTarget.dataset.valueId;

  //   //判断是否可以点击

  //   //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
  //   let _specificationList = this.data.specificationList;
  //   for (let i = 0; i < _specificationList.length; i++) {
  //     if (_specificationList[i].specification_id == specNameId) {
  //       for (let j = 0; j < _specificationList[i].valueList.length; j++) {
  //         if (_specificationList[i].valueList[j].id == specValueId) {
  //           //如果已经选中，则反选
  //           if (_specificationList[i].valueList[j].checked) {
  //             _specificationList[i].valueList[j].checked = false;
  //           } else {
  //             _specificationList[i].valueList[j].checked = true;
  //           }
  //         } else {
  //           _specificationList[i].valueList[j].checked = false;
  //         }
  //       }
  //     }
  //   }
  //   this.setData({
  //     'specificationList': _specificationList
  //   });
  //   //重新计算spec改变后的信息
  //   this.changeSpecInfo();

  //   //重新计算哪些值不可以点击
  // },

  // //获取选中的规格信息
  // getCheckedSpecValue: function () {
  //   let checkedValues = [];
  //   let _specificationList = this.data.specificationList;
  //   for (let i = 0; i < _specificationList.length; i++) {
  //     let _checkedObj = {
  //       nameId: _specificationList[i].specification_id,
  //       valueId: 0,
  //       valueText: ''
  //     };
  //     for (let j = 0; j < _specificationList[i].valueList.length; j++) {
  //       if (_specificationList[i].valueList[j].checked) {
  //         _checkedObj.valueId = _specificationList[i].valueList[j].id;
  //         _checkedObj.valueText = _specificationList[i].valueList[j].value;
  //       }
  //     }
  //     checkedValues.push(_checkedObj);
  //   }

  //   return checkedValues;

  // },
  // //根据已选的值，计算其它值的状态
  // setSpecValueStatus: function () {

  // },
  // //判断规格是否选择完整
  // isCheckedAllSpec: function () {
  //   return !this.getCheckedSpecValue().some(function (v) {
  //     if (v.valueId == 0) {
  //       return true;
  //     }
  //   });
  // },
  // getCheckedSpecKey: function () {
  //   let checkedValue = this.getCheckedSpecValue().map(function (v) {
  //     return v.valueId;
  //   });

  //   return checkedValue.join('_');
  // },
  // changeSpecInfo: function () {
  //   let checkedNameValue = this.getCheckedSpecValue();

  //   //设置选择的信息
  //   let checkedValue = checkedNameValue.filter(function (v) {
  //     if (v.valueId != 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }).map(function (v) {
  //     return v.valueText;
  //   });
  //   if (checkedValue.length > 0) {
  //     this.setData({
  //       'checkedSpecText': checkedValue.join('　')
  //     });
  //   } else {
  //     this.setData({
  //       'checkedSpecText': '请选择规格数量'
  //     });
  //   }

  // },
  // getCheckedProductItem: function (key) {
  //   return this.data.productList.filter(function (v) {
  //     if (v.goods_specification_ids == key) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      productId: parseInt(options.productId),
      openId: wx.getStorageSync('openid')
      // id: 1181000
    });
    var that = this;
    this.getGoodsInfo();
    // util.request(api.CartGoodsCount).then(function (res) {
    //   if (res.code === 200) {
    //     that.setData({
    //       cartGoodsCount: res.data.cartTotal.goodsCount
    //     });

    //   }
    // });
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
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        showModalStatus: !this.data.showModalStatus,
        collectBackImage: "/static/images/detail_back.png"
      });
    }
  },
  // closeAttrOrCollect: function () {
  //   let that = this;
  //   if (this.data.openAttr) {
  //     this.setData({
  //       openAttr: false,
  //     });
  //     if (that.data.userHasCollect == 1) {
  //       that.setData({
  //         'collectBackImage': that.data.hasCollectImage
  //       });
  //     } else {
  //       that.setData({
  //         'collectBackImage': that.data.noCollectImage
  //       });
  //     }
  //   } else {
  //     //添加或是取消收藏
  //     util.request(api.CollectAddOrDelete, { typeId: 0, valueId: this.data.id }, "POST")
  //       .then(function (res) {
  //         let _res = res;
  //         if (_res.errno == 0) {
  //           if ( _res.data.type == 'add') {
  //             that.setData({
  //               'collectBackImage': that.data.hasCollectImage
  //             });
  //           } else {
  //             that.setData({
  //               'collectBackImage': that.data.noCollectImage
  //             });
  //           }

  //         } else {
  //           wx.showToast({
  //             image: '/static/images/icon_error.png',
  //             title: _res.errmsg,
  //             mask: true
  //           });
  //         }

  //       });
  //   }

  // },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },
  addToCart: function () {
    var that = this;
    if (this.data.showModalStatus == false) {
      //打开规格选择窗口
      this.setData({
        // openAttr: !this.data.openAttr,
        collectBackImage: "/static/images/detail_back.png",
        showModalStatus: true
      });
    } else {

      //提示选择完整规格
      // if (!this.isCheckedAllSpec()) {
      //   return false;
      // }

      //根据选中的规格，判断是否有对应的sku信息
      // let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
      // if (!checkedProduct || checkedProduct.length <= 0) {
      //   console.log('找不到对应的product信息，提示没有库存1');
      //   //找不到对应的product信息，提示没有库存;
      //   return false;
      // }

      //验证库存
      if (this.data.goods.productStock < this.data.number) {
        //找不到对应的product信息，提示没有库存
        console.log('找不到对应的product信息，提示没有库存2');
        return false;
      }

      //添加到购物车
      util.request(api.CartAdd, { openId: this.data.openId, productId: this.data.productId, productQuantity: this.data.number }, "POST")
        .then(function (res) {
          let _res = res;
          if (_res.code == 200) {
            wx.showToast({
              title: '添加成功'
            });
            that.setData({
              showModalStatus: !that.data.showModalStatus,
              cartGoodsCount: _res.data.cartTotal.goodsCount
            });
            if (that.data.userHasCollect == 1) {
              that.setData({
                'collectBackImage': that.data.hasCollectImage
              });
            } else {
              that.setData({
                'collectBackImage': that.data.noCollectImage
              });
            }
          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }

        });
    }

  },
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  },
  //分享
  onShareAppMessage: function(ops){
    var that = this;
    var shareObj = {
      title: 'sell',
      desc: that.data.goods.name,
      path: '/pages/goods/goods?id=' + that.data.id,
      success: function(res){
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(res){
        util.showErrorToast('分享失败');
      }
    };
    if(ops.from == 'button'){
      var eData = ops.target.dataset;
      console.log(eData.name);

    }
    return shareObj;
  },



  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }
})