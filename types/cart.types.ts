export type CartItem = {
  key: string
  productId: number
  slug: string
  name: string
  price: string
  priceRaw: number
  regularPrice: string | null
  onSale: boolean
  quantity: number
  image: { sourceUrl: string; altText: string } | null
  category: string | null
}

export type CartApiItem = {
  item_key: string
  id: number
  name: string
  price: string
  quantity: { value: number }
  featured_image?: string
}

export type CartApiResponse = {
  cart_key: string
  items: CartApiItem[]
  totals: {
    subtotal: string
    total: string
  }
}
