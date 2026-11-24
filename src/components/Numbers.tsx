import Reveal from "./Reveal";
import Counter from "./Counter";
import styles from "./Numbers.module.css";

const STATS = [
  { n: 18, label: "lugares no balcão" },
  { n: 12, label: "tempos por noite" },
  { n: 12, label: "anos de casa" },
  { n: 480, suf: "+", label: "peças por service" },
];

/** Faixa escura com números da casa (contadores animados). */
export default function Numbers() {
  return (
    <section data-nav="dark" className={`dark ${styles.numbers}`}>
      <div className={`wrap ${styles.nums}`}>
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className={styles.item}>
            <Counter end={stat.n} suffix={stat.suf ?? ""} className={styles.num} />
            <span className={styles.label}>{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
