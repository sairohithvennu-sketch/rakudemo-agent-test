export interface LocalStore<T> {
  read(): T;
  write(next: T): void;
  subscribe(listener: () => void): () => void;
  getServerSnapshot(): T;
}

/**
 * Minimal localStorage-backed store compatible with useSyncExternalStore.
 * Snapshots are cached by raw string so reads return stable references.
 */
export function createLocalStore<T>(key: string, fallback: T): LocalStore<T> {
  const listeners = new Set<() => void>();
  let cachedRaw: string | null | undefined;
  let cachedValue: T = fallback;

  function read(): T {
    if (typeof window === "undefined") return fallback;
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return fallback;
    }
    if (raw === cachedRaw) return cachedValue;
    cachedRaw = raw;
    try {
      cachedValue = raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      cachedValue = fallback;
    }
    return cachedValue;
  }

  function write(next: T) {
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
    listeners.forEach((l) => l());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key || e.key === null) listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  return { read, write, subscribe, getServerSnapshot: () => fallback };
}
