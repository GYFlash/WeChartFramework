//mine.js
//获取应用实例
const App = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (App.common.userDidLogin()) {
      this.setData({
        userInfo: App.globalData.getUser(),
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      App.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          App.globalData.setUserInfo(res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    // console.log(e);
    App.globalData.setUserInfo(e.detail.userInfo);
    App.globalData.setUserId('user_id_temp');
    App.globalData.setToken('user_token_temp');
    // App.globalData.getUserId()
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
