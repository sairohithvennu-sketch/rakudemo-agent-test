"use client";

import Link from "next/link";
import type { Store } from "@/data/stores";
import { useFavorites } from "@/lib/hooks";
import StoreCard from "@/components/StoreCard";

export default function FavoritesList({ stores }: { stores: Store[] }) {
  const { favorites } = useFavorites();
  const favoriteStores = stores.filter((s) => favorites.includes(s.id));

  if (favoriteStores.length === 0) {
    return (
      <div
        data-testid="favorites-empty"
        className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
      >
        <p>You haven&apos;t favorited any stores yet.</p>
        <Link href="/stores" className="mt-3 inline-block font-semibold text-raku-600 dark:text-rose-300">
          Browse stores
        </Link>
      </div>
    );
  }

  return (
    <div
      data-testid="favorites-list"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {favoriteStores.map((store) => (
        <StoreCard key={store.id} store={store} testIdPrefix="favorite-card" />
      ))}
    </div>
  );
}
