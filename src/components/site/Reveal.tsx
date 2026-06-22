import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** delay in ms before the reveal transition starts */
  delay?: number;
  /** translate direction for the entrance */
  from?: "up" | "down" | "left" | "right" | "none";
  as?: keyof React.JSX.IntrinsicElements;
};

const OFFSETS: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate-y-6",
  down: "-translate-y-6",
  left: "translate-x-6",
  right: "-translate-x-6",
  none: "",
};

export function Reveal({ children, className = "", delay = 0, from = "up", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        shown ? "opacity-100 translate-x-0 translate-y-0 blur-0" : `opacity-0 ${OFFSETS[from]} blur-[2px]`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}