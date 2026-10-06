"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, type Category, type Store } from "@/data/stores";
import { filterStores } from "@/lib/search";
import StoreCard from "@/components/StoreCard";

interface Props {
  stores: Store[];
}

export default function StoreBrowser({ stores }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");

  const results = useMemo(
    () => filterStores(stores, { query, category }),
    [stores, query, category],
  );

  return (
    <section aria-labelledby="browse-heading" className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 id="browse-heading" className="text-2xl font-bold text-slate-900">
          Browse stores
        </h2>
        <div className="relative w-full md:max-w-md">
          <label htmlFor="store-search" className="sr-only">
            Search stores
          </label>
          <input
            id="store-search"
            data-testid="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stores, e.g. Nike, electronics"
            className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm shadow-sm outline-none focus:border-raku-500 focus:ring-2 focus:ring-raku-100"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            type="button"
            data-testid={`category-filter-${c}`}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === c
                ? "bg-raku-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-raku-500"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-500" data-testid="results-count" aria-live="polite">
        {results.length} {results.length === 1 ? "store" : "stores"}
      </p>

      {results.length > 0 ? (
        <div
          data-testid="store-results"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {results.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <div
          data-testid="no-results"
          className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500"
        >
          No stores match your search. Try a different name or category.
        </div>
      )}
    </section>
  );
}
