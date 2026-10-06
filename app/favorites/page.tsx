import type { Metadata } from "next";
import { stores } from "@/data/stores";
import FavoritesList from "@/components/FavoritesList";

export const metadata: Metadata = { title: "Favorites" };

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Favorites</h1>
        <p className="text-slate-500 dark:text-slate-400">Stores you&apos;ve saved for quick access.</p>
      </div>
      <FavoritesList stores={stores} />
    </div>
  );
}
