"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const VALUES = [
  {
    icon: "✦",
    title: "Jakość premium",
    body: "Każda grafika powstaje z dbałością o każdy piksel. Rozdzielczość 300 DPI, staranna kolorystyka i dopracowane detale — bo Twoje wspomnienia zasługują na najlepsze.",
    accent: "#944a00",
    bg: "bg-[#fff1ea]",
  },
  {
    icon: "⚡",
    title: "Natychmiast do pobrania",
    body: "Żadnego czekania. Opłacasz zamówienie i w tej samej chwili pobierasz swój plik. Możesz drukować i tworzyć już za kilka minut od zakupu.",
    accent: "#006b5f",
    bg: "bg-[#f0faf8]",
  },
  {
    icon: "◈",
    title: "Tworzone z pasją",
    body: "Za każdą grafiką stoi historia i emocja. Projektuję tak, jakbym robiła to dla swojej najbliższej przyjaciółki — z czułością, humorem i sercem.",
    accent: "#c9a227",
    bg: "bg-[#faf8f0]",
  },
];

export default function AboutValues() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="values-heading"
      className="w-full py-16 md:py-24"
      style={{
        background: "linear-gradient(180deg, #fff8f5 0%, #ffeade 50%, #fff8f5 100%)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <SectionLabel>Moja misja</SectionLabel>
          <h2
            id="values-heading"
            className="mt-4 text-4xl sm:text-5xl font-bold text-[#241912] leading-tight"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            W co wierzę
          </h2>
          <p className="mt-3 text-[#564335] max-w-md mx-auto text-base">
            Te wartości prowadzą mnie przy tworzeniu każdej grafiki — od pierwszego szkicu
            do gotowego pliku w Twoich rękach.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className={`${v.bg} rounded-3xl p-8 border border-white/60 shadow-sm relative overflow-hidden`}
            >
              <div
                aria-hidden="true"
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-10 blur-xl"
                style={{ background: v.accent }}
              />
              <span
                className="text-3xl mb-5 block"
                style={{ color: v.accent }}
                aria-hidden="true"
              >
                {v.icon}
              </span>
              <h3
                className="text-xl font-bold text-[#241912] mb-3"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                {v.title}
              </h3>
              <p className="text-[#564335] text-sm leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
