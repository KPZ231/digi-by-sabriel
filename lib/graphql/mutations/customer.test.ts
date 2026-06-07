import { describe, it, expect } from 'vitest'
import { REGISTER_CUSTOMER } from './customer'

describe('customer mutations', () => {
  it('REGISTER_CUSTOMER contains required fields', () => {
    const str = REGISTER_CUSTOMER.toString()
    expect(str).toContain('mutation RegisterCustomer')
    expect(str).toContain('authToken')
    expect(str).toContain('refreshToken')
    expect(str).toContain('email')
  })
})
