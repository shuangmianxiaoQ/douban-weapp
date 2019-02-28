App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {},

  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo);
    } else {
      // 调用登录接口
      wx.getUserInfo({
        withCredentials: false, //是否带上登录信息
        success: function(res) {
          that.globalData.userInfo = res.userInfo;
          typeof cb == 'function' && cb(that.globalData.userInfo);
        }
      });
    }
  },

  globalData: {
    userInfo: null,
    // doubanBase: 'https://api.douban.com',
    // doubanBase: 'https://douban.uieee.com',
    doubanBase: 'http://localhost',
    inTheaters: '/v2/movie/in_theaters',
    comingSoon: '/v2/movie/coming_soon',
    top250: '/v2/movie/top250',
    weekly: '/v2/movie/weekly',
    newMovies: '/v2/movie/new_movies',
    usBox: '/v2/movie/us_box',
    search: '/v2/movie/search?q='
  }
});
