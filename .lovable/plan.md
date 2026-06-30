# 架构图重排方案

重建 `src/routes/index.tsx` 中的 `Architecture()` 组件，使其节点结构与连线逻辑严格对应上传的架构图，但完全沿用网站现有的视觉设计语言（暗色、青蓝/淡紫 glow、圆角、字体、节点风格）。不引入图片，纯 React + Tailwind + SVG。

## 一、节点集合（严格按图，移除多余元素）

移除：分组容器（公有云 / IDC / WarpAixs / 办公室）、基础设施节点（Docker / 服务器 / 电脑）、顶部三个系统标签区（网络安全 / 监控运维 / 人员风险）及其上行箭头。

保留并重排为下列 16 个节点（按图分区）：

```text
左上接入区        中枢区               右侧接入区
DomainSys ─┐                          wp-insightd
wp-insightd┴─ AOC-HUB ──┐                  │
                         ├─→ WarpParse ←── AOC-HUB
左下接入区               │      │  ↑(反馈)
wp-insightd┐             │      ↓
FireWall   ┴─ AOC-HUB ──┘   WarpFusion ──→ AI Agent ──→ Exector
                            │   │   │          ↑
                            ↓   │   └→ Value Data┘
                         OBS Data └────→ Domain Sys Twins
```

## 二、连线逻辑（按图补全全部连线，共 16 条）

1. DomainSys → AOC-HUB(左上)
2. wp-insightd(左上) → AOC-HUB(左上)
3. AOC-HUB(左上) → WarpParse
4. wp-insightd(左下) → AOC-HUB(左下)
5. FireWall → AOC-HUB(左下)
6. AOC-HUB(左下) → WarpParse
7. wp-insightd(右) → AOC-HUB(右)
8. AOC-HUB(右) → WarpParse
9. WarpParse → WarpFusion
10. WarpFusion → WarpParse（反馈回环，单独走偏移折线避免与 9 重叠）
11. WarpParse → OBS Data
12. WarpFusion → AI Agent
13. AI Agent → Exector
14. WarpFusion → Value Data
15. Value Data → AI Agent
16. WarpFusion → Domain Sys Twins

不增删模块、不改变数据流向。

## 三、布局与对齐优化

- 改用规整的列/行网格坐标（百分比定位不变，但所有同列节点共用相同 `x`、同行节点共用相同 `y`、行高统一），使同一矩阵的节点严格水平/垂直对齐。
- 列结构：左接入列（DomainSys/wp-insightd/FireWall/AOC-HUB）→ WarpParse 列 → WarpFusion/OBS 列 → AI Agent/Value Data/Domain Sys Twins 列 → Exector 列；最右单独一列右侧接入（wp-insightd/AOC-HUB）。
- 连线全部改为直角折线（horizontal-then-vertical 正交路径），不出现斜线；汇聚到 WarpParse 的三条接入线用不同进入边（上/左/右）+ 直角拐点避免交叉。
- 反馈线（WarpFusion→WarpParse）走一条带横向偏移的回环折线，与正向线分开。
- 文字较长的节点（Domain Sys Twins、Value Data、wp-insightd）容器加宽，`whitespace-nowrap`，避免换行挤压。

## 四、视觉与样式（沿用现有设计语言）

- 保留 `nodeTone()` 的 kind 配色（core/hub/data/tool 等）、圆角、backdrop-blur、glow 阴影；节点改用统一高度。
- 保留现有 SVG 边的渐变描边 `url(#edge)`、箭头 marker、流光 `edge-flow` 动画。
- 保留外层 canvas 容器（圆角、边框、网格底纹、glow），以及标题区「技术架构 / 一体化保障架构」。
- 图例（LegendDot）按新节点类型更新：核心模块 / 接入枢纽 AOC-HUB / 数据层 /（移除“基础设施”，新增“处理工具”如 AI Agent·Exector）。

## 五、响应式与暗色

- 容器维持百分比布局 + `aspectRatio`，在窄屏下整体等比缩小；节点字号已有 `text-xs sm:text-sm` 响应式，沿用。
- 颜色全部走语义 token（primary/accent/foreground/muted），暗色模式自动适配，不硬编码颜色。

## 技术细节

- 仅改动 `src/routes/index.tsx`：重写 `DIAGRAM_GROUPS`（改为扁平 `DIAGRAM_NODES` 或精简的分区数据）、`DIAGRAM_EDGES`、`Architecture()` 的渲染与边路径计算函数（改为纯正交折线 + 每条边可指定进出方向以避免交叉），更新 `NODE_ICONS`/图例。
- 删除不再使用的 `TOP_SYSTEMS`、`GROUP_ICONS`、infra 相关数据与渲染块及未用的 lucide 图标 import。
- 不改动其它章节、路由、依赖。
