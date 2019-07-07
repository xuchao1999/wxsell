/**
 * 用户相关服务
 */

const util = require('../utils/util.js');
const api = require('../config/api.js');


/**
 * 调用微信登录
 */
function loginByWeixin() {

  let code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then((res) => {
      console.log('请求' + res.code);
      code = res.code;
      return util.getUserInfo();
    }).then((userInfo) => {
      //登录远程服务器
      console.log(userInfo);
      util.request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(res => {
        if (res.code === 200) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('openid', res.data.openid);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {

      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}


module.exports = {
  loginByWeixin,
  checkLogin,
};











