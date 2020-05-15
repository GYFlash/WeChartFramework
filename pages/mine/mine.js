//mine.js
//获取应用实例
const App = getApp()

Page({
  data: {
    motto: 'Hello World',
    isShowAuthCard: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // 用户已登录
    if (App.common.userDidLogin()) {
      this.hideAuthCard();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      App.userInfoReadyCallback = res => {
        this.hideAuthCard(res.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.hideAuthCard(res.userInfo);
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      this.hideAuthCard(e.detail.userInfo);
    }
  },
  // 微信授权成功
  hideAuthCard (info) {
    if (!info) {
      this.setData({
        userInfo: App.globalData.getUserInfo(),
        hasUserInfo: true,
        isShowAuthCard: false
      })
      return;
    }
    // 用户登录
    let __this = this;
    let res = {
      userInfo: info
    };

    App.setUserInfo(res.userInfo)
    this.setData({
      userInfo: res.userInfo,
      hasUserInfo: true,
    })
    setTimeout(() => {
      __this.setData({
        isShowAuthCard: false
      })
    }, 1000)
  }
})
