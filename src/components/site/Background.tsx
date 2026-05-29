export function Background() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 35%, transparent 85%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[520px] w-[1100px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "oklch(0.55 0.18 220 / 0.30)" }}
      />
    </>
  );
}