'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/cart.types'
import type { WooProduct } from '@/types/product.types'

function parsePrice(raw: string): number {
  const cleaned = raw.replace(/[^0-9.,]/g, '').replace(',', '.')
  return parseFloat(cleaned) || 0
}

type CartState = {
  items: CartItem[]
  cartKey: string | null
  isLoading: boolean
  pendingKeys: string[]

  addItem: (product: WooProduct) => Promise<void>
  removeItem: (itemKey: string) => Promise<void>
  updateQuantity: (itemKey: string, qty: number) => Promise<void>
  clearCart: () => void
  itemCount: () => number
  cartTotal: () => number
  formattedTotal: () => string
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      cartKey: null,
      isLoading: false,
      pendingKeys: [],

      addItem: async (product: WooProduct) => {
        const { items, cartKey } = get()
        const existing = items.find((i) => i.productId === product.databaseId)

        if (existing) {
          await get().updateQuantity(existing.key, existing.quantity + 1)
          return
        }

        const tempKey = `temp-${product.databaseId}-${Date.now()}`
        const newItem: CartItem = {
          key: tempKey,
          productId: product.databaseId,
          slug: product.slug,
          name: product.name,
          price: product.price,
          priceRaw: parsePrice(product.price),
          regularPrice: product.regularPrice ?? null,
          onSale: product.onSale,
          quantity: 1,
          image: product.image ?? null,
          category: product.productCategories.nodes[0]?.name ?? null,
        }

        set((s) => ({ items: [...s.items, newItem], isLoading: true }))

        try {
          const res = await fetch('/api/cart/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productId: product.databaseId,
              quantity: 1,
              cartKey,
            }),
          })
          const data = await res.json()

          if (res.ok) {
            const newCartKey: string | undefined = data.cart_key
            set((s) => ({
              cartKey: newCartKey ?? s.cartKey,
              items: s.items.map((i) =>
                i.key === tempKey
                  ? { ...i, key: data.item_key ?? tempKey }
                  : i
              ),
              isLoading: false,
            }))
          } else {
            set((s) => ({
              items: s.items.filter((i) => i.key !== tempKey),
              isLoading: false,
            }))
          }
        } catch {
          set((s) => ({
            items: s.items.filter((i) => i.key !== tempKey),
            isLoading: false,
          }))
        }
      },

      removeItem: async (itemKey: string) => {
        const prev = get().items
        const { cartKey } = get()
        set((s) => ({
          items: s.items.filter((i) => i.key !== itemKey),
          pendingKeys: [...s.pendingKeys, itemKey],
        }))

        try {
          const params = cartKey ? `?cart_key=${cartKey}` : ''
          await fetch(`/api/cart/items/${itemKey}${params}`, { method: 'DELETE' })
        } catch {
          set({ items: prev })
        } finally {
          set((s) => ({ pendingKeys: s.pendingKeys.filter((k) => k !== itemKey) }))
        }
      },

      updateQuantity: async (itemKey: string, qty: number) => {
        if (qty < 1) {
          await get().removeItem(itemKey)
          return
        }
        const prev = get().items
        const { cartKey } = get()
        set((s) => ({
          items: s.items.map((i) => (i.key === itemKey ? { ...i, quantity: qty } : i)),
          pendingKeys: [...s.pendingKeys, itemKey],
        }))

        try {
          await fetch(`/api/cart/items/${itemKey}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: qty, cartKey }),
          })
        } catch {
          set({ items: prev })
        } finally {
          set((s) => ({ pendingKeys: s.pendingKeys.filter((k) => k !== itemKey) }))
        }
      },

      clearCart: () => set({ items: [], cartKey: null }),

      itemCount: () => get().items.reduce((n, i) => n + i.quantity, 0),

      cartTotal: () =>
        get().items.reduce((sum, i) => sum + i.priceRaw * i.quantity, 0),

      formattedTotal: () => {
        const total = get().cartTotal()
        return total.toLocaleString('pl-PL', {
          style: 'currency',
          currency: 'PLN',
        })
      },
    }),
    {
      name: 'digi-by-sabriel-cart',
      partialize: (s) => ({ items: s.items, cartKey: s.cartKey }),
    }
  )
)
