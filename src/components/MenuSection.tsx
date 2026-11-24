import Reveal from "./Reveal";
import Uramaki from "./Uramaki";
import { MENU, PAL } from "@/lib/palettes";
import styles from "./MenuSection.module.css";

/** Seção do menu — assinaturas da casa + banner omakase. */
export default function MenuSection() {
  return (
    <section id="menu" data-nav="light" className={styles.menuS}>
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <Reveal as="p" className="eyebrow-s">
              Assinaturas
            </Reveal>
            <Reveal as="h2" delay={0.08}>
              Peças que <em>voltam sempre.</em>
            </Reveal>
          </div>
          <Reveal as="p" delay={0.16} className={styles.headCopy}>
            Quatro clássicos da casa, mil e duzentas variações já servidas.
            O menu completo muda com a estação — e com o humor do chef.
          </Reveal>
        </div>

        <div className={styles.grid}>
          {MENU.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08} className={styles.dish}>
              <div className={styles.pic}>
                <Uramaki palette={PAL[item.palette]} uid={`m${i}`} />
              </div>
              <h3>{item.name}</h3>
              <p className={styles.jpTag}>{item.jp}</p>
              <p className={styles.desc}>{item.desc}</p>
              <div className={styles.row}>
                <span className={styles.price}>{item.price}</span>
                <span className={styles.add} aria-hidden="true">
                  ＋
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="a" href="#reservas" delay={0.1} className={styles.omakase}>
          <span className={styles.jp}>お任せ</span>
          <span className={styles.omakaseBody}>
            <h3>Omakase — doze tempos</h3>
            <p>
              Entregue-se ao chef: o menu do dia, o peixe do mercado e nenhuma
              escolha sua.
            </p>
          </span>
          <span className={styles.price}>
            R$ 390 <em>/ pessoa</em>
          </span>
          <span className={styles.go}>Reservar →</span>
        </Reveal>
      </div>
    </section>
  );
}
