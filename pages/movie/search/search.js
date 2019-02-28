var app = getApp();
Page({

  data: {
    searchResult: {}
  },

  /**
   * 搜索电影
   */
  bindSearchInput: function (event) {
    var value = event.detail.value;
    if(value.length>0) {
      this.getSearchData(value);
    }
  },

  getSearchData:function(value) {
    var searchUrl = app.globalData.doubanBase + app.globalData.search + value;
    wx.request({
      url: searchUrl,
      method: 'GET',
      data: {
        start: 0,
        count: 10
      },
      header: {
        "Content-Type": "json"
      },
      success: res => {
        //console.log(res);
        this.processSearchData(res.data);    // 处理获取的电影数据
      },
      fail: err => console.log(err)
    })
  },

  processSearchData: function(data) {
    var movies = [];
    for (var sub of data.subjects) {
      var temp = {
        id: sub.id,                       // 条目id
        title: sub.title,                 // 中文名
        rating: sub.rating,               // 评分
        year: sub.year,                   // 年代
        images: sub.images,               // 电影海报图
        casts: this.convertToActorsString(sub.casts),           // 主演
        directors: this.convertToActorsString(sub.directors),   // 导演
      };
      movies.push(temp);
    }

    var readyData = {};
    readyData["searchResult"] = {
      movies
    };
    this.setData(readyData);
    console.log(readyData);
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
   * 取消搜索
   */
  bindCancelSearchTap: function() {
    wx.navigateBack();
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

  }
})