import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PageShell, Eyebrow } from "@/components/site/PageShell";

export const Route = createFileRoute("/case")({
  head: () => ({
    meta: [
      { title: "合作案例 · 大禹安全" },
      { name: "description", content: "通过真实合作案例说明大禹安全的保障体系如何进入复杂环境、持续落地。" },
      { property: "og:title", content: "合作案例 · 大禹安全" },
      { property: "og:description", content: "城市级安全运营中心、行业安全平台与数字平台实时监测。" },
    ],
    links: [{ rel: "canonical", href: "https://style-refine-works.lovable.app/case" }],
  }),
  component: CasePage,
});

const CASES = [
  { t: "城市级安全运营中心", d: "统一接入多类安全设备、云平台和业务系统数据，建设稳定可运营的保障底座。" },
  { t: "行业安全平台与托管运营", d: "支撑多租户、多来源、多规则体系的数据治理与持续运营。" },
  { t: "数字平台实时监测与审计", d: "支撑实时观测、审计留痕、异常检测和风控分析。" },
];

const MILESTONES = [
  { n: "01", t: "2022 北京冬奥会", d: "团队参与 2022 北京冬奥会三级安全运营体系设计与建设。" },
  { n: "02", t: "长沙城运安全运营中心", d: "团队参与 2022 年长沙城市安全运营中心设计建设。" },
  { n: "03", t: "国家级大型电网", d: "团队参与国家级大型电网安全运营保障体系的建设与持续运营。" },
];

function CasePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10">
        <Eyebrow>Trusted Partner</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          合作案例
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          不是围绕单点产品罗列用例，而是通过真实合作案例说明这套体系如何进入复杂环境、持续落地。
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {CASES.map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-md transition-colors hover:border-primary/40">
              <h3 className="text-lg font-semibold text-foreground">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">长期协同的关键工程</h2>
          <div className="mt-10 space-y-4">
            {MILESTONES.map((m) => (
              <div key={m.n} className="flex items-start gap-5 rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-md transition-colors hover:border-primary/40">
                <span className="text-3xl font-bold text-primary/30">{m.n}</span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{m.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/about" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110" style={{ boxShadow: "var(--shadow-glow)" }}>
              了解大禹安全
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}