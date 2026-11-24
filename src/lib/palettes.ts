/** Paleta de cores de um uramaki desenhado em SVG. */
export type Palette = {
  /** arroz (gradiente radial: centro → borda) */
  rice1: string;
  rice2: string;
  /** traços de grão de arroz na casca */
  grains: string[];
  /** gergelim sobre o arroz (vazio = sem stroke) */
  seed: string;
  seedS: string;
  /** anel de nori (gradiente) */
  nori1: string;
  nori2: string;
  /** recheios */
  cream: string;
  f1a: string;
  f1b: string;
  f2: string;
  f2b: string;
  f3: string;
  f3s: string;
  rim: string;
  /** hot roll: pontos irregulares de panko */
  panko?: boolean;
};

export const PAL: Record<string, Palette> = {
  hero: {
    rice1: "#FBF5E6",
    rice2: "#EDDFC2",
    grains: ["#E6D9BA", "#D9C9A4", "#CBB98D"],
    seed: "#FFFDF4",
    seedS: "#D8C9A5",
    nori1: "#313B2B",
    nori2: "#131A0E",
    cream: "#F6EEDB",
    f1a: "#F49B5C",
    f1b: "#E4713C",
    f2: "#93A85A",
    f2b: "#7B944A",
    f3: "#DCE8B4",
    f3s: "#B7C98B",
    rim: "#DCCFAF",
  },
  salmao: {
    rice1: "#FBF5E6",
    rice2: "#EDDFC2",
    grains: ["#E6D9BA", "#D9C9A4", "#CBB98D"],
    seed: "#FFFDF4",
    seedS: "#D8C9A5",
    nori1: "#313B2B",
    nori2: "#131A0E",
    cream: "#F6EEDB",
    f1a: "#F49B5C",
    f1b: "#E4713C",
    f2: "#93A85A",
    f2b: "#7B944A",
    f3: "#DCE8B4",
    f3s: "#B7C98B",
    rim: "#DCCFAF",
  },
  dragao: {
    rice1: "#F0F2DF",
    rice2: "#DDE2C2",
    grains: ["#DCE0BE", "#CCD3AA", "#B9C293"],
    seed: "#FBFDF2",
    seedS: "#B9C293",
    nori1: "#313B2B",
    nori2: "#131A0E",
    cream: "#F4F2DC",
    f1a: "#A9BE6C",
    f1b: "#84994B",
    f2: "#93A85A",
    f2b: "#7B944A",
    f3: "#E3EDC2",
    f3s: "#B7C98B",
    rim: "#CFD2AF",
  },
  trufa: {
    rice1: "#F4E7C4",
    rice2: "#E3D1A6",
    grains: ["#DCC68C", "#CBAF76", "#B99B5C"],
    seed: "#2A2E23",
    seedS: "",
    nori1: "#232B1F",
    nori2: "#0E130A",
    cream: "#F3E4C3",
    f1a: "#F2A96E",
    f1b: "#DF8149",
    f2: "#C7A26B",
    f2b: "#A9854E",
    f3: "#8F7B54",
    f3s: "#6F5E3E",
    rim: "#D3BC85",
  },
  hot: {
    rice1: "#F5E2AC",
    rice2: "#E0C27C",
    grains: ["#D9BC7F", "#CBAF6E", "#B99B57"],
    seed: "#FFF8E0",
    seedS: "#C9A75F",
    nori1: "#313B2B",
    nori2: "#131A0E",
    cream: "#F6EBCE",
    f1a: "#F49B5C",
    f1b: "#E4713C",
    f2: "#F3E4C3",
    f2b: "#E0CEA4",
    f3: "#DCE8B4",
    f3s: "#B7C98B",
    rim: "#C8A45E",
    panko: true,
  },
};

export type MenuItem = {
  name: string;
  jp: string;
  desc: string;
  price: string;
  palette: keyof typeof PAL;
};

export const MENU: MenuItem[] = [
  {
    name: "Uramaki Salmão & Abacate",
    jp: "鮭",
    desc: "Shari no ponto, salmão gordo da madrugada e abacate em meia-lua.",
    price: "R$ 68",
    palette: "salmao",
  },
  {
    name: "Dragon Roll",
    jp: "龍巻",
    desc: "Abacate tocha, mayu caseiro e gergelim preto sobre arroz verde-jade.",
    price: "R$ 84",
    palette: "dragao",
  },
  {
    name: "Uramaki Trufado",
    jp: "黒菌",
    desc: "Shitake salteado, cream cheese e azeite de trufas negras.",
    price: "R$ 92",
    palette: "trufa",
  },
  {
    name: "Hot Roll Clássico",
    jp: "火巻",
    desc: "Empanado em panko leve, servido com mayo de yuzu.",
    price: "R$ 56",
    palette: "hot",
  },
];
