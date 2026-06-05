import { gql } from 'graphql-request'

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int, $category: String) {
    products(
      first: $first
      where: { status: "publish", category: $category }
    ) {
      nodes {
        id
        databaseId
        slug
        name
        onSale
        featured
        status
        image {
          sourceUrl
          altText
        }
        productCategories {
          nodes {
            id
            name
            slug
          }
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          downloadable
          virtual
        }
      }
    }
  }
`

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      slug
      name
      description
      shortDescription
      onSale
      featured
      status
      image {
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      productCategories {
        nodes {
          id
          name
          slug
        }
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        downloadable
        virtual
      }
    }
  }
`

export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts($first: Int) {
    products(
      first: $first
      where: { status: "publish", featured: true }
    ) {
      nodes {
        id
        databaseId
        slug
        name
        onSale
        featured
        status
        image {
          sourceUrl
          altText
        }
        productCategories {
          nodes {
            id
            name
            slug
          }
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          downloadable
          virtual
        }
      }
    }
  }
`
