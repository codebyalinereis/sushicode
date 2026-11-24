"use client";

import { useEffect, useRef } from "react";
import styles from "./ProgressBar.module.css";

/** Linha vermelha no topo: progresso de leitura da página. */
export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${(scrollY / Math.max(max, 1)).toFixed(4)})`;
    };

    addEventListener("scroll", update, { passive: true });
    update();

    return () => removeEventListener("scroll", update);
  }, []);

  return (
    <div className={styles.progress} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  );
}
