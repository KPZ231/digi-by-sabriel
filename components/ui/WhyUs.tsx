"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Feature = {
  icon: "bolt" | "star" | "edit";
  title: string;
  description: string;
  iconColor: string;
  circleBg: string;
};

const FEATURES: Feature[] = [
  {
    icon: "bolt",
    title: "Natychmiastowe pobieranie",
    description:
      "Twoje pliki są gotowe od razu po zakupie. Żadnego czekania na wysyłkę.",
    iconColor: "text-primary",
    circleBg: "bg-primary/15",
  },
  {
    icon: "star",
    title: "Najwyższa jakość",
    description:
      "Wszystkie projekty w rozdzielczości 300 DPI, idealne do profesjonalnego druku.",
    iconColor: "text-teal-500",
    circleBg: "bg-teal-100",
  },
  {
    icon: "edit",
    title: "Łatwa edycja",
    description:
      "Personalizuj teksty i kolory w kilka minut dzięki naszym intuicyjnym szablonom.",
    iconColor: "text-pink-400",
    circleBg: "bg-pink-100",
  },
];

const STATS = [
  { value: "300+", label: "unikalnych grafik", color: "text-primary" },
  { value: "4.9★", label: "ocena klientek", color: "text-[#c9a227]" },
  { value: "500+", label: "zadowolonych klientek", color: "text-[#006b5f]" },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

function FeatureIcon({ icon, className }: { icon: Feature["icon"]; className?: string }) {
  if (icon === "bolt") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className ?? "w-7 h-7"}
        aria-hidden="true"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  if (icon === "star") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className ?? "w-7 h-7"}
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  // edit
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-7 h-7"}
      aria-hidden="true"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="why-us-heading"
      className="w-full py-12 md:py-20"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
      <div className="bg-[#fff8f5] rounded-3xl p-8 lg:p-14 relative overflow-hidden">
        {/* Subtle decorative blobs */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-72 h-72 bg-primary/6 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-16 -left-16 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl pointer-events-none"
        />

        {/* Heading */}
        <motion.div
          className="text-center mb-10 relative z-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.h2
            id="why-us-heading"
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-family-display)]"
            variants={headingVariants}
          >
            Dlaczego Digi&nbsp;by&nbsp;Sabriel?
          </motion.h2>
          <motion.div
            className="h-0.5 w-14 bg-primary rounded-full mx-auto"
            variants={headingVariants}
            aria-hidden="true"
          />
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-6 mb-14 relative z-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
            >
              <p
                className={`text-3xl sm:text-4xl font-black ${stat.color} font-[family-name:var(--font-family-display)]`}
              >
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature list */}
        <motion.ul
          className="grid md:grid-cols-3 gap-10 md:gap-6 list-none p-0 m-0 relative z-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          role="list"
          aria-label="Zalety sklepu Digi by Sabriel"
        >
          {FEATURES.map((feature) => (
            <motion.li
              key={feature.title}
              variants={itemVariants}
              className="flex flex-col items-center text-center gap-4 bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Circular icon */}
              <div
                className={`w-16 h-16 rounded-full ${feature.circleBg} ${feature.iconColor} flex items-center justify-center shrink-0`}
                aria-hidden="true"
              >
                <FeatureIcon icon={feature.icon} className="w-7 h-7" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[220px] mx-auto">
                  {feature.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      </div>
    </section>
  );
}
