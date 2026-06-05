import { NextRequest, NextResponse } from 'next/server'

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

export async function GET(req: NextRequest) {
  const cartKey = req.nextUrl.searchParams.get('cart_key')
  const url = cartKey
    ? `${WP_URL}/wp-json/cocart/v2/cart?cart_key=${cartKey}`
    : `${WP_URL}/wp-json/cocart/v2/cart`

  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch cart' }, { status: res.status })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Network error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const cartKey = req.nextUrl.searchParams.get('cart_key')
  const url = cartKey
    ? `${WP_URL}/wp-json/cocart/v2/cart/clear?cart_key=${cartKey}`
    : `${WP_URL}/wp-json/cocart/v2/cart/clear`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to clear cart' }, { status: res.status })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Network error' }, { status: 500 })
  }
}
