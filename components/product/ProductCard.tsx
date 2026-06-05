"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import type { WooProduct } from "@/types/product.types";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

function HeartButton({ productName }: { productName: string }) {
  const [liked, setLiked] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setLiked((v) => !v);
      }}
      aria-label={liked ? `Usuń ${productName} z ulubionych` : `Dodaj ${productName} do ulubionych`}
      aria-pressed={liked}
      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-4 h-4 transition-colors duration-200 ${liked ? "fill-rose-500 stroke-rose-500" : "fill-none stroke-slate-400"}`}
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        />
      </svg>
    </button>
  );
}

type Props = {
  product: WooProduct;
  animate?: boolean;
};

export default function ProductCard({ product, animate = true }: Props) {
  const category = product.productCategories.nodes[0];

  const card = (
    <article aria-label={`${product.name}, ${category?.name ?? ""}, ${product.price}`}>
      <Link
        href={`/products/${product.slug}`}
        className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
          {product.image ? (
            <motion.img
              src={product.image.sourceUrl}
              alt={product.image.altText || product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400 text-sm">Brak zdjęcia</span>
            </div>
          )}

          {product.onSale && (
            <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full z-10">
              SALE
            </span>
          )}

          <div className="absolute top-2.5 right-2.5 z-10">
            <HeartButton productName={product.name} />
          </div>
        </div>

        <div className="p-3 sm:p-4 flex flex-col gap-2">
          {category && (
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-primary uppercase">
              {category.name}
            </span>
          )}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {product.name}
          </h3>
          <div className="flex items-center justify-between gap-2 mt-1">
            <span className="text-sm sm:text-base font-bold text-slate-800">
              {product.price}
            </span>
            <button
              onClick={(e) => e.preventDefault()}
              aria-label={`Dodaj ${product.name} do koszyka`}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm shadow-primary/20 shrink-0"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                />
              </svg>
              Dodaj
            </button>
          </div>
        </div>
      </Link>
    </article>
  );

  if (!animate) return card;

  return <motion.li variants={cardVariants}>{card}</motion.li>;
}
