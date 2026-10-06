import { describe, expect, it } from "vitest";
import { calculateCashback } from "@/lib/cashback";
import { formatCurrency, formatDate, formatRate } from "@/lib/format";

describe("calculateCashback", () => {
  it("applies the percentage rate to the purchase amount", () => {
    expect(calculateCashback(100, 5)).toBe(5);
    expect(calculateCashback(649, 2.5)).toBe(16.23);
  });

  it("returns 0 for non-positive or invalid inputs", () => {
    expect(calculateCashback(0, 5)).toBe(0);
    expect(calculateCashback(-20, 5)).toBe(0);
    expect(calculateCashback(50, 0)).toBe(0);
    expect(calculateCashback(Number.NaN, 5)).toBe(0);
  });
});

describe("formatting", () => {
  it("formats currency", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });

  it("formats rates without trailing zeros", () => {
    expect(formatRate(5)).toBe("5%");
    expect(formatRate(2.5)).toBe("2.5%");
  });

  it("formats ISO dates in UTC", () => {
    expect(formatDate("2026-09-18")).toBe("Sep 18, 2026");
  });
});
