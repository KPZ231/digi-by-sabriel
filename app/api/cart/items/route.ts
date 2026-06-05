import { NextRequest, NextResponse } from 'next/server'

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, quantity = 1, cartKey } = body as {
      productId: number
      quantity?: number
      cartKey?: string
    }

    const payload: Record<string, unknown> = {
      id: String(productId),
      quantity: String(quantity),
    }
    if (cartKey) payload.cart_key = cartKey

    const res = await fetch(`${WP_URL}/wp-json/cocart/v2/cart/add-item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    })

    const data = await res.json()
    if (!res.ok) {
      return NextResponse.json(
        { error: data?.message ?? 'Failed to add item' },
        { status: res.status }
      )
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Network error' }, { status: 500 })
  }
}
