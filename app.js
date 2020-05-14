//app.js
import HTTPRequest from './common/HTTPRequest';
import Common from './common/Common';
import GlobalData from './common/GlobalData';
import GEvent from './common/GEvent';

App({
  globalData: null,
  request: null,
  common: null,
  event: null,
  onLaunch: function () {
    this.globalData = new GlobalData();
    this.request = new HTTPRequest();
    this.event = new GEvent();
    this.common = new Common();

    this.common.userDidLogin = () => {
      return this.globalData.getUserId() && this.globalData.getToken();
    }

    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId

              this.globalData.setUserInfo(res.userInfo);
              this.globalData.setUserId('user_id_temp');
              this.globalData.setToken('user_token_temp');
              this.request.setUser({
                id: 'user_id_temp',
                token: 'user_token_temp'
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
})