import styles from "./Footer.module.css";

const NAV = [
  { href: "#ritual", label: "O Ritual" },
  { href: "#menu", label: "Menu" },
  { href: "#reservas", label: "Reservas" },
];

/** Rodapé — identidade, navegação e contato. */
export default function Footer() {
  return (
    <footer data-nav="dark" className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div>
            <div className={styles.brand}>
              AKARI <span className={styles.jp}>寿司</span>
            </div>
            <p className={styles.tag}>feito com arroz, água e paciência.</p>
          </div>

          <div className={styles.col}>
            <h4>Navegue</h4>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className={styles.col}>
            <h4>Contato</h4>
            <p>Alameda dos Pinheiros, 1213 — Pinheiros, São Paulo</p>
            <a href="tel:+551155550199">(11) 5555-0199</a>
            <a href="mailto:reservas@akari.com.br">reservas@akari.com.br</a>
          </div>
        </div>

        <div className={styles.base}>
          <span>© 2026 AKARI Sushi Bar</span>
          <span>旬 — servimos a estação</span>
        </div>
      </div>
    </footer>
  );
}
