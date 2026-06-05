import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!

export const publicClient = new GraphQLClient(endpoint, {
  requestMiddleware: (req) => ({
    ...req,
    signal: AbortSignal.timeout(8000),
  }),
})

export function authClient(token: string): GraphQLClient {
  return new GraphQLClient(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
    requestMiddleware: (req) => ({
      ...req,
      signal: AbortSignal.timeout(8000),
    }),
  })
}
