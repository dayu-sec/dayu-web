import { Background } from "./Background";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Background />
      <SiteHeader />
      <main className="relative z-10">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Eyebrow({ children, tone = "primary" }: { children: React.ReactNode; tone?: "primary" | "risk" }) {
  const isRisk = tone === "risk";
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs backdrop-blur ${
        isRisk ? "border border-risk/40 bg-risk/10 text-risk" : "border border-primary/30 bg-primary/10 text-primary"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isRisk ? "bg-risk shadow-[0_0_8px_oklch(0.62_0.24_20)]" : "bg-primary shadow-[0_0_8px_var(--glow-primary)]"}`}
      />
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="order-2 lg:order-1">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
          {children}
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 backdrop-blur-md">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                width={1024}
                height={768}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-card/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}