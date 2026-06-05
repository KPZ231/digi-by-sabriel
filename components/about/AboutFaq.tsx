"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FAQ_ITEMS = [
  {
    q: "Czy mogę drukować grafiki we własnym zakresie?",
    a: "Tak! Wszystkie pliki są w rozdzielczości 300 DPI, gotowe do druku domowego i profesjonalnego. Możesz wydrukować je w dowolnej drukarni lub w domu — jakość zawsze będzie doskonała.",
  },
  {
    q: "Na czym mogę edytować i personalizować pliki?",
    a: "Nasze szablony są dostępne w formatach PDF i PNG. Pliki PDF można edytować w bezpłatnym Adobe Reader lub Canvie. Pliki PNG działają w każdym edytorze graficznym — od Canvy po Photoshopa.",
  },
  {
    q: "Czy grafiki mogą być używane komercyjnie?",
    a: "Licencja obejmuje użytek osobisty i upominki dla bliskich. Użytek komercyjny (np. sprzedaż wydrukowanych kartek) wymaga dodatkowej licencji — skontaktuj się ze mną, chętnie się dogadamy!",
  },
  {
    q: "Co zrobić, jeśli mam problem z pobraniem pliku?",
    a: "Po zakupie link do pobrania jest aktywny przez 30 dni i możesz pobrać plik wielokrotnie. Jeśli coś nie działa — napisz na kontakt@digibysabriel.pl, a rozwiążę problem w ciągu kilku godzin.",
  },
  {
    q: "Czy tworzysz grafiki na zamówienie?",
    a: "Tak, przyjmuję zlecenia indywidualne! Wyjątkowa karta ślubna, personalizowany planer, limitowana grafika na imprezę — wszystko jest możliwe. Napisz do mnie i wspólnie wymyślimy coś wyjątkowego.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
      className="border-b border-[#ddc1af] last:border-none"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="text-base font-semibold text-[#241912] group-hover:text-[#944a00] transition-colors duration-200 leading-snug pr-2">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="text-[#944a00] text-xl font-light shrink-0 mt-0.5 leading-none"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#564335] text-sm leading-relaxed max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AboutFaq() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="faq-heading"
      className="w-full py-16 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          {/* Left — sticky label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:sticky lg:top-28 self-start"
          >
            <SectionLabel>FAQ</SectionLabel>
            <h2
              id="faq-heading"
              className="mt-4 text-4xl sm:text-5xl font-bold text-[#241912] leading-tight"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Masz pytania?
            </h2>
            <p className="mt-4 text-[#564335] text-base leading-relaxed">
              Najczęściej zadawane pytania przez klientki. Nie znalazłaś odpowiedzi?
            </p>
            <a
              href="mailto:kontakt@digibysabriel.pl"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#944a00] hover:text-[#713700] transition-colors underline underline-offset-4 decoration-[#944a00]/30"
            >
              Napisz do mnie
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>

          {/* Right — accordion */}
          <div className="divide-y divide-[#ddc1af] border-t border-[#ddc1af]">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
