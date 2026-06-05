@AGENTS.md
# CLAUDE.md — Headless WooCommerce + Next.js (Digital Products Store)

## Przegląd projektu

Sklep z produktami cyfrowymi. Frontend w Next.js hostowany na Vercelu.
Backend to WordPress + WooCommerce hostowany na zewnętrznym serwerze.
Komunikacja wyłącznie przez GraphQL (WPGraphQL + WooGraphQL).

Produkty są cyfrowe — brak fizycznej wysyłki, dostawa po opłaceniu zamówienia
to link do pobrania pliku lub klucz licencyjny.

---

## Stack technologiczny

```
Frontend:  Next.js 14+ (App Router), TypeScript, Tailwind CSS
Backend:   WordPress + WooCommerce + WPGraphQL + WooGraphQL + CoCart
Auth:      NextAuth.js v5 + WPGraphQL JWT Authentication
State:     Zustand (koszyk, UI state)
Fetching:  graphql-request
Deploy:    Vercel (frontend) + hosting VPS/shared (WordPress)
```

---

## Struktura katalogów

```
src/
├── app/                        # Next.js App Router
│   ├── (store)/                # Route group dla sklepu
│   │   ├── page.tsx            # Strona główna / lista produktów
│   │   ├── products/
│   │   │   ├── page.tsx        # Katalog produktów
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Strona pojedynczego produktu
│   │   ├── cart/
│   │   │   └── page.tsx        # Koszyk
│   │   ├── checkout/
│   │   │   └── page.tsx        # Checkout
│   │   └── category/
│   │       └── [slug]/
│   │           └── page.tsx    # Strona kategorii
│   ├── (auth)/                 # Route group dla autentykacji
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── account/                # Strefa klienta (chroniona)
│   │   ├── page.tsx            # Dashboard konta
│   │   ├── orders/
│   │   │   ├── page.tsx        # Historia zamówień
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Szczegóły zamówienia + link do pobrania
│   │   └── downloads/
│   │       └── page.tsx        # Moje pliki do pobrania
│   ├── api/                    # Route Handlers
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── webhooks/
│   │       └── woocommerce/
│   │           └── route.ts    # Webhook do revalidacji ISR
│   └── layout.tsx
│
├── components/
│   ├── ui/                     # Podstawowe komponenty (Button, Input, Modal...)
│   ├── product/                # Komponenty związane z produktem
│   ├── cart/                   # Komponenty koszyka
│   ├── checkout/               # Komponenty checkoutu
│   ├── account/                # Komponenty strefy klienta
│   └── layout/                 # Header, Footer, Navigation
│
├── lib/
│   ├── graphql/
│   │   ├── client.ts           # Klient GraphQL (graphql-request)
│   │   ├── queries/            # Zapytania GraphQL (.graphql lub .ts)
│   │   │   ├── products.ts
│   │   │   ├── categories.ts
│   │   │   ├── orders.ts
│   │   │   └── customer.ts
│   │   └── mutations/          # Mutacje GraphQL
│   │       ├── cart.ts
│   │       ├── checkout.ts
│   │       └── auth.ts
│   ├── woocommerce/
│   │   ├── products.ts         # Funkcje pobierania produktów
│   │   ├── cart.ts             # Logika koszyka
│   │   ├── orders.ts           # Logika zamówień
│   │   └── customer.ts         # Logika klienta
│   ├── auth.ts                 # Konfiguracja NextAuth
│   └── utils.ts                # Pomocnicze funkcje
│
├── stores/
│   ├── cart.store.ts           # Zustand store dla koszyka
│   └── ui.store.ts             # Zustand store dla UI (modals, toasts)
│
├── types/
│   ├── product.types.ts
│   ├── cart.types.ts
│   ├── order.types.ts
│   └── customer.types.ts
│
└── hooks/
    ├── useCart.ts
    ├── useProduct.ts
    └── useCustomer.ts
```

---

## Zmienne środowiskowe

