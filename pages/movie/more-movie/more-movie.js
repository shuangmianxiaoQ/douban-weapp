var app = getApp();
Page({

  data: {
    showIntheaters: true,
    showComingSoon: false,
    inTheaters: {},
    comingSoon: {},
  },

  onLoad: function (options) {
    // 页面初始化 options是页面跳转带来的参数
    var typeId = options.typeId;
    var readyData = {};
    var url = "";
    if (typeId == "inTheaters") {
      url = app.globalData.doubanBase + app.globalData.inTheaters;
      readyData = {
        "showIntheaters": true,
        "showComingSoon": false
      };
    } else {
      url = app.globalData.doubanBase + app.globalData.comingSoon;
      readyData = {
        "showIntheaters": false,
        "showComingSoon": true
      };
    }
    this.setData(readyData);
    this.getMovieListData(url, typeId);
  },

  getMovieListData: function (url, typeId) {
    wx.request({
      url: url,
      method: 'GET',
      data: {
        start: 0,
        count: 5
      },
      header: {
        "Content-Type": "json"
      },
      success: res => {
        //console.log(res);
        this.processMovieData(res.data, typeId);    // 处理获取的电影数据
      },
      fail: err => console.log(err)
    })
  },

  processMovieData: function (data, typeId) {
    var movies = [];
    for (var sub of data.subjects) {
      var temp = {
        id: sub.id,                       // 条目id
        title: sub.title,                 // 中文名
        rating: sub.rating,               // 评分
        images: sub.images,               // 电影海报图
        collectCount: sub.collect_count,  // 看过人数
        genres: this.convertToGenresString(sub.genres),         // 影片类型
        casts: this.convertToActorsString(sub.casts),           // 主演
        directors: this.convertToActorsString(sub.directors),   // 导演
      };
      movies.push(temp);
    }

    var readyData = {};
    readyData[typeId] = {
      typeId,
      movies
    };
    this.setData(readyData);
    console.log(readyData);
  },

  /**
  * 处理影片类型的函数，类型之间加一个" / "隔开
  */
  convertToGenresString: function (genres) {
    var genresName = "";
    for (var genre of genres) {
      genresName += genre + " / ";
    }
    return genresName.slice(0, -2);
  },

  /**
  * 处理主演和导演姓名的函数，姓名之间加一个" / "隔开
  */
  convertToActorsString: function (actors) {
    var actorsName = "";
    for (var actor of actors) {
      actorsName += actor.name + " / ";
    }
    return actorsName.slice(0, -2);
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