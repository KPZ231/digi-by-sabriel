'use client'

import { useState } from 'react'
import { useCartStore } from '@/stores/cart.store'
import type { WooProduct } from '@/types/product.types'

type Props = { product: WooProduct }

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const [state, setState] = useState<'idle' | 'adding' | 'added'>('idle')

  async function handleClick() {
    if (state !== 'idle') return
    setState('adding')
    await addItem(product)
    setState('added')
    setTimeout(() => setState('idle'), 2000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === 'adding'}
      aria-label={`Dodaj ${product.name} do koszyka`}
      className="mt-4 flex items-center justify-center gap-2 bg-[#944a00] hover:bg-[#713700] text-white font-bold px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm shadow-[#944a00]/20 disabled:opacity-70 disabled:scale-100 w-full sm:w-auto"
    >
      {state === 'adding' && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
      )}
      {state === 'added' && (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      )}
      {state === 'idle' && (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      )}
      {state === 'adding' ? 'Dodawanie...' : state === 'added' ? 'Dodano!' : 'Dodaj do koszyka'}
    </button>
  )
}
