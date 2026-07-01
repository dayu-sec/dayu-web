import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Boxes, Network, Database, Wrench, Layers, ShieldAlert, type LucideIcon } from "lucide-react";
import heroShield from "@/assets/hero-shield.png";
import caseWinterOlympics from "@/assets/case-winter-olympics.jpg";
import caseCityOps from "@/assets/case-city-ops.jpg";
import casePowerGrid from "@/assets/case-power-grid.jpg";
import { PageShell, Eyebrow } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "大禹安全 · 数字业务保障基础设施" },
      { name: "description", content: "大禹安全围绕资产、观测、运维与风险控制，建设服务数字业务的可持续保障平台。" },
      { property: "og:title", content: "大禹安全 · 数字业务保障基础设施" },
      { property: "og:description", content: "从业务目标出发，建设整体保障能力。" },
    ],
  }),
  component: Index,
});

// ---- Architecture diagram data (node structure & flow mirror uploaded 架构图) ----
type NodeKind = "core" | "hub" | "data" | "tool" | "system" | "security";
type DNode = {
  id: string;
  label: string;
  kind: NodeKind;
  // % coords inside the diagram viewport (0-100)
  x: number; y: number; w: number; h: number;
};

// Flat node set — strict column/row grid mirroring the reference diagram.
// Columns: A(left inputs) B(left hubs) C(center) D(fusion) E(right decision/right inputs)
const DIAGRAM_NODES: DNode[] = [
  // 左上接入区（自上而下汇入 AOC-HUB）
  { id: "domainsys", label: "DomainSys", kind: "system", x: 17, y: 5, w: 15, h: 8 },
  { id: "wp-tl", label: "wp-insightd", kind: "core", x: 0, y: 19, w: 15, h: 8 },
  { id: "aoc-tl", label: "AOC-HUB", kind: "hub", x: 17, y: 31, w: 15, h: 8 },
  // 左下接入区（自下而上汇入 AOC-HUB）
  { id: "aoc-bl", label: "AOC-HUB", kind: "hub", x: 17, y: 52, w: 15, h: 8 },
  { id: "wp-bl", label: "wp-insightd", kind: "core", x: 0, y: 63, w: 15, h: 8 },
  { id: "firewall", label: "FireWall", kind: "security", x: 0, y: 79, w: 15, h: 8 },
  // 右侧接入区
  { id: "wp-r", label: "wp-insightd", kind: "core", x: 79, y: 19, w: 18, h: 8 },
  { id: "aoc-r", label: "AOC-HUB", kind: "hub", x: 79, y: 38, w: 18, h: 8 },
  // 中枢区（大节点）
  { id: "warpparse", label: "WarpParse", kind: "core", x: 39, y: 27, w: 18, h: 16 },
  { id: "obs", label: "OBS Data", kind: "data", x: 39, y: 63, w: 18, h: 16 },
  { id: "warpfusion", label: "WarpFusion", kind: "core", x: 61, y: 52, w: 14, h: 8 },
  // 决策执行区
  { id: "ai-agent", label: "AI Agent", kind: "tool", x: 76, y: 52, w: 10, h: 8 },
  { id: "exector", label: "Exector", kind: "tool", x: 89, y: 52, w: 9, h: 8 },
  { id: "value", label: "Value Data", kind: "data", x: 76, y: 64, w: 22, h: 8 },
  { id: "twins", label: "Domain Sys Twins", kind: "data", x: 76, y: 78, w: 22, h: 8 },
];

const NODE_ICONS: Record<NodeKind, LucideIcon> = {
  core: Boxes,
  hub: Network,
  data: Database,
  tool: Wrench,
  system: Layers,
  security: ShieldAlert,
};

