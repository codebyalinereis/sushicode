"use client";

import { useEffect, useRef } from "react";
import Uramaki from "./Uramaki";
import { PAL } from "@/lib/palettes";
import { clamp, lerp, range, easeOutCubic, easeInOutCubic } from "@/lib/rng";
import styles from "./Hero.module.css";

/** Um hashi de madeira com lacre vermelho (gradientes globais em layout). */
function Stick() {
  return (
    <svg viewBox="0 0 44 560">
      <path d="M12 6 L32 6 L25.5 540 Q22 556 18.5 540 Z" fill="url(#g-wood)" />
      <path d="M18 470 L25 470 L25.5 540 Q22 556 18.5 540 Z" fill="url(#g-woodtip)" opacity=".85" />
      <rect x={10} y={0} width={24} height={13} rx={4} fill="#2E2418" />
      <rect x={10.8} y={24} width={22.4} height={15} rx={2} fill="#B33024" />
      <rect x={10.8} y={40} width={22.4} height={3} rx={1.5} fill="#C9A24B" opacity=".85" />
      <path d="M17 34 L15.4 500" stroke="rgba(255,243,215,.3)" strokeWidth={2.6} strokeLinecap="round" fill="none" />
      <path d="M28 60 L26.6 420" stroke="rgba(40,22,8,.22)" strokeWidth={1.6} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/**
 * HERO — a cena cinematográfica.
 *
 * Coreografia de scroll (progresso p ∈ [0,1] do wrapper de 280vh,
 * suavizado por lerp a cada frame):
 *
 *   p .05–.32  GRIP   os hashis sobem da posição de descanso e "pegam" a peça
 *   p .34–.62  LIFT   conjunto sobe e gira; a sombra encolhe (peso)
 *   p .66–.97  EXIT   tudo sai de cena enquanto o fundo transiciona p/ ink
 *
 * O ponteiro do mouse adiciona um parallax sutil em camadas
 * (sushi × hashis × kanji × molheiro), ativo só no topo da página.
 */
export default function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const ensembleRef = useRef<HTMLDivElement>(null);
  const stickLRef = useRef<HTMLDivElement>(null);
  const stickRRef = useRef<HTMLDivElement>(null);
  const sushiRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const kanjiRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const garnishRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const [
      heroWrap, heroText, scene, ensemble, stickL, stickR,
      sushi, shadow, overlay, kanji, hint, garnish,
    ] = [
      wrapRef.current, textRef.current, sceneRef.current, ensembleRef.current,
      stickLRef.current, stickRRef.current, sushiRef.current, shadowRef.current,
      overlayRef.current, kanjiRef.current, hintRef.current, garnishRef.current,
    ];
    if (
      !heroWrap || !heroText || !scene || !ensemble || !stickL || !stickR ||
      !sushi || !shadow || !overlay || !kanji || !hint || !garnish
    ) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let target = 0, p = 0, tpx = 0, tpy = 0, px = 0, py = 0;
    let driven = false, tm = 0, t0 = performance.now();
    let raf = 0;

    const readScroll = () => {
      const r = heroWrap.getBoundingClientRect();
      const total = Math.max(r.height - innerHeight, 1);
      target = clamp(-r.top / total, 0, 1);
    };
    const onResize = readScroll;
    const onPointer = (e: PointerEvent) => {
      tpx = (e.clientX / innerWidth - 0.5) * 2;
      tpy = (e.clientY / innerHeight - 0.5) * 2;
    };

    addEventListener("scroll", readScroll, { passive: true });
    addEventListener("resize", onResize);
    if (!reduced) addEventListener("pointermove", onPointer, { passive: true });
    readScroll();

    const frame = (now: number) => {
      const dt = Math.min((now - t0) / 1000, 0.05);
      t0 = now;
      tm += dt;

      p = reduced ? target : p + (target - p) * 0.09;
      px += (tpx - px) * 0.06;
      py += (tpy - py) * 0.06;

      /* no primeiro scroll, o JS assume o controle direto dos elementos
         que têm transição CSS de entrada (boot) — evita "briga" com o rAF */
      if (!driven && p > 0.015) {
        driven = true;
        for (const el of [heroText, hint, garnish]) el.style.transition = "none";
      }

      const grip = easeOutCubic(range(p, 0.05, 0.32));
      const lift = easeInOutCubic(range(p, 0.34, 0.62));
      const exit = easeInOutCubic(range(p, 0.66, 0.97));
      const dark = range(p, 0.68, 0.97);
      const textT = 1 - range(p, 0, 0.22);
      const pf = clamp(1 - p * 2.2, 0, 1); /* influência do ponteiro */

      /* texto do hero */
      if (driven) {
        heroText.style.opacity = String(textT);
        heroText.style.transform = `translateY(${(-p * 260).toFixed(1)}px)`;
        hint.style.opacity = String(1 - range(p, 0, 0.07));
      }

      /* geometria dos hashis */
      const W = sushi.offsetWidth || 380;
      const half = W / 2;
      const restY = half + 46;
      const gripY = -W * 0.18;
      const y = lerp(restY, gripY, grip);
      const xl = lerp(-half * 0.62, -W * 0.13, grip) - px * 12 * pf;
      const xr = lerp(half * 0.62, W * 0.13, grip) - px * 12 * pf;
      const wob = Math.sin(tm * 1.4) * 1.2 * (0.3 + grip * 0.7);
      const al = lerp(76, -10, grip) + wob;
      const ar = lerp(104, 10, grip) - wob;

      stickL.style.transform =
        `translate(${xl.toFixed(1)}px,${(y + py * -8 * pf).toFixed(1)}px) ` +
        `translate(-50%,-50%) rotate(${al.toFixed(2)}deg)`;
      stickR.style.transform =
        `translate(${xr.toFixed(1)}px,${(y + py * -8 * pf + 10).toFixed(1)}px) ` +
        `translate(-50%,-50%) rotate(${ar.toFixed(2)}deg)`;

      /* conjunto (sushi + hashis) sobe junto */
      ensemble.style.transform =
        `translateY(${(-lift * W * 0.3 - exit * innerHeight * 0.42).toFixed(1)}px) ` +
        `rotate(${(lift * 5).toFixed(2)}deg)`;
      ensemble.style.opacity = String(1 - exit);

      /* sushi: rotação + squash na pegada + parallax do ponteiro */
      const sq = 1 - Math.sin(grip * Math.PI) * 0.045;
      const sc = 1 + lift * 0.08 - exit * 0.15;
      sushi.style.transform =
        `translate(-50%,-50%) ` +
        `translate(${(px * 12 * pf).toFixed(1)}px,${(py * 8 * pf).toFixed(1)}px) ` +
        `rotate(${(-2 + lift * 11 + px * 2.5).toFixed(2)}deg) ` +
        `scale(${sc.toFixed(3)},${(sq * sc).toFixed(3)})`;

      /* sombra no chão */
      shadow.style.transform =
        `translateX(-50%) scaleX(${(1 - lift * 0.45 - exit * 0.2).toFixed(3)})`;
      shadow.style.opacity =
        (0.32 * (1 - lift * 0.55) * (1 - exit)).toFixed(3);

      /* câmera + cenário */
      scene.style.transform =
        `scale(${(1 + p * 0.05).toFixed(4)}) translateY(${(-p * 26).toFixed(1)}px)`;
      overlay.style.opacity = dark.toFixed(3);
      kanji.style.opacity = (0.11 * (1 - range(p, 0, 0.5))).toFixed(3);
      kanji.style.transform =
        `translate(-50%,-50%) translateY(${(p * 150).toFixed(1)}px)`;
      if (driven) {
        garnish.style.opacity = (0.95 * (1 - range(p, 0.2, 0.6))).toFixed(3);
        garnish.style.transform = `translateY(${(p * 80).toFixed(1)}px)`;
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", readScroll);
      removeEventListener("resize", onResize);
      removeEventListener("pointermove", onPointer);
    };
  }, []);

  /** Clique no sushi: squash + gergelim voando. */
  const burst = () => {
    const fl = floatRef.current;
    if (!fl) return;

    fl.classList.remove("squish");
    void fl.offsetWidth; /* reinicia a animação */
    fl.classList.add("squish");

    for (let i = 0; i < 12; i++) {
      const seed = document.createElement("i");
      seed.className = styles.seed;
      const a = Math.random() * Math.PI * 2;
      const d = 90 + Math.random() * 130;
      seed.style.setProperty("--dx", `${Math.round(Math.cos(a) * d)}px`);
      seed.style.setProperty("--dy", `${Math.round(Math.sin(a) * d - 50)}px`);
      seed.style.setProperty("--rr", `${Math.floor(Math.random() * 360)}deg`);
      seed.style.left = "50%";
      seed.style.top = "50%";
      fl.appendChild(seed);
      setTimeout(() => seed.remove(), 800);
    }
  };

  return (
    <section ref={wrapRef} className={styles.heroWrap} id="top" data-nav="light">
      <div className={styles.hero}>
        <div ref={kanjiRef} className={styles.kanji} aria-hidden="true">
          寿司
        </div>

        <div ref={textRef} className={styles.text}>
          <p className={styles.eyebrow}>
            Izakaya · Sushi Bar — Pinheiros, São Paulo
          </p>
          <h1>
            <span className={styles.lm}>
              <span>O ritual do</span>
            </span>
            <span className={styles.lm}>
              <span>
                <em>corte perfeito</em>
              </span>
            </span>
          </h1>
          <p className={styles.sub}>
            Doze tempos, dezoito lugares no balcão e um único compromisso:
            servir o peixe do dia exatamente como ele merece.
          </p>
          <div className={styles.ctas}>
            <a className="btn btn-solid" href="#reservas">
              Reservar uma noite <span className="arw">→</span>
            </a>
            <a className="btn btn-ghost" href="#menu">
              Conhecer o menu
            </a>
          </div>
        </div>

        <div ref={sceneRef} className={styles.scene}>
          <div ref={shadowRef} className={styles.shadow} aria-hidden="true" />

          <div ref={ensembleRef} className={styles.ensemble}>
            <div className={styles.sticks} aria-hidden="true">
              <div ref={stickLRef} className={styles.stick}>
                <Stick />
              </div>
              <div ref={stickRRef} className={styles.stick}>
                <Stick />
              </div>
            </div>

            <div
              ref={sushiRef}
              className={styles.sushi}
              role="img"
              aria-label="Uramaki de salmão e abacate"
            >
              <div ref={floatRef} className={styles.float} onPointerDown={burst}>
                <Uramaki palette={PAL.hero} uid="hero" />
              </div>
            </div>
          </div>

          <div ref={garnishRef} className={styles.garnish} aria-hidden="true">
            <svg viewBox="0 0 220 150">
              <ellipse cx={108} cy={90} rx={96} ry={38} fill="#F1EBDD" stroke="#DCD2BB" strokeWidth={2} />
              <ellipse cx={108} cy={88} rx={74} ry={25} fill="#E7DFCC" />
              <radialGradient id="g-soy-hero" cx=".4" cy=".35" r=".9">
                <stop offset="0" stopColor="#4A2E1A" />
                <stop offset="1" stopColor="#120903" />
              </radialGradient>
              <ellipse cx={108} cy={88} rx={58} ry={17} fill="url(#g-soy-hero)" />
              <path d="M74 84 Q108 76 142 84" stroke="rgba(255,255,255,.16)" strokeWidth={3} fill="none" strokeLinecap="round" />
              <path d="M156 62 q14 -8 24 0 q10 8 2 16 q-9 9 -20 3 q-11 -7 -6 -19Z" fill="#E9A2AC" />
              <path d="M161 66 q8 -4 13 1 q-4 6 -11 5 q-5 -1 -2 -6Z" fill="#F2B7BF" />
              <path d="M36 60 q6 -14 14 -6 q7 7 1 14 q-7 8 -13 1 q-4 -5 -2 -9Z" fill="#7FA053" />
              <circle cx={41} cy={61} r={1.4} fill="#5F7C3A" />
              <circle cx={46} cy={65} r={1.2} fill="#5F7C3A" />
            </svg>
          </div>
        </div>

        <div ref={hintRef} className={styles.hint}>
          <i /> pegue os hashis — role devagar <i />
        </div>

        <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />
      </div>
    </section>
  );
}
