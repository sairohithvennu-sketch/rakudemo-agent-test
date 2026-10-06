"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Store } from "@/data/stores";
import { createActivation, isActivationActive, type Activation, type ActivationResult } from "@/lib/activation";
import { toggleFavorite } from "@/lib/favorites";
import { createLocalStore } from "@/lib/local-store";

export const FAVORITES_KEY = "rakudemo:favorites";
export const ACTIVATIONS_KEY = "rakudemo:activations";

const EMPTY_FAVORITES: string[] = [];
const EMPTY_ACTIVATIONS: Record<string, Activation> = {};

const favoritesStore = createLocalStore<string[]>(FAVORITES_KEY, EMPTY_FAVORITES);
const activationsStore = createLocalStore<Record<string, Activation>>(
  ACTIVATIONS_KEY,
  EMPTY_ACTIVATIONS,
);

export function useFavorites() {
  const favorites = useSyncExternalStore(
    favoritesStore.subscribe,
    favoritesStore.read,
    favoritesStore.getServerSnapshot,
  );

  const toggle = useCallback((storeId: string) => {
    favoritesStore.write(toggleFavorite(favoritesStore.read(), storeId));
  }, []);

  const isFavorite = useCallback((storeId: string) => favorites.includes(storeId), [favorites]);

  return { favorites, isFavorite, toggle };
}

export function useActivations() {
  const all = useSyncExternalStore(
    activationsStore.subscribe,
    activationsStore.read,
    activationsStore.getServerSnapshot,
  );

  const activate = useCallback((store: Store): ActivationResult => {
    const result = createActivation(store);
    if (result.ok) {
      activationsStore.write({
        ...activationsStore.read(),
        [store.id]: result.activation,
      });
    }
    return result;
  }, []);

  const getActive = useCallback(
    (storeId: string) => {
      const a = all[storeId];
      return isActivationActive(a) ? a : undefined;
    },
    [all],
  );

  const activeList = Object.values(all).filter((a) => isActivationActive(a));

  return { activate, getActive, activeList };
}
