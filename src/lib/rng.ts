/**
 * mulberry32 — PRNG determinístico e pequeno.
 * Usado para gerar grãos de arroz/gergelim do uramaki de forma
 * reprodutível (mesma seed ⇒ mesmo desenho, no servidor e no cliente).
 */
export function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Easings compartilhados pelas coreografias de scroll. */
export const clamp = (v: number, a: number, b: number) =>
  Math.max(a, Math.min(b, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Progresso normalizado (0–1) de p dentro da faixa [a, b]. */
export const range = (p: number, a: number, b: number) =>
  clamp((p - a) / (b - a), 0, 1);

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
