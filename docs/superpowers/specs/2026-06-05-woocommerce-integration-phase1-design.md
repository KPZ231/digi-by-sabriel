# WooCommerce Integration — Faza 1: Fundament + Produkty

**Data:** 2026-06-05  
**Projekt:** Digi by Sabriel (Next.js 16, App Router)  
**Zakres:** Publiczne pobieranie produktów i kategorii z WPGraphQL, SSG/ISR, webhook revalidation

---

## Kontekst

Sklep z cyfrowymi grafikami scrapbookingowymi. Backend: WordPress + WooCommerce + WPGraphQL + WooGraphQL + CoCart + JWT Auth (wszystkie skonfigurowane). Frontend: Next.js 16, React 19, TypeScript, Tailwind v4.

Aktualny stan frontendu: UI zbudowane z hardcodowanymi danymi mock. Ta faza podmienia mock dane na prawdziwe dane z WPGraphQL, nie dodaje żadnych mutacji.

---

## Zakres Fazy 1 (co wchodzi)

- Klient GraphQL (`graphql-request`)
- Warstwa danych produktów i kategorii
- Strony Server Component z SSG/ISR
- Webhook endpoint do natychmiastowej revalidacji ISR
- Typy TypeScript dla produktów i kategorii
- Przepisanie komponentów UI przyjmujących props zamiast hardcodowanych stałych

## Poza zakresem Fazy 1

- Koszyk, auth, checkout, strefa klienta — fazy 2–4
- Server Actions — wchodzą dopiero w fazie 2 (mutacje koszyka)
- Wyszukiwanie, filtrowanie — po fazie 1

---

## Architektura

```
WordPress/WooCommerce (WPGraphQL)
         │
         │  HTTPS / GraphQL (graphql-request)
         ▼
  Next.js 16 (App Router)
  ┌──────────────────────────────────────────┐
  │  app/(store)/page.tsx          ISR 1800s │
  │  app/(store)/products/page.tsx ISR 1800s │
  │  app/(store)/products/[slug]/  ISR 3600s │
  │  app/(store)/category/[slug]/  ISR 1800s │
  │  app/api/webhooks/woocommerce/ POST      │
  │                                          │
  │  lib/graphql/client.ts                   │
  │  lib/graphql/queries/products.ts         │
  │  lib/graphql/queries/categories.ts       │
  │  lib/woocommerce/products.ts             │
  │                                          │
  │  types/product.types.ts                  │
  └──────────────────────────────────────────┘
```

Wzorzec przepływu danych:
```
page.tsx (Server Component)
  └─ await getProducts()          ← lib/woocommerce/products.ts
       └─ publicClient.request()  ← lib/graphql/client.ts
            └─ WPGraphQL endpoint
  └─ <ProductGrid products={data} />   ← Client Component (Framer Motion)
```

---

## GraphQL Client (`lib/graphql/client.ts`)

Dwa klienty:

**`publicClient`** — singleton bez auth, używany do SSG/ISR w Server Components. Timeout 8000ms.

**`authClient(token: string)`** — fabryka, zwraca nowego klienta z `Authorization: Bearer <token>`. Nie jest singletonem — token przekazywany jawnie przy każdym wywołaniu, żeby uniknąć wycieków między requestami w środowisku serwerowym.

Zmienne środowiskowe:
- `NEXT_PUBLIC_GRAPHQL_ENDPOINT` — URL endpointu GraphQL

---

## Typy TypeScript (`types/product.types.ts`)

```typescript
type WooProduct = {
  id: string
  databaseId: number
  slug: string
  name: string
  description: string
  shortDescription: string
  price: string
  regularPrice: string
  salePrice: string | null
  onSale: boolean
  status: 'publish' | 'draft' | 'private'
  image: { sourceUrl: string; altText: string } | null
  galleryImages: { nodes: Array<{ sourceUrl: string; altText: string }> }
  productCategories: { nodes: Array<{ id: string; name: string; slug: string }> }
  downloadable: boolean
  virtual: boolean
}

type WooCategory = {
  id: string
  databaseId: number
  slug: string
  name: string
  count: number
  image: { sourceUrl: string; altText: string } | null
}

type AppError = {
  code: 'NETWORK_ERROR' | 'GRAPHQL_ERROR' | 'NOT_FOUND' | 'UNKNOWN'
  message: string
}
```