// Orthogonal edges as explicit polylines (% coords). Direction = data flow (arrow at end).
const DIAGRAM_EDGES: { points: [number, number][]; noArrow?: boolean }[] = [
  { points: [[24.5, 13], [24.5, 31]] }, // DomainSys -> AOC-HUB(TL)
  { points: [[15, 23], [24.5, 23]], noArrow: true }, // wp-insightd(TL) -> AOC-HUB(TL) junction
  { points: [[32, 35], [39, 35]] }, // AOC-HUB(TL) -> WarpParse
  { points: [[32, 56], [35.5, 56], [35.5, 35]], noArrow: true }, // AOC-HUB(BL) -> WarpParse (T-junction)
  { points: [[15, 67], [24.5, 67]], noArrow: true }, // wp-insightd(BL) -> AOC-HUB(BL) junction
  { points: [[15, 83], [24.5, 83], [24.5, 60]] }, // FireWall -> AOC-HUB(BL)
  { points: [[88, 27], [88, 38]] }, // wp-insightd(R) -> AOC-HUB(R)
  { points: [[79, 42], [57, 42]] }, // AOC-HUB(R) -> WarpParse
  { points: [[52, 43], [52, 56], [61, 56]] }, // WarpParse -> WarpFusion
  { points: [[68, 52], [68, 47], [54.5, 47], [54.5, 43]] }, // WarpFusion -> WarpParse (feedback)
  { points: [[44, 43], [44, 63]] }, // WarpParse -> OBS Data
  { points: [[75, 56], [76, 56]] }, // WarpFusion -> AI Agent
  { points: [[86, 56], [89, 56]] }, // AI Agent -> Exector
  { points: [[65, 60], [65, 68], [76, 68]] }, // WarpFusion -> Value Data
  { points: [[87, 64], [87, 62], [81, 62], [81, 60]] }, // Value Data -> AI Agent
  { points: [[71, 60], [71, 82], [76, 82]] }, // WarpFusion -> Domain Sys Twins
];

// Build a rounded orthogonal SVG path from polyline points.
function roundedPath(pts: [number, number][], r = 0.8) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[i + 1];
    const v1x = cx - px, v1y = cy - py; const l1 = Math.hypot(v1x, v1y) || 1;
    const v2x = nx - cx, v2y = ny - cy; const l2 = Math.hypot(v2x, v2y) || 1;
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const sx = cx - (v1x / l1) * rr, sy = cy - (v1y / l1) * rr;
    const ex = cx + (v2x / l2) * rr, ey = cy + (v2y / l2) * rr;
    d += ` L ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

function nodeTone(kind: NodeKind) {
  switch (kind) {
    case "core":
      return "border-primary/45 bg-primary/12 text-foreground shadow-[0_0_18px_oklch(0.72_0.16_230/0.18)]";
    case "hub":
      return "border-accent/45 bg-accent/12 text-foreground shadow-[0_0_18px_oklch(0.78_0.12_300/0.18)]";
    case "data":
      return "border-primary/30 bg-primary/8 text-foreground/95";
    case "tool":
      return "border-primary/30 bg-white/[0.04] text-foreground/90";
    case "system":
      return "border-primary/30 bg-card/60 text-foreground";
    case "security":
      return "border-risk/45 bg-risk/12 text-foreground shadow-[0_0_18px_oklch(0.62_0.24_20/0.20)]";
    default:
      return "border-white/10 bg-white/[0.03] text-muted-foreground";
  }
}

function Index() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16 lg:px-10 lg:pt-16">
          {/* Left: copy */}
          <div className="animate-[fadeUp_0.7s_ease-out_both]">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--glow-primary)]" />
              数字业务保障基础设施
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              为数字业务构建
              <br />
              <span className="bg-gradient-to-r from-primary via-[oklch(0.88_0.12_210)] to-accent bg-clip-text text-transparent">
                保障基础设施
              </span>
            </h1>

            <p className="mt-5 text-lg font-medium text-foreground/90">
              从业务目标出发，建设整体保障能力
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              大禹安全围绕资产、观测、运维与风险控制，建设服务数字业务的可持续保障平台。
            </p>

            {/* Formula capsule */}
            <div className="mt-8 max-w-2xl">
              <div className="relative rounded-2xl border border-primary/25 bg-card/40 px-5 py-4 backdrop-blur-md shadow-[inset_0_0_0_1px_oklch(1_0_0/0.04),0_0_40px_oklch(0.72_0.16_230/0.18)]">
                <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
                <p className="text-sm font-medium text-foreground/95">
                  <span className="text-primary">保障机制</span> ={" "}
                  <span className="text-foreground/80">业务视角</span> × (资产 + 运行观测 + 可靠运维 + 安全风险控制)
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/"
                hash="pain"
                className="group relative inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110"
                style={{ backgroundColor: "oklch(0.55 0.18 22)", boxShadow: "0 0 18px oklch(0.55 0.18 22 / 0.35)" }}
              >
                查看客户痛点
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/60 hover:bg-white/[0.06]"
              >
                了解大禹安全
              </Link>
            </div>
          </div>

          {/* Right: hero image — borderless, fades infinitely into the background */}
          <div className="relative animate-[fadeUp_0.9s_ease-out_both] lg:scale-90">
            <img
              src={heroShield}
              alt="数字业务保障基础设施 — 资产、观测、运维与风险控制 3D 可视化"
              className="relative h-auto w-full select-none"
              draggable={false}
              style={{
                maskImage:
                  "radial-gradient(ellipse 90% 90% at 50% 50%, black 80%, transparent 99%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 90% at 50% 50%, black 80%, transparent 99%)",
              }}
            />
          </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
      `}</style>

      <Architecture />
      <Pain />
      <Solution />
      <OpenSourceTeaser />
      <Partners />
    </PageShell>
  );
}

