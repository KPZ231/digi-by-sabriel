import type { Session } from '@auth/core/types'
import type { JWT } from '@auth/core/jwt'

/**
 * WordPress user object returned from WooGraphQL
 * Contains both GraphQL ID and database ID for lookup
 */
export type WPUser = {
  id: string
  databaseId: number
  name: string
  email: string
  accessToken: string
  refreshToken: string
  accessTokenExpires: number
}

/**
 * Extended session type for authenticated users
 * Includes access token and expiry for API calls
 */
export type AuthSession = Session & {
  accessToken: string
  accessTokenExpires: number
  error?: 'RefreshTokenError'
  user: Session['user'] & { databaseId: number }
}

/**
 * JWT token stored in session
 * Includes token rotation fields for refresh token flow
 */
export type JwtToken = JWT & {
  accessToken: string
  refreshToken: string
  accessTokenExpires: number
  databaseId: number
  error?: 'RefreshTokenError'
}
