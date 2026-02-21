const tarot = require("../../utils/tarot");

const HISTORY_KEY = "tarot_reading_history";
const app = getApp();

function randomLaunchCard() {
  const reading = tarot.generateReading({
    question: "",
    spreadType: "single",
    allowReversed: true
  });
  return reading.cards[0];
}

Page({
  data: {
    question: "",
    spreadIndex: 2,
    spreadOptions: tarot.getSpreadOptions(),
    spreadLabels: tarot.getSpreadOptions().map((item) => item.label),
    allowReversed: true,
    showLaunchAnimation: false,
    launchCard: {
      name: "愚者",
      orientation: "正位",
      keywords: "新的开始、勇气、探索",
      advice: "顺着当下机会行动，边做边调整。"
    }
  },

  onLoad() {
    if (!app.globalData.launchAnimationShown) {
      const launchCard = randomLaunchCard();
      app.globalData.launchAnimationShown = true;
      this.setData({
        showLaunchAnimation: true,
        launchCard
      });
      this.launchTimer = setTimeout(() => {
        this.setData({ showLaunchAnimation: false });
      }, 3000);
    }
  },

  onUnload() {
    if (this.launchTimer) {
      clearTimeout(this.launchTimer);
      this.launchTimer = null;
    }
  },

  skipLaunchAnimation() {
    if (this.launchTimer) {
      clearTimeout(this.launchTimer);
      this.launchTimer = null;
    }
    this.setData({ showLaunchAnimation: false });
  },

  onQuestionInput(event) {
    this.setData({
      question: event.detail.value
    });
  },

  onSpreadChange(event) {
    this.setData({
      spreadIndex: Number(event.detail.value)
    });
  },

  onReverseChange(event) {
    this.setData({
      allowReversed: !!event.detail.value
    });
  },

  startReading() {
    const selectedSpread = this.data.spreadOptions[this.data.spreadIndex];

    const reading = tarot.generateReading({
      question: this.data.question,
      spreadType: selectedSpread.value,
      allowReversed: this.data.allowReversed
    });

    app.globalData.currentReading = reading;
    this.saveHistory(reading);

    wx.navigateTo({
      url: "/pages/result/result"
    });
  },

  goHistory() {
    wx.navigateTo({
      url: "/pages/history/history"
    });
  },

  saveHistory(reading) {
    try {
      const list = wx.getStorageSync(HISTORY_KEY) || [];
      list.unshift(reading);
      wx.setStorageSync(HISTORY_KEY, list.slice(0, 50));
    } catch (error) {
      wx.showToast({
        title: "保存历史失败",
        icon: "none"
      });
    }
  }
});
