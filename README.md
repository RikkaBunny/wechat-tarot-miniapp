# 塔罗随身占卜（WeChat Mini Program）

一个可以随时随地进行塔罗占卜的微信小程序。

![WeChat](https://img.shields.io/badge/Platform-WeChat%20MiniProgram-07C160)
![Status](https://img.shields.io/badge/Status-MVP-8759c7)
![License](https://img.shields.io/badge/License-MIT-blue)

## 项目亮点

- 支持 4 种常用牌阵：单张指引、三张时间流、三张决策盘、关系洞察
- 支持正位 / 逆位，占卜结果更细化
- 自动生成「关键词 + 建议 + 总结」，可直接用于日常决策参考
- 本地历史记录（最多 50 条），随时回看与复盘
- 纯前端逻辑，开箱即跑，适合二次开发

## 功能演示（截图）

> 以下为当前版本界面示意图（已包含在仓库 `docs/screenshots/`）

| 首页（提问 + 选牌阵） | 结果页（解读 + 建议） | 历史页（回看 + 管理） |
| --- | --- | --- |
| ![首页](docs/screenshots/index-page.svg) | ![结果页](docs/screenshots/result-page.svg) | ![历史页](docs/screenshots/history-page.svg) |

## 功能演示（30 秒流程）

1. 打开首页，输入问题（例如：`我该不该换工作？`）
2. 选择牌阵（推荐先用 `三张决策盘`）
3. 点击「开始占卜」
4. 查看每张牌的位置、正逆位、关键词和行动建议
5. 在历史页复盘最近占卜记录

## 技术结构

```text
wechat-tarot-miniapp/
├── app.js
├── app.json
├── app.wxss
├── pages/
│   ├── index/      # 问题输入与抽牌入口
│   ├── result/     # 占卜结果展示
│   └── history/    # 占卜历史记录
├── utils/
│   └── tarot.js    # 牌库、牌阵、解读逻辑
└── docs/screenshots/
    ├── index-page.svg
    ├── result-page.svg
    └── history-page.svg
```

## 快速开始

1. 打开微信开发者工具
2. 选择「导入项目」并指向本项目目录 `wechat-tarot-miniapp`
3. 填入你自己的小程序 `AppID`（测试可用测试号）
4. 点击编译运行

## 当前实现说明

- 牌库：包含大阿尔卡那 + 小阿尔卡那
- 抽牌：随机不重复抽取，支持逆位概率
- 存储：使用 `wx.setStorageSync` 本地保存历史记录
- 限制：当前无云端同步、无用户体系、无牌面图片资源

## Roadmap

- [ ] 增加牌面插画资源与翻牌动画
- [ ] 增加凯尔特十字等高级牌阵
- [ ] 接入云开发做跨设备历史同步
- [ ] 支持结果分享海报与一键转发
- [ ] 可选接入 AI 深度解牌（云函数）

## 免责声明

本项目用于娱乐与自我觉察，不构成医疗、法律、投资等专业建议。

## License

MIT
