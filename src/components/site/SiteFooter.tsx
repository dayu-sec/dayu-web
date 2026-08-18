import { Link } from "@tanstack/react-router";
import logoGlyph from "@/assets/logo-glyph.png";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-md border border-primary/40 bg-primary/10 shadow-[0_0_18px_oklch(0.72_0.16_230/0.45)]">
                <span
                  aria-hidden
                  className="h-5 w-5 bg-primary"
                  style={{
                    maskImage: `url(${logoGlyph})`,
                    WebkitMaskImage: `url(${logoGlyph})`,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                  }}
                />
              </span>
              <span className="text-base font-semibold tracking-wide text-foreground">大禹安全</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              面向数字业务保障的基础设施公司。围绕资产、观测、运维与风险控制，建设可持续的保障底座。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol title="导航" links={[
              { label: "首页", to: "/" },
              { label: "开源技术", to: "/opensource" },
              { label: "合作案例", to: "/case" },
              { label: "关于我们", to: "/about" },
            ]} />
            <FooterCol title="开源" links={[
              { label: "WarpParse", to: "/opensource" },
              { label: "WarpFusion", to: "/opensource" },
              { label: "Galaxy-Ops", to: "/opensource" },
              { label: "Galaxy-Flow", to: "/opensource" },
            ]} />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/80">联系</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>contact@dy-sec.com</li>
                <li>成立于 2025 年</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span>© {new Date().getFullYear()} 大禹安全 · 数字业务保障基础设施</span>
            <a
              href="https://beian.miit.gov.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              湘ICP备2025110699号-1
            </a>
          </div>
          <span>开源 · 可审计 · 可持续演进</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/80">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}