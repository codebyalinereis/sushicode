import Reveal from "./Reveal";
import ParallaxArt from "./ParallaxArt";
import styles from "./Ritual.module.css";

/** Nigiri de salmão (ilustração SVG estática). */
function Nigiri() {
  return (
    <svg viewBox="0 0 260 190">
      <linearGradient id="g-sal-ritual" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F79A5F" />
        <stop offset="1" stopColor="#E46F36" />
      </linearGradient>
      <ellipse cx={130} cy={164} rx={92} ry={10} fill="rgba(0,0,0,.35)" />
      <path d="M45 128 Q45 88 130 88 Q215 88 215 128 Q215 158 130 162 Q45 158 45 128 Z" fill="#F7F0DE" />
      <path
        d="M60 118 q10 -14 26 -16 M110 138 q14 4 30 0 M168 104 q14 4 22 14"
        stroke="#E3D6B8"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M50 102 Q60 62 130 58 Q200 62 210 102 Q204 120 130 114 Q56 120 50 102 Z" fill="url(#g-sal-ritual)" />
      <path
        d="M70 88 Q130 70 190 88 M76 98 Q130 82 184 98"
        stroke="#FBD3B4"
        strokeWidth={3.4}
        strokeLinecap="round"
        fill="none"
        opacity={0.65}
      />
      <ellipse cx={98} cy={76} rx={16} ry={6} fill="rgba(255,255,255,.28)" transform="rotate(-14 98 76)" />
    </svg>
  );
}

/** Temaki (ilustração SVG estática). */
function Temaki() {
  return (
    <svg viewBox="0 0 210 270">
      <linearGradient id="g-nori-ritual" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#2C3627" />
        <stop offset="0.55" stopColor="#1C2418" />
        <stop offset="1" stopColor="#131A0F" />
      </linearGradient>
      <ellipse cx={105} cy={248} rx={60} ry={10} fill="rgba(0,0,0,.35)" />
      <path d="M42 30 L168 30 L112 234 Q105 246 98 234 Z" fill="url(#g-nori-ritual)" />
      <path d="M52 34 L162 34 L150 74 Q105 88 64 74 Z" fill="#F6EFDD" />
      <path
        d="M70 44 q14 -8 28 -4 M118 62 q12 2 22 8"
        stroke="#E3D6B8"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M66 32 Q105 8 144 32 L138 62 Q105 72 72 62 Z" fill="#F09257" />
      <path
        d="M80 44 Q110 32 134 44 M86 52 Q108 44 128 52"
        stroke="#FBD3B4"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
      />
      <ellipse cx={126} cy={30} rx={17} ry={8} fill="#9DB35C" transform="rotate(18 126 30)" />
      <path d="M50 36 L104 226" stroke="rgba(255,255,255,.1)" strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
}

/** Molheiro de shoyu (ilustração SVG estática). */
function SoyDish() {
  return (
    <svg viewBox="0 0 140 110">
      <ellipse cx={70} cy={66} rx={62} ry={26} fill="#F1EBDD" stroke="#DCD2BB" strokeWidth={2} />
      <radialGradient id="g-soy-ritual" cx=".4" cy=".35" r=".9">
        <stop offset="0" stopColor="#4A2E1A" />
        <stop offset="1" stopColor="#120903" />
      </radialGradient>
      <ellipse cx={70} cy={65} rx={40} ry={13} fill="url(#g-soy-ritual)" />
      <path
        d="M46 62 Q70 56 94 62"
        stroke="rgba(255,255,255,.16)"
        strokeWidth={2.4}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Seção escura "O Ritual" — filosofia da casa com artes em parallax. */
export default function Ritual() {
  return (
    <section id="ritual" data-nav="dark" className={`dark ${styles.ritual}`}>
      <div className={styles.kanjiBg} aria-hidden="true">
        静
      </div>

      <div className={`wrap ${styles.grid}`}>
        <div>
          <Reveal as="p" className="eyebrow-s">
            O Ritual
          </Reveal>
          <Reveal as="h2" delay={0.08}>
            Menos é <em>tudo.</em>
          </Reveal>
          <Reveal as="p" delay={0.16} className={styles.copy}>
            Antes da faca, o silêncio. Nosso balcão tem dezoito lugares e
            nenhuma pressa: o arroz descansa na temperatura do corpo, o peixe
            chega da madrugada e o shoyu é preparado em casa há doze anos.
            Nada sai da cozinha antes da hora — e tudo sai na hora exata.
          </Reveal>
          <Reveal as="blockquote" delay={0.24} className={styles.quote}>
            “Um bom sushi não se explica. Se respira.”
            <footer>— Haru Nakamura, chef e fundador</footer>
          </Reveal>
        </div>

        <div className={styles.art} aria-hidden="true">
          <Reveal className={styles.a1}>
            <ParallaxArt speed={26} rotate={6}>
              <Nigiri />
            </ParallaxArt>
          </Reveal>
          <Reveal delay={0.1} className={styles.a2}>
            <ParallaxArt speed={-20} rotate={-8}>
              <Temaki />
            </ParallaxArt>
          </Reveal>
          <Reveal delay={0.2} className={styles.a3}>
            <ParallaxArt speed={40} rotate={4}>
              <SoyDish />
            </ParallaxArt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
