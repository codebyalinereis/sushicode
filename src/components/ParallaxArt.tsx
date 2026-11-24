"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  /** velocidade do parallax em px (positivo = move contra o scroll) */
  speed?: number;
  /** rotação fixa aplicada junto ao parallax */
  rotate?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Parallax leve de scroll para elementos decorativos: a cada frame,
 * desloca o elemento conforme sua distância do centro da viewport.
 * Usado nas ilustrações da seção Ritual.
 */
export default function ParallaxArt({
  speed = 24,
  rotate = 0,
  className,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const loop = () => {
      const r = el.getBoundingClientRect();
      if (r.bottom > -80 && r.top < innerHeight + 80) {
        const center = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        el.style.transform =
          `translateY(${(-center * speed).toFixed(1)}px) rotate(${rotate}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [speed, rotate]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}
