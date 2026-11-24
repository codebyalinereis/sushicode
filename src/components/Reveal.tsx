"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

type Tag = "div" | "p" | "span" | "h2" | "blockquote" | "a";

type Props = {
  as?: Tag;
  /** atraso da entrada, em segundos (escalonar com --d) */
  delay?: number;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>;

/**
 * Wrapper de entrada on-scroll: aplica `.reveal` (globals.css) e
 * adiciona `.in` quando o elemento entra na viewport. Observa uma
 * única vez e desconecta — barato e sem re-render.
 */
export default function Reveal({
  as = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}: Props) {
  const nodeRef = useRef<HTMLElement | null>(null);

  /* callback ref estável — invocada pelo React após o commit */
  const setNode = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }),
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const props = {
    className: `reveal ${className}`.trim(),
    style: { "--d": `${delay}s` } as CSSProperties,
    ...rest,
  };

  switch (as) {
    case "p":
      return <p {...props} ref={setNode}>{children}</p>;
    case "span":
      return <span {...props} ref={setNode}>{children}</span>;
    case "h2":
      return <h2 {...props} ref={setNode}>{children}</h2>;
    case "blockquote":
      return <blockquote {...props} ref={setNode}>{children}</blockquote>;
    case "a":
      return <a {...props} ref={setNode}>{children}</a>;
    default:
      return <div {...props} ref={setNode}>{children}</div>;
  }
}