---

## Warstwa danych (`lib/woocommerce/products.ts`)

Cztery funkcje, każda zwraca `{ data: T, error: null } | { data: null, error: AppError }`:

```typescript
getProducts(args?: { category?: string; first?: number })
getProductBySlug(slug: string)
getCategories()
getFeaturedProducts(first?: number)
```

Zasady:
- Wywołują `publicClient` z zapytaniem z `lib/graphql/queries/`
- Każda jest opakowana w try/catch — błędy sieciowe i GraphQL mapowane na `AppError`
- Nigdy nie rzucają wyjątku do warstwy komponentów
- Pobierają tylko pola potrzebne do widoku

---

## Zapytania GraphQL

**`lib/graphql/queries/products.ts`**
- `GET_PRODUCTS` — lista produktów (id, slug, name, price, image, categories, onSale)
- `GET_PRODUCT_BY_SLUG` — pełne dane produktu włącznie z galerią i shortDescription
- `GET_FEATURED_PRODUCTS` — produkty z flagą `featured: true` w WooCommerce (filtr w zapytaniu)

**`lib/graphql/queries/categories.ts`**
- `GET_CATEGORIES` — wszystkie kategorie z count i image

---

## Strony

### `app/(store)/page.tsx` — Strona główna
- `export const revalidate = 1800`
- Wywołuje `getFeaturedProducts(4)` i `getCategories()`
- Przekazuje do `<Bestsellers products={...} />` i `<Categories categories={...} />`

### `app/(store)/products/page.tsx` — Katalog
- `export const revalidate = 1800`
- Wywołuje `getProducts({ first: 50 })`
- Renderuje siatkę produktów

### `app/(store)/products/[slug]/page.tsx` — Strona produktu
- `export const revalidate = 3600`
- `generateStaticParams` → wywołuje `getProducts()` i mapuje slugi
- Wywołuje `getProductBySlug(slug)`
- `notFound()` jeśli `error.code === 'NOT_FOUND'`

### `app/(store)/category/[slug]/page.tsx` — Kategoria
- `export const revalidate = 1800`
- `generateStaticParams` → wywołuje `getCategories()` i mapuje slugi
- Wywołuje `getProducts({ category: slug })`

---

## Webhook + ISR Revalidation (`app/api/webhooks/woocommerce/route.ts`)

Endpoint POST, wywoływany przez WordPress po każdej zmianie produktu.

Przepływ:
1. Pobiera nagłówek `x-wc-webhook-signature` z żądania
2. Oblicza HMAC-SHA256 z body (raw) i `WEBHOOK_SECRET`
3. Porównuje przez `timingSafeEqual` — odrzuca z 401 jeśli niezgodny
4. Parsuje JSON body — wyciąga `slug` produktu
5. Wywołuje `revalidatePath('/')`, `revalidatePath('/products')`, `revalidatePath('/products/' + slug)`. Strony kategorii odświeżają się na własnym harmonogramie ISR — webhook ich nie dotyka.
6. Zwraca 200 `{ revalidated: true }`

Zmienne środowiskowe:
- `WEBHOOK_SECRET` — wyłącznie server-side

---

## Komponenty UI — zmiany

Obecne komponenty (`Bestsellers`, `Categories`) trzymają dane hardcodowane wewnątrz. Zostaną zmodyfikowane:

- Usunąć wewnętrzne stałe `PRODUCTS` i `CATEGORIES`
- Dodać typed props: `products: WooProduct[]`, `categories: WooCategory[]`
- Logika renderowania i animacje pozostają bez zmian

Nowe komponenty do stworzenia:
- `components/product/ProductCard.tsx` — wydzielona karta produktu (już jest inline w Bestsellers)
- `components/product/ProductGrid.tsx` — siatka dla strony katalogu

---

## Zmienne środowiskowe

```bash
# .env.local
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://twoj-wordpress.pl/graphql
WEBHOOK_SECRET=xxxxxxxxxxxx
```

---

## Nowe zależności

```bash
npm install graphql-request graphql
```

---

## Kolejne fazy (poza zakresem tego spec)

- **Faza 2:** Koszyk — CoCart + Zustand + Server Actions
- **Faza 3:** Auth — NextAuth v5 + WPGraphQL JWT + chronione trasy
- **Faza 4:** Checkout + pobieranie plików — order creation, download links
