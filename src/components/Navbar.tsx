"use client";

import { useEffect, useRef } from "react";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "#ritual", label: "O Ritual" },
  { href: "#menu", label: "Menu" },
  { href: "#reservas", label: "Reservas" },
];

/**
 * Nav fixa. O tema (claro/escuro) é derivado da seção que está
 * passando por baixo dela: cada <section> carrega um data-nav e um
 * IntersectionObserver espelhando esse valor em <body data-nav>.
 */
export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => nav.classList.toggle("scrolled", scrollY > 40);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const theme = (entry.target as HTMLElement).dataset.nav;
          if (theme) document.body.dataset.nav = theme;
        }),
      { rootMargin: "-8% 0px -84% 0px" }
    );

    const sections = document.querySelectorAll("[data-nav]");
    sections.forEach((section) => io.observe(section));

    return () => {
      removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Navegação principal">
      <a className={styles.brand} href="#top">
        AKARI <span className={styles.jp}>寿</span>
      </a>

      <div className={styles.links}>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>

      <a className={styles.cta} href="#reservas">
        Reservar
      </a>
    </nav>
  );
}
