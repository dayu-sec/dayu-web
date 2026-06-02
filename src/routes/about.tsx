import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Code2, Briefcase } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import coverAbout from "@/assets/cover-about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "关于我们 · 大禹安全" },
      { name: "description", content: "大禹安全成立于 2025 年 4 月，是一家面向数字业务保障的基础设施公司。" },
      { property: "og:title", content: "关于我们 · 大禹安全" },
      { property: "og:description", content: "项目是进入方式，底座能力才是长期价值。" },
    ],
    links: [{ rel: "canonical", href: "https://style-refine-works.lovable.app/about" }],
  }),
  component: AboutPage,
});

const STRENGTHS = [
  { t: "长期做复杂系统", d: "团队长期参与安全能力平台、大型安全运营体系和实时检测分析系统建设，具备从架构设计到工程落地的完整经验。" },
  { t: "理解真实运营现场", d: "熟悉政企和关键行业客户中的数据链路、规则体系、协同流程和交付约束，知道问题往往不在单点工具，而在体系割裂。" },
  { t: "把项目沉淀成底座", d: "不把项目当作一次性交付，而是把真实场景中的连接器、规则、模型和工具链沉淀为可复用、可演进的基础能力。" },
];

const GENES = [
  { t: "从业务视角出发", d: "关注的不是单项技术是否完整，而是它是否真正支撑业务连续性、效率与风险控制。" },
  { t: "系统性分析与解决", d: "更关心系统为什么脆弱、链路为什么失联、机制为什么失效，而不是只在表面问题上补丁式应对。" },
  { t: "崇尚开放与开源", d: "越靠近关键底座，越需要透明、可验、可继承、可持续演进的能力，而不是把长期命运交给封闭黑盒。" },
];

const DIRECTIONS = [
  { t: "进入真实场景", d: "继续通过真实项目进入复杂环境，在交付中验证方法、修正模型、打磨工具，让方案始终贴近业务现场。" },
  { t: "建设长期底座", d: "把真实场景中沉淀的能力持续工程化，构建可复用、可演进的数字业务保障底座。" },
];

function Cards({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((i) => (
        <div key={i.t} className="rounded-xl border border-white/10 bg-card/40 p-6 backdrop-blur-md transition-colors hover:border-primary/40">
          <p className="text-base font-semibold text-foreground">{i.t}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.d}</p>
        </div>
      ))}
    </div>
  );
}

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="关于我们"
        title="面向数字业务保障的基础设施公司"
        description="大禹安全成立于 2025 年 4 月。我们不是从单点产品出发，而是从复杂平台建设、安全运营体系和实时检测分析系统中积累能力。"
        image={coverAbout}
        imageAlt="大禹安全数字业务保障底座示意"
      >
        <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/[0.06] p-6 backdrop-blur-md shadow-[0_0_40px_oklch(0.82_0.14_220/0.12)]">
          <p className="text-lg font-semibold text-foreground">项目是进入方式，底座能力才是长期价值。</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            团队既理解业务与运营现场，也具备底层引擎、规则体系和工程交付能力。
          </p>
        </div>
      </PageHero>
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <Cards items={STRENGTHS} />
      </section>

      <section className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">我们的基因</h2>
          <div className="mt-10"><Cards items={GENES} /></div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">我们的方向</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            项目是进入方式，不是公司本质；底座建设才是长期方向。
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {DIRECTIONS.map((d) => (
              <div key={d.t} className="rounded-xl border border-primary/25 bg-primary/[0.06] p-6 backdrop-blur shadow-[0_0_30px_oklch(0.82_0.14_220/0.10)]">
                <p className="text-base font-semibold text-foreground">{d.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">{d.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/opensource" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110" style={{ boxShadow: "var(--shadow-glow)" }}><Code2 className="h-4 w-4" strokeWidth={2} />查看开源技术</Link>
            <Link to="/case" className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/60"><Briefcase className="h-4 w-4" strokeWidth={2} />查看合作案例</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}