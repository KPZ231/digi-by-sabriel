import { describe, it, expectTypeOf } from 'vitest'
import type { WPUser, AuthSession, JwtToken } from './auth.types'

describe('auth types shape', () => {
  it('WPUser has required fields', () => {
    expectTypeOf<WPUser>().toHaveProperty('id')
    expectTypeOf<WPUser>().toHaveProperty('databaseId')
    expectTypeOf<WPUser>().toHaveProperty('name')
    expectTypeOf<WPUser>().toHaveProperty('email')
  })

  it('AuthSession extends Session with accessToken', () => {
    expectTypeOf<AuthSession>().toHaveProperty('accessToken')
    expectTypeOf<AuthSession>().toHaveProperty('error')
  })

  it('JwtToken has token rotation fields', () => {
    expectTypeOf<JwtToken>().toHaveProperty('accessToken')
    expectTypeOf<JwtToken>().toHaveProperty('refreshToken')
    expectTypeOf<JwtToken>().toHaveProperty('accessTokenExpires')
  })
})
