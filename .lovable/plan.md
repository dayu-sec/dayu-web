## 目标

在当前 Lovable 项目的首页（`src/routes/index.tsx`）做一个 **Hero 区改造 Demo**，复刻 dy-sec.com 首页 Hero 的文案与信息结构，但视觉风格切换成你上传的 3D 等距图所传达的"深色赛博 / 蓝光防护罩"调性。原站的其它文章结构、章节、排版逻辑不动（本项目里也只做 Hero 一屏）。

## 视觉方向（参考你上传的图）

- **底色**：近黑深蓝 (`oklch(0.16 0.03 250)` 左右)，叠加微噪点 + 极淡的网格底纹
- **主色**：电光青蓝 `#4FD8FF` / `#22B8F5`，作为发光描边、按钮、强调线
- **辅色**：冷银灰用于次级文字；保留一点点淡紫高光呼应原图右下
- **质感**：发光辉光 (glow)、薄玻璃描边、几何线条；按钮使用半透明玻璃面板 + 蓝色边缘光
- **字体**：标题使用现代无衬线（Space Grotesk / Orbitron 类感觉，正文 Inter）；中文标题字重加粗、字间距收紧
- **动效**：标题轻微淡入上移、主图缓慢悬浮、辉光呼吸（用 CSS animation，不引入新库）

## Hero 区内容（沿用 dy-sec.com 原文案）

- 顶部导航：Logo "大禹安全" + 链接（首页 / 客户痛点 / 保障体系 / 开源技术 / 合作案例 / 关于我们）—— 视觉重做，链接为锚点占位
- 小标签：`数字业务保障基础设施`
- 主标题：`为数字业务构建保障基础设施`
- 副标题：`从业务目标出发，建设整体保障能力`
- 描述：`大禹安全围绕资产、观测、运维与风险控制，建设服务数字业务的可持续保障平台。`
- 公式胶囊：`保障机制 = 业务视角 × (资产 + 运行观测 + 可靠运维 + 安全风险控制)`
- 双 CTA：`查看客户痛点` / `了解大禹安全`
- 右侧主视觉：**用你上传的 3D 等距图**（替换原来的方块插画）

## 技术执行

```text
src/
├── styles.css                 # 新增深色科技风 token：背景/前景/primary(青蓝)/glow/border
├── assets/
│   └── hero-shield.png        # 从 user-uploads:// 拷贝过来
└── routes/
    └── index.tsx              # 重写为 Hero Demo（含导航 + Hero 区）
```

1. **设计 token**：在 `src/styles.css` 的 `:root` 中新增/覆盖：`--background` 深近黑蓝、`--foreground` 近白、`--primary` 电光蓝、`--accent` 淡紫高光、`--border` 半透明白、再加 `--glow-primary`、`--gradient-hero`、`--shadow-glow` 几个自定义变量。`.dark` 同步。
2. **资源**：把 `user-uploads://a_professional_3d_isometric_composition_...png` 拷贝到 `src/assets/hero-shield.png`，在 `index.tsx` 里以 ES6 import 引入。
3. **首页**：完全替换占位内容，组装：
   - 顶部 sticky 半透明玻璃导航
   - 两栏 Hero（左文字 / 右图），移动端单栏
   - 公式胶囊使用蓝色边缘光的玻璃面板
   - 主 CTA 实心青蓝 + 辉光，次 CTA 玻璃描边
   - 背景层：径向蓝光 + 细网格 + 顶部下沉光
4. **head meta**：更新 title / description 为「大禹安全 · 数字业务保障基础设施」。
5. **不做**：不改 routing、不加新页面、不引入新依赖、不动其它章节（你说了不需要）。

## 交付说明

完成后你会在 Lovable 预览看到一屏 Hero Demo。如果方向对，再把它的 CSS token + Hero JSX 搬到真实的 dy-sec.com 项目即可；如果想再调色或换字体，告诉我具体方向我继续微调。
