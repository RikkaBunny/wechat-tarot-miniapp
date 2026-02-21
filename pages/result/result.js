const app = getApp();

Page({
  data: {
    reading: null,
    displayCards: []
  },

  onShow() {
    const reading = app.globalData.currentReading || null;
    const displayCards = reading
      ? (reading.cards || []).map((card) => ({
          ...card,
          flipped: false
        }))
      : [];

    this.setData({
      reading,
      displayCards
    });
  },

  onFlipCard(event) {
    const index = Number(event.currentTarget.dataset.index);
    const cards = this.data.displayCards.slice();
    if (!cards[index] || cards[index].flipped) {
      return;
    }

    cards[index].flipped = true;
    this.setData({
      displayCards: cards
    });

    if (cards.every((card) => card.flipped)) {
      wx.showToast({
        title: "已翻完全部牌",
        icon: "none"
      });
    }
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
