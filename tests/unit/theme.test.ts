import { describe, expect, it } from "vitest";
import { DEFAULT_THEME, THEME_INIT_SCRIPT, THEME_KEY, themeFromStorage } from "@/lib/theme";

function runThemeInitScript() {
  new Function(THEME_INIT_SCRIPT)();
}

describe("themeFromStorage", () => {
  it("defaults to light when storage is missing or empty", () => {
    expect(themeFromStorage(null)).toBe(DEFAULT_THEME);
    expect(themeFromStorage("")).toBe("light");
  });

  it("reads JSON light and dark values", () => {
    expect(themeFromStorage(JSON.stringify("dark"))).toBe("dark");
    expect(themeFromStorage(JSON.stringify("light"))).toBe("light");
  });

  it("defaults to light for invalid values", () => {
    expect(themeFromStorage("dark")).toBe("light");
    expect(themeFromStorage("not-json")).toBe("light");
    expect(themeFromStorage(JSON.stringify("system"))).toBe("light");
    expect(themeFromStorage(JSON.stringify({ theme: "dark" }))).toBe("light");
    expect(themeFromStorage("null")).toBe("light");
  });
});

describe("theme init script", () => {
  it("uses the rakudemo:theme key and does not follow the system theme", () => {
    expect(THEME_INIT_SCRIPT).toContain(`localStorage.getItem(${JSON.stringify(THEME_KEY)})`);
    expect(THEME_INIT_SCRIPT).not.toContain("matchMedia");
    expect(THEME_INIT_SCRIPT).not.toContain("prefers-color-scheme");
  });

  it("applies the same theme as themeFromStorage before paint", () => {
    const samples = [
      null,
      "",
      "dark",
      "not-json",
      "null",
      JSON.stringify("dark"),
      JSON.stringify("light"),
      JSON.stringify("system"),
      JSON.stringify({ theme: "dark" }),
    ];

    for (const raw of samples) {
      document.documentElement.classList.add("dark");
      if (raw === null) localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, raw);

      runThemeInitScript();

      const expected = themeFromStorage(raw);
      expect(document.documentElement.classList.contains("dark")).toBe(expected === "dark");
    }
  });
});
