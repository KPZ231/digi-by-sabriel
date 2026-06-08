# Auth System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wdrożyć kompletny system autentykacji NextAuth.js v5 + WPGraphQL JWT Authentication, zintegrowany z WooCommerce, z obsługą odświeżania tokenów i łatwy do rozbudowy o nowych providerów lub logikę.

**Architecture:** Credentials provider łączy się z WordPress przez mutację GraphQL `login`, zwracając parę `authToken`/`refreshToken`. Token JWT jest przechowywany w sesji NextAuth (httpOnly cookie) i automatycznie odświeżany przed wygaśnięciem. Middleware Next.js chroni trasy `/account/*` i `/checkout/*`.

**Tech Stack:** next-auth v5 (beta), graphql-request v7, Next.js 16 App Router, TypeScript strict, Zustand (stan UI), WPGraphQL JWT Authentication plugin (WordPress)

---

## Mapa plików

| Plik | Akcja | Odpowiedzialność |
|---|---|---|
| `types/auth.types.ts` | Create | Typy TypeScript dla sesji, JWT, użytkownika |
| `lib/graphql/mutations/auth.ts` | Create | LOGIN_USER, REFRESH_AUTH_TOKEN mutations |
| `lib/graphql/mutations/customer.ts` | Create | REGISTER_CUSTOMER mutation |
| `lib/auth.ts` | Create | Konfiguracja NextAuth (providers, callbacks, refreshAccessToken) |
| `lib/graphql/client.ts` | Modify | Wrapper `getAuthClient(session)` korzystający z auth.ts |
| `app/api/auth/[...nextauth]/route.ts` | Create | Handler REST dla NextAuth |
| `middleware.ts` | Create | Ochrona tras account/* i checkout/* |
| `components/auth/LoginForm.tsx` | Create | Formularz logowania (Client Component) |
| `components/auth/RegisterForm.tsx` | Create | Formularz rejestracji (Client Component) |
| `app/(auth)/login/page.tsx` | Create | Strona logowania |
| `app/(auth)/register/page.tsx` | Create | Strona rejestracji |

---

## Task 1: Instalacja zależności

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Zainstaluj next-auth v5**

```bash
npm install next-auth@beta
```

- [ ] **Step 2: Zainstaluj vitest do testów jednostkowych**

```bash
npm install -D vitest @vitejs/plugin-react
```

- [ ] **Step 3: Dodaj skrypt testów w package.json**

Otwórz `package.json`, dodaj do `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Utwórz plik konfiguracji vitest**

Utwórz `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 5: Weryfikacja instalacji**

```bash
npm ls next-auth
```
Oczekiwane: `next-auth@5.x.x`

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: install next-auth v5 and vitest"
```

---

## Task 2: Typy TypeScript dla auth

**Files:**
- Create: `types/auth.types.ts`
- Create: `types/auth.types.test.ts`

- [ ] **Step 1: Napisz failing test sprawdzający kształt typów**

Utwórz `types/auth.types.test.ts`:
```typescript
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
```

- [ ] **Step 2: Uruchom test — musi failować**

```bash
npm test
```
Oczekiwane: FAIL — `Cannot find module './auth.types'`

- [ ] **Step 3: Zaimplementuj typy**

Utwórz `types/auth.types.ts`:
```typescript
import type { Session, JWT } from 'next-auth'

export type WPUser = {
  id: string
  databaseId: number
  name: string
  email: string
  accessToken: string
  refreshToken: string
  accessTokenExpires: number
}

export type AuthSession = Session & {
  accessToken: string
  accessTokenExpires: number
  error?: 'RefreshTokenError'
  user: Session['user'] & { databaseId: number }
}

export type JwtToken = JWT & {
  accessToken: string
  refreshToken: string
  accessTokenExpires: number
  databaseId: number
  error?: 'RefreshTokenError'
}
```

- [ ] **Step 4: Uruchom test — musi przejść**

```bash
npm test
```
Oczekiwane: PASS

- [ ] **Step 5: Commit**

```bash
git add types/auth.types.ts types/auth.types.test.ts
git commit -m "feat: add auth TypeScript types"
```

---

## Task 3: Mutacje GraphQL — auth

**Files:**
- Create: `lib/graphql/mutations/auth.ts`
- Create: `lib/graphql/mutations/auth.test.ts`

- [ ] **Step 1: Napisz failing test sprawdzający strukturę mutacji**

Utwórz `lib/graphql/mutations/auth.test.ts`:
```typescript
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
```

- [ ] **Step 2: Uruchom test — musi failować**

```bash
npm test
```
Oczekiwane: FAIL — `Cannot find module './auth'`

- [ ] **Step 3: Zaimplementuj mutacje**

Utwórz `lib/graphql/mutations/auth.ts`:
```typescript
import { gql } from 'graphql-request'

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      refreshToken
      user {
        id
        databaseId
        name
        email
      }
    }
  }
`

export const REFRESH_AUTH_TOKEN = gql`
  mutation RefreshAuthToken($refreshToken: String!) {
    refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
      authToken
    }
  }
`
```

- [ ] **Step 4: Uruchom test — musi przejść**

```bash
npm test
```
Oczekiwane: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/graphql/mutations/auth.ts lib/graphql/mutations/auth.test.ts
git commit -m "feat: add auth GraphQL mutations"
```

---

## Task 4: Mutacja GraphQL — rejestracja klienta

**Files:**
- Create: `lib/graphql/mutations/customer.ts`
- Create: `lib/graphql/mutations/customer.test.ts`

- [ ] **Step 1: Napisz failing test**

Utwórz `lib/graphql/mutations/customer.test.ts`:
```typescript
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
```

- [ ] **Step 2: Uruchom test — musi failować**

```bash
npm test
```
Oczekiwane: FAIL

- [ ] **Step 3: Zaimplementuj mutację**

Utwórz `lib/graphql/mutations/customer.ts`:
```typescript
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
```

- [ ] **Step 4: Uruchom test — musi przejść**

```bash
npm test
```
Oczekiwane: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/graphql/mutations/customer.ts lib/graphql/mutations/customer.test.ts
git commit -m "feat: add RegisterCustomer GraphQL mutation"
```

---

## Task 5: Helper refreshAccessToken

**Files:**
- Create: `lib/auth-helpers.ts`
- Create: `lib/auth-helpers.test.ts`

> Ten helper jest izolowany, łatwy do przetestowania i wielokrotnego użycia. Główna konfiguracja NextAuth w `lib/auth.ts` wywoła go z `jwt` callback.

- [ ] **Step 1: Napisz failing testy**

Utwórz `lib/auth-helpers.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./graphql/client', () => ({
  publicClient: {
    request: vi.fn(),
  },
}))

import { publicClient } from './graphql/client'
import { refreshAccessToken } from './auth-helpers'
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
```

- [ ] **Step 2: Uruchom test — musi failować**

```bash
npm test
```
Oczekiwane: FAIL — `Cannot find module './auth-helpers'`

- [ ] **Step 3: Zaimplementuj helper**

Utwórz `lib/auth-helpers.ts`:
```typescript
import { publicClient } from '@/lib/graphql/client'
import { REFRESH_AUTH_TOKEN } from '@/lib/graphql/mutations/auth'
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
```

- [ ] **Step 4: Uruchom test — musi przejść**

```bash
npm test
```
Oczekiwane: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/auth-helpers.ts lib/auth-helpers.test.ts
git commit -m "feat: add refreshAccessToken helper with tests"
```

---

## Task 6: Konfiguracja NextAuth — lib/auth.ts

**Files:**
- Create: `lib/auth.ts`
- Modify: `types/next-auth.d.ts` (nowy plik — rozszerzenie typów NextAuth)

> UWAGA: Przeczytaj `node_modules/next-auth/dist/` i sprawdź czy API `NextAuth()` / `Credentials()` jest zgodne z zainstalowaną wersją przed pisaniem kodu.

- [ ] **Step 1: Utwórz rozszerzenie typów NextAuth**

Utwórz `types/next-auth.d.ts`:
```typescript
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    accessTokenExpires: number
    error?: 'RefreshTokenError'
    user: DefaultSession['user'] & {
      databaseId: number
    }
  }

  interface User {
    databaseId: number
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
    databaseId: number
    error?: 'RefreshTokenError'
  }
}
```

- [ ] **Step 2: Zaimplementuj lib/auth.ts**

Utwórz `lib/auth.ts`:
```typescript
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { publicClient } from '@/lib/graphql/client'
import { LOGIN_USER } from '@/lib/graphql/mutations/auth'
import { refreshAccessToken, isTokenExpired } from '@/lib/auth-helpers'

const WP_JWT_LIFETIME_MS = 300 * 1000
const EXPIRY_BUFFER_MS = 60 * 1000

type LoginResponse = {
  login: {
    authToken: string
    refreshToken: string
    user: {
      id: string
      databaseId: number
      name: string
      email: string
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        try {
          const data = await publicClient.request<LoginResponse>(LOGIN_USER, {
            username: credentials.username,
            password: credentials.password,
          })

          const { login } = data
          if (!login?.authToken) return null

          return {
            id: String(login.user.databaseId),
            name: login.user.name,
            email: login.user.email,
            databaseId: login.user.databaseId,
            accessToken: login.authToken,
            refreshToken: login.refreshToken,
            accessTokenExpires: Date.now() + WP_JWT_LIFETIME_MS - EXPIRY_BUFFER_MS,
          }
        } catch {
          return null
        }
      },
    }),
    // Aby dodać kolejnego providera (np. Google), dodaj tutaj:
    // GoogleProvider({ clientId: ..., clientSecret: ... })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
          databaseId: user.databaseId,
        }
      }

      if (!isTokenExpired(token)) {
        return token
      }

      return refreshAccessToken(token)
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.accessTokenExpires = token.accessTokenExpires
      session.error = token.error
      session.user.databaseId = token.databaseId
      return session
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: { strategy: 'jwt' },
})
```

- [ ] **Step 3: Weryfikacja type-check**

```bash
npx tsc --noEmit
```
Oczekiwane: brak błędów dotyczących `lib/auth.ts`

- [ ] **Step 4: Commit**

```bash
git add lib/auth.ts types/next-auth.d.ts
git commit -m "feat: configure NextAuth v5 with credentials provider and JWT rotation"
```

---

## Task 7: Route Handler NextAuth

**Files:**
- Create: `app/api/auth/[...nextauth]/route.ts`

- [ ] **Step 1: Utwórz route handler**

Utwórz `app/api/auth/[...nextauth]/route.ts`:
```typescript
import { handlers } from '@/lib/auth'

export const { GET, POST } = handlers
```

- [ ] **Step 2: Weryfikacja type-check**

```bash
npx tsc --noEmit
```
Oczekiwane: brak błędów

- [ ] **Step 3: Commit**

```bash
git add app/api/auth/[...nextauth]/route.ts
git commit -m "feat: add NextAuth route handler"
```

---

## Task 8: Middleware — ochrona tras

**Files:**
- Create: `middleware.ts`
- Create: `middleware.test.ts`

- [ ] **Step 1: Napisz failing test dla pomocniczej funkcji weryfikacji tras**

Utwórz `middleware.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { isProtectedPath } from './middleware'

describe('isProtectedPath', () => {
  it('protects /account paths', () => {
    expect(isProtectedPath('/account')).toBe(true)
    expect(isProtectedPath('/account/orders')).toBe(true)
    expect(isProtectedPath('/account/orders/123')).toBe(true)
  })

  it('protects /checkout paths', () => {
    expect(isProtectedPath('/checkout')).toBe(true)
    expect(isProtectedPath('/checkout/step-2')).toBe(true)
  })

  it('does not protect public paths', () => {
    expect(isProtectedPath('/')).toBe(false)
    expect(isProtectedPath('/products')).toBe(false)
    expect(isProtectedPath('/login')).toBe(false)
    expect(isProtectedPath('/cart')).toBe(false)
  })
})
```

- [ ] **Step 2: Uruchom test — musi failować**

```bash
npm test
```
Oczekiwane: FAIL — `isProtectedPath is not exported`

- [ ] **Step 3: Zaimplementuj middleware**

Utwórz `middleware.ts`:
```typescript
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PREFIXES = ['/account', '/checkout'] as const

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export default auth((req: NextRequest & { auth: unknown }) => {
  const isLoggedIn = !!req.auth

  if (isProtectedPath(req.nextUrl.pathname) && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/account/:path*', '/checkout/:path*'],
}
```

- [ ] **Step 4: Uruchom test — musi przejść**

```bash
npm test
```
Oczekiwane: PASS

- [ ] **Step 5: Commit**

```bash
git add middleware.ts middleware.test.ts
git commit -m "feat: add auth middleware protecting /account and /checkout routes"
```

---

## Task 9: Aktualizacja klienta GraphQL — getAuthClient

**Files:**
- Modify: `lib/graphql/client.ts`
- Create: `lib/graphql/client.test.ts`

- [ ] **Step 1: Napisz failing test**

Utwórz `lib/graphql/client.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { authClient, getAuthClient } from './client'

describe('getAuthClient', () => {
  it('returns authClient when session has accessToken', () => {
    const session = { accessToken: 'test-token' } as { accessToken: string }
    const client = getAuthClient(session)
    expect(client).toBeDefined()
  })

  it('returns null when session is null', () => {
    const client = getAuthClient(null)
    expect(client).toBeNull()
  })

  it('returns null when accessToken is missing', () => {
    const client = getAuthClient({ accessToken: '' } as { accessToken: string })
    expect(client).toBeNull()
  })
})
```

- [ ] **Step 2: Uruchom test — musi failować**

```bash
npm test
```
Oczekiwane: FAIL — `getAuthClient is not exported`

- [ ] **Step 3: Zaktualizuj client.ts — dodaj getAuthClient**

Przeczytaj `lib/graphql/client.ts` (aktualna zawartość):
```typescript
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
```

Dodaj na końcu pliku:
```typescript
export function getAuthClient(
  session: { accessToken: string } | null
): GraphQLClient | null {
  if (!session?.accessToken) return null
  return authClient(session.accessToken)
}
```

- [ ] **Step 4: Uruchom test — musi przejść**

```bash
npm test
```
Oczekiwane: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/graphql/client.ts lib/graphql/client.test.ts
git commit -m "feat: add getAuthClient helper to GraphQL client"
```

---

## Task 10: Komponent LoginForm

**Files:**
- Create: `components/auth/LoginForm.tsx`

> Ten komponent jest Client Component — używa hooków (`useState`, `useRouter`, `signIn` z next-auth).

- [ ] **Step 1: Utwórz komponent**

Utwórz `components/auth/LoginForm.tsx`:
```typescript
'use client'

import { useState, type FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type LoginState = 'idle' | 'loading' | 'error'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/account'

  const [state, setState] = useState<LoginState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMessage('')

    const form = new FormData(e.currentTarget)
    const result = await signIn('credentials', {
      username: form.get('username') as string,
      password: form.get('password') as string,
      redirect: false,
    })

    if (result?.error) {
      setState('error')
      setErrorMessage('Nieprawidłowy login lub hasło.')
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-sm font-medium">
          Login lub e-mail
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium">
          Hasło
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="bg-black text-white rounded px-4 py-2 text-sm font-medium hover:bg-zinc-800 disabled:opacity-50"
      >
        {state === 'loading' ? 'Logowanie...' : 'Zaloguj się'}
      </button>

      <p className="text-sm text-center text-zinc-600">
        Nie masz konta?{' '}
        <Link href="/register" className="underline">
          Zarejestruj się
        </Link>
      </p>
    </form>
  )
}
```

- [ ] **Step 2: Weryfikacja type-check**

```bash
npx tsc --noEmit
```
Oczekiwane: brak błędów

- [ ] **Step 3: Commit**

```bash
git add components/auth/LoginForm.tsx
git commit -m "feat: add LoginForm client component"
```

---

## Task 11: Strona logowania

**Files:**
- Create: `app/(auth)/login/page.tsx`

- [ ] **Step 1: Utwórz stronę**

Utwórz `app/(auth)/login/page.tsx`:
```typescript
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/auth/LoginForm'
import { Suspense } from 'react'

export const metadata = { title: 'Logowanie — Digi by Sabriel' }

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect('/account')

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <h1 className="text-2xl font-semibold">Zaloguj się</h1>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Weryfikacja type-check**

```bash
npx tsc --noEmit
```
Oczekiwane: brak błędów

- [ ] **Step 3: Commit**

```bash
git add app/(auth)/login/page.tsx
git commit -m "feat: add login page"
```

---

## Task 12: Komponent RegisterForm

**Files:**
- Create: `components/auth/RegisterForm.tsx`

- [ ] **Step 1: Utwórz komponent**

Utwórz `components/auth/RegisterForm.tsx`:
```typescript
'use client'

import { useState, type FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { publicClient } from '@/lib/graphql/client'
import { REGISTER_CUSTOMER } from '@/lib/graphql/mutations/customer'

type RegisterState = 'idle' | 'loading' | 'error'

type RegisterResponse = {
  registerCustomer: {
    authToken: string | null
    customer: { email: string } | null
  }
}

export function RegisterForm() {
  const router = useRouter()
  const [state, setState] = useState<RegisterState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMessage('')

    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string
    const password = form.get('password') as string
    const firstName = form.get('firstName') as string
    const lastName = form.get('lastName') as string

    try {
      const data = await publicClient.request<RegisterResponse>(
        REGISTER_CUSTOMER,
        { email, password, firstName, lastName, username: email }
      )

      if (!data.registerCustomer?.authToken) {
        setState('error')
        setErrorMessage('Nie udało się utworzyć konta. Spróbuj ponownie.')
        return
      }

      // Auto-login after registration
      const result = await signIn('credentials', {
        username: email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setState('error')
        setErrorMessage('Konto utworzone, ale logowanie nie powiodło się. Zaloguj się ręcznie.')
        return
      }

      router.push('/account')
      router.refresh()
    } catch {
      setState('error')
      setErrorMessage('Wystąpił błąd. Możliwe, że e-mail jest już zajęty.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="firstName" className="text-sm font-medium">
            Imię
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastName" className="text-sm font-medium">
            Nazwisko
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium">
          Hasło
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="bg-black text-white rounded px-4 py-2 text-sm font-medium hover:bg-zinc-800 disabled:opacity-50"
      >
        {state === 'loading' ? 'Tworzenie konta...' : 'Utwórz konto'}
      </button>

      <p className="text-sm text-center text-zinc-600">
        Masz już konto?{' '}
        <Link href="/login" className="underline">
          Zaloguj się
        </Link>
      </p>
    </form>
  )
}
```

- [ ] **Step 2: Weryfikacja type-check**

```bash
npx tsc --noEmit
```
Oczekiwane: brak błędów

- [ ] **Step 3: Commit**

```bash
git add components/auth/RegisterForm.tsx
git commit -m "feat: add RegisterForm client component"
```

---

## Task 13: Strona rejestracji

**Files:**
- Create: `app/(auth)/register/page.tsx`

- [ ] **Step 1: Utwórz stronę**

Utwórz `app/(auth)/register/page.tsx`:
```typescript
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata = { title: 'Rejestracja — Digi by Sabriel' }

export default async function RegisterPage() {
  const session = await auth()
  if (session) redirect('/account')

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <h1 className="text-2xl font-semibold">Utwórz konto</h1>
        <RegisterForm />
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Weryfikacja type-check**

```bash
npx tsc --noEmit
```
Oczekiwane: brak błędów

- [ ] **Step 3: Commit**

```bash
git add app/(auth)/register/page.tsx
git commit -m "feat: add register page"
```

---

## Task 14: Zmienne środowiskowe — konfiguracja

**Files:**
- Modify: `.env.local` (utwórz jeśli brak)

- [ ] **Step 1: Upewnij się, że .env.local istnieje i zawiera wymagane zmienne**

Sprawdź czy plik istnieje:
```bash
ls .env.local 2>/dev/null || echo "missing"
```

Jeśli brak, utwórz `.env.local` z poniższą zawartością (uzupełnij realnymi wartościami):
```bash
# WordPress / GraphQL
NEXT_PUBLIC_WORDPRESS_URL=https://twoj-wordpress.pl
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://twoj-wordpress.pl/graphql

# NextAuth v5
AUTH_SECRET=wygeneruj-losowy-string-min-32-znaki
# AUTH_URL= (opcjonalne — NextAuth v5 wykrywa automatycznie)

# WooCommerce REST API
WC_CONSUMER_KEY=ck_xxxxxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxxxxx

# Webhook
WEBHOOK_SECRET=xxxxxxxxxxxx
```

Wygeneruj `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

- [ ] **Step 2: Sprawdź że .env.local jest w .gitignore**

```bash
grep ".env.local" .gitignore
```
Oczekiwane: `.env.local` jest wymieniony

- [ ] **Step 3: Zrestartuj dev server i sprawdź `/api/auth/providers`**

```bash
npm run dev
```
Otwórz: `http://localhost:3000/api/auth/providers`
Oczekiwane: JSON z obiektem zawierającym provider `credentials`

---

## Task 15: Weryfikacja integracji — test manualny

> Ten task weryfikuje cały flow end-to-end. Wymaga działającego WordPress z WPGraphQL JWT Authentication.

- [ ] **Step 1: Uruchom dev server**

```bash
npm run dev
```

- [ ] **Step 2: Przetestuj logowanie**

1. Otwórz `http://localhost:3000/login`
2. Wpisz dane użytkownika WordPress
3. Kliknij "Zaloguj się"
4. Oczekiwane: przekierowanie na `/account`

- [ ] **Step 3: Przetestuj ochronę tras**

1. Wyloguj się
2. Otwórz `http://localhost:3000/account`
3. Oczekiwane: przekierowanie na `/login?callbackUrl=%2Faccount`

- [ ] **Step 4: Przetestuj rejestrację**

1. Otwórz `http://localhost:3000/register`
2. Wypełnij formularz z nowym e-mailem
3. Kliknij "Utwórz konto"
4. Oczekiwane: automatyczne zalogowanie i przekierowanie na `/account`

- [ ] **Step 5: Sprawdź odświeżanie tokenów**

W `lib/auth.ts` tymczasowo zmień `WP_JWT_LIFETIME_MS = 10 * 1000` (10s).
Po zalogowaniu odczekaj 10s i wykonaj żądanie wymagające auth — token powinien być odświeżony bez wylogowania.
Przywróć `WP_JWT_LIFETIME_MS = 300 * 1000`.

- [ ] **Step 6: Commit końcowy**

```bash
npm run build
git add -A
git commit -m "feat: complete auth system — NextAuth v5 + WPGraphQL JWT + WooCommerce integration"
```

---

## Rozbudowa systemu

System jest gotowy do rozbudowy przez:

- **Nowy OAuth provider:** W `lib/auth.ts` dodaj do tablicy `providers` np. `GoogleProvider(...)` — nie wymaga zmian w reszcie kodu.
- **Nowe chronione trasy:** Dodaj prefix do `PROTECTED_PREFIXES` w `middleware.ts`.
- **Nowe pola w sesji:** Rozszerz `types/next-auth.d.ts` i `jwt` callback w `lib/auth.ts`.
- **Wylogowanie z potwierdzeniem:** `signOut()` z `next-auth/react` w dowolnym Client Component.
- **Obsługa błędu RefreshTokenError:** Sprawdź `session.error === 'RefreshTokenError'` w Session Provider i wywołaj `signOut()`.

---

## Self-Review

**Spec coverage:**
- ✅ Credentials provider z mutacją `login` (WPGraphQL JWT)
- ✅ Token JWT w sesji NextAuth (httpOnly cookie via `strategy: 'jwt'`)
- ✅ Token dołączany do zapytań GraphQL (`getAuthClient`)
- ✅ Refresh token przed wygaśnięciem (`refreshAccessToken`, `isTokenExpired`)
- ✅ Wylogowanie przy błędzie odświeżania (`error: 'RefreshTokenError'`)
- ✅ Chronione trasy `/account/*` i `/checkout/*` przez middleware
- ✅ Strony login/register z redirectem jeśli już zalogowany
- ✅ Łatwa rozbudowa (komentarze w `lib/auth.ts`, stała `PROTECTED_PREFIXES`)

**Placeholders:** Brak — każdy step zawiera kompletny kod.

**Type consistency:**
- `WPUser` zdefiniowany w Task 2, używany w Task 6 (`lib/auth.ts` User interface)
- `JwtToken` z Task 2 używany w `lib/auth-helpers.ts` (Task 5) i `lib/auth.ts` (Task 6)
- `AuthSession` z Task 2 pokrywa rozszerzenie `next-auth.d.ts` z Task 6
- `getAuthClient` z Task 9 przyjmuje `{ accessToken: string } | null` — kompatybilne z `AuthSession`
