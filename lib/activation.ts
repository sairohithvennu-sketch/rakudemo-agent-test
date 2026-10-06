import type { Store } from "@/data/stores";

export const ACTIVATION_WINDOW_HOURS = 24;

export interface Activation {
  storeId: string;
  storeName: string;
  cashbackRate: number;
  trackingLink: string;
  activatedAt: string;
  expiresAt: string;
}

export type ActivationResult =
  | { ok: true; activation: Activation }
  | { ok: false; reason: "missing-tracking-link" };

const TRACKING_LINKS: Record<string, string> = {
  "nike-us": "https://track.rakudemo.example/go/nike",
  adidas: "https://track.rakudemo.example/go/adidas",
  target: "https://track.rakudemo.example/go/target",
  walmart: "https://track.rakudemo.example/go/walmart",
  "best-buy": "https://track.rakudemo.example/go/best-buy",
  macys: "https://track.rakudemo.example/go/macys",
  sephora: "https://track.rakudemo.example/go/sephora",
  ulta: "https://track.rakudemo.example/go/ulta",
  "home-depot": "https://track.rakudemo.example/go/home-depot",
  gap: "https://track.rakudemo.example/go/gap",
  expedia: "https://track.rakudemo.example/go/expedia",
  kohls: "https://track.rakudemo.example/go/kohls",
};

export function resolveTrackingLink(storeId: string): string | undefined {
  return TRACKING_LINKS[storeId];
}

export function createActivation(store: Store, now: Date = new Date()): ActivationResult {
  const trackingLink = resolveTrackingLink(store.id);
  if (!trackingLink) return { ok: false, reason: "missing-tracking-link" };

  const expires = new Date(now.getTime() + ACTIVATION_WINDOW_HOURS * 60 * 60 * 1000);
  return {
    ok: true,
    activation: {
      storeId: store.id,
      storeName: store.name,
      cashbackRate: store.cashbackRate,
      trackingLink,
      activatedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    },
  };
}

export function isActivationActive(activation: Activation | undefined, now: Date = new Date()): boolean {
  return !!activation && new Date(activation.expiresAt).getTime() > now.getTime();
}
