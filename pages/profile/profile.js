const HISTORY_KEY = "tarot_reading_history";
const FAVORITES_KEY = "tarot_dictionary_favorites";
const PROFILE_KEY = "tarot_profile_settings";

function formatDateKey(ts) {
  const date = new Date(ts);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function computeStreak(history) {
  if (!history.length) {
    return 0;
  }

  const daySet = new Set(
    history
      .map((item) => Number(String(item.id || "").replace("reading_", "")))
      .filter((ts) => !Number.isNaN(ts))
      .map((ts) => formatDateKey(ts))
  );

  if (!daySet.size) {
    return 0;
  }

  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = formatDateKey(cursor.getTime());
    if (!daySet.has(key)) {
      break;
    }
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

Page({
  data: {
    nickname: "小兔老板",
    streakDays: 0,
    historyCount: 0,
    favoriteCount: 0,
    reminderEnabled: true,
    reminderTime: "08:30"
  },

  onShow() {
    const history = wx.getStorageSync(HISTORY_KEY) || [];
    const favorites = wx.getStorageSync(FAVORITES_KEY) || {};
    const settings = wx.getStorageSync(PROFILE_KEY) || {};

    this.setData({
      streakDays: computeStreak(history),
      historyCount: history.length,
      favoriteCount: Object.keys(favorites).length,
      reminderEnabled: settings.reminderEnabled !== false,
      reminderTime: settings.reminderTime || "08:30"
    });
  },

  onReminderSwitch(event) {
    const reminderEnabled = !!event.detail.value;
    this.setData({ reminderEnabled });
    this.persistSettings();
  },

  onReminderTimeChange(event) {
    this.setData({ reminderTime: event.detail.value });
    this.persistSettings();
  },

  persistSettings() {
    wx.setStorageSync(PROFILE_KEY, {
      reminderEnabled: this.data.reminderEnabled,
      reminderTime: this.data.reminderTime
    });
  },

  openFeature(event) {
    const name = event.currentTarget.dataset.name;
    wx.showToast({
      title: `${name}功能可继续扩展`,
      icon: "none"
    });
  },

  goHistory() {
    wx.navigateTo({
      url: "/pages/history/history"
    });
  },

  logout() {
    wx.showModal({
      title: "退出登录",
      content: "当前为本地演示模式，退出后会保留占卜历史。",
      success: (res) => {
        if (!res.confirm) {
          return;
        }
        wx.showToast({
          title: "已退出（演示）",
          icon: "none"
        });
      }
    });
  }
});
