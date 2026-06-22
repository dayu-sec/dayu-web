import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Cloud, Server, Cpu, Building2, Boxes, Network, Database, Wrench, Layers, ShieldCheck, ShieldAlert, Activity, UserCog, type LucideIcon } from "lucide-react";
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

// ---- Architecture diagram data (mirrors uploaded 架构图2.png logic) ----
type NodeKind = "core" | "hub" | "data" | "tool" | "system" | "infra" | "security";
type DNode = {
  id: string;
  label: string;
  kind: NodeKind;
  // % coords inside the diagram viewport
  x: number; y: number; w: number; h: number;
};
type DGroup = {
  id: string;
  label: string;
  x: number; y: number; w: number; h: number;
  nodes: DNode[];
};

const DIAGRAM_GROUPS: DGroup[] = [
  {
    id: "public-cloud", label: "公有云",
    x: 1, y: 6, w: 26, h: 38,
    nodes: [
      { id: "domainsys", label: "DomainSys", kind: "infra", x: 8, y: 11, w: 14, h: 5 },
      { id: "docker", label: "Docker", kind: "infra", x: 3, y: 18, w: 22, h: 14 },
      { id: "wp-cloud", label: "wp-insightd", kind: "core", x: 6, y: 23, w: 16, h: 6 },
      { id: "aoc-cloud", label: "AOC-HUB", kind: "hub", x: 14, y: 36, w: 12, h: 5 },
    ],
  },
  {
    id: "idc", label: "IDC",
    x: 1, y: 50, w: 26, h: 46,
    nodes: [
      { id: "aoc-idc", label: "AOC-HUB", kind: "hub", x: 6, y: 56, w: 12, h: 5 },
      { id: "server", label: "服务器", kind: "infra", x: 3, y: 65, w: 22, h: 18 },
      { id: "wp-idc", label: "wp-insightd", kind: "core", x: 6, y: 71, w: 16, h: 6 },
      { id: "firewall", label: "FireWall", kind: "security", x: 3, y: 87, w: 14, h: 5 },
    ],
  },
  {
    id: "warpaixs", label: "WarpAixs",
    x: 33, y: 20, w: 47, h: 76,
    nodes: [
      { id: "warpparse", label: "WarpParse", kind: "core", x: 36, y: 26, w: 16, h: 6 },
      { id: "warpfusion", label: "WarpFusion", kind: "core", x: 36, y: 40, w: 16, h: 6 },
      { id: "obs", label: "OBS Data", kind: "data", x: 36, y: 80, w: 16, h: 6 },
      { id: "ai-agent", label: "AI Agent", kind: "tool", x: 56, y: 40, w: 10, h: 6 },
      { id: "exector", label: "Exector", kind: "tool", x: 68, y: 40, w: 10, h: 6 },
      { id: "value", label: "Value Data", kind: "data", x: 58, y: 55, w: 20, h: 6 },
      { id: "twins", label: "Domain Sys Twins", kind: "data", x: 58, y: 70, w: 20, h: 6 },
    ],
  },
  {
    id: "office", label: "办公室",
    x: 86, y: 20, w: 13, h: 60,
    nodes: [
      { id: "aoc-office", label: "AOC-HUB", kind: "hub", x: 88, y: 28, w: 9, h: 5 },
      { id: "pc", label: "电脑", kind: "infra", x: 87, y: 40, w: 11, h: 18 },
      { id: "wp-office", label: "wp-insightd", kind: "core", x: 88, y: 46, w: 9, h: 6 },
    ],
  },
];

const TOP_SYSTEMS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "sec", label: "网络安全系统", icon: ShieldCheck },
  { id: "ops", label: "监控运维系统", icon: Activity },
  { id: "risk", label: "人员风险系统", icon: UserCog },
];

const GROUP_ICONS: Record<string, LucideIcon> = {
  "public-cloud": Cloud,
  idc: Server,
  warpaixs: Cpu,
  office: Building2,
};

const NODE_ICONS: Record<NodeKind, LucideIcon> = {
  core: Boxes,
  hub: Network,
  data: Database,
  tool: Wrench,
  system: Layers,
  infra: Server,
  security: ShieldAlert,
};

// edges: [fromId, toId]
const DIAGRAM_EDGES: [string, string][] = [
  ["domainsys", "aoc-cloud"],
  ["wp-cloud", "aoc-cloud"],
  ["aoc-cloud", "warpparse"],
  ["aoc-office", "warpparse"],
  ["warpparse", "warpfusion"],
  ["warpparse", "obs"],
  ["warpfusion", "value"],
  ["warpfusion", "twins"],
  ["wp-idc", "aoc-idc"],
  ["firewall", "aoc-idc"],
  ["aoc-idc", "warpparse"],
];

