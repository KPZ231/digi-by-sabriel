"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.3 },
  },
};

export default function Hero() {
  const words = ["Twórz", "wyjątkowe", "chwile", "z", "Digi", "by", "Sabriel"];
  const gradientWords = ["wyjątkowe", "chwile"];

  return (
    <section
      aria-label="Sekcja powitalna"
      className="w-full relative overflow-hidden py-10 md:py-16 lg:py-20"
    >
      {/* Gradient mesh background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 15% 60%, #ffdcc5 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, #ffe4f3 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, #fff1ea 0%, transparent 60%), #fff8f5",
        }}
      />

      {/* Floating decorative blobs */}
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-8 left-8 w-16 h-16 rounded-full bg-pink-200/40 blur-xl pointer-events-none"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-16 right-24 w-12 h-12 rounded-full bg-amber-200/50 blur-lg pointer-events-none"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 w-10 h-10 rounded-full bg-rose-200/40 blur-md pointer-events-none"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute bottom-8 right-8 w-20 h-20 rounded-full bg-orange-100/60 blur-2xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Text column */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">

            {/* Season badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-primary/20 text-primary text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                🌸 Limitowana Kolekcja · Wiosna 2025
              </span>
            </motion.div>

            {/* H1 with word-by-word animation */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#241912] leading-[1.1] font-[family-name:var(--font-family-display)]">
              {words.map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1 + i * 0.08,
                  }}
                  className={
                    gradientWords.includes(word)
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#944a00] via-[#f27f0d] to-[#f43f5e] inline-block"
                      : "inline-block"
                  }
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
              className="text-[#564335] text-lg max-w-lg leading-relaxed mx-auto lg:mx-0"
            >
              Wyjątkowe cyfrowe grafiki do scrapbookingu — kartki, tła i elementy
              dekoracyjne w rozdzielczości 300 DPI. Pobierz i twórz natychmiast.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              <Link
                href="/products"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Zobacz kolekcję
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/o-mnie"
                className="bg-white text-[#564335] border border-[#ddc1af] hover:border-primary px-8 py-3.5 rounded-full font-bold transition-all hover:shadow-md flex items-center justify-center gap-2"
              >
                <span aria-hidden="true" className="text-primary">▶</span>
                Jak to działa?
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
              className="flex items-center gap-6 flex-wrap justify-center lg:justify-start"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-primary">300+</span>
                <span className="text-sm text-[#564335]">unikalnych grafik</span>
              </div>
              <div className="w-px h-4 bg-[#ddc1af]" aria-hidden="true" />
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-[#c9a227]">4.9 ★</span>
                <span className="text-sm text-[#564335]">ocena klientek</span>
              </div>
              <div className="w-px h-4 bg-[#ddc1af]" aria-hidden="true" />
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-[#006b5f]">Natychmiast</span>
                <span className="text-sm text-[#564335]">do pobrania</span>
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2" aria-hidden="true">
                {(["bg-pink-300", "bg-violet-300", "bg-amber-300"] as const).map(
                  (color, i) => (
                    <div
                      key={i}
                      className={`size-8 rounded-full border-2 border-white ${color}`}
                    />
                  )
                )}
              </div>
              <p className="text-sm text-[#564335]">
                Dołącz do{" "}
                <strong className="text-[#241912]">500+</strong>{" "}
                zadowolonych klientek
              </p>
            </motion.div>
          </div>

          {/* Image column */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="flex-1 w-full flex justify-center lg:justify-end z-10"
          >
            <div className="relative w-full max-w-sm md:max-w-md aspect-square">
              {/* Back decoration */}
              <div
                aria-hidden="true"
                className="absolute inset-4 bg-gradient-to-br from-pink-200 to-orange-100 rounded-3xl shadow-lg -rotate-3 z-10 opacity-50"
              />

              {/* Main card — floating y-bob animation */}
              <motion.div
                initial={{ rotate: 3 }}
                animate={{ rotate: 3, y: [0, -12, 0] }}
                transition={{
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                  rotate: { duration: 0 },
                }}
                whileHover={{ rotate: 0 }}
                className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl z-20"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfdQmxHIYeU6cCAukR4JOt2DibzNlja_wLAYzCr60_ttzRHqRq5i8WzIer2sCiry6R2glugD_pvj21MBSzNgG3OzQkqBPqaq3a-AayWkwZhpvYRGZroLL_sHnh5O6bztMLT_IUm1QGp-lgMB1iQe0HyEuMgkQeBlMDWJjYJWt2O_jrptpeSpGQQcHdD-r3GxMaHyPFMlr6Ela7DHrK_Dp-A9PJgBZKCWlaTSmLujHYOdYGY0XZHM_nJ8o1dP94MxuncVQWnAqpvMzv"
                  alt="Digi by Sabriel — cyfrowa kartka okolicznościowa z kwiatami"
                  className="w-full h-full object-cover"
                  width={480}
                  height={480}
                />
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 z-30 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2 border border-orange-100"
                aria-hidden="true"
              >
                <span className="text-2xl">🌸</span>
                <div>
                  <p className="text-xs font-bold text-[#241912]">Bestseller</p>
                  <p className="text-xs text-[#564335]">Kartka Wiosenna</p>
                </div>
              </motion.div>

              {/* Download badge — top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="absolute -top-3 -right-3 z-30 bg-[#944a00] text-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-1.5"
                aria-hidden="true"
              >
                <span className="text-sm">📥</span>
                <p className="text-xs font-bold">300 DPI</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
