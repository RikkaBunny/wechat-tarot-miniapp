const HISTORY_KEY = "tarot_reading_history";
const app = getApp();

Page({
  data: {
    history: []
  },

  onShow() {
    this.loadHistory();
  },

  loadHistory() {
    const history = wx.getStorageSync(HISTORY_KEY) || [];
    this.setData({ history });
  },

  openReading(event) {
    const targetId = event.currentTarget.dataset.id;
    const selected = this.data.history.find((item) => item.id === targetId);
    if (!selected) {
      return;
    }

    app.globalData.currentReading = selected;
    wx.navigateTo({
      url: "/pages/result/result"
    });
  },

  clearHistory() {
    wx.showModal({
      title: "确认清空",
      content: "清空后不可恢复，确定要删除全部历史占卜吗？",
      success: (res) => {
        if (!res.confirm) {
          return;
        }

        wx.removeStorageSync(HISTORY_KEY);
        this.setData({ history: [] });
      }
    });
  },

  goIndex() {
    wx.reLaunch({
      url: "/pages/index/index"
    });
  }
});
