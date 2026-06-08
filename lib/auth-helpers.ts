import { publicClient } from './graphql/client'
import { REFRESH_AUTH_TOKEN } from './graphql/mutations/auth'
import type { JwtToken } from '@/types/auth.types'

const WP_JWT_LIFETIME_MS = 300 * 1000
const EXPIRY_BUFFER_MS = 60 * 1000

export async function refreshAccessToken(token: JwtToken): Promise<JwtToken> {
  try {
    const data = await publicClient.request<{
      refreshJwtAuthToken: { authToken: string }
    }>(REFRESH_AUTH_TOKEN, { refreshToken: token.refreshToken })

    return {
      ...token,
      accessToken: data.refreshJwtAuthToken.authToken,
      accessTokenExpires: Date.now() + WP_JWT_LIFETIME_MS - EXPIRY_BUFFER_MS,
      error: undefined,
    }
  } catch {
    return { ...token, error: 'RefreshTokenError' }
  }
}

export function isTokenExpired(token: JwtToken): boolean {
  return Date.now() >= token.accessTokenExpires
}
