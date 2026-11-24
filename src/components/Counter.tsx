"use client";

import { useEffect, useRef } from "react";
import { clamp, easeOutCubic } from "@/lib/rng";

type Props = {
  end: number;
  suffix?: string;
  className?: string;
};

/** Número que conta de 0 até `end` ao entrar na viewport. */
export default function Counter({ end, suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);

          const start = performance.now();
          const duration = 1500;
          const tick = (now: number) => {
            const t = clamp((now - start) / duration, 0, 1);
            el.textContent = `${Math.round(end * easeOutCubic(t))}${suffix}`;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      { threshold: 0.5 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [end, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
