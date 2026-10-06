"use client";

import { useFavorites } from "@/lib/hooks";

interface Props {
  storeId: string;
  storeName: string;
  className?: string;
  withLabel?: boolean;
}

export default function FavoriteButton({ storeId, storeName, className = "", withLabel = false }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const favorite = isFavorite(storeId);

  return (
    <button
      type="button"
      aria-pressed={favorite}
      aria-label={favorite ? `Remove ${storeName} from favorites` : `Add ${storeName} to favorites`}
      data-testid={`favorite-toggle-${storeId}`}
      onClick={() => toggle(storeId)}
      className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-raku-500 hover:text-raku-600 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${favorite ? "fill-raku-500 text-raku-500" : "fill-none"}`}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 21s-7-4.6-9.5-9C.9 8.8 2.5 5 6 5c2 0 3.4 1 4 2.2h4C14.6 6 16 5 18 5c3.5 0 5.1 3.8 3.5 7-2.5 4.4-9.5 9-9.5 9z" />
      </svg>
      {withLabel && <span>{favorite ? "Favorited" : "Favorite"}</span>}
    </button>
  );
}
