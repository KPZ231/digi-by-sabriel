"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BLOBS = [
  { top: "8%", left: "3%", size: "w-20 h-20", dur: 4 },
  { top: "70%", right: "5%", size: "w-14 h-14", dur: 5.5 },
  { top: "30%", right: "15%", size: "w-10 h-10", dur: 3.5 },
] as const;

export default function AboutHero() {
  return (
    <section
      aria-label="Witaj na stronie O mnie"
      className="w-full relative overflow-hidden py-16 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 10% 80%, #ffdcc5 0%, transparent 55%), radial-gradient(ellipse at 90% 10%, #ffe4f3 0%, transparent 50%), #fff8f5",
      }}
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className={`absolute ${b.size} rounded-full bg-primary/8 blur-2xl pointer-events-none`}
          style={{ top: b.top, left: "left" in b ? b.left : undefined, right: "right" in b ? b.right : undefined }}
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: b.dur, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text */}
          <div className="flex-1 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-6"
            >
              <SectionLabel>O mnie</SectionLabel>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.0] text-[#241912] mb-6"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Cześć,<br />
              jestem{" "}
              <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[#944a00] via-[#f27f0d] to-[#c9a227]">
                Sabriel
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              className="text-[#564335] text-lg leading-relaxed mb-8"
            >
              Tworzę cyfrowe grafiki, które zamieniają zwykłe chwile w piękne wspomnienia.
              Scrapbooking, kartki, planery — tu każdy detal ma znaczenie.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <Link
                href="/products"
                className="bg-[#944a00] hover:bg-[#713700] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#944a00]/25"
              >
                Zobacz moje grafiki
              </Link>
              <a
                href="mailto:kontakt@digibysabriel.pl"
                className="text-[#564335] hover:text-[#944a00] text-sm font-semibold transition-colors underline underline-offset-4 decoration-[#ddc1af]"
              >
                Napisz do mnie
              </a>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[440px]">
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-3xl rotate-3 opacity-40"
                style={{ background: "linear-gradient(135deg, #ffdcc5 0%, #ffe4f3 100%)" }}
              />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl shadow-[#944a00]/15"
              >
                <div
                  className="w-full h-full flex flex-col items-center justify-center"
                  style={{
                    background: "linear-gradient(145deg, #f3dfd2 0%, #ffdcc5 40%, #ffe4f3 100%)",
                  }}
                >
                  <span className="text-7xl mb-4" aria-hidden="true">🌸</span>
                  <span
                    className="text-xl font-bold text-[#241912] opacity-60"
                    style={{ fontFamily: "var(--font-family-display)" }}
                  >
                    Sabriel
                  </span>
                  <span className="text-xs text-[#8a7263] mt-1">Digi by Sabriel</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 z-30 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2.5 border border-orange-100"
                aria-hidden="true"
              >
                <span className="text-2xl">✦</span>
                <div>
                  <p className="text-xs font-bold text-[#241912]">300+ grafik</p>
                  <p className="text-xs text-[#564335]">w kolekcji</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="absolute -top-3 -right-3 z-30 bg-[#c9a227] text-white rounded-2xl shadow-lg px-3 py-2"
                aria-hidden="true"
              >
                <p className="text-xs font-bold">od 2020 roku</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
