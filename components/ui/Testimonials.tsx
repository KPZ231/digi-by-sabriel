"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Testimonial = {
  initials: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  avatarBg: string;
  avatarText: string;
  date: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    initials: "MK",
    name: "Marta K.",
    city: "Kraków",
    rating: 5,
    text: "Absolutnie przepiękne grafiki! Kartka urodzinowa dla mojej córki wyglądała jak z profesjonalnej drukarni. Jakość 300 DPI robi ogromną różnicę — kolory są żywe i wyraźne.",
    avatarBg: "bg-rose-100",
    avatarText: "text-rose-600",
    date: "Marzec 2025",
  },
  {
    initials: "AW",
    name: "Anna W.",
    city: "Warszawa",
    rating: 5,
    text: "Sabriel to prawdziwy talent! Zamawiałam grafiki ślubne i były dokładnie takie, jak sobie wymarzyłam. Ogromny wybór, super ceny i natychmiastowe pobieranie — polecam z całego serca!",
    avatarBg: "bg-violet-100",
    avatarText: "text-violet-600",
    date: "Kwiecień 2025",
  },
  {
    initials: "KN",
    name: "Karolina N.",
    city: "Gdańsk",
    rating: 5,
    text: "Używam grafik na każde baby shower w mojej rodzinie i zawsze wywołują zachwyt. Łatwa edycja, piękne projekty i dostawa od razu po zakupie. To moje ulubione miejsce na cyfrowe grafiki!",
    avatarBg: "bg-amber-100",
    avatarText: "text-amber-700",
    date: "Maj 2025",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Ocena: ${rating} na 5`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${i < rating ? "fill-amber-400" : "fill-slate-200"}`}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="testimonials-heading"
      className="w-full py-12 md:py-20 bg-[#fff1ea]"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p
          className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2"
          variants={headingVariants}
          aria-hidden="true"
        >
          Opinie klientek
        </motion.p>
        <motion.h2
          id="testimonials-heading"
          className="text-3xl sm:text-4xl font-bold text-[#241912] font-[family-name:var(--font-family-display)]"
          variants={headingVariants}
        >
          Co mówią nasze klientki?
        </motion.h2>
        <motion.p
          className="text-[#564335] text-base mt-3 max-w-md mx-auto"
          variants={headingVariants}
        >
          Ponad 500 zadowolonych klientek dzieli się swoją radością
        </motion.p>
      </motion.div>

      {/* Cards grid */}
      <motion.ul
        className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        role="list"
        aria-label="Opinie klientek"
      >
        {TESTIMONIALS.map((t) => (
          <motion.li key={t.name} variants={cardVariants}>
            <article
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#f3dfd2] flex flex-col gap-4 h-full"
              aria-label={`Opinia od ${t.name} z ${t.city}`}
            >
              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Quote */}
              <blockquote className="text-[#564335] text-sm leading-relaxed flex-1">
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#f3dfd2]">
                <div
                  className={`w-10 h-10 rounded-full ${t.avatarBg} ${t.avatarText} flex items-center justify-center font-bold text-sm shrink-0`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#241912]">{t.name}</p>
                  <p className="text-xs text-[#8a7263]">{t.city} · {t.date}</p>
                </div>
              </div>
            </article>
          </motion.li>
        ))}
      </motion.ul>
      </div>
    </section>
  );
}
