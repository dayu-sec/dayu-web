import { useState, type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Boxes, Network, Database, Wrench, Layers, ShieldAlert, ShieldCheck, Activity, UserCog, type LucideIcon } from "lucide-react";
import heroShield from "@/assets/hero-shield.png";
import caseWinterOlympics from "@/assets/case-winter-olympics.jpg";
import caseCityOps from "@/assets/case-city-ops.jpg";
import casePowerGrid from "@/assets/case-power-grid.jpg";
import { PageShell, Eyebrow } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import warpparseLogo from "@/assets/warpparse-logo.svg";

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
  iconUrl?: string;
  // % coords inside the diagram viewport (0-100)
  x: number; y: number; w: number; h: number;
};

// Flat node set — strict column/row grid mirroring the reference diagram.
// Columns: A(left inputs) B(left hubs) C(center) D(fusion) E(right decision/right inputs)
const DIAGRAM_NODES: DNode[] = [
  // 左上接入区（自上而下汇入 AOC-HUB）
  { id: "domainsys", label: "DomainSys", kind: "system", x: 17, y: 5, w: 15, h: 8 },
  { id: "wp-tl", label: "wp-insightd", kind: "core", x: 0, y: 18, w: 16, h: 10 },
  { id: "aoc-tl", label: "AOC-HUB", kind: "hub", x: 17, y: 31, w: 15, h: 8 },
  // 左下接入区（自下而上汇入 AOC-HUB）
  { id: "aoc-bl", label: "AOC-HUB", kind: "hub", x: 17, y: 52, w: 15, h: 8 },
  { id: "wp-bl", label: "wp-insightd", kind: "core", x: 0, y: 62, w: 16, h: 10 },
  { id: "firewall", label: "FireWall", kind: "security", x: 0, y: 79, w: 15, h: 8 },
  // 右侧接入区
  { id: "wp-r", label: "wp-insightd", kind: "core", x: 79, y: 18, w: 18, h: 10 },
  { id: "aoc-r", label: "AOC-HUB", kind: "hub", x: 79, y: 38, w: 18, h: 8 },
  // 中枢区（大节点）
  { id: "warpparse", label: "WarpParse", kind: "core", iconUrl: warpparseLogo, x: 39, y: 27, w: 18, h: 16 },
  { id: "obs", label: "OBS Data", kind: "data", x: 39, y: 71, w: 18, h: 16 },
  { id: "warpfusion", label: "WarpFusion", kind: "core", x: 61, y: 52, w: 14, h: 8 },
  // 决策执行区
  { id: "ai-agent", label: "AI Agent", kind: "tool", x: 76, y: 52, w: 10, h: 8 },
  { id: "exector", label: "Exector", kind: "tool", x: 89, y: 52, w: 9, h: 8 },
  { id: "value", label: "Value Data", kind: "data", x: 76, y: 64, w: 22, h: 8 },
  { id: "twins", label: "Domain Sys Twins", kind: "data", x: 76, y: 77, w: 22, h: 12 },
];

const NODE_ICONS: Record<NodeKind, LucideIcon> = {
  core: Boxes,
  hub: Network,
  data: Database,
  tool: Wrench,
  system: Layers,
  security: ShieldAlert,
};

// Top target systems — diagram outputs flow up into these.
const TOP_SYSTEMS: { label: string; icon: LucideIcon; color: string }[] = [
  { label: "网络安全系统", icon: ShieldCheck, color: "oklch(0.62 0.24 20)" },
  { label: "监控运维系统", icon: Activity, color: "oklch(0.82 0.14 220)" },
  { label: "人员风险系统", icon: UserCog, color: "oklch(0.78 0.12 300)" },
];

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
  { points: [[44, 43], [44, 71]] }, // WarpParse -> OBS Data
  { points: [[75, 56], [76, 56]] }, // WarpFusion -> AI Agent
  { points: [[86, 56], [89, 56]] }, // AI Agent -> Exector
  { points: [[65, 60], [65, 68], [76, 68]] }, // WarpFusion -> Value Data
  { points: [[87, 64], [87, 62], [81, 62], [81, 60]] }, // Value Data -> AI Agent
  { points: [[71, 60], [71, 82], [75, 82]] }, // WarpFusion -> Domain Sys Twins
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

// ---- Switchable color palettes for the architecture diagram ----
type Tone = { border: string; bg: string; glow: number };
type Palette = {
  id: string;
  name: string;
  mode: "dark" | "light";
  canvas: string; // diagram canvas background
  gridColor: string; // faint grid lines
  text: string; // node text color
  edge: [string, string]; // edge gradient stops
  pulse: string; // flowing pulse color
  tones: Record<NodeKind, Tone>;
};