function nodeTone(kind: NodeKind) {
  switch (kind) {
    case "core":
      return "border-primary/60 bg-primary/15 text-foreground shadow-[0_0_24px_oklch(0.72_0.16_230/0.35)]";
    case "hub":
      return "border-accent/60 bg-accent/15 text-foreground shadow-[0_0_22px_oklch(0.78_0.12_300/0.35)]";
    case "data":
      return "border-primary/35 bg-primary/8 text-foreground/95";
    case "tool":
      return "border-primary/30 bg-white/[0.04] text-foreground/90";
    case "system":
      return "border-primary/30 bg-card/60 text-foreground";
    case "security":
      return "border-risk/60 bg-risk/15 text-foreground shadow-[0_0_22px_oklch(0.62_0.24_20/0.40)]";
    case "infra":
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
          <div className="relative animate-[fadeUp_0.9s_ease-out_both] lg:scale-110">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 scale-125 blur-3xl"
              style={{ background: "radial-gradient(circle at 50% 45%, oklch(0.55 0.18 232 / 0.45), transparent 65%)" }}
            />
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
  // Build a flat lookup of node centers (% based) for SVG edges
  const allNodes = DIAGRAM_GROUPS.flatMap((g) => g.nodes);
  const byId = Object.fromEntries(allNodes.map((n) => [n.id, n]));

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
            覆盖公有云、IDC、办公室多场景，统一接入 WarpAixs 中台，构建从观测、解析到决策执行的完整链路。
          </p>
        </div>

        {/* Top system tags — supported by the architecture below */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:max-w-[60%] lg:ml-[33%]">
          {TOP_SYSTEMS.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-card/50 px-4 py-3 text-center text-xs font-medium text-foreground/90 backdrop-blur sm:text-sm"
            >
              <s.icon className={`h-4 w-4 shrink-0 ${s.id === "sec" ? "text-risk" : "text-primary"}`} strokeWidth={2} />
              {s.label}
            </div>
          ))}
        </div>

        {/* Upward support arrows: architecture -> top systems */}
        <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4 lg:max-w-[60%] lg:ml-[33%]">
          {TOP_SYSTEMS.map((s) => (
            <div key={s.id} className="flex justify-center">
              <svg
                className="h-10 w-6"
                viewBox="0 0 24 40"
                fill="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="edge-up" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="oklch(0.82 0.14 220 / 0.9)" />
                    <stop offset="100%" stopColor="oklch(0.78 0.12 300 / 0.9)" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 38 L12 8 M5 15 L12 6 L19 15"
                  stroke="url(#edge-up)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />
              </svg>
            </div>
          ))}
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

          <div className="relative" style={{ aspectRatio: "16 / 11", minHeight: 520 }}>
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
              {DIAGRAM_EDGES.map(([a, b], i) => {
                const na = byId[a]; const nb = byId[b];
                if (!na || !nb) return null;
                const x1 = na.x + na.w / 2;
                const y1 = na.y + na.h / 2;
                const x2 = nb.x + nb.w / 2;
                const y2 = nb.y + nb.h / 2;
                // rounded orthogonal elbow
                const midX = (x1 + x2) / 2;
                const dx1 = Math.sign(midX - x1) || 1;
                const dy2 = Math.sign(y2 - y1) || 1;
                const dx3 = Math.sign(x2 - midX) || 1;
                const seg1 = Math.abs(midX - x1);
                const seg2 = Math.abs(y2 - y1);
                const seg3 = Math.abs(x2 - midX);
                const rr = Math.min(0.8, seg1, seg2 / 2, seg3);
                const d = `M ${x1} ${y1} L ${midX - dx1 * rr} ${y1} Q ${midX} ${y1} ${midX} ${y1 + dy2 * rr} L ${midX} ${y2 - dy2 * rr} Q ${midX} ${y2} ${midX + dx3 * rr} ${y2} L ${x2} ${y2}`;
                return (
                  <g key={i}>
                    <path
                      d={d}
                      fill="none"
                      stroke="url(#edge)"
                      strokeWidth="0.55"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      markerEnd="url(#arrow)"
                      opacity="0.85"
                    />
                    {/* flowing light pulse overlay */}
                    <path
                      className="edge-flow"
                      d={d}
                      fill="none"
                      stroke="oklch(0.95 0.06 210)"
                      strokeWidth="0.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="3 14"
                      style={{ animationDelay: `${(i % 5) * 0.4}s` }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Group containers */}
            {DIAGRAM_GROUPS.map((g) => (
              <div
                key={g.id}
                className="absolute rounded-xl border border-primary/15 bg-background/40 backdrop-blur-sm"
                style={{
                  left: `${g.x}%`, top: `${g.y}%`,
                  width: `${g.w}%`, height: `${g.h}%`,
                  boxShadow: "inset 0 0 0 1px oklch(1 0 0 / 0.03)",
                }}
              >
                <span className="absolute left-3 top-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary/80">
                  {(() => {
                    const Icon = GROUP_ICONS[g.id];
                    return Icon ? <Icon className="h-3.5 w-3.5" strokeWidth={2} /> : null;
                  })()}
                  {g.label}
                </span>
              </div>
            ))}

            {/* Nodes */}
            {allNodes.map((n) => (
              <div
                key={n.id}
                className={`absolute flex items-center justify-center gap-1.5 rounded-md border px-2 text-center text-xs font-medium leading-tight backdrop-blur sm:text-sm ${nodeTone(n.kind)}`}
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
            <LegendDot className="bg-white/30" label="基础设施" />
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
        <Eyebrow tone="risk">客户痛点</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          业务越增长，<span className="text-risk">系统越脆弱</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          增长一旦持续，支撑体系里的断点就会被不断放大。
        </p>
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
            <div key={c.n} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md transition-colors hover:border-primary/40">
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
            </div>
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
