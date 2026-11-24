import { useMemo } from "react";
import { mulberry32 } from "@/lib/rng";
import type { Palette } from "@/lib/palettes";

type Props = {
  palette: Palette;
  /** sufixo único para os ids de gradiente (evita colisão entre instâncias) */
  uid: string;
  className?: string;
};

/**
 * Uramaki desenhado 100% em SVG, parametrizado por paleta.
 * Grãos de arroz, gergelim e panko são gerados proceduralmente com
 * PRNG semeado — determinístico entre servidor e cliente (sem
 * mismatch de hidratação).
 */
export default function Uramaki({ palette: pal, uid, className }: Props) {
  const bits = useMemo(() => {
    const rnd = mulberry32(7 + uid.length * 31);

    const grains = Array.from({ length: 68 }, (_, i) => {
      const a = rnd() * Math.PI * 2;
      const r = 112 + rnd() * 54;
      const x = 210 + Math.cos(a) * r;
      const y = 210 + Math.sin(a) * r;
      const ang = (a * 180 / Math.PI + 90 + (rnd() - 0.5) * 42).toFixed(1);
      const len = 8 + rnd() * 7;
      return (
        <g
          key={`g${i}`}
          transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang})`}
        >
          <line
            x1={(-len / 2).toFixed(1)}
            x2={(len / 2).toFixed(1)}
            y1={0}
            y2={0}
            stroke={pal.grains[i % pal.grains.length]}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      );
    });

    const darkSeed = pal.seed.toLowerCase().startsWith("#2");
    const sesame = Array.from({ length: darkSeed ? 12 : 18 }, (_, i) => {
      const a = rnd() * Math.PI * 2;
      const r = 116 + rnd() * 50;
      const x = 210 + Math.cos(a) * r;
      const y = 210 + Math.sin(a) * r;
      const ang = (rnd() * 180).toFixed(1);
      return (
        <ellipse
          key={`s${i}`}
          cx={x.toFixed(1)}
          cy={y.toFixed(1)}
          rx={4.1}
          ry={1.9}
          transform={`rotate(${ang} ${x.toFixed(1)} ${y.toFixed(1)})`}
          fill={pal.seed}
          stroke={pal.seedS || undefined}
          strokeWidth={pal.seedS ? 0.5 : undefined}
          opacity={0.95}
        />
      );
    });

    const panko = pal.panko
      ? Array.from({ length: 26 }, (_, i) => {
          const a = rnd() * Math.PI * 2;
          const r = 118 + rnd() * 48;
          return (
            <circle
              key={`p${i}`}
              cx={(210 + Math.cos(a) * r).toFixed(1)}
              cy={(210 + Math.sin(a) * r).toFixed(1)}
              r={(1.8 + rnd() * 2.4).toFixed(1)}
              fill={rnd() > 0.5 ? "#D8B872" : "#C9A75F"}
              opacity={0.8}
            />
          );
        })
      : null;

    return { grains, sesame, panko };
  }, [pal, uid]);

  return (
    <svg viewBox="0 0 420 420" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`rg-${uid}`} cx="38%" cy="30%" r="85%">
          <stop offset="0" stopColor={pal.rice1} />
          <stop offset="1" stopColor={pal.rice2} />
        </radialGradient>
        <radialGradient id={`sg-${uid}`} cx="40%" cy="32%" r="80%">
          <stop offset="0" stopColor={pal.f1a} />
          <stop offset="1" stopColor={pal.f1b} />
        </radialGradient>
        <linearGradient id={`ng-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={pal.nori1} />
          <stop offset="1" stopColor={pal.nori2} />
        </linearGradient>
      </defs>

      {/* casca de arroz */}
      <circle cx={210} cy={210} r={176} fill={`url(#rg-${uid})`} stroke={pal.rim} strokeWidth={2} />
      <g>{bits.grains}</g>
      <g>{bits.panko}</g>
      <g>{bits.sesame}</g>

      {/* anel de nori + recheio */}
      <circle cx={210} cy={210} r={104} fill="none" stroke={`url(#ng-${uid})`} strokeWidth={20} />
      <circle cx={210} cy={210} r={92} fill={pal.cream} />
      <path
        d="M210 128 C262 124 292 168 284 212 C276 256 238 292 196 286 C154 280 130 242 138 198 C146 156 168 132 210 128 Z"
        fill={`url(#sg-${uid})`}
      />
      <path
        d="M182 172 Q214 158 246 172 M176 220 Q208 208 240 220"
        stroke="rgba(255,220,185,.55)"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={164} cy={176} r={27} fill={pal.f2} />
      <circle cx={164} cy={176} r={17} fill={pal.f2b} opacity={0.55} />
      <circle cx={256} cy={246} r={25} fill={pal.f2} />
      <circle cx={256} cy={246} r={15} fill={pal.f2b} opacity={0.55} />
      <circle cx={254} cy={162} r={17} fill={pal.f3} stroke={pal.f3s} strokeWidth={2.5} />
      <circle cx={162} cy={252} r={17} fill={pal.f3} stroke={pal.f3s} strokeWidth={2.5} />

      {/* brilhos */}
      <ellipse cx={158} cy={128} rx={86} ry={34} fill="rgba(255,255,255,.16)" transform="rotate(-24 158 128)" />
      <circle cx={262} cy={140} r={5} fill="rgba(255,255,255,.5)" />
      <path
        d="M96 268 A150 150 0 0 0 296 320"
        stroke="rgba(60,40,15,.10)"
        strokeWidth={14}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
