"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProductCard from "./ProductCard";
import type { WooProduct } from "@/types/product.types";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

type Props = {
  products: WooProduct[];
};

export default function ProductGrid({ products }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  if (products.length === 0) {
    return (
      <p className="text-slate-500 text-center py-16">Brak produktów w tej kategorii.</p>
    );
  }

  return (
    <motion.ul
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 list-none p-0 m-0"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      role="list"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} animate={true} />
      ))}
    </motion.ul>
  );
}
