'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/stores/cart.store'
import type { CartItem } from '@/types/cart.types'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function parseCartPrice(raw: string): string {
  const num = parseFloat(raw.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0
  return num.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })
}

function QuantityStepper({
  item,
  pending,
}: {
  item: CartItem
  pending: boolean
}) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)

  return (
    <div className="flex items-center gap-0" role="group" aria-label="Ilość">
      <button
        onClick={() => updateQuantity(item.key, item.quantity - 1)}
        disabled={pending}
        aria-label="Zmniejsz ilość"
        className="w-8 h-8 flex items-center justify-center rounded-l-full border border-[#ddc1af] bg-white text-[#944a00] hover:bg-[#fff1ea] transition-colors disabled:opacity-40 text-base font-bold leading-none"
      >
        −
      </button>
      <div className="w-10 h-8 flex items-center justify-center border-y border-[#ddc1af] bg-white text-sm font-bold text-[#241912]">
        {pending ? (
          <span className="w-3 h-3 border-2 border-[#944a00] border-t-transparent rounded-full animate-spin" />
        ) : (
          item.quantity
        )}
      </div>
      <button
        onClick={() => updateQuantity(item.key, item.quantity + 1)}
        disabled={pending}
        aria-label="Zwiększ ilość"
        className="w-8 h-8 flex items-center justify-center rounded-r-full border border-[#ddc1af] bg-white text-[#944a00] hover:bg-[#fff1ea] transition-colors disabled:opacity-40 text-base font-bold leading-none"
      >
        +
      </button>
    </div>
  )
}

