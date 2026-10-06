import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getStoreById } from "@/data/stores";
import StoreCard from "@/components/StoreCard";

describe("regression: Best Buy store logo", () => {
  it("points the Best Buy card at a logo file that exists", () => {
    render(<StoreCard store={getStoreById("best-buy")!} />);
    const src = screen.getByAltText("Best Buy logo").getAttribute("src")!;

    expect(src.startsWith("/")).toBe(true);
    const file = path.join(process.cwd(), "public", src);
    expect(fs.existsSync(file)).toBe(true);
  });
});
