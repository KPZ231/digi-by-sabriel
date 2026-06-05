import { createHmac, timingSafeEqual } from 'crypto'
import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const signature = request.headers.get('x-wc-webhook-signature')
  if (!signature) {
    return new Response('Missing signature', { status: 401 })
  }

  const body = await request.text()

  const secret = process.env.WEBHOOK_SECRET
  if (!secret) {
    console.error('[webhook] WEBHOOK_SECRET not configured')
    return new Response('Server misconfiguration', { status: 500 })
  }

  const expected = createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('base64')

  const sigBuffer = Buffer.from(signature)
  const expBuffer = Buffer.from(expected)

  const isValid =
    sigBuffer.length === expBuffer.length &&
    timingSafeEqual(sigBuffer, expBuffer)

  if (!isValid) {
    return new Response('Invalid signature', { status: 401 })
  }

  let slug: string | undefined
  try {
    const payload = JSON.parse(body) as Record<string, unknown>
    slug = typeof payload.slug === 'string' ? payload.slug : undefined
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  revalidateTag('products', 'default')
  revalidateTag('categories', 'default')

  if (slug) {
    console.info(`[webhook] Revalidated products tag (slug: ${slug})`)
  } else {
    console.info('[webhook] Revalidated products tag')
  }

  return Response.json({ revalidated: true })
}
