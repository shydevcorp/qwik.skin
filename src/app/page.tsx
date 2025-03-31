import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { TradedSkins } from "@/components/TradedSkins";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <TradedSkins />
      <FAQ />
      <Footer />
    </main>
  );
}