function CartItemCard({ item, index }: { item: CartItem; index: number }) {
  const { removeItem, pendingKeys } = useCartStore()
  const isPending = pendingKeys.includes(item.key)
  const lineTotal = (item.priceRaw * item.quantity).toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.06 }}
      className={`flex gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-[#f3dfd2] shadow-sm transition-opacity ${isPending ? 'opacity-60' : ''}`}
      aria-label={`${item.name}, ${item.quantity} szt., ${lineTotal}`}
    >
      {/* Thumbnail */}
      <Link
        href={`/products/${item.slug}`}
        className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gradient-to-br from-[#f3dfd2] via-[#ffeade] to-[#fff8f5] border border-[#f3dfd2] relative"
        tabIndex={-1}
        aria-hidden="true"
      >
        {item.image ? (
          <Image
            src={item.image.sourceUrl}
            alt={item.image.altText || item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl text-[#944a00]/20 font-bold">✦</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {item.category && (
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#8a7263]">
                {item.category}
              </span>
            )}
            <Link href={`/products/${item.slug}`}>
              <h3 className="text-sm sm:text-base font-bold text-[#241912] leading-snug hover:text-[#944a00] transition-colors truncate">
                {item.name}
              </h3>
            </Link>
          </div>
          <button
            onClick={() => removeItem(item.key)}
            disabled={isPending}
            aria-label={`Usuń ${item.name} z koszyka`}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-[#8a7263] hover:text-rose-500 hover:bg-rose-50 transition-colors disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap mt-auto">
          <QuantityStepper item={item} pending={isPending} />
          <div className="text-right">
            {item.onSale && item.regularPrice && (
              <div className="text-xs text-[#8a7263] line-through leading-none mb-0.5">
                {parseCartPrice(item.regularPrice)}
              </div>
            )}
            <div className="text-base font-bold text-[#944a00]">{lineTotal}</div>
          </div>
        </div>
      </div>
    </motion.li>
  )
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      {/* Basket illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#ffeade] to-[#f3dfd2] flex items-center justify-center shadow-inner">
          <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none" aria-hidden="true">
            <path
              d="M15 35h50l-6 30H21L15 35z"
              fill="#f3dfd2"
              stroke="#944a00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 35h60"
              stroke="#944a00"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M27 35c0-12 6-22 13-22s13 10 13 22"
              stroke="#944a00"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M35 50v10M45 50v10" stroke="#944a00" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="absolute -top-2 -right-2 text-2xl animate-float" aria-hidden="true">🌸</span>
        <span className="absolute -bottom-1 -left-3 text-xl animate-float [animation-delay:1s]" aria-hidden="true">✦</span>
      </div>

      <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#241912] mb-3">
        Twój koszyk jest pusty
      </h2>
      <p className="text-[#564335] text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
        Odkryj nasze cyfrowe grafiki i zacznij tworzyć wyjątkowe wspomnienia.
        Pobierz natychmiast po zakupie.
      </p>

      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-[#944a00] hover:bg-[#713700] text-white font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#944a00]/20"
      >
        Przejdź do sklepu
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </motion.div>
  )
}

function OrderSummary() {
  const { items, formattedTotal, cartTotal } = useCartStore()
  const total = cartTotal()
  const formatted = formattedTotal()

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
      className="bg-white rounded-2xl border border-[#f3dfd2] shadow-sm p-6 sticky top-24"
      aria-label="Podsumowanie zamówienia"
    >
      <h2 className="font-display text-xl font-bold text-[#241912] mb-6">
        Podsumowanie
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-[#564335]">
          <span>
            Produkty ({items.reduce((n, i) => n + i.quantity, 0)} szt.)
          </span>
          <span className="font-medium text-[#241912]">{formatted}</span>
        </div>
        <div className="flex justify-between text-[#564335]">
          <span>Dostawa</span>
          <span className="font-bold text-[#006b5f]">Gratis</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#8a7263] bg-[#fff1ea] rounded-lg px-3 py-2">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#944a00]" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Produkty cyfrowe — pobierz natychmiast po zakupie
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-[#f3dfd2]">
        <div className="flex justify-between items-baseline mb-6">
          <span className="font-bold text-[#241912]">Razem</span>
          <span className="font-display text-2xl font-bold text-[#944a00]">
            {formatted}
          </span>
        </div>

        <Link
          href="/checkout"
          className="flex items-center justify-center gap-2 w-full bg-[#944a00] hover:bg-[#713700] text-white font-bold py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-[#944a00]/20 text-sm"
          aria-disabled={total === 0}
        >
          Przejdź do kasy
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        <Link
          href="/products"
          className="flex items-center justify-center gap-1.5 w-full mt-3 text-sm text-[#8a7263] hover:text-[#944a00] transition-colors py-2"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Kontynuuj zakupy
        </Link>
      </div>

      {/* Trust badges */}
      <div className="mt-5 pt-5 border-t border-[#f3dfd2] grid grid-cols-2 gap-2">
        {[
          { icon: '🔒', label: 'Bezpieczna płatność' },
          { icon: '⚡', label: 'Natychmiastowy dostęp' },
          { icon: '♾️', label: 'Bez limitu pobrań' },
          { icon: '🎨', label: 'Jakość 300 DPI' },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-[10px] text-[#8a7263]">
            <span aria-hidden="true">{icon}</span>
            {label}
          </div>
        ))}
      </div>
    </motion.aside>
  )
}

export default function CartPage() {
  const { items } = useCartStore()
  const hasItems = items.length > 0
  const hasMounted = useRef(false)

  useEffect(() => {
    hasMounted.current = true
  }, [])

  return (
    <main className="min-h-screen bg-[#fff8f5]">
      {/* Decorative top band */}
      <div className="h-1 bg-gradient-to-r from-[#f3dfd2] via-[#944a00] to-[#f3dfd2]" aria-hidden="true" />

      <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mb-8"
        >
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8a7263] mb-4">
            <Link href="/" className="hover:text-[#944a00] transition-colors">Strona główna</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products" className="hover:text-[#944a00] transition-colors">Sklep</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#241912] font-medium">Koszyk</span>
          </nav>

          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#241912]">
              Twój Koszyk
            </h1>
            {hasItems && (
              <motion.span
                key={items.length}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 bg-[#944a00] text-white text-xs font-bold rounded-full"
              >
                {items.reduce((n, i) => n + i.quantity, 0)}
              </motion.span>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!hasItems ? (
            <motion.div key="empty" exit={{ opacity: 0 }}>
              <EmptyCart />
            </motion.div>
          ) : (
            <motion.div
              key="filled"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start"
            >
              {/* Items list */}
              <section aria-label="Produkty w koszyku">
                <motion.ul
                  layout
                  className="space-y-3"
                  role="list"
                >
                  <AnimatePresence>
                    {items.map((item, i) => (
                      <CartItemCard key={item.key} item={item} index={i} />
                    ))}
                  </AnimatePresence>
                </motion.ul>

                {/* Clear cart */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 flex justify-end"
                >
                  <button
                    onClick={() => useCartStore.getState().clearCart()}
                    className="text-xs text-[#8a7263] hover:text-rose-500 transition-colors flex items-center gap-1.5 py-1"
                    aria-label="Wyczyść koszyk"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Wyczyść koszyk
                  </button>
                </motion.div>
              </section>

              {/* Order summary */}
              <OrderSummary />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
