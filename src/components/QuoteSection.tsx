import Reveal from "./Reveal";
import styles from "./QuoteSection.module.css";

/** Depoimento de cliente — prova social. */
export default function QuoteSection() {
  return (
    <section data-nav="light" className={styles.quoteS}>
      <div className="wrap">
        <Reveal as="p" className={styles.stars} aria-label="5 estrelas">
          ★★★★★
        </Reveal>
        <Reveal as="blockquote" delay={0.1} className={styles.quote}>
          “Doze tempos e nenhuma pressa. Saí de lá achando que tinha entendido
          sushi — e descobri que nunca tinha provado de verdade.”
        </Reveal>
        <Reveal as="span" delay={0.2} className={styles.auth}>
          Marina F. — balcão 4, desde 2019
        </Reveal>
      </div>
    </section>
  );
}
