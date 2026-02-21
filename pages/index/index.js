const tarot = require("../../utils/tarot");

const HISTORY_KEY = "tarot_reading_history";
const app = getApp();

Page({
  data: {
    question: "",
    spreadIndex: 2,
    spreadOptions: tarot.getSpreadOptions(),
    spreadLabels: tarot.getSpreadOptions().map((item) => item.label),
    allowReversed: true,
    showLaunchAnimation: false
  },

  onLoad() {
    if (!app.globalData.launchAnimationShown) {
      app.globalData.launchAnimationShown = true;
      this.setData({ showLaunchAnimation: true });
      this.launchTimer = setTimeout(() => {
        this.setData({ showLaunchAnimation: false });
      }, 2300);
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
