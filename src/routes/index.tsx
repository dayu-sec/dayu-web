import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroShield from "@/assets/hero-shield.png";
import { PageShell, Eyebrow } from "@/components/site/PageShell";

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
type NodeKind = "core" | "hub" | "data" | "tool" | "system" | "infra";
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
      { id: "firewall", label: "FireWall", kind: "infra", x: 3, y: 87, w: 14, h: 5 },
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

const TOP_SYSTEMS = [
  { id: "sec", label: "网络安全系统" },
  { id: "ops", label: "监控运维系统" },
  { id: "risk", label: "人员风险系统" },
];

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
      return "border-primary/60 bg-primary/15 text-foreground shadow-[0_0_24px_oklch(0.82_0.14_220/0.35)]";
    case "hub":
      return "border-accent/60 bg-accent/15 text-foreground shadow-[0_0_22px_oklch(0.78_0.12_300/0.35)]";
    case "data":
      return "border-primary/35 bg-primary/8 text-foreground/95";
    case "tool":
      return "border-primary/30 bg-white/[0.04] text-foreground/90";
    case "system":
      return "border-primary/30 bg-card/60 text-foreground";
    case "infra":
    default:
      return "border-white/10 bg-white/[0.03] text-muted-foreground";
  }
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 85%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "oklch(0.55 0.18 220 / 0.35)" }}
      />

      {/* Nav */}
      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#" className="group flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center rounded-md border border-primary/40 bg-primary/10 text-primary shadow-[0_0_18px_oklch(0.82_0.14_220/0.45)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="m8.5 12 2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-base font-semibold tracking-wide text-foreground">
              大禹安全
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm transition-colors ${i === 0 ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 lg:pt-16">
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
              <div className="relative rounded-2xl border border-primary/25 bg-card/40 px-5 py-4 backdrop-blur-md shadow-[inset_0_0_0_1px_oklch(1_0_0/0.04),0_0_40px_oklch(0.82_0.14_220/0.18)]">
                <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
                <p className="text-sm font-medium text-foreground/95">
                  <span className="text-primary">保障机制</span> ={" "}
                  <span className="text-foreground/80">业务视角</span> × (资产 + 运行观测 + 可靠运维 + 安全风险控制)
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#pain"
                className="group relative inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
                style={{ boxShadow: "var(--shadow-glow)" }}
              >
                查看客户痛点
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/60 hover:bg-white/[0.06]"
              >
                了解大禹安全
              </a>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative animate-[fadeUp_0.9s_ease-out_both]">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.55 0.18 220 / 0.45), transparent 65%)" }}
            />
            <div className="relative">
              <img
                src={heroShield}
                alt="数字业务保障基础设施 — 资产、观测、运维与风险控制 3D 可视化"
                className="relative h-auto w-full animate-[floaty_7s_ease-in-out_infinite] select-none drop-shadow-[0_30px_60px_oklch(0.55_0.18_220/0.35)]"
                draggable={false}
              />
              {/* corner brackets */}
              <span className="pointer-events-none absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-primary/70" />
              <span className="pointer-events-none absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-primary/70" />
              <span className="pointer-events-none absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-primary/70" />
              <span className="pointer-events-none absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-primary/70" />
            </div>
          </div>
        </section>
      </main>

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
    </div>
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

        {/* Top system tags */}
        <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4 lg:max-w-[60%] lg:ml-[33%]">
          {TOP_SYSTEMS.map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-primary/20 bg-card/50 px-4 py-3 text-center text-xs font-medium text-foreground/90 backdrop-blur sm:text-sm"
            >
              {s.label}
            </div>
          ))}
        </div>

        {/* Diagram canvas */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-primary/20 bg-card/30 p-4 backdrop-blur-md shadow-[0_0_60px_oklch(0.82_0.14_220/0.12)] sm:p-6">
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
                  markerWidth="5"
                  markerHeight="5"
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
                // simple orthogonal-ish curve
                const midX = (x1 + x2) / 2;
                const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
                return (
                  <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="url(#edge)"
                    strokeWidth="0.25"
                    markerEnd="url(#arrow)"
                    opacity="0.85"
                  />
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
                <span className="absolute left-3 top-2 text-[11px] font-medium uppercase tracking-wider text-primary/80">
                  {g.label}
                </span>
              </div>
            ))}

            {/* Nodes */}
            {allNodes.map((n) => (
              <div
                key={n.id}
                className={`absolute grid place-items-center rounded-md border px-2 text-center text-[11px] font-medium leading-tight backdrop-blur sm:text-xs ${nodeTone(n.kind)}`}
                style={{
                  left: `${n.x}%`, top: `${n.y}%`,
                  width: `${n.w}%`, height: `${n.h}%`,
                }}
              >
                {n.label}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
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
