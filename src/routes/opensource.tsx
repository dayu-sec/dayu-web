import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Eyebrow } from "@/components/site/PageShell";
import coverOpensource from "@/assets/cover-opensource.jpg";

export const Route = createFileRoute("/opensource")({
  head: () => ({
    meta: [
      { title: "开源技术 · 大禹安全" },
      { name: "description", content: "WarpParse、WarpFusion、Galaxy-Ops 与 Galaxy-Flow —— 大禹安全坚持开源、可审计、可持续演进的技术底座。" },
      { property: "og:title", content: "开源技术 · 大禹安全" },
      { property: "og:description", content: "面向复杂日志与实时事件处理的高性能开源底座。" },
    ],
    links: [{ rel: "canonical", href: "https://style-refine-works.lovable.app/opensource" }],
  }),
  component: OpenSourcePage,
});

const VALUES = [
  { t: "建立客户可信", d: "核心能力透明可验，客户可以判断边界、机制、质量与真实水平。" },
  { t: "增强竞争力", d: "开放持续吸收开发者反馈、同行比较与真实场景压力，避免系统停留在旧路径里。" },
  { t: "商业边界", d: "开源战略不等于免费战略。以开源沉淀底座，以企业级服务、场景化建设、长期运营支持和规则模型资产实现商业化。" },
  { t: "国产信创支持", d: "持续推进核心底座在鲲鹏、openEuler、银河麒麟等软硬件体系上的适配与验证，支持国产化部署。" },
];

const WARPPARSE = [
  { t: "高性能数据处理", d: "面向高吞吐、强实时、复杂结构场景，统一完成接入、解析、转换与分发。" },
  { t: "WPL / OML", d: "把解析规则、对象建模与后处理逻辑提升为语义化、声明式表达，更适合长期维护与协作。" },
  { t: "工程化流水线", d: "通过配置化并行流水线组织接入、解析、转换、路由与输出，把交付沉淀为可治理工程资产。" },
  { t: "生产级落地", d: "围绕高吞吐、零拷贝、背压控制和国产环境适配建设基础能力，支撑生产级场景持续运行。" },
];

const BENCH = [
  { label: "WarpParse · File", v: "286k", x: "5.56x" },
  { label: "WarpParse · TCP", v: "259k", x: "3.10x" },
  { label: "解析+转换 · File", v: "204k", x: "4.45x" },
  { label: "解析+转换 · TCP", v: "190k", x: "2.40x" },
];

const WARPFUSION = [
  { t: "实时关联计算", d: "支持跨数据源关联、时间窗口聚合、时序链匹配与缺失事件检测。" },
  { t: "WFL 规则语言", d: "通过 WFL 统一表达时序、实体、评分和输出，把关联分析提升为可维护规则体系。" },
  { t: "规则表达更完整", d: "相比 YARA-L、EQL、Sigma 等主流 DSL，WFL 在双阶段匹配、实体建模和可解释评分上更完整。" },
  { t: "轻量独立运行", d: "独立部署、单机可用、低依赖，并可平滑扩展到分布式场景。" },
];

const GALAXIO = [
  { t: "Galaxy-Ops", d: "面向运维交付的开源组织与配置工具，用于管理模块、组合系统、导入项目、维护值文件，把交付过程沉淀为可重复执行的资产。" },
  { t: "Galaxy-Flow", d: "基于 GXL 的开源工作流引擎，用于定义流程、组织执行逻辑、编排工程动作，把自动化过程沉淀为可复用工作流。" },
];

function Cards({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((i) => (
        <div key={i.t} className="rounded-xl border border-white/10 bg-card/40 p-5 backdrop-blur-md transition-colors hover:border-primary/40">
          <p className="text-base font-semibold text-foreground">{i.t}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.d}</p>
        </div>
      ))}
    </div>
  );
}

function OpenSourcePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Open Technology Strategy</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              开源构建可信基石
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              越靠近关键底座，越需要透明、可验、可继承、可持续演进的能力，而不是把长期命运交给封闭黑盒。
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
            <img
              src={coverOpensource}
              alt="开源技术数据处理底座示意"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative w-full rounded-2xl border border-white/10 shadow-[0_0_60px_oklch(0.82_0.14_220/0.18)]"
            />
          </div>
        </div>
        <div className="mt-12">
          <Cards items={VALUES} />
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <Eyebrow>WarpParse</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">瞬析 WarpParse</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            WarpParse 不是传统 ETL 的又一层封装，而是面向复杂日志与实时事件处理的高性能数据处理底座。
          </p>
          <div className="mt-10"><Cards items={WARPPARSE} /></div>
          <div className="mt-10 rounded-2xl border border-primary/20 bg-card/30 p-6 backdrop-blur-md lg:p-8">
            <h3 className="text-lg font-semibold text-foreground">MixLog 基准对比</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              基于 Linux benchmark report 中的 Mixed Log 数据，平均日志大小 886B，四类日志按 3:2:1:1 混合。
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BENCH.map((b) => (
                <div key={b.label} className="rounded-xl border border-primary/25 bg-primary/[0.06] p-5">
                  <p className="text-xs text-muted-foreground">{b.label}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{b.v}<span className="text-sm font-medium text-muted-foreground"> /s</span></p>
                  <p className="mt-1 text-sm font-semibold text-primary">{b.x} vs Vector</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://warpparse.ai/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110" style={{ boxShadow: "var(--shadow-glow)" }}>WarpParse 官网</a>
            <a href="https://github.com/wp-labs" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/60">WarpParse GitHub</a>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <Eyebrow>瞬联</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">瞬联 WarpFusion</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            瞬联用于补上瞬析之后的关联分析层。当前已完成单机 Demo，正在向工程化能力推进，把实时分析从单条解析推进到多流关联、窗口计算和风险判断。
          </p>
          <div className="mt-10"><Cards items={WARPFUSION} /></div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <Eyebrow>Galaxio Series</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Galaxy-Ops / Galaxy-Flow</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            围绕交付组织与自动化编排，大禹安全持续建设 Galaxio 系列开源能力，让工程过程本身能够被沉淀、复用与演进。
          </p>
          <div className="mt-10"><Cards items={GALAXIO} /></div>
        </div>
      </section>
    </PageShell>
  );
}