// pages/home/home.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  clearCache () {
    wx.clearStorageSync();
    wx.showToast({
      icon: 'success',
      title: '清除成功'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (App.common.userDidLogin()) {
      // 用户已登录，执行业务逻辑
      this.setData({
        userInfo: App.globalData.getUserInfo()
      })
    } else {
      // 用户未登录，前往个人中心进行授权
      wx.navigateTo({
        url: '/pages/mine/mine',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (App.common.userDidLogin()) {
      this.setData({
        userInfo: App.globalData.getUserInfo()
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})