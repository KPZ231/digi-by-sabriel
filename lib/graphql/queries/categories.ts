import { gql } from 'graphql-request'

export const GET_CATEGORIES = gql`
  query GetCategories {
    productCategories(first: 100, where: { hideEmpty: true }) {
      nodes {
        id
        databaseId
        slug
        name
        count
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`
