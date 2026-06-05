"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import type { WooProduct } from "@/types/product.types";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

type Props = {
  products: WooProduct[];
};

export default function Bestsellers({ products }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="bestsellers-heading"
      className="w-full px-4 md:px-8 py-12 md:py-20"
    >
      <motion.div
        className="text-center mb-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.p
          className="text-xs font-bold tracking-widest text-primary uppercase mb-2"
          variants={headingVariants}
          aria-hidden="true"
        >
          Ulubione przez klientów
        </motion.p>
        <motion.h2
          id="bestsellers-heading"
          className="text-3xl sm:text-4xl font-bold text-slate-900"
          variants={headingVariants}
        >
          Bestsellery
        </motion.h2>
      </motion.div>

      <motion.ul
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 list-none p-0 m-0"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        role="list"
        aria-label="Bestsellery — najpopularniejsze produkty cyfrowe"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} animate={true} />
        ))}
      </motion.ul>

      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
      >
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500 transition-colors"
          aria-label="Zobacz wszystkie produkty w sklepie"
        >
          Zobacz wszystkie produkty
        </Link>
      </motion.div>
    </section>
  );
}
