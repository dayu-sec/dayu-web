# dy-web

静态官网目录按“线上页面、内容源、草案、笔记、素材、原型”分层组织。

## 目录约定

- `index.html`、`aboutus.html`、`case.html`、`difference.html`、`opensource.html`
  - 当前线上页面入口，GitHub Pages 直接从这些文件发布
- `content/pages/`
  - 正式页面文案源稿，对应已发布页面
- `content/drafts/`
  - 尚未定稿或仅用于推演的首页草案
- `notes/`
  - 设计说明、内容索引、策略与竞品研究等内部文档
- `assets/cases/`
  - 案例补充资料与图片素材
- `prototypes/`
  - 未发布的 HTML 原型或设计实现
- `.github/workflows/pages.yml`
  - Pages 发布配置

## 维护原则

- 发布中的 HTML 保持在仓库根目录，避免改动线上访问路径
- 页面内容优先维护 `content/pages/`，再同步到对应 HTML
- 新的探索性设计稿放 `prototypes/`
- 研究、讨论、策略类文档统一放 `notes/`
