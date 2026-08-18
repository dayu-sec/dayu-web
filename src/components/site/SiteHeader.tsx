import { Link } from "@tanstack/react-router";
import logoGlyph from "@/assets/logo-glyph.png";

const NAV: { label: string; to: string; hash?: string }[] = [
  { label: "首页", to: "/" },
  { label: "客户痛点", to: "/", hash: "pain" },
  { label: "保障体系", to: "/", hash: "system" },
  { label: "开源技术", to: "/opensource" },
  { label: "合作案例", to: "/case" },
  { label: "关于我们", to: "/about" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-md border border-primary/40 bg-primary/10 shadow-[0_0_18px_oklch(0.72_0.16_230/0.45)]">
            <span
              aria-hidden
              className="h-5 w-5 bg-primary transition-transform group-hover:scale-110"
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
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeOptions={{ exact: true }}
              activeProps={item.hash ? undefined : { className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}