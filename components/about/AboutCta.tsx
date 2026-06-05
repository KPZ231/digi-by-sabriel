"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BLOBS = [
  { top: "15%", left: "5%", size: "w-20 h-20", dur: 4 },
  { top: "60%", right: "8%", size: "w-16 h-16", dur: 5 },
  { top: "35%", right: "25%", size: "w-10 h-10", dur: 3.5 },
] as const;

export default function AboutCta() {
  return (
    <section
      aria-label="Zaproszenie do sklepu"
      className="w-full py-16 md:py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #944a00 0%, #713700 50%, #562900 100%)",
      }}
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className={`absolute ${b.size} rounded-full bg-white/8 blur-2xl pointer-events-none`}
          style={{ top: b.top, left: "left" in b ? b.left : undefined, right: "right" in b ? b.right : undefined }}
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: b.dur, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6"
        >
          🌸 Kolekcja 2025 dostępna
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          Gotowa, żeby tworzyć{" "}
          <em className="not-italic text-[#ffb784]">piękne chwile?</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="text-[#ffdcc5] text-base md:text-lg mb-8 max-w-lg mx-auto"
        >
          Ponad 300 unikalnych grafik czeka na Ciebie. Pobierz, wydrukuj i ciesz się
          wyjątkowymi wspomnieniami.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/products"
            className="px-8 py-3.5 rounded-full bg-white text-[#944a00] font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
          >
            Odkryj kolekcję →
          </Link>
          <Link
            href="/category"
            className="px-8 py-3.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold text-sm transition-all hover:bg-white/25 hover:scale-105 active:scale-95"
          >
            Przeglądaj kategorie
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
