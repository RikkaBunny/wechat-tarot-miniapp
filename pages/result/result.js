const app = getApp();

Page({
  data: {
    reading: null
  },

  onShow() {
    this.setData({
      reading: app.globalData.currentReading || null
    });
  },

  goAgain() {
    wx.reLaunch({
      url: "/pages/index/index"
    });
  },

  goHistory() {
    wx.navigateTo({
      url: "/pages/history/history"
    });
  }
});
