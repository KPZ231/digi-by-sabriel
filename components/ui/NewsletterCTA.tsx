"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

type Decoration = {
  top: string;
  left?: string;
  right?: string;
  size: string;
  color: string;
  duration: number;
  delay: number;
};

const DECORATIVE: Decoration[] = [
  { top: "10%", left: "5%", size: "w-16 h-16", color: "bg-white/10", duration: 4, delay: 0 },
  { top: "70%", left: "8%", size: "w-10 h-10", color: "bg-white/8", duration: 5, delay: 1 },
  { top: "20%", right: "6%", size: "w-12 h-12", color: "bg-white/10", duration: 3.5, delay: 0.5 },
  { top: "60%", right: "10%", size: "w-8 h-8", color: "bg-white/15", duration: 6, delay: 2 },
  { top: "40%", left: "15%", size: "w-6 h-6", color: "bg-white/8", duration: 4.5, delay: 1.5 },
  { top: "30%", right: "20%", size: "w-14 h-14", color: "bg-white/6", duration: 5.5, delay: 0.8 },
];

export default function NewsletterCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <section
      ref={ref}
      aria-labelledby="newsletter-heading"
      className="w-full py-16 md:py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #944a00 0%, #713700 50%, #562900 100%)",
      }}
    >
      {/* Decorative floating blobs */}
      {DECORATIVE.map((d, i) => (
        <motion.div
          key={i}
          className={`absolute ${d.size} rounded-full ${d.color} blur-xl pointer-events-none`}
          style={{ top: d.top, left: d.left, right: d.right }}
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: d.duration, ease: "easeInOut", delay: d.delay }}
          aria-hidden="true"
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6"
        >
          🎁 Ekskluzywna oferta dla subskrybentek
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="newsletter-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 font-[family-name:var(--font-family-display)]"
        >
          Zapisz się i odbierz{" "}
          <span className="text-[#ffb784]">-10%</span>{" "}
          na pierwsze zamówienie
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="text-[#ffdcc5] text-base md:text-lg mb-8 max-w-lg mx-auto"
        >
          Dołącz do 500+ subskrybentek — cotygodniowe inspiracje, ekskluzywne oferty i powiadomienia o nowych kolekcjach.
        </motion.p>

        {/* Form or success message */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6 text-white"
          >
            <p className="text-2xl mb-1">🌸</p>
            <p className="font-bold text-lg">Dziękujemy za zapis!</p>
            <p className="text-[#ffdcc5] text-sm mt-1">Sprawdź swoją skrzynkę — kod rabatowy już w drodze.</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            aria-label="Formularz zapisu na newsletter"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Adres email
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.pl"
              required
              aria-required="true"
              className="flex-1 px-5 py-3.5 rounded-full bg-white text-[#241912] placeholder-[#8a7263] text-sm font-medium outline-none focus:ring-2 focus:ring-[#ffb784] focus:ring-offset-2 focus:ring-offset-transparent"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-[#c9a227] hover:bg-[#b8911f] text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20 whitespace-nowrap"
            >
              Zapisz mnie
            </button>
          </motion.form>
        )}

        {/* Trust signals */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
          className="text-[#ffdcc5]/70 text-xs mt-4"
        >
          Bez spamu · Możesz się wypisać w każdej chwili · Twoje dane są bezpieczne
        </motion.p>
      </div>
    </section>
  );
}
