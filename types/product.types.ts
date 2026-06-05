export type WooProduct = {
  id: string
  databaseId: number
  slug: string
  name: string
  description: string
  shortDescription: string
  price: string
  regularPrice: string
  salePrice: string | null
  onSale: boolean
  featured: boolean
  status: 'publish' | 'draft' | 'private'
  image: { sourceUrl: string; altText: string } | null
  galleryImages: { nodes: Array<{ sourceUrl: string; altText: string }> }
  productCategories: { nodes: Array<{ id: string; name: string; slug: string }> }
  downloadable: boolean
  virtual: boolean
  averageRating?: number
  reviewCount?: number
}

export type WooCategory = {
  id: string
  databaseId: number
  slug: string
  name: string
  count: number
  image: { sourceUrl: string; altText: string } | null
}

export type AppError = {
  code: 'NETWORK_ERROR' | 'GRAPHQL_ERROR' | 'NOT_FOUND' | 'UNKNOWN'
  message: string
}

export type Result<T> =
  | { data: T; error: null }
  | { data: null; error: AppError }
