# RakuDemo

RakuDemo is a cashback shopping web app. Members browse partner stores, activate cashback before shopping, track shopping trips and their cashback status, save favorite stores, and view account balances. Branding and data are original and for demonstration only; no real purchases, accounts, or payments are involved.

## Features

- **Home**: featured cashback deals, store search, category filters, how-it-works.
- **Stores**: `/stores` lists every partner store; `/stores/[slug]` shows details for each (Nike, Adidas, Target, Walmart, Best Buy, Macy's, and more) with cashback rate, description, terms, an **Activate Cashback** button, and related stores.
- **Shopping Trips** (`/trips`): mock purchase history with amount, date, store, and cashback status (pending, confirmed, paid, declined).
- **Favorites** (`/favorites`): favorite or unfavorite any store; selections persist in `localStorage`.
- **Account** (`/account`): mock profile, available cashback balance, shopping statistics, and currently active offers.
- **Dark mode**: a header control switches the whole site, including the 404 page, between light and dark. The choice is stored in `localStorage` under `rakudemo:theme` and is not taken from the operating system.

## Getting started

Requirements: Node.js 20+ (22 recommended) and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Architecture

```
app/          Next.js App Router routes (layout, pages, store detail route)
components/   Reusable UI (StoreCard, StoreBrowser, ActivateCashbackButton, ...)
data/         Mock stores, trips, and user profile
lib/          Business logic: search, cashback math, activation, account stats, storage hooks
public/       Static assets (store logos in public/logos)
tests/        unit/ (Vitest), regression/ (Vitest), e2e/ (Playwright)
```

- Pages are server components where possible; interactive pieces (search, favorites, activation) are client components.
- `lib/local-store.ts` wraps `localStorage` in a small store consumed through `useSyncExternalStore` (see `lib/hooks.ts`), so every component stays in sync and server rendering stays hydration-safe.
- There is no database and no real authentication. Everything is local mock data.

### How cashback activation works

1. On a store page, the member clicks **Activate Cashback**.
2. `createActivation` (in `lib/activation.ts`) resolves the store's tracking link and builds an activation record valid for 24 hours.
3. The record is saved to `localStorage` under `rakudemo:activations`.
4. The page shows a confirmation with the earn rate and expiry, the button changes to **Cashback Activated**, and a **Continue to {store}** link appears. Active offers also appear on the Account page.

Cashback on a purchase is `amount × rate`, rounded to the nearest cent (`lib/cashback.ts`). Trips move through pending, confirmed, and paid; declined trips earn nothing.

### How search and favorites work

- **Search** (`lib/search.ts`): the home page and `/stores` search box filters stores as you type. Matching is case-insensitive and trims whitespace; it checks the store name, category, and a list of search terms per store. The category chips combine with the search text.
- **Favorites** (`lib/favorites.ts`, `lib/hooks.ts`): the heart button toggles a store id in `localStorage` under `rakudemo:favorites`. The header badge, store cards, and the Favorites page all read the same store.
- **Theme** (`lib/theme.ts`, `lib/hooks.ts`): the header toggle writes `"light"` or `"dark"` (JSON, same as the other keys) to `rakudemo:theme`. A script in the document head applies that class before paint, so a reload does not flash the other theme. Missing or invalid storage stays light.

## Testing

| Command | What it runs |
| --- | --- |
| `npm test` | All Vitest tests (unit, component, regression) |
| `npm run test:unit` | Unit and component tests only |
| `npm run test:regression` | Vitest regression tests only |
| `npm run test:e2e` | Playwright end-to-end tests (builds and starts the app on port 3100) |
| `npm run test:e2e:regression` | Playwright tests tagged `@regression` |
| `npm run test:all` | Vitest and Playwright |
| `npm run typecheck` | TypeScript type check |

First-time Playwright setup: `npm run e2e:install`.

GitHub Actions (`.github/workflows/ci.yml`) runs typecheck, Vitest, the production build, and Playwright on every pull request.

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected **Next.js** framework preset. Build command `npm run build`, no environment variables required.
4. Deploy. Every pull request gets a preview deployment automatically.

Or from the CLI: `npx vercel` for a preview and `npx vercel --prod` for production.
