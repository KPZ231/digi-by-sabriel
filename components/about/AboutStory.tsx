"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STATS = [
  { val: `2020`, label: `Rok założenia` },
  { val: `500+`, label: `Zadowolonych klientek` },
  { val: `4.9★`, label: `Średnia ocena` },
];

const PARAGRAPHS = [
  {
    label: `Skąd się to wzięło`,
    text: `Odkąd pamiętam, uwielbiałam papier. Jako dziecko spędzałam całe popołudnia wycinając, naklejając i ozdabiając albumy zdjęciami z wakacji. Scrapbooking to nie był dla mnie hobby — to był język, którym opowiadałam o świecie.`,
  },
  {
    label: `Pandemiczny przełom`,
    text: `W 2020 roku, kiedy świat stanął w miejscu, ja zaczęłam tworzyć intensywniej niż kiedykolwiek. Z wykształcenia jestem graficzką — w końcu postanowiłam połączyć pasję z zawodem. Pierwsze cyfrowe grafiki powstawały dla znajomych. Gdy klientki zaczęły pytać o zakup, zrozumiałam, że to znak.`,
  },
  {
    label: `Digi by Sabriel`,
    text: `Sklep otworzyłam w 2023 roku z jedną kolekcją — wiosenną. Dziś mam ponad 300 unikalnych grafik i każdego dnia dodaję coś nowego. Każdy projekt tworzę tak, jakbym robiła go dla siebie: z dbałością o detal, z sercem i z odrobiną magii, którą staram się wpleść w każdą kartkę.`,
  },
];

export default function AboutStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="story-heading"
      className="w-full py-16 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — sticky quote + stats */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:sticky lg:top-28"
          >
            <SectionLabel>Moja historia</SectionLabel>

            <blockquote
              id="story-heading"
              className="mt-6 text-4xl sm:text-5xl font-black italic leading-[1.15] text-[#241912]"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              {`„Zaczęło się od `}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#944a00] to-[#c9a227]">
                jednej kartki
              </span>
              {` i miłości do papieru.”`}
            </blockquote>

            <div
              aria-hidden="true"
              className="mt-8 h-px w-full bg-gradient-to-r from-[#944a00]/30 via-[#c9a227]/20 to-transparent"
            />

            <div className="mt-8 flex gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p
                    className="text-2xl font-black text-[#944a00]"
                    style={{ fontFamily: "var(--font-family-display)" }}
                  >
                    {s.val}
                  </p>
                  <p className="text-xs text-[#8a7263] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — narrative cards */}
          <div className="flex flex-col gap-6">
            {PARAGRAPHS.map((para, i) => (
              <motion.div
                key={para.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-6 border border-[#f3dfd2] shadow-sm"
              >
                <p className="text-xs font-bold tracking-widest uppercase text-[#944a00] mb-3">
                  {para.label}
                </p>
                <p className="text-[#564335] leading-relaxed">{para.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
