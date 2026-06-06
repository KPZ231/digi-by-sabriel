'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WishlistItem } from '@/types/wishlist.types'
import type { WooProduct } from '@/types/product.types'

type WishlistState = {
  items: WishlistItem[]

  addItem: (product: WooProduct) => void
  removeItem: (productId: number) => void
  toggleItem: (product: WooProduct) => void
  clearWishlist: () => void
  hasItem: (productId: number) => boolean
  itemCount: () => number
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: WooProduct) => {
        if (get().hasItem(product.databaseId)) return
        const newItem: WishlistItem = {
          productId: product.databaseId,
          slug: product.slug,
          name: product.name,
          price: product.price,
          regularPrice: product.regularPrice ?? null,
          onSale: product.onSale,
          image: product.image ?? null,
          category: product.productCategories.nodes[0]?.name ?? null,
          addedAt: Date.now(),
        }
        set((s) => ({ items: [newItem, ...s.items] }))
      },

      removeItem: (productId: number) => {
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) }))
      },

      toggleItem: (product: WooProduct) => {
        if (get().hasItem(product.databaseId)) {
          get().removeItem(product.databaseId)
        } else {
          get().addItem(product)
        }
      },

      clearWishlist: () => set({ items: [] }),

      hasItem: (productId: number) =>
        get().items.some((i) => i.productId === productId),

      itemCount: () => get().items.length,
    }),
    {
      name: 'digi-by-sabriel-wishlist',
      partialize: (s) => ({ items: s.items }),
    }
  )
)
