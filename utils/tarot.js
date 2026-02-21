const MAJOR_ARCANA = [
  { name: "愚者", upright: "新的开始、勇气、探索", reversed: "冲动、犹豫、方向不明" },
  { name: "魔术师", upright: "行动力、创造、掌控", reversed: "分心、拖延、资源错配" },
  { name: "女祭司", upright: "直觉、洞察、内在智慧", reversed: "封闭、迟疑、忽略内心" },
  { name: "皇后", upright: "滋养、丰盛、温柔", reversed: "过度付出、依赖、失衡" },
  { name: "皇帝", upright: "秩序、边界、执行", reversed: "控制欲、僵化、压力" },
  { name: "教皇", upright: "传统、学习、信念", reversed: "固执、教条、反叛" },
  { name: "恋人", upright: "选择、关系、价值一致", reversed: "拉扯、价值冲突、优柔寡断" },
  { name: "战车", upright: "推进、胜利、意志力", reversed: "失控、分散、急躁" },
  { name: "力量", upright: "耐心、韧性、温柔掌控", reversed: "自我怀疑、情绪压抑、疲惫" },
  { name: "隐士", upright: "沉淀、复盘、独立思考", reversed: "孤立、封闭、停滞" },
  { name: "命运之轮", upright: "转机、周期变化、机会", reversed: "反复、阻滞、时机未到" },
  { name: "正义", upright: "平衡、规则、责任", reversed: "偏见、失衡、回避后果" },
  { name: "倒吊人", upright: "换位、暂停、等待", reversed: "拖延、无意义牺牲、卡住" },
  { name: "死神", upright: "结束与重启、转化、断舍离", reversed: "抗拒变化、沉溺旧模式" },
  { name: "节制", upright: "整合、节奏、协同", reversed: "极端、失衡、内耗" },
  { name: "恶魔", upright: "欲望、束缚、执念", reversed: "解绑、觉醒、戒断" },
  { name: "高塔", upright: "突变、打破旧结构、真相", reversed: "延迟爆发、不愿面对" },
  { name: "星星", upright: "希望、疗愈、愿景", reversed: "信心不足、悲观、迷茫" },
  { name: "月亮", upright: "潜意识、敏感、未知", reversed: "看清幻象、稳定情绪" },
  { name: "太阳", upright: "清晰、喜悦、成功", reversed: "自我中心、短暂低迷" },
  { name: "审判", upright: "觉醒、召唤、复盘升级", reversed: "逃避总结、错失机会" },
  { name: "世界", upright: "完成、圆满、阶段收官", reversed: "收尾拖延、未闭环" }
];

const MINOR_SUITS = [
  { name: "权杖", energy: "行动与事业" },
  { name: "圣杯", energy: "情绪与关系" },
  { name: "宝剑", energy: "思维与沟通" },
  { name: "星币", energy: "金钱与现实" }
];

const MINOR_RANKS = [
  { name: "A", upright: "新的机会、种子、起点", reversed: "启动困难、能量分散" },
  { name: "2", upright: "平衡、协商、选择", reversed: "拉扯、摇摆、拖延" },
  { name: "3", upright: "成长、合作、扩展", reversed: "配合不畅、目标分裂" },
  { name: "4", upright: "稳定、积累、守成", reversed: "停滞、保守、错过窗口" },
  { name: "5", upright: "冲突、挑战、破局", reversed: "内耗、逃避、纠结" },
  { name: "6", upright: "修复、支持、过渡", reversed: "旧事回潮、无法放下" },
  { name: "7", upright: "策略、坚持、防守", reversed: "怀疑、心虚、失去优势" },
  { name: "8", upright: "加速、执行、推进", reversed: "进展受阻、信息混乱" },
  { name: "9", upright: "临门一脚、韧性、收获前夜", reversed: "疲惫、警惕过度" },
  { name: "10", upright: "阶段完成、责任、结果", reversed: "负担过重、无效努力" },
  { name: "侍从", upright: "学习、消息、尝试", reversed: "幼稚、反复、三分钟热度" },
  { name: "骑士", upright: "行动、冲锋、追求", reversed: "冒进、鲁莽、失速" },
  { name: "王后", upright: "滋养、稳定输出、细腻", reversed: "敏感过度、依赖反馈" },
  { name: "国王", upright: "成熟、主导、结果导向", reversed: "专断、控制、僵硬" }
];

const SPREADS = {
  single: {
    label: "单张指引",
    count: 1,
    positions: ["核心指引"]
  },
  timeline: {
    label: "三张时间流",
    count: 3,
    positions: ["过去", "现在", "未来"]
  },
  decision: {
    label: "三张决策盘",
    count: 3,
    positions: ["现状", "挑战", "建议"]
  },
  relation: {
    label: "关系洞察",
    count: 3,
    positions: ["你", "对方", "关系建议"]
  }
};

function buildDeck() {
  const major = MAJOR_ARCANA.map((card) => ({
    ...card,
    arcana: "大阿尔卡那",
    theme: "人生主题"
  }));

  const minor = [];
  MINOR_SUITS.forEach((suit) => {
    MINOR_RANKS.forEach((rank) => {
      minor.push({
        name: `${suit.name}${rank.name}`,
        upright: `${suit.energy}：${rank.upright}`,
        reversed: `${suit.energy}：${rank.reversed}`,
        arcana: "小阿尔卡那",
        theme: suit.energy
      });
    });
  });

  return major.concat(minor);
}

const TAROT_DECK = buildDeck();

function randomPick(list, amount) {
  const pool = list.slice();
  const picked = [];
  for (let i = 0; i < amount; i += 1) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool[index]);
    pool.splice(index, 1);
  }
  return picked;
}

function buildSummary(question, cards, spreadLabel) {
  const uprightCount = cards.filter((c) => !c.reversed).length;
  const reversedCount = cards.length - uprightCount;
  const focus = cards
    .map((c) => c.theme)
    .slice(0, 2)
    .join("、");

  let mood = "整体能量偏平衡，保持当前节奏。";
  if (reversedCount > uprightCount) {
    mood = "当前阻力偏多，先稳住节奏再推进。";
  } else if (uprightCount === cards.length) {
    mood = "牌面整体顺势，适合主动推进关键事项。";
  }

  const topic = question && question.trim() ? `关于“${question.trim()}”` : "关于你当下在意的主题";
  return `${topic}，本次${spreadLabel}重点落在${focus || "内在状态"}。${mood}`;
}

function generateReading(options) {
  const spreadType = options.spreadType || "single";
  const spread = SPREADS[spreadType] || SPREADS.single;
  const allowReversed = options.allowReversed !== false;
  const selected = randomPick(TAROT_DECK, spread.count);

  const cards = selected.map((card, index) => {
    const reversed = allowReversed ? Math.random() < 0.5 : false;
    return {
      position: spread.positions[index],
      name: card.name,
      arcana: card.arcana,
      theme: card.theme,
      reversed,
      orientation: reversed ? "逆位" : "正位",
      keywords: reversed ? card.reversed : card.upright,
      advice: reversed
        ? "先处理阻力与情绪，再推进外部行动。"
        : "顺着当下机会行动，边做边调整。"
    };
  });

  const question = options.question || "";
  return {
    id: `reading_${Date.now()}`,
    question,
    spreadType,
    spreadLabel: spread.label,
    createdAt: new Date().toLocaleString(),
    cards,
    summary: buildSummary(question, cards, spread.label)
  };
}

function getSpreadOptions() {
  return Object.keys(SPREADS).map((key) => ({
    value: key,
    label: SPREADS[key].label
  }));
}

module.exports = {
  generateReading,
  getSpreadOptions
};
