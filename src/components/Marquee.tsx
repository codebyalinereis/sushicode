import styles from "./Marquee.module.css";

const WORDS = ["Omakase", "Temaki", "Sashimi", "Saquê", "Gari", "Wasabi", "Umami"];

/** Faixa vermelha rolante — divisor entre o hero e a seção escura. */
export default function Marquee() {
  const line = (
    <span className={styles.line} aria-hidden="true">
      {WORDS.map((word) => (
        <span key={word}>
          {word}
          <b>·</b>
        </span>
      ))}
    </span>
  );

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {line}
        {line}
      </div>
    </div>
  );
}
