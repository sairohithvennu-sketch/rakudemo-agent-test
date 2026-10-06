import { describe, expect, it } from "vitest";
import { toggleFavorite } from "@/lib/favorites";

describe("toggleFavorite", () => {
  it("adds a store that is not yet a favorite", () => {
    expect(toggleFavorite([], "nike")).toEqual(["nike"]);
    expect(toggleFavorite(["nike"], "target")).toEqual(["nike", "target"]);
  });

  it("removes a store that is already a favorite", () => {
    expect(toggleFavorite(["nike", "target"], "nike")).toEqual(["target"]);
  });

  it("does not mutate the input", () => {
    const input = ["nike"];
    toggleFavorite(input, "target");
    expect(input).toEqual(["nike"]);
  });
});
