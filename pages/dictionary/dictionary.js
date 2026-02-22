const tarot = require("../../utils/tarot");

const FAVORITES_KEY = "tarot_dictionary_favorites";
const ARCANA_OPTIONS = ["全部", "大阿卡纳", "小阿卡纳"];
const SUIT_OPTIONS = ["全部", "权杖", "圣杯", "宝剑", "星币"];

function getCoverSymbol(card) {
  if (card.arcana === "大阿卡纳") {
    return "✦";
  }

  if (card.suit === "权杖") {
    return "杖";
  }
  if (card.suit === "圣杯") {
    return "杯";
  }
  if (card.suit === "宝剑") {
    return "剑";
  }
  return "币";
}

function toKeywordPreview(text) {
  return (text || "")
    .replace(/：/g, "")
    .split(/[、，]/)
    .filter(Boolean)
    .slice(0, 3)
    .join(" · ");
}

Page({
  data: {
    cards: [],
    filteredCards: [],
    searchText: "",
    arcanaOptions: ARCANA_OPTIONS,
    suitOptions: SUIT_OPTIONS,
    arcanaIndex: 0,
    suitIndex: 0,
    sortMode: "default",
    favoritesOnly: false,
    favoritesMap: {}
  },

  onLoad() {
    const cards = tarot.getDeck().map((card, index) => ({
      ...card,
      order: index,
      coverSymbol: getCoverSymbol(card),
      keywordPreview: toKeywordPreview(card.upright)
    }));

    const favoritesMap = wx.getStorageSync(FAVORITES_KEY) || {};

    this.setData({ cards, favoritesMap }, () => {
      this.applyFilters();
    });
  },

  onSearchInput(event) {
    this.setData({ searchText: event.detail.value }, () => {
      this.applyFilters();
    });
  },

  onArcanaChange(event) {
    this.setData({ arcanaIndex: Number(event.currentTarget.dataset.index) }, () => {
      this.applyFilters();
    });
  },

  onSuitChange(event) {
    this.setData({ suitIndex: Number(event.currentTarget.dataset.index) }, () => {
      this.applyFilters();
    });
  },

  toggleSortMode() {
    this.setData(
      {
        sortMode: this.data.sortMode === "default" ? "name" : "default"
      },
      () => {
        this.applyFilters();
      }
    );
  },

  toggleFavoritesOnly() {
    this.setData(
      {
        favoritesOnly: !this.data.favoritesOnly
      },
      () => {
        this.applyFilters();
      }
    );
  },

  onToggleFavorite(event) {
    const cardName = event.currentTarget.dataset.name;
    if (!cardName) {
      return;
    }

    const favoritesMap = {
      ...this.data.favoritesMap,
      [cardName]: !this.data.favoritesMap[cardName]
    };

    if (!favoritesMap[cardName]) {
      delete favoritesMap[cardName];
    }

    wx.setStorageSync(FAVORITES_KEY, favoritesMap);
    this.setData({ favoritesMap }, () => {
      this.applyFilters();
    });
  },

  onOpenCard(event) {
    const cardName = event.currentTarget.dataset.name;
    const card = this.data.cards.find((item) => item.name === cardName);
    if (!card) {
      return;
    }

    wx.showModal({
      title: card.name,
      content: `正位：${card.upright}\n\n逆位：${card.reversed}`,
      showCancel: false,
      confirmText: "我知道了"
    });
  },

  applyFilters() {
    const { cards, searchText, arcanaIndex, suitIndex, sortMode, favoritesOnly, favoritesMap } = this.data;

    const searchValue = (searchText || "").trim();
    const selectedArcana = ARCANA_OPTIONS[arcanaIndex];
    const selectedSuit = SUIT_OPTIONS[suitIndex];

    const filteredCards = cards
      .filter((card) => {
        if (!searchValue) {
          return true;
        }
        return card.name.includes(searchValue);
      })
      .filter((card) => {
        if (selectedArcana === "全部") {
          return true;
        }
        return card.arcana === selectedArcana;
      })
      .filter((card) => {
        if (selectedSuit === "全部") {
          return true;
        }
        return card.suit === selectedSuit;
      })
      .filter((card) => {
        if (!favoritesOnly) {
          return true;
        }
        return !!favoritesMap[card.name];
      })
      .sort((a, b) => {
        if (sortMode === "name") {
          return a.name.localeCompare(b.name, "zh-Hans-CN");
        }
        return a.order - b.order;
      })
      .map((card) => ({
        ...card,
        favorite: !!favoritesMap[card.name]
      }));

    this.setData({ filteredCards });
  }
});
