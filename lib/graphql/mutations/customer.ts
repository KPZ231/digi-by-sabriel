import { gql } from 'graphql-request'

export const REGISTER_CUSTOMER = gql`
  mutation RegisterCustomer(
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
    $username: String
  ) {
    registerCustomer(
      input: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        username: $username
      }
    ) {
      customer {
        id
        databaseId
        email
        firstName
        lastName
      }
      authToken
      refreshToken
    }
  }
`
