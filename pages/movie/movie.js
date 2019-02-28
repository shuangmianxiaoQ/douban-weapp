var app = getApp();
Page({
  data: {
    inTheaters: {},   // 正在上映
    comingSoon: {},   // 即将上映
    top250: {},       // Top250
    weekly: {},       // 口碑榜
    newMovies: {},    // 新片榜
    usBox: {}         // 票房榜
  },

  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + app.globalData.inTheaters + "?start=0&count=10";
    var comingSoonUrl = app.globalData.doubanBase + app.globalData.comingSoon + "?start=0&count=10";
    var top250Url = app.globalData.doubanBase + app.globalData.top250 + "?start=0&count=3";
    var weeklyUrl = app.globalData.doubanBase + app.globalData.inTheaters + "?start=10&count=3";
    var newMoviesUrl = app.globalData.doubanBase + app.globalData.comingSoon + "?start=10&count=3";
    var usBoxUrl = app.globalData.doubanBase + app.globalData.top250 + "?start=10&count=3";
    this.getMovieListData(inTheatersUrl, "inTheaters", "影院热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
    this.getMovieListData(weeklyUrl, "weekly", "本周口碑榜");
    this.getMovieListData(newMoviesUrl, "newMovies", "豆瓣新片榜");
    this.getMovieListData(usBoxUrl, "usBox", "北美票房榜");
  },

  /**
   * ajax请求豆瓣电影数据
   */
  getMovieListData: function (url, settedKey, categoryTitle) {
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: res => {
        //console.log(res);
        this.processMovieData(res.data, settedKey, categoryTitle);    // 处理获取的电影数据
      },
      fail: err => console.log(err)
    })
  },

  /**
   * 处理电影数据
   */
  processMovieData: function (data, settedKey, categoryTitle) {
    var movies = [];
    for (var sub of data.subjects) {
      var temp = {
        id: sub.id,             // 条目id
        title: sub.title,       // 中文名
        rating: sub.rating,     // 评分
        images: sub.images      // 电影海报图
      };
      movies.push(temp);
    }
    // 精选榜单条目描述
    var desc = "";
    if (settedKey =="top250") {
      desc = "8分以上好电影";
    } else {
      var today = new Date();
      var lastToday = new Date(today);
      lastToday.setDate(lastToday.getDate()-7);
      desc = `${lastToday.getMonth() + 1}月${lastToday.getDate()}日-${today.getMonth() + 1}月${today.getDate()}日`;
    }
    // 利用键值对关系来解决请求条目所对应的数据
    var readyData = {};
    readyData[settedKey] = {
      settedKey,
      categoryTitle,
      desc,
      movies
    };
    this.setData(readyData);
    console.log(readyData);
  },

  /**
   * 跳转到搜索电影页
   */
  bindSearchTap: function() {
    wx.navigateTo({
      url: 'search/search'
    })
  },

  /**
   * 跳转到更多电影页
   */
  bindMoreTap: function(event) {
    // data-type-id最终在event.currentTarget.dataset中会将连字符转成驼峰typeId
    var typeId = event.currentTarget.dataset.typeId;
    //console.log(typeId);
    wx.navigateTo({
      url: 'more-movie/more-movie?typeId=' + typeId
    })
  }
})