// helper: build a tone set from a single hue (mono) or two hues (duo)
function tones(
  mode: "dark" | "light",
  a: number, // primary hue
  b: number, // secondary hue (duo). pass a for mono
  secHue: number, // security accent hue
): Record<NodeKind, Tone> {
  if (mode === "dark") {
    return {
      core: { border: `oklch(0.82 0.15 ${a})`, bg: `oklch(0.5 0.15 ${a} / 0.6)`, glow: 28 },
      hub: { border: `oklch(0.6 0.12 ${b})`, bg: `oklch(0.34 0.1 ${b} / 0.65)`, glow: 22 },
      data: { border: `oklch(0.72 0.12 ${a})`, bg: `oklch(0.42 0.11 ${a} / 0.55)`, glow: 20 },
      tool: { border: `oklch(0.62 0.12 ${b})`, bg: `oklch(0.36 0.1 ${b} / 0.6)`, glow: 18 },
      system: { border: `oklch(0.6 0.03 ${a})`, bg: `oklch(0.36 0.02 ${a} / 0.55)`, glow: 16 },
      security: { border: `oklch(0.62 0.22 ${secHue})`, bg: `oklch(0.44 0.18 ${secHue} / 0.55)`, glow: 24 },
    };
  }
  return {
    core: { border: `oklch(0.6 0.16 ${a})`, bg: `oklch(0.92 0.06 ${a} / 0.85)`, glow: 18 },
    hub: { border: `oklch(0.55 0.13 ${b})`, bg: `oklch(0.9 0.05 ${b} / 0.85)`, glow: 14 },
    data: { border: `oklch(0.62 0.12 ${a})`, bg: `oklch(0.93 0.05 ${a} / 0.85)`, glow: 12 },
    tool: { border: `oklch(0.58 0.12 ${b})`, bg: `oklch(0.92 0.05 ${b} / 0.85)`, glow: 12 },
    system: { border: `oklch(0.6 0.03 ${a})`, bg: `oklch(0.94 0.01 ${a} / 0.85)`, glow: 10 },
    security: { border: `oklch(0.58 0.2 ${secHue})`, bg: `oklch(0.92 0.09 ${secHue} / 0.85)`, glow: 14 },
  };
}

const PALETTES: Palette[] = [
  {
    id: "cyan-dark",
    name: "青蓝单色 · 深色",
    mode: "dark",
    canvas: "oklch(0.17 0.026 248 / 0.3)",
    gridColor: "oklch(1 0 0 / 0.18)",
    text: "oklch(0.98 0.006 230)",
    edge: ["oklch(0.82 0.14 225 / 0.9)", "oklch(0.7 0.14 235 / 0.9)"],
    pulse: "oklch(0.95 0.06 220)",
    tones: tones("dark", 225, 235, 20),
  },
  {
    id: "cyan-light",
    name: "青蓝单色 · 浅色",
    mode: "light",
    canvas: "oklch(0.98 0.008 225 / 0.9)",
    gridColor: "oklch(0.55 0.05 235 / 0.14)",
    text: "oklch(0.25 0.03 240)",
    edge: ["oklch(0.55 0.14 225 / 0.9)", "oklch(0.5 0.14 235 / 0.9)"],
    pulse: "oklch(0.6 0.16 220)",
    tones: tones("light", 225, 235, 20),
  },
  {
    id: "indigo-dark",
    name: "蓝紫双色 · 深色",
    mode: "dark",
    canvas: "oklch(0.17 0.03 275 / 0.35)",
    gridColor: "oklch(1 0 0 / 0.16)",
    text: "oklch(0.98 0.006 280)",
    edge: ["oklch(0.78 0.14 250 / 0.9)", "oklch(0.7 0.16 300 / 0.9)"],
    pulse: "oklch(0.92 0.08 285)",
    tones: tones("dark", 250, 300, 15),
  },
  {
    id: "indigo-light",
    name: "蓝紫双色 · 浅色",
    mode: "light",
    canvas: "oklch(0.98 0.01 285 / 0.92)",
    gridColor: "oklch(0.5 0.06 285 / 0.14)",
    text: "oklch(0.25 0.04 285)",
    edge: ["oklch(0.52 0.16 255 / 0.9)", "oklch(0.5 0.18 300 / 0.9)"],
    pulse: "oklch(0.55 0.18 285)",
    tones: tones("light", 250, 300, 15),
  },
  {
    id: "emerald-dark",
    name: "翡翠双色 · 深色",
    mode: "dark",
    canvas: "oklch(0.16 0.02 175 / 0.35)",
    gridColor: "oklch(1 0 0 / 0.15)",
    text: "oklch(0.98 0.006 170)",
    edge: ["oklch(0.8 0.14 170 / 0.9)", "oklch(0.75 0.13 200 / 0.9)"],
    pulse: "oklch(0.92 0.1 175)",
    tones: tones("dark", 170, 200, 30),
  },
  {
    id: "graphite-light",
    name: "石墨单色 · 浅色",
    mode: "light",
    canvas: "oklch(0.97 0.004 250 / 0.95)",
    gridColor: "oklch(0.4 0.02 250 / 0.12)",
    text: "oklch(0.22 0.02 250)",
    edge: ["oklch(0.5 0.03 250 / 0.9)", "oklch(0.45 0.04 250 / 0.9)"],
    pulse: "oklch(0.4 0.05 250)",
    tones: tones("light", 250, 250, 250),
  },
];

