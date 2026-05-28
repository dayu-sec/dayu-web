import { createFileRoute } from "@tanstack/react-router";
import heroShield from "@/assets/hero-shield.png";

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

const NAV = [
  { label: "首页", href: "#" },
  { label: "客户痛点", href: "#pain" },
  { label: "保障体系", href: "#system" },
  { label: "开源技术", href: "#oss" },
  { label: "合作案例", href: "#case" },
  { label: "关于我们", href: "#about" },
];

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
    </div>
  );
}
