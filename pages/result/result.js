const app = getApp();

Page({
  data: {
    reading: null,
    displayCards: [],
    activeIndex: 0
  },

  onShow() {
    const reading = app.globalData.currentReading || null;
    const displayCards = reading ? reading.cards || [] : [];

    this.setData({
      reading,
      displayCards,
      activeIndex: 0
    });
  },

  onSelectCard(event) {
    const index = Number(event.currentTarget.dataset.index);
    if (Number.isNaN(index)) {
      return;
    }
    this.setData({ activeIndex: index });
  },

  saveReading() {
    wx.showToast({
      title: "本次结果已保存",
      icon: "none"
    });
  },

  shareReading() {
    wx.showShareMenu({
      withShareTicket: false,
      menus: ["shareAppMessage", "shareTimeline"]
    });
    wx.showToast({
      title: "可直接点右上角分享",
      icon: "none"
    });
  },

  onShareAppMessage() {
    const reading = this.data.reading;
    const title = reading ? `我的塔罗结果：${reading.spreadLabel}` : "塔罗每日占卜";
    return {
      title,
      path: "/pages/index/index"
    };
  },

  goAgain() {
    wx.reLaunch({
      url: "/pages/index/index"
    });
  }
});
