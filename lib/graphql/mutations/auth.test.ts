import { describe, it, expect } from 'vitest'
import { LOGIN_USER, REFRESH_AUTH_TOKEN } from './auth'

describe('auth mutations', () => {
  it('LOGIN_USER contains required fields', () => {
    const str = LOGIN_USER.toString()
    expect(str).toContain('mutation LoginUser')
    expect(str).toContain('authToken')
    expect(str).toContain('refreshToken')
    expect(str).toContain('databaseId')
  })

  it('REFRESH_AUTH_TOKEN contains required fields', () => {
    const str = REFRESH_AUTH_TOKEN.toString()
    expect(str).toContain('mutation RefreshAuthToken')
    expect(str).toContain('jwtRefreshToken')
    expect(str).toContain('authToken')
  })
})
