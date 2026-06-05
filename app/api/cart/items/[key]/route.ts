import { NextRequest, NextResponse } from 'next/server'

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params
  const cartKey = req.nextUrl.searchParams.get('cart_key')
  const url = cartKey
    ? `${WP_URL}/wp-json/cocart/v2/cart/item/${key}?cart_key=${cartKey}`
    : `${WP_URL}/wp-json/cocart/v2/cart/item/${key}`

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(8000),
    })
    const data = await res.json()
    if (!res.ok) {
      return NextResponse.json(
        { error: data?.message ?? 'Failed to remove item' },
        { status: res.status }
      )
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Network error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params
  try {
    const body = await req.json()
    const { quantity, cartKey } = body as { quantity: number; cartKey?: string }

    const payload: Record<string, unknown> = { quantity: String(quantity) }
    if (cartKey) payload.cart_key = cartKey

    const res = await fetch(`${WP_URL}/wp-json/cocart/v2/cart/item/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    })
    const data = await res.json()
    if (!res.ok) {
      return NextResponse.json(
        { error: data?.message ?? 'Failed to update quantity' },
        { status: res.status }
      )
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Network error' }, { status: 500 })
  }
}
