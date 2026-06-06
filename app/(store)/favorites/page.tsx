'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useWishlistStore } from '@/stores/wishlist.store'
import type { WishlistItem } from '@/types/wishlist.types'
import type { WooProduct } from '@/types/product.types'
import ProductCard from '@/components/product/ProductCard'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function wishlistItemToProduct(item: WishlistItem): WooProduct {
  return {
    id: String(item.productId),
    databaseId: item.productId,
    slug: item.slug,
    name: item.name,
    description: '',
    shortDescription: '',
    price: item.price,
    regularPrice: item.regularPrice ?? item.price,
    salePrice: item.onSale ? item.price : null,
    onSale: item.onSale,
    featured: false,
    status: 'publish',
    image: item.image,
    galleryImages: { nodes: [] },
    productCategories: {
      nodes: item.category ? [{ id: item.category, name: item.category, slug: item.category.toLowerCase() }] : [],
    },
    downloadable: true,
    virtual: true,
  }
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col items-center justify-center py-28 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        className="mb-8"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-20 h-20 text-rose-200 mx-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
      </motion.div>

      <h2
        className="text-2xl sm:text-3xl font-bold text-[#241912] mb-3"
        style={{ fontFamily: 'var(--font-family-display)' }}
      >
        Twoja lista życzeń jest pusta
      </h2>
      <p className="text-[#8a7263] max-w-sm mb-8 leading-relaxed">
        Kliknij serduszko przy produkcie, żeby go tutaj zapisać.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-[#944a00] hover:bg-[#713700] text-white font-bold px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm shadow-[#944a00]/20"
      >
        Przeglądaj sklep
      </Link>
    </motion.div>
  )
}

export default function FavoritesPage() {
  const items = useWishlistStore((s) => s.items)
  const clearWishlist = useWishlistStore((s) => s.clearWishlist)
  const count = items.length

  return (
    <main className="min-h-screen bg-[#fff8f5]">
      <div className="px-6 md:px-12 lg:px-20 py-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex items-baseline justify-between mb-8"
        >
          <div className="flex items-baseline gap-3">
            <h1
              className="text-3xl sm:text-4xl font-bold text-[#241912]"
              style={{ fontFamily: 'var(--font-family-display)' }}
            >
              Ulubione
            </h1>
            {count > 0 && (
              <span className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 bg-rose-100 text-rose-600 text-sm font-bold rounded-full">
                {count}
              </span>
            )}
          </div>

          {count > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm text-[#8a7263] hover:text-rose-500 transition-colors underline-offset-2 hover:underline"
            >
              Wyczyść listę
            </button>
          )}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {count === 0 ? (
            <EmptyState key="empty" />
          ) : (
            <motion.ul
              key="grid"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 list-none p-0"
            >
              {items.map((item) => (
                <ProductCard
                  key={item.productId}
                  product={wishlistItemToProduct(item)}
                  animate={true}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
