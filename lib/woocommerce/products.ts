import { unstable_cache } from 'next/cache'
import { ClientError } from 'graphql-request'
import { publicClient } from '@/lib/graphql/client'
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_FEATURED_PRODUCTS,
} from '@/lib/graphql/queries/products'
import { GET_CATEGORIES } from '@/lib/graphql/queries/categories'
import type { WooProduct, WooCategory, Result, AppError } from '@/types/product.types'

type ProductsResponse = {
  products: { nodes: WooProduct[] }
}

type ProductResponse = {
  product: WooProduct | null
}

type CategoriesResponse = {
  productCategories: { nodes: WooCategory[] }
}

function toAppError(err: unknown): AppError {
  if (err instanceof ClientError) {
    const isNotFound = err.response.errors?.some((e) =>
      e.message?.toLowerCase().includes('not found')
    )
    return {
      code: isNotFound ? 'NOT_FOUND' : 'GRAPHQL_ERROR',
      message: err.response.errors?.[0]?.message ?? 'GraphQL error',
    }
  }
  if (err instanceof Error) {
    return { code: 'NETWORK_ERROR', message: err.message }
  }
  return { code: 'UNKNOWN', message: 'Unknown error' }
}

async function _getProducts(args?: {
  category?: string
  first?: number
}): Promise<Result<WooProduct[]>> {
  try {
    const data = await publicClient.request<ProductsResponse>(GET_PRODUCTS, {
      first: args?.first ?? 50,
      category: args?.category ?? null,
    })
    return { data: data.products.nodes, error: null }
  } catch (err) {
    console.error('[getProducts]', err)
    return { data: null, error: toAppError(err) }
  }
}

async function _getProductBySlug(slug: string): Promise<Result<WooProduct>> {
  try {
    const data = await publicClient.request<ProductResponse>(
      GET_PRODUCT_BY_SLUG,
      { slug }
    )
    if (!data.product) {
      return { data: null, error: { code: 'NOT_FOUND', message: `Product "${slug}" not found` } }
    }
    return { data: data.product, error: null }
  } catch (err) {
    console.error('[getProductBySlug]', err)
    return { data: null, error: toAppError(err) }
  }
}

async function _getFeaturedProducts(
  first?: number
): Promise<Result<WooProduct[]>> {
  try {
    const data = await publicClient.request<ProductsResponse>(
      GET_FEATURED_PRODUCTS,
      { first: first ?? 4 }
    )
    return { data: data.products.nodes, error: null }
  } catch (err) {
    console.error('[getFeaturedProducts]', err)
    return { data: null, error: toAppError(err) }
  }
}

async function _getCategories(): Promise<Result<WooCategory[]>> {
  try {
    const data = await publicClient.request<CategoriesResponse>(GET_CATEGORIES)
    return { data: data.productCategories.nodes, error: null }
  } catch (err) {
    console.error('[getCategories]', err)
    return { data: null, error: toAppError(err) }
  }
}

export const getProducts = unstable_cache(_getProducts, ['get-products'], {
  revalidate: 1800,
  tags: ['products'],
})

export const getProductBySlug = unstable_cache(
  _getProductBySlug,
  ['get-product-by-slug'],
  { revalidate: 3600, tags: ['products'] }
)

export const getFeaturedProducts = unstable_cache(
  _getFeaturedProducts,
  ['get-featured-products'],
  { revalidate: 1800, tags: ['products'] }
)

export const getCategories = unstable_cache(_getCategories, ['get-categories'], {
  revalidate: 1800,
  tags: ['categories'],
})
