import type { Category, Store } from "@/data/stores";

const SEARCH_TERMS: Record<string, string[]> = {
  nike: ["nike", "sneakers", "running", "athletic"],
  adidas: ["adidas", "nike", "sneakers", "athletic", "originals"],
  target: ["target", "groceries", "essentials", "home"],
  walmart: ["walmart", "groceries", "toys", "electronics"],
  "best-buy": ["best buy", "bestbuy", "laptops", "tv", "gaming", "appliances"],
  macys: ["macy's", "macys", "apparel", "bedding", "kitchen"],
  sephora: ["sephora", "makeup", "skincare", "fragrance"],
  ulta: ["ulta", "ulta beauty", "makeup", "hair care"],
  "home-depot": ["home depot", "tools", "lumber", "appliances"],
  gap: ["gap", "denim", "basics", "apparel"],
  expedia: ["expedia", "flights", "hotels", "vacation"],
  kohls: ["kohl's", "kohls", "apparel", "shoes", "home"],
};

export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function matchesQuery(store: Store, query: string): boolean {
  const q = normalizeQuery(query);
  if (!q) return true;
  if (store.name.toLowerCase().includes(q)) return true;
  if (store.category.toLowerCase().includes(q)) return true;
  return (SEARCH_TERMS[store.id] ?? []).some((term) => term.includes(q));
}

export interface StoreFilters {
  query?: string;
  category?: Category | "All";
}

export function filterStores(stores: Store[], filters: StoreFilters = {}): Store[] {
  const { query = "", category = "All" } = filters;
  return stores.filter(
    (store) =>
      (category === "All" || store.category === category) && matchesQuery(store, query),
  );
}