function nodeStyle(p: Palette, kind: NodeKind): CSSProperties {
  const t = p.tones[kind];
  return {
    borderColor: t.border,
    background: t.bg,
    color: p.text,
    boxShadow: `0 0 ${t.glow}px ${t.border.replace(")", " / 0.5)")}`,
  };
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
  const [paletteId, setPaletteId] = useState(PALETTES[0].id);
  const palette = PALETTES.find((p) => p.id === paletteId) ?? PALETTES[0];
  const legend: { kind: NodeKind; label: string }[] = [
    { kind: "core", label: "核心模块" },
    { kind: "hub", label: "接入枢纽 AOC-HUB" },
    { kind: "data", label: "数据层" },
    { kind: "tool", label: "处理工具" },
    { kind: "security", label: "安全边界" },
  ];
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

        {/* Palette switcher */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-muted-foreground">配色预览</span>
          {PALETTES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPaletteId(p.id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                p.id === paletteId
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-foreground"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: p.tones.core.border, boxShadow: `0 0 6px ${p.tones.core.border}` }}
              />
              {p.name}
            </button>
          ))}
        </div>

        {/* Diagram canvas */}
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-primary/20 p-4 backdrop-blur-md shadow-[0_0_60px_oklch(0.72_0.16_230/0.12)] transition-colors duration-500 sm:p-6"
          style={{ background: palette.canvas }}
        >
          {/* Top target systems — outputs flow up into these */}
          <div className="relative z-10 mb-2 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {TOP_SYSTEMS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center">
                  <div className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-primary/20 bg-white/[0.03] px-4 py-3 text-center backdrop-blur-md">
                    <Icon className="h-5 w-5 shrink-0" style={{ color: s.color }} strokeWidth={2} />
                    <span className="whitespace-nowrap text-sm font-medium text-foreground">{s.label}</span>
                  </div>
                  {/* upward gradient arrow */}
                  <svg width="20" height="34" viewBox="0 0 20 34" className="mt-1.5" aria-hidden>
                    <defs>
                      <linearGradient id={`up-${s.label}`} x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="oklch(0.82 0.14 220)" />
                        <stop offset="100%" stopColor="oklch(0.78 0.12 300)" />
                      </linearGradient>
                    </defs>
                    <path d="M10 33 L10 9" stroke={`url(#up-${s.label})`} strokeWidth="3" strokeLinecap="round" />
                    <path d="M3 13 L10 4 L17 13" fill="none" stroke={`url(#up-${s.label})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              );
            })}
          </div>

          {/* faint grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `linear-gradient(to right, ${palette.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${palette.gridColor} 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative" style={{ aspectRatio: "16 / 10", minHeight: 520 }}>
            {/* SVG edges layer */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 6 6"
                  refX="5"
                  refY="3"
                  markerWidth="0.55"
                  markerHeight="0.55"
                  markerUnits="userSpaceOnUse"
                  orient="auto-start-reverse"
                >
                  {/* thin open chevron — no fill */}
                  <path
                    d="M1.4,1 L5,3 L1.4,5"
                    fill="none"
                    stroke={palette.edge[0]}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>
                <linearGradient id="edge" x1="0" x2="1">
                  <stop offset="0%" stopColor={palette.edge[0]} />
                  <stop offset="100%" stopColor={palette.edge[1]} />
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
                      strokeWidth="1.6"
                      vectorEffect="non-scaling-stroke"
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
                      stroke={palette.pulse}
                      strokeWidth="1.6"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="4 18"
                      style={{ animationDelay: `${(i % 5) * 0.4}s` }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {DIAGRAM_NODES.map((n) => {
              const big = n.h >= 12;
              return (
                <div
                  key={n.id}
                  className={`absolute flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border px-2 text-center font-medium leading-tight backdrop-blur-md transition-colors duration-500 ${big ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}
                  style={{
                    left: `${n.x}%`, top: `${n.y}%`,
                    width: `${n.w}%`, height: `${n.h}%`,
                    ...nodeStyle(palette, n.kind),
                  }}
                >
                  {(() => {
                    if (n.iconUrl) {
                      return (
                        <img
                          src={n.iconUrl}
                          alt=""
                          aria-hidden
                          className={`shrink-0 opacity-95 ${big ? "h-7 w-7 sm:h-9 sm:w-9" : "h-5 w-5 sm:h-6 sm:w-6"}`}
                        />
                      );
                    }
                    const Icon = NODE_ICONS[n.kind];
                    return Icon ? (
                      <Icon
                        className={`shrink-0 opacity-90 ${big ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5 sm:h-[22px] sm:w-[22px]"}`}
                        strokeWidth={2}
                      />
                    ) : null;
                  })()}
                  <span>{n.label}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
            {legend.map((l) => (
              <LegendDot
                key={l.kind}
                color={palette.tones[l.kind].border}
                label={l.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
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
