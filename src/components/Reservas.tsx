import Reveal from "./Reveal";
import styles from "./Reservas.module.css";

const INFO = [
  "Ter–Sáb · 19h–00h",
  "Alameda dos Pinheiros, 1213",
  "(11) 5555-0199",
];

/** CTA final — conversão de reservas. */
export default function Reservas() {
  return (
    <section id="reservas" data-nav="light" className={styles.ctaS}>
      <div className={styles.kanjiBg} aria-hidden="true">
        味
      </div>

      <div className="wrap">
        <Reveal as="p" className={`eyebrow-s ${styles.eyebrowLight}`}>
          Reservas
        </Reveal>
        <Reveal as="h2" delay={0.08}>
          Seu lugar no balcão espera.
        </Reveal>
        <Reveal as="p" delay={0.16} className={styles.sub}>
          Dois services por noite, de terça a sábado. O balcão é pequeno de
          propósito — reserve com antecedência e chegue com fome de história.
        </Reveal>

        <Reveal delay={0.24} className={styles.btns}>
          <a className="btn btn-ink" href="#reservas">
            Reservar mesa <span className="arw">→</span>
          </a>
          <a
            className="btn btn-ghost-l"
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
        </Reveal>

        <Reveal delay={0.32} className={styles.info}>
          {INFO.map((item) => (
            <span key={item}>
              <i aria-hidden="true" />
              {item}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
