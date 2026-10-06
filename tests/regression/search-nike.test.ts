import { describe, expect, it } from "vitest";
import { stores } from "@/data/stores";
import { filterStores } from "@/lib/search";

describe("regression: searching for Nike", () => {
  it("returns only Nike", () => {
    const results = filterStores(stores, { query: "Nike" }).map((s) => s.name);
    expect(results).toEqual(["Nike"]);
  });
});
