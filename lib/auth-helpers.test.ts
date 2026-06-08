import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./graphql/client', () => ({
  publicClient: {
    request: vi.fn(),
  },
}))

import { publicClient } from './graphql/client'
import { refreshAccessToken, isTokenExpired } from './auth-helpers'
import type { JwtToken } from '@/types/auth.types'

const baseToken: JwtToken = {
  accessToken: 'old-token',
  refreshToken: 'valid-refresh',
  accessTokenExpires: Date.now() - 1000,
  databaseId: 1,
  iat: 0,
  exp: 0,
  jti: 'test',
}

describe('refreshAccessToken', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns new token on success', async () => {
    vi.mocked(publicClient.request).mockResolvedValueOnce({
      refreshJwtAuthToken: { authToken: 'new-token' },
    })

    const result = await refreshAccessToken(baseToken)

    expect(result.accessToken).toBe('new-token')
    expect(result.error).toBeUndefined()
    expect(result.accessTokenExpires).toBeGreaterThan(Date.now())
  })

  it('returns error token on failure', async () => {
    vi.mocked(publicClient.request).mockRejectedValueOnce(new Error('expired'))

    const result = await refreshAccessToken(baseToken)

    expect(result.error).toBe('RefreshTokenError')
    expect(result.accessToken).toBe('old-token')
  })
})

describe('isTokenExpired', () => {
  it('returns true when token is expired', () => {
    const expired = { ...baseToken, accessTokenExpires: Date.now() - 1000 }
    expect(isTokenExpired(expired)).toBe(true)
  })

  it('returns false when token is valid', () => {
    const valid = { ...baseToken, accessTokenExpires: Date.now() + 60000 }
    expect(isTokenExpired(valid)).toBe(false)
  })
})
