# AKARI — Sushi Bar & Izakaya

Landing page cinematográfica para restaurante de sushi japonês, construída em
**Next.js (App Router) + TypeScript**, com ilustrações 100% SVG (sem imagens
externas) e coreografia de scroll sem bibliotecas de animação.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint     # ESLint
```

## A experiência

- **Hero cinematográfico**: um uramaki gigante desenhado em SVG sobre fundo
  off-white. Ao rolar, **dois hashis sobem, "pegam" a peça e a erguem** —
  com squash na pegada, sombra que encolhe (sensação de peso) e transição
  do fundo para a seção escura seguinte.
- **Parallax de ponteiro**: sushi, hashis, kanji e molheiro reagem ao mouse.
- **Clique no sushi**: squash + gergelim voando.
- Grão de filme, vinheta, loader, barra de progresso, nav que troca de tema
  conforme a seção, marquee, contadores e reveals on-scroll.
- Suporte a `prefers-reduced-motion` e layout responsivo.

## Estrutura

```
src/
├── app/
│   ├── layout.tsx        # fontes (next/font), metadata/SEO, defs SVG globais
│   ├── page.tsx          # composição das seções
│   ├── globals.css       # design tokens, reset, utilitários (.btn, .reveal…)
│   └── icon.svg          # favicon (auto-detected pelo Next)
├── components/
│   ├── Hero.tsx/.css     # cena pinada + coreografia de scroll (client)
│   ├── Uramaki.tsx       # gerador de uramaki SVG parametrizado por paleta
│   ├── Reveal.tsx        # wrapper de entrada on-scroll (IntersectionObserver)
│   ├── ParallaxArt.tsx   # parallax de scroll p/ artes decorativas
│   ├── Counter.tsx       # contador animado on-scroll
│   ├── Loader / ProgressBar / Navbar / Marquee
│   └── Ritual / MenuSection / Numbers / QuoteSection / Reservas / Footer
└── lib/
    ├── palettes.ts       # paletas dos sushis + dados do menu (conteúdo)
    └── rng.ts            # PRNG determinístico + easings compartilhados
```

### Convenções

- **Server Components por padrão**; `"use client"` apenas onde há
  interatividade (Hero, Navbar, Reveal, Counter…).
- **CSS Modules** por componente; tokens e utilitários em `globals.css`.
- Ilustrações SVG são **componentes determinísticos** (PRNG semeado) —
  renderizam idênticas no servidor e no cliente, sem mismatch de hidratação.
- Conteúdo textual (menu, stats, links) centralizado em `lib/palettes.ts`
  e em constantes no topo dos componentes — fácil de trocar por CMS depois.

## Customização rápida

| O quê | Onde |
|---|---|
| Cores, fontes, easings | `src/app/globals.css` (`:root`) |
| Peças do menu + paletas | `src/lib/palettes.ts` |
| Ritmo da coreografia do hero | fases `grip/lift/exit` em `src/components/Hero.tsx` |
| Textos das seções | componentes correspondentes em `src/components/` |
| SEO / OG | `src/app/layout.tsx` (`metadata`) |

## Deploy

Funciona em qualquer plataforma Node (Vercel, Netlify, VPS). Para URLs
absolutas corretas nos metadados, defina `NEXT_PUBLIC_SITE_URL`.
