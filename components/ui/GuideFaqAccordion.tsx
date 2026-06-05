"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type FaqItem = { q: string; a: string };

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function FaqRow({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
      className="border-b border-[#ddc1af] last:border-none"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#944a00] focus-visible:ring-offset-2 rounded"
      >
        <span className="text-base font-semibold text-[#241912] group-hover:text-[#944a00] transition-colors duration-200 leading-snug pr-2">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="text-[#944a00] text-2xl font-light shrink-0 mt-0.5 leading-none select-none"
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
            <p className="pb-5 text-[#564335] text-base leading-relaxed max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function GuideFaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-[#ddc1af] border-t border-[#ddc1af]">
      {items.map((item, i) => (
        <FaqRow key={item.q} q={item.q} a={item.a} index={i} />
      ))}
    </div>
  );
}
