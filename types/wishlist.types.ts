export type WishlistItem = {
  productId: number
  slug: string
  name: string
  price: string
  regularPrice: string | null
  onSale: boolean
  image: { sourceUrl: string; altText: string } | null
  category: string | null
  addedAt: number
}