```bash
# .env.local — nigdy nie commituj do repo

# WordPress / GraphQL
NEXT_PUBLIC_WORDPRESS_URL=https://twoj-wordpress.pl
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://twoj-wordpress.pl/graphql

# WooCommerce REST API (do webhooków i operacji server-side)
WC_CONSUMER_KEY=ck_xxxxxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxxxxx

# NextAuth
NEXTAUTH_SECRET=bardzo-dlugi-losowy-string
NEXTAUTH_URL=https://twoja-domena.pl

# JWT (WPGraphQL JWT Authentication)
WP_JWT_SECRET=ten-sam-secret-co-w-wordpressie

# Webhook secret (do weryfikacji żądań z WordPress)
WEBHOOK_SECRET=xxxxxxxxxxxx
```

**Zasady:**
- Zmienne z prefixem `NEXT_PUBLIC_` są widoczne w przeglądarce — nie wrzucaj tam sekretów
- Klucze WooCommerce, JWT secret, webhook secret — zawsze tylko server-side
- Na Vercelu konfiguruj zmienne w ustawieniach projektu, nie w plikach

---

## Klient GraphQL

```
Plik: src/lib/graphql/client.ts
```

Jeden klient dla zapytań publicznych (bez autentykacji) i jeden dla zapytań
z tokenem JWT. Klient publiczny używany w Server Components i funkcjach
generujących statyczne strony. Klient z tokenem używany w Route Handlers
i funkcjach server-side wymagających autentykacji.

Obsługa błędów zawsze przez try/catch z logowaniem. Nigdy nie propaguj
surowych błędów GraphQL do klienta — mapuj je na własne typy błędów.

---

## Strategie pobierania danych

### SSG — budowane raz przy deploymencie
- Lista wszystkich produktów (generateStaticParams)
- Strony pojedynczych produktów
- Strony kategorii
- Strona główna (hero, wyróżnione produkty)

### ISR — odświeżane w tle
- Strony produktów: `revalidate = 3600` (1 godzina)
- Lista produktów: `revalidate = 1800` (30 minut)
- Webhook z WordPressa wyzwala `revalidatePath` natychmiastowo po zmianie produktu

### SSR — renderowane przy każdym żądaniu
- Strona koszyka
- Checkout
- Strefa klienta (konto, zamówienia, pobrania)

### Client-side
- Stan koszyka (Zustand + localStorage)
- Filtrowanie / sortowanie listy produktów
- Search (debounced query do GraphQL)

---

## Typy TypeScript

Każda encja z WordPress / WooCommerce ma swój typ w `src/types/`.
Typy generowane ręcznie na podstawie schema GraphQL (nie używamy codegen
żeby utrzymać prostotę — przy rozroście projektu można dodać).

```typescript
// Przykład struktury typów — NIE przykład implementacji
// Wszystkie typy muszą być w odpowiednich plikach w src/types/

// product.types.ts — typy produktu
// cart.types.ts — typy koszyka i pozycji
// order.types.ts — typy zamówienia
// customer.types.ts — typy klienta i jego danych
```

Zasady TypeScript:
- Strict mode włączony (`"strict": true` w tsconfig)
- Brak `any` — jeśli nie znasz typu, użyj `unknown` i zawężaj
- Typy zamiast interfejsów (chyba że potrzebujesz `extends`)
- Wszystkie props komponentów mają zdefiniowane typy
- Funkcje asynchroniczne mają jawny typ zwracany

---

## Konwencje nazewnictwa

```
Komponenty React:     PascalCase         ProductCard.tsx
Hooki:                camelCase z use    useCart.ts
Store Zustand:        camelCase          cart.store.ts
Funkcje GraphQL:      camelCase          fetchProduct(), getProducts()
Zapytania GraphQL:    SCREAMING_SNAKE    GET_PRODUCT_BY_SLUG
Mutacje GraphQL:      SCREAMING_SNAKE    ADD_TO_CART
Typy:                 PascalCase         WooProduct, CartItem
Zmienne:              camelCase          productSlug, cartTotal
Stałe:                SCREAMING_SNAKE    MAX_CART_ITEMS
```