function Architecture() {
  return (
    <section id="system" className="relative z-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--glow-primary)]" />
            技术架构
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            一体化保障架构
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            多源接入统一汇聚至 WarpParse 中枢，经 WarpFusion 融合后驱动 AI Agent 决策执行，构建从观测、解析到行动的完整链路。
          </p>
        </div>

        {/* Diagram canvas */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-primary/20 bg-card/30 p-4 backdrop-blur-md shadow-[0_0_60px_oklch(0.72_0.16_230/0.12)] sm:p-6">
          {/* faint grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(to right, oklch(1 0 0 / 0.18) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.18) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative" style={{ aspectRatio: "16 / 10", minHeight: 520 }}>
            {/* SVG edges layer */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M0,0 L10,5 L0,10 z" fill="oklch(0.82 0.14 220)" />
                </marker>
                <linearGradient id="edge" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.82 0.14 220 / 0.9)" />
                  <stop offset="100%" stopColor="oklch(0.78 0.12 300 / 0.9)" />
                </linearGradient>
              </defs>
              {DIAGRAM_EDGES.map((e, i) => {
                const d = roundedPath(e.points);
                return (
                  <g key={i}>
                    <path
                      d={d}
                      fill="none"
                      stroke="url(#edge)"
                      strokeWidth="0.45"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      markerEnd={e.noArrow ? undefined : "url(#arrow)"}
                      opacity="0.7"
                    />
                    {/* flowing light pulse overlay */}
                    <path
                      className="edge-flow"
                      d={d}
                      fill="none"
                      stroke="oklch(0.95 0.06 210)"
                      strokeWidth="0.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="3 14"
                      style={{ animationDelay: `${(i % 5) * 0.4}s` }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {DIAGRAM_NODES.map((n) => (
              <div
                key={n.id}
                className={`absolute flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border px-2 text-center text-xs font-medium leading-tight backdrop-blur-md sm:text-sm ${nodeTone(n.kind)}`}
                style={{
                  left: `${n.x}%`, top: `${n.y}%`,
                  width: `${n.w}%`, height: `${n.h}%`,
                }}
              >
                {(() => {
                  const Icon = NODE_ICONS[n.kind];
                  return Icon ? <Icon className="h-5 w-5 shrink-0 opacity-90 sm:h-[22px] sm:w-[22px]" strokeWidth={2} /> : null;
                })()}
                <span>{n.label}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
            <LegendDot className="bg-primary/60 shadow-[0_0_8px_var(--glow-primary)]" label="核心模块" />
            <LegendDot className="bg-accent/70 shadow-[0_0_8px_var(--glow-accent)]" label="接入枢纽 AOC-HUB" />
            <LegendDot className="bg-primary/30" label="数据层" />
            <LegendDot className="bg-white/30" label="处理工具" />
            <LegendDot className="bg-risk/60 shadow-[0_0_8px_oklch(0.62_0.24_20/0.5)]" label="安全边界" />
          </div>
        </div>
      </div>
    </section>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${className}`} />
      {label}
    </span>
  );
}

const PAIN_POINTS = [
  "工具越来越多，但业务影响仍然看不清",
  "数据越来越多，但对象、边界和责任仍然不清",
  "告警越来越密，但根因判断并没有变容易",
  "平台越来越重，但处置链路仍然割裂",
  "系统变化越来越快，但底座能力跟不上",
];

function Pain() {
  return (
    <section id="pain" className="relative z-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal>
          <Eyebrow tone="risk">客户痛点</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            业务越增长，<span className="text-risk">系统越脆弱</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            增长一旦持续，支撑体系里的断点就会被不断放大。
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAIN_POINTS.map((p, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className="group rounded-xl border border-white/10 bg-card/40 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-risk/40 hover:shadow-[0_12px_40px_oklch(0.62_0.24_20/0.18)]"
            >
              <span className="inline-block font-semibold text-risk/80 text-2xl transition-transform duration-300 group-hover:scale-110">0{i + 1}</span>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-primary/25 bg-card/40 p-6 backdrop-blur-md shadow-[0_0_40px_oklch(0.72_0.16_230/0.12)] lg:p-8">
          <h3 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">
            一是尽早发现
            <span className="text-risk">系统要出事</span>
            ，二是尽早发现
            <span className="text-risk">人可能出事</span>
            。
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            前者对应业务系统稳定性、连续性和关键链路风险保障，后者对应业务运营过程中的异常操作、权限滥用、内部人员风险和管理失控风险识别。
          </p>
        </div>
      </div>
    </section>
  );
}

const ROOT_CAUSES = [
  { t: "对象不清", d: "资源、资产、依赖与边界长期模糊。" },
  { t: "依赖混乱", d: "关键链路和上下游关系缺少统一认知。" },
  { t: "状态不可见", d: "异常、变化和卡点缺少持续观测。" },
  { t: "体系割裂", d: "运维、安全、观测长期分开建设。" },
];

const SOLUTIONS = [
  { t: "资产治理", d: "把对象、边界、依赖和链路持续理清" },
  { t: "整体观测", d: "让运行状态、变化与异常持续可见" },
  { t: "可靠运维", d: "把部署、变更、运行与恢复组织起来" },
  { t: "风险控制", d: "把风险识别、约束、处置纳入长期治理" },
];

function Solution() {
  return (
    <section className="relative z-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Eyebrow>根因与方案</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          围绕业务目标建设
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">根因</h3>
            <div className="mt-5 space-y-4">
              {ROOT_CAUSES.map((c) => (
                <Reveal key={c.t} from="left" className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/25">
                  <p className="text-base font-semibold text-foreground">{c.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary/80">方案 · 业务视角 Business Focus</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {SOLUTIONS.map((s) => (
                <Reveal key={s.t} from="right" className="rounded-xl border border-primary/25 bg-primary/[0.06] p-5 backdrop-blur shadow-[0_0_30px_oklch(0.72_0.16_230/0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_12px_40px_oklch(0.72_0.16_230/0.22)]">
                  <p className="text-base font-semibold text-foreground">{s.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">{s.d}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              业务稳定 · 状态可见 · 处置联动 · 风险可控 —— 让规则、模型、工具链与 AI 协同沉淀到统一的开源底座。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const OSS_ASSETS = [
  { name: "瞬析 WarpParse", d: "复杂日志与实时事件处理引擎" },
  { name: "瞬联 WarpFusion", d: "已完成单机 Demo 的实时关联分析引擎" },
  { name: "Galaxy-Ops", d: "面向运维交付的开源组织与配置工具" },
  { name: "Galaxy-Flow", d: "基于 GXL 的开源工作流引擎" },
];

function OpenSourceTeaser() {
  return (
    <section id="oss" className="relative z-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Eyebrow>Open Technology Strategy</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          开源构建可信底座
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          大禹安全坚持开源、可审计、可复核、可持续演进的技术路线。真正进入关键业务、承担保障底座职责的基础能力，必须透明、可控、可审计、可继承。
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OSS_ASSETS.map((a) => (
            <Reveal key={a.name} delay={OSS_ASSETS.indexOf(a) * 80} className="rounded-xl border border-white/10 bg-card/40 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_40px_oklch(0.72_0.16_230/0.18)]">
              <p className="text-base font-semibold text-foreground">{a.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          核心底座已完成鲲鹏、openEuler、银河麒麟等国产软硬件环境适配与验证，支持关键行业的国产化部署。
        </p>
        <div className="mt-8">
          <Link
            to="/opensource"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            查看详细开源技术
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

const PARTNER_CASES = [
  { n: "01", t: "2022 北京冬奥会", d: "团队参与 2022 北京冬奥会三级安全运营体系设计与建设。", img: caseWinterOlympics },
  { n: "02", t: "长沙城运安全运营中心", d: "团队参与 2022 年长沙城市安全运营中心设计建设。", img: caseCityOps },
  { n: "03", t: "国家级大型电网", d: "团队参与国家级大型电网安全运营保障体系的建设与持续运营。", img: casePowerGrid },
];

function Partners() {
  return (
    <section id="case" className="relative z-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Eyebrow>Trusted Partner</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          值得信赖的长期合作伙伴
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          我们不是一次性交付后离场的供应方，而是在复杂场景里与客户长期协同、持续建设保障体系的合作伙伴。
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PARTNER_CASES.map((c) => (
            <Reveal key={c.n} delay={PARTNER_CASES.indexOf(c) * 100} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_18px_50px_oklch(0.72_0.16_230/0.20)]">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.t}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover brightness-90 contrast-105 saturate-50 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/25 mix-blend-color" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/55 to-card/10" />
                <span className="absolute left-4 top-3 text-3xl font-bold text-primary drop-shadow-[0_2px_8px_oklch(0_0_0/0.6)]">{c.n}</span>
              </div>
              <div className="p-6 pt-4">
                <h3 className="text-lg font-semibold text-foreground">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/case"
            className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/60 hover:bg-white/[0.06]"
          >
            查看更多合作案例
          </Link>
        </div>
      </div>
    </section>
  );
}
