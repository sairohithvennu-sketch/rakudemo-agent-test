# QA Scenarios

Expected behaviors and acceptance criteria for RakuDemo. Run against `npm run dev` (http://localhost:3000) or a production build. Clear `localStorage` between scenarios when state matters.

## Homepage

| ID | Scenario | Expected |
| --- | --- | --- |
| HP-1 | Open `/` | Hero, 4 featured deal cards, store browser with all 12 stores, how-it-works |
| HP-2 | Every store card | Shows logo, name, tagline, category, and "X% Cash Back" |
| HP-3 | Click a category chip (e.g. Beauty) | Only stores in that category are listed; the count updates; chip shows pressed state |
| HP-4 | Click "All" | All 12 stores listed |
| HP-5 | Click a store card | Navigates to `/stores/{id}` |

## Search

| ID | Scenario | Expected |
| --- | --- | --- |
| SR-1 | Search "Target" | Only Target is listed |
| SR-2 | Search "target" / "  TARGET " | Same as SR-1 (case-insensitive, trimmed) |
| SR-3 | Search "Nike" | Only Nike is listed; no other store appears |
| SR-4 | Search "beauty" | Sephora and Ulta Beauty |
| SR-5 | Search "qqqqq" | "No stores match your search" empty state, count shows 0 stores |
| SR-6 | Search "target" with category Fashion | Empty state (filters combine) |
| SR-7 | Clear the search box | All stores return |

## Store details

Applies to Nike, Adidas, Target, Walmart, Best Buy, and Macy's (and the other stores).

| ID | Scenario | Expected |
| --- | --- | --- |
| SD-1 | Open `/stores/{id}` | Logo, name, tagline, cashback rate, category, description, terms, Activate Cashback button, 3 related stores |
| SD-2 | Store logo | The store's logo image loads (no broken image or alt text fallback) on the store page and on every store card |
| SD-3 | Open `/stores/unknown` | "Page not found" page |
| SD-4 | Related stores | Same-category stores first, never the current store |

## Cashback activation

| ID | Scenario | Expected |
| --- | --- | --- |
| CA-1 | Click **Activate Cashback** on any store page (including Nike) | Success confirmation appears ("Cashback activated!") with the rate and expiry time; the button reads **Cashback Activated** and is disabled |
| CA-2 | Reload the page after activating | Confirmation is still shown (valid for 24 hours) |
| CA-3 | Open `/account` after activating | Store appears under "Active cashback offers" |
| CA-4 | Confirmation link | "Continue to {store}" opens the store's website in a new tab |
| CA-5 | Activate two different stores | Both are listed on `/account` |

## Favorites

| ID | Scenario | Expected |
| --- | --- | --- |
| FV-1 | Click the heart on a store card | Heart fills, `aria-pressed="true"`, header badge shows the count |
| FV-2 | Click it again | Heart clears, badge disappears when count reaches 0 |
| FV-3 | Reload | Favorites persist |
| FV-4 | Open `/favorites` | Shows only favorited stores; empty state with "Browse stores" link when none |
| FV-5 | Unfavorite from the Favorites page | Card disappears immediately |
| FV-6 | Favorite on a store detail page | State matches the same store's card elsewhere |

## Shopping trips

| ID | Scenario | Expected |
| --- | --- | --- |
| ST-1 | Open `/trips` | 12 trips, newest first, with date, store, purchase amount, cashback, and status badge |
| ST-2 | Cashback amount | Equals purchase × store rate, rounded to the cent (e.g. Best Buy $649.00 × 2.5% = $16.23) |
| ST-3 | Declined trip | Cashback shows "—" |
| ST-4 | Summary cards | Pending, Confirmed, and Paid totals match the table |

## Account

| ID | Scenario | Expected |
| --- | --- | --- |
| AC-1 | Open `/account` | Profile (name, email, member since), available cashback balance, next payout date |
| AC-2 | Statistics | Total trips 11, total spent $1,916.14, top store Best Buy; lifetime earned = pending + confirmed + paid |
| AC-3 | Available balance | Equals the sum of confirmed trip cashback |

## Navigation and layout

| ID | Scenario | Expected |
| --- | --- | --- |
| NV-1 | Header links | Home, Stores, Shopping Trips, Favorites, Account each load their page; current page is highlighted |
| NV-2 | Responsive | Layout remains usable at 375px, 768px, and 1280px widths |

## Dark mode

The header theme control is manual only. It does not follow the operating system or `prefers-color-scheme`. The choice is stored as JSON `"light"` or `"dark"` in `localStorage` under `rakudemo:theme` (same encoding as `rakudemo:favorites` and `rakudemo:activations`).

| ID | Scenario | Expected |
| --- | --- | --- |
| DM-1 | Click the header theme toggle | The site switches between light and dark. The control's label and pressed state match the new theme. Clicking again switches back. |
| DM-2 | Toggle to dark, then reload | Dark mode is still applied, with no flash of the light theme. The saved value is `localStorage["rakudemo:theme"] === "\"dark\""`. |
| DM-3 | With dark mode on, open Home, Stores, a store page, Shopping Trips, Favorites, Account, and an unknown URL | Header, page content, and footer stay dark on every page, including the "Page not found" page. |
| DM-4 | Clear `localStorage` (or use a fresh profile) and load any page, including when the OS theme is dark | The site is light. Nothing is written until the member toggles the theme. |