---

## Koszyk — architektura dla produktów cyfrowych

Koszyk trzymany w Zustand store z persistencją do localStorage.
Przy inicjalizacji aplikacji synchronizacja z sesją CoCart jeśli użytkownik
jest zalogowany.

Produkty cyfrowe nie mają wariantów fizycznych (rozmiar, kolor) — mogą mieć
warianty licencji (single / multi / unlimited). To traktowane jako `variationId`
w WooCommerce.

Checkout flow:
1. Koszyk (Zustand) → walidacja po stronie klienta
2. Przejście do checkout → inicjalizacja zamówienia w WooCommerce przez GraphQL
3. Formularz danych klienta → mutacja aktualizująca dane zamówienia
4. Płatność → integracja z bramką (Stripe lub inna)
5. Potwierdzenie → WebHook z WooCommerce → zmiana statusu zamówienia → email z linkiem do pobrania

---

## Produkty cyfrowe — specyfika

WooCommerce obsługuje produkty cyfrowe (Virtual + Downloadable).
Po zapłaceniu zamówienie przechodzi w status `completed` automatycznie.
WooCommerce generuje zabezpieczony link do pobrania z czasem ważności.

W panelu WordPress dla każdego produktu cyfrowego:
- Zaznaczone: Virtual (brak wysyłki)
- Zaznaczone: Downloadable (dostęp do pliku)
- Plik wgrany przez media WooCommerce lub link zewnętrzny
- Limit pobrań (opcjonalnie)
- Wygaśnięcie linku w dniach (opcjonalnie)

W Next.js strefa `/account/downloads` pobiera linki przez zapytanie
GraphQL z tokenem JWT klienta — linki nigdy nie są publiczne.

---

## Autentykacja

NextAuth.js z własnym providerem `credentials`.
Logowanie wysyła credentials do WordPress przez mutację GraphQL
(`loginWithCookies` lub `login` z WPGraphQL JWT Authentication).
Zwrócony token JWT przechowywany w sesji NextAuth (httpOnly cookie).

Token dołączany do każdego zapytania GraphQL wymagającego autoryzacji
w nagłówku `Authorization: Bearer <token>`.

Token ma expiry — obsłuż refresh token lub wylogowanie przy 401.

