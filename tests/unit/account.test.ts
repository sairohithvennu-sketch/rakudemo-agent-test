import { describe, expect, it } from "vitest";
import { stores } from "@/data/stores";
import { trips } from "@/data/trips";
import { getAccountStats } from "@/lib/account";
import { getTrips } from "@/lib/trips";

describe("getTrips", () => {
  it("returns trips newest first with store details", () => {
    const list = getTrips();
    expect(list).toHaveLength(trips.length);
    const dates = list.map((t) => t.date);
    expect([...dates].sort().reverse()).toEqual(dates);
    expect(list[0].store.name).toBe("Nike");
  });

  it("calculates cashback from the store rate and zeroes declined trips", () => {
    const list = getTrips();
    const target = list.find((t) => t.id === "trip-1011")!;
    expect(target.cashback).toBe(1.69);
    const declined = list.find((t) => t.status === "declined")!;
    expect(declined.cashback).toBe(0);
  });

  it("only references stores that exist", () => {
    const ids = new Set(stores.map((s) => s.id));
    expect(trips.every((t) => ids.has(t.storeId))).toBe(true);
  });
});

describe("getAccountStats", () => {
  const stats = getAccountStats(getTrips());

  it("counts non-declined trips", () => {
    expect(stats.totalTrips).toBe(11);
  });

  it("splits cashback by status", () => {
    const list = getTrips();
    const sum = (s: string) =>
      Math.round(list.filter((t) => t.status === s).reduce((a, t) => a + t.cashback, 0) * 100) /
      100;
    expect(stats.availableBalance).toBe(sum("confirmed"));
    expect(stats.pendingCashback).toBe(sum("pending"));
    expect(stats.paidOut).toBe(sum("paid"));
  });

  it("lifetime earned equals pending + confirmed + paid", () => {
    expect(stats.lifetimeEarned).toBeCloseTo(
      stats.availableBalance + stats.pendingCashback + stats.paidOut,
      2,
    );
  });

  it("excludes declined purchases from spend", () => {
    expect(stats.totalSpent).toBe(1916.14);
    expect(stats.topStoreName).toBe("Best Buy");
  });

  it("handles an empty trip list", () => {
    const empty = getAccountStats([]);
    expect(empty.totalTrips).toBe(0);
    expect(empty.averageOrderValue).toBe(0);
    expect(empty.topStoreName).toBeNull();
  });
});
