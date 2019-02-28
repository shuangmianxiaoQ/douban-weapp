var app = getApp();
Page({
  data: {
    userInfo: {},
    entranceTxt: "开启电影之旅"
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    app.getUserInfo(userInfo => {
      this.setData({ userInfo });
    })
  },

  /*
   * 跳转进入电影首页
   */
  bindEntranceTap: function () {
    wx.redirectTo({
      url: '../movie/movie',
    })
  }

})