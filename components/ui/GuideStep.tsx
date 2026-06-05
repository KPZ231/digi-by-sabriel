"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  number: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  flip?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function GuideStep({ number, title, description, children, flip = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE }}
      className={`flex flex-col ${flip ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-center`}
    >
      <div className="flex-1 flex flex-col gap-3">
        <span
          aria-hidden="true"
          className="block text-8xl font-black leading-none select-none"
          style={{
            fontFamily: "var(--font-family-display)",
            color: "rgba(148, 74, 0, 0.13)",
          }}
        >
          {number}
        </span>
        <h3
          className="-mt-6 text-2xl md:text-[1.75rem] font-bold text-[#241912] leading-snug"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          {title}
        </h3>
        <p className="text-lg text-[#564335] leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      {children && (
        <div className="flex-1 flex items-center justify-center w-full min-w-0">
          {children}
        </div>
      )}
    </motion.div>
  );
}
