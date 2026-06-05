"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import type { WooProduct } from "@/types/product.types";
import { useCartStore } from "@/stores/cart.store";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CATEGORY_GRADIENTS: Record<string, string> = {
  Urodziny: "from-[#ffd0e4] via-[#ffe8f2] to-[#fff4f8]",
  Ślub: "from-[#f8d8f0] via-[#fceaf8] to-[#fef4fc]",
  "Baby Shower": "from-[#b8e0ff] via-[#d8f0ff] to-[#f0f8ff]",
  Święta: "from-[#ffc0c0] via-[#ffdcdc] to-[#fff0f0]",
  Wiosna: "from-[#b8f0a8] via-[#dcf8d0] to-[#f0fde8]",
  Jesień: "from-[#ffd098] via-[#ffe4bc] to-[#fff4e4]",
};

function getCategoryGradient(name?: string): string {
  return (name && CATEGORY_GRADIENTS[name]) ?? "from-[#f3dfd2] via-[#ffeade] to-[#fff8f5]";
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

function HeartButton({ productName }: { productName: string }) {
  const [liked, setLiked] = useState(false);
  return (
    <button
      onClick={(e) => { e.preventDefault(); setLiked((v) => !v); }}
      aria-label={liked ? `Usuń ${productName} z ulubionych` : `Dodaj ${productName} do ulubionych`}
      aria-pressed={liked}
      className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-4 h-4 transition-colors duration-200 ${liked ? "fill-rose-500 stroke-rose-500" : "fill-none stroke-[#8a7263]"}`}
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

type Props = {
  product: WooProduct;
  animate?: boolean;
  featured?: boolean;
};

export default function ProductCard({ product, animate = true, featured = false }: Props) {
  const category = product.productCategories.nodes[0];
  const gradient = getCategoryGradient(category?.name);
  const addItem = useCartStore((s) => s.addItem);
  const [adding, setAdding] = useState(false);

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (adding) return;
    setAdding(true);
    await addItem(product);
    setAdding(false);
  }

  const card = (
    <article
      className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-[#f3dfd2] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
      aria-label={`${product.name}${category ? `, ${category.name}` : ""}, ${product.price}`}
    >
      <Link
        href={`/products/${product.slug}`}
        className={`relative block overflow-hidden bg-gradient-to-br ${gradient} ${featured ? "flex-1 min-h-[220px]" : "aspect-[4/3]"}`}
      >
        {product.image ? (
          <motion.img
            src={product.image.sourceUrl}
            alt={product.image.altText || product.name}
            className="absolute inset-0 w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.45, ease: EASE }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 select-none">
            <span className="text-6xl text-[#944a00]/15 font-bold leading-none">✦</span>
            <span className="text-[10px] font-bold text-[#944a00]/25 tracking-[0.2em] uppercase">
              {category?.name ?? "Grafika"}
            </span>
          </div>
        )}

        {product.onSale && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full z-10">
            SALE
          </span>
        )}

        <div className="absolute top-3 right-3 z-10">
          <HeartButton productName={product.name} />
        </div>

        {category && (
          <span className="absolute bottom-3 left-3 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#944a00] text-[10px] font-bold tracking-[0.15em] uppercase rounded-full">
            {category.name}
          </span>
        )}
      </Link>

      <div className={`flex flex-col gap-2 ${featured ? "p-5" : "p-3 sm:p-4"}`}>
        <Link href={`/products/${product.slug}`} className="group/name">
          <h3
            className={`font-bold text-[#241912] leading-snug group-hover/name:text-[#944a00] transition-colors duration-200 ${featured ? "text-xl sm:text-2xl" : "text-sm sm:text-base"}`}
            style={featured ? { fontFamily: "var(--font-family-display)" } : undefined}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-end justify-between gap-2 mt-auto pt-1">
          <div className="flex flex-col gap-0.5">
            {product.onSale && product.regularPrice && (
              <span className="text-xs text-[#8a7263] line-through leading-none">
                {product.regularPrice}
              </span>
            )}
            <span className={`font-bold text-[#944a00] ${featured ? "text-xl" : "text-sm sm:text-base"}`}>
              {product.price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            aria-label={`Dodaj ${product.name} do koszyka`}
            className="flex items-center gap-1.5 bg-[#944a00] hover:bg-[#713700] text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm shadow-[#944a00]/20 shrink-0 disabled:opacity-70"
          >
            {adding ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            ) : (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              </svg>
            )}
            {adding ? 'Dodawanie...' : 'Dodaj'}
          </button>
        </div>
      </div>
    </article>
  );

  if (!animate) return card;
  return <motion.li variants={cardVariants}>{card}</motion.li>;
}
