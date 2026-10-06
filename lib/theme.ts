export const THEME_KEY = "rakudemo:theme";

export type Theme = "light" | "dark";

export const DEFAULT_THEME: Theme = "light";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

/**
 * Resolve a raw localStorage value. Values are JSON-encoded, matching
 * rakudemo:favorites and rakudemo:activations. Missing, empty, and invalid
 * values fall back to light. System color scheme is never consulted.
 */
export function themeFromStorage(raw: string | null): Theme {
  if (!raw) return DEFAULT_THEME;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isTheme(parsed) ? parsed : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/**
 * Runs in the document head before paint. Must stay in lockstep with
 * themeFromStorage: same key, JSON values, light default, no matchMedia.
 */
export const THEME_INIT_SCRIPT = `(function(){var theme=${JSON.stringify(DEFAULT_THEME)};try{var raw=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(raw){var parsed=JSON.parse(raw);if(parsed==="light"||parsed==="dark")theme=parsed;}}catch(e){}var root=document.documentElement;if(theme==="dark")root.classList.add("dark");else root.classList.remove("dark");})();`;
