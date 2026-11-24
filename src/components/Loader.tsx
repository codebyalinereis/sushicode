"use client";

import { useEffect } from "react";
import styles from "./Loader.module.css";

/**
 * Cortina de abertura: cobre a tela até o load (com fallback de
 * segurança) e libera a entrada dos elementos do hero via
 * `body.ready` (transições CSS nos componentes).
 */
export default function Loader() {
  useEffect(() => {
    const done = () => document.body.classList.add("ready");
    const fallback = setTimeout(done, 2200);

    if (document.readyState === "complete") {
      done();
    } else {
      window.addEventListener("load", done, { once: true });
    }

    return () => {
      clearTimeout(fallback);
      window.removeEventListener("load", done);
    };
  }, []);

  return (
    <div className={styles.loader} aria-hidden="true">
      <span className={styles.jp}>寿司</span>
      <span className={styles.bar}>
        <i />
      </span>
    </div>
  );
}
