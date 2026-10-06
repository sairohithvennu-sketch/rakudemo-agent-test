import { describe, expect, it } from "vitest";
import { getStoreById } from "@/data/stores";
import {
  ACTIVATION_WINDOW_HOURS,
  createActivation,
  isActivationActive,
} from "@/lib/activation";

describe("createActivation", () => {
  const now = new Date("2026-10-06T12:00:00Z");

  it("creates a 24 hour activation with a tracking link", () => {
    const result = createActivation(getStoreById("target")!, now);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.activation.storeId).toBe("target");
    expect(result.activation.cashbackRate).toBe(2);
    expect(result.activation.trackingLink).toMatch(/^https:\/\//);
    expect(result.activation.activatedAt).toBe(now.toISOString());
    const hours =
      (new Date(result.activation.expiresAt).getTime() - now.getTime()) / 3_600_000;
    expect(hours).toBe(ACTIVATION_WINDOW_HOURS);
  });

  it("succeeds for the other launch stores", () => {
    for (const id of ["adidas", "walmart", "best-buy", "macys"]) {
      expect(createActivation(getStoreById(id)!, now).ok).toBe(true);
    }
  });
});

describe("isActivationActive", () => {
  const now = new Date("2026-10-06T12:00:00Z");
  const base = {
    storeId: "target",
    storeName: "Target",
    cashbackRate: 2,
    trackingLink: "https://x.example",
    activatedAt: now.toISOString(),
  };

  it("is active before expiry and inactive after", () => {
    expect(isActivationActive({ ...base, expiresAt: "2026-10-07T12:00:00Z" }, now)).toBe(true);
    expect(isActivationActive({ ...base, expiresAt: "2026-10-06T11:59:59Z" }, now)).toBe(false);
    expect(isActivationActive(undefined, now)).toBe(false);
  });
});
