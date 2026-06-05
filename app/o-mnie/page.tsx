import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutFaq from "@/components/about/AboutFaq";
import AboutCta from "@/components/about/AboutCta";

export const metadata: Metadata = {
  title: "O mnie — Digi by Sabriel",
  description:
    "Poznaj Sabriel — twórczynię cyfrowych grafik do scrapbookingu. Dowiedz się, skąd wzięła się pasja do papierowej sztuki i dlaczego Digi by Sabriel to wyjątkowe miejsce.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutFaq />
      <AboutCta />
    </main>
  );
}
