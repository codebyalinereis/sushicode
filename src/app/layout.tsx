import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";
import ProgressBar from "@/components/ProgressBar";
import Navbar from "@/components/Navbar";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSerifJp = Noto_Serif_JP({
  weight: ["300", "500"],
  subsets: ["latin"],
  variable: "--font-noto-jp",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = "AKARI — Sushi Bar & Izakaya · O ritual do corte perfeito";
const description =
  "Omakase em doze tempos, dezoito lugares no balcão e um único compromisso: servir o peixe do dia exatamente como ele merece. AKARI, Pinheiros — São Paulo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · AKARI",
  },
  description,
  keywords: ["sushi", "omakase", "izakaya", "são paulo", "pinheiros", "japones"],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    siteName: "AKARI",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F4EFE4",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${manrope.variable} ${notoSerifJp.variable}`}
    >
      <body data-nav="light">
        {/* defs SVG globais (gradientes de madeira dos hashis) */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <linearGradient id="g-wood" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#CEA26B" />
              <stop offset="0.45" stopColor="#AA7C46" />
              <stop offset="0.8" stopColor="#8A5D2E" />
              <stop offset="1" stopColor="#6E4620" />
            </linearGradient>
            <linearGradient id="g-woodtip" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#5C3A19" />
              <stop offset="1" stopColor="#3E2610" />
            </linearGradient>
          </defs>
        </svg>

        <Loader />
        <ProgressBar />
        <Navbar />
        {children}
        <div className="grain" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
      </body>
    </html>
  );
}