Chronione trasy (account/*, checkout) sprawdzają sesję przez
`auth()` z NextAuth w Server Components lub middleware Next.js.

---

## Obsługa błędów

### Zasada: błędy są przewidywalne i obsługiwane jawnie

Każda funkcja w `src/lib/woocommerce/` zwraca:
```
{ data: T, error: null } | { data: null, error: AppError }
```

Nigdy nie rzucaj wyjątków z warstwy danych — łap je tam i zwracaj
jako ustrukturyzowany error. Wyjątki rzucaj tylko w miejscach gdzie
naprawdę nie możesz przewidzieć co pójdzie nie tak.

Błędy sieciowe, błędy GraphQL i błędy biznesowe (np. produkt
niedostępny) to osobne kategorie z osobnymi komunikatami.

W komponentach używaj Error Boundary dla całych sekcji strony.
Nie pokazuj surowych błędów API użytkownikowi — zawsze mapuj
na przyjazny komunikat.

Logowanie błędów server-side przez `console.error` z kontekstem
(co się robiło, jakie dane wejściowe). Na produkcji można zastąpić
Sentry lub podobnym.

---

## Revalidacja ISR przez Webhooks

WordPress wysyła webhook do `/api/webhooks/woocommerce` po zmianie produktu.
Route Handler weryfikuje sygnaturę (HMAC SHA256 z WEBHOOK_SECRET).
Po weryfikacji wywołuje `revalidatePath` lub `revalidateTag` dla
konkretnej strony produktu i listy produktów.

Bez weryfikacji sygnatury — odrzucaj wszystkie żądania z 401.

---

## Zasady pisania kodu

### Ogólne
- Funkcje robią jedną rzecz — jeśli ma więcej niż ~40 linii, rozdziel
- Brak magicznych liczb i stringów — wyciągaj do stałych z opisową nazwą
- Komentarze wyjaśniają DLACZEGO, nie CO — kod powinien być samo-dokumentujący
- Brak zakomentowanego kodu w repo — usuń, masz git do cofania
- Każdy plik ma jeden, jasny cel

### Komponenty React
- Server Components domyślnie — Client Component tylko gdy potrzebne
  (interaktywność, hooki, dostęp do localStorage)
- Oznaczaj Client Components dyrektywą `'use client'` na górze pliku
- Props destructuring z jawnym typem — nie przekazuj całego obiektu jeśli
  potrzebujesz 2 pola
- Brak logiki biznesowej w komponentach — komponenty renderują dane,
  nie przetwarzają ich

### Zapytania GraphQL
- Każde zapytanie w osobnej stałej w pliku w `src/lib/graphql/queries/`
- Pobieraj tylko pola których potrzebujesz — nie rób `SELECT *`
- Fragmenty GraphQL dla powtarzających się zestawów pól (np. ProductFields)
- Nazwy zapytań muszą być opisowe i unikalne w projekcie

### Async/Await
- Zawsze async/await, nigdy .then().catch() chaining
- Przy równoległych zapytaniach używaj `Promise.all`
- Timeout dla zapytań do zewnętrznych API (WordPress może być wolny)

---

## Bezpieczeństwo

- Klucze API i sekrety wyłącznie w zmiennych środowiskowych server-side
- Weryfikuj sygnaturę każdego webhooka przed przetworzeniem
- Nie ujawniaj szczegółów błędów API w odpowiedziach klienta
- Linki do pobrania plików cyfrowych zawsze przez endpoint server-side
  który weryfikuje czy użytkownik ma opłacone zamówienie — nigdy nie
  wystawiaj bezpośrednich URL do plików
- Walidacja danych wejściowych od klienta przed wysłaniem do WooCommerce
- Rate limiting na endpointach checkoutu i logowania (Vercel Edge Config
  lub middleware)
- CORS na WordPress musi akceptować TYLKO domenę frontendu, nie `*`

---

## Środowisko developerskie

```bash
# Uruchomienie projektu lokalnie
npm run dev

# Build produkcyjny (sprawdź przed deployem)
npm run build

# Linting
npm run lint

# Type checking
npm run type-check
```

WordPress podczas developmentu może być lokalny (LocalWP / Lando) lub
staging na serwerze. Nigdy nie wskazuj lokalnego frontendu na produkcyjny
WordPress — miej osobne instancje.

Zmienne środowiskowe dla środowisk:
- `.env.local` — lokalne dev
- Vercel dashboard → Environment Variables → osobne dla Preview i Production

---

## Co NIE wchodzi w zakres tego projektu

- Blog / treści edytorskie WordPressa (tylko sklep)
- Fizyczna wysyłka, integracja z kurierami
- Wielojęzyczność (WPML / Polylang) — można dodać później
- Subskrypcje (WooCommerce Subscriptions) — osobna iteracja
- System afiliacyjny — osobna iteracja
- Panel admina w Next.js — administracja przez WordPress Dashboard

---

## Decyzje architektoniczne i ich uzasadnienie

| Decyzja | Uzasadnienie |
|---|---|
| GraphQL zamiast REST | Mniej nadmiarowych danych, jedno zapytanie dla zagnieżdżonych danych produktu |
| App Router zamiast Pages | Server Components, lepsza granularność cachowania |
| Zustand zamiast Redux | Prosty store bez boilerplate, wystarczający dla koszyka |
| CoCart dla koszyka | Obsługuje sesje headless, aktywna społeczność, dobre API |
| ISR + Webhook | Strony statyczne z natychmiastową aktualizacją po zmianie w WP |
| NextAuth credentials | Pełna kontrola nad flow logowania przez WP, nie outsourcing do OAuth |
| graphql-request zamiast Apollo | Mniejszy bundle, prostsze API dla prostych use-case'ów |
