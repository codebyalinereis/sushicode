import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Ritual from "@/components/Ritual";
import MenuSection from "@/components/MenuSection";
import Numbers from "@/components/Numbers";
import QuoteSection from "@/components/QuoteSection";
import Reservas from "@/components/Reservas";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Ritual />
      <MenuSection />
      <Numbers />
      <QuoteSection />
      <Reservas />
      <Footer />
    </main>
  );
}
