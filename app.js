var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');

App({
  onLaunch: function (ops) {
    //获取用户的登录信息
    // user.checkLogin().then(res => {
    //   console.log('app login1111111111111111111')
    //   this.globalData.userInfo = wx.getStorageSync('userInfo');
    //   this.globalData.token = wx.getStorageSync('token');
      
    // }).catch((res) => {
    //   console.log('err:');
    //   console.log(res);
    // });
    // if (ops.scene == 1044) {
    //   console.log('1044');
    //   console.log(ops.shareTicket);
    // }
    // if(ops.scene == 1036){
    //   console.log('11003366');
    // }
  },
  
  globalData: {
    userInfo: {
      nickname: 'Hi,游客',
      username: '点击去登录',
      avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'/*"https://wx.qlogo.cn/mmopen/vi_32/VIfvUZoaiaXqibHH2HSUGbterRNfibAmbupHuSp4utITCJlSJX8EVmtb2n8hqdQ7NfIOc78nRY3ruzvUic4GQrneMQ/0"*/
    },
    token: '',
    openid: '',
  }
})