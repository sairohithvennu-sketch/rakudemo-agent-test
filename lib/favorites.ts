/** Returns a new favorites list with `storeId` added, or removed if already present. */
export function toggleFavorite(favorites: string[], storeId: string): string[] {
  return favorites.includes(storeId)
    ? favorites.filter((id) => id !== storeId)
    : [...favorites, storeId];
}
