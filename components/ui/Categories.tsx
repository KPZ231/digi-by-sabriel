"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { WooCategory } from "@/types/product.types";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

type Props = { categories: WooCategory[] };

export default function Categories({ categories }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="categories-heading"
      className="w-full py-12 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
      <motion.div
        className="flex items-end justify-between mb-8 px-1"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div>
          <motion.span
            className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2 block"
            variants={headingVariants}
          >
            Kolekcje
          </motion.span>
          <motion.h2
            id="categories-heading"
            className="text-5xl font-bold text-slate-900 mb-1 font-(family-name:--font-family-display) italic"
            variants={headingVariants}
          >
            Odkryj kategorie
          </motion.h2>
          <motion.p className="text-slate-500 text-base" variants={headingVariants}>
            Znajdź idealną kartkę na każdą okazję
          </motion.p>
        </div>
        <motion.div variants={headingVariants}>
          <Link
            href="/category"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors group"
            aria-label="Zobacz wszystkie kategorie produktów"
          >
            Wszystkie kategorie
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      <motion.ul
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 list-none p-0 m-0"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        role="list"
        aria-label="Kategorie produktów cyfrowych"
      >
        {categories.map((category) => (
          <motion.li
            key={category.id}
            variants={cardVariants}
            whileHover={{ rotateX: -4, rotateY: 6, scale: 1.03 }}
            style={{ perspective: "800px", transformStyle: "preserve-3d" }}
          >
            <Link
              href={`/category/${category.slug}`}
              className="group block relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transform transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              aria-label={`${category.name}, ${category.count} produktów`}
            >
              <div className="aspect-4/5 w-full overflow-hidden bg-slate-100">
                {category.image ? (
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${category.image.sourceUrl}")` }}
                    role="img"
                    aria-label={category.image.altText || category.name}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200" />
                )}
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-[#944a00]/10 to-transparent flex flex-col justify-end p-5">
                <motion.span
                  className="block text-white font-bold text-xl leading-tight font-(family-name:--font-family-display)"
                  initial={false}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {category.name}
                </motion.span>
                <span className="sr-only">{category.count} produktów</span>
              </div>

              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center bg-amber-100 backdrop-blur-sm text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/category"
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
        >
          Wszystkie kategorie
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      </div>
    </section>
  );
}
