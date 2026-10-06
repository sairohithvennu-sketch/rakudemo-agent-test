import { describe, expect, it } from "vitest";
import { stores } from "@/data/stores";
import { filterStores, matchesQuery, normalizeQuery } from "@/lib/search";

const names = (list: typeof stores) => list.map((s) => s.name);

describe("store search", () => {
  it("returns every store for an empty query", () => {
    expect(filterStores(stores, { query: "   " })).toHaveLength(stores.length);
  });

  it("is case-insensitive and trims whitespace", () => {
    expect(normalizeQuery("  TaRgEt ")).toBe("target");
    expect(names(filterStores(stores, { query: "  TARGET " }))).toEqual(["Target"]);
  });

  it("finds stores by name", () => {
    expect(names(filterStores(stores, { query: "walmart" }))).toEqual(["Walmart"]);
    expect(names(filterStores(stores, { query: "best buy" }))).toEqual(["Best Buy"]);
  });

  it("finds stores by category keyword", () => {
    const results = filterStores(stores, { query: "beauty" });
    expect(names(results)).toEqual(expect.arrayContaining(["Sephora", "Ulta Beauty"]));
  });

  it("returns nothing when no store matches", () => {
    expect(filterStores(stores, { query: "zzzz-no-such-store" })).toEqual([]);
  });

  it("combines query with category filter", () => {
    expect(names(filterStores(stores, { query: "target", category: "Fashion" }))).toEqual([]);
    expect(names(filterStores(stores, { query: "target", category: "Department" }))).toEqual([
      "Target",
    ]);
  });

  it("filters by category alone", () => {
    const electronics = filterStores(stores, { category: "Electronics" });
    expect(names(electronics)).toEqual(["Best Buy"]);
  });

  it("matchesQuery handles an empty query", () => {
    expect(matchesQuery(stores[0], "")).toBe(true);
  });
});
