import type { TripWithDetails } from "@/lib/trips";

export interface AccountStats {
  totalTrips: number;
  totalSpent: number;
  /** Cashback confirmed by merchants and ready to be paid out */
  availableBalance: number;
  /** Cashback awaiting merchant confirmation */
  pendingCashback: number;
  /** Cashback already paid out */
  paidOut: number;
  /** Everything earned (pending + confirmed + paid), excluding declined */
  lifetimeEarned: number;
  averageOrderValue: number;
  topStoreName: string | null;
}

const round = (n: number) => Math.round(n * 100) / 100;

export function getAccountStats(trips: TripWithDetails[]): AccountStats {
  const counted = trips.filter((t) => t.status !== "declined");
  const sum = (status: TripWithDetails["status"]) =>
    round(trips.filter((t) => t.status === status).reduce((s, t) => s + t.cashback, 0));

  const availableBalance = sum("confirmed");
  const pendingCashback = sum("pending");
  const paidOut = sum("paid");

  const totalSpent = round(counted.reduce((s, t) => s + t.amount, 0));

  const byStore = new Map<string, number>();
  for (const t of counted) byStore.set(t.store.name, (byStore.get(t.store.name) ?? 0) + t.amount);
  const topStoreName =
    [...byStore.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return {
    totalTrips: counted.length,
    totalSpent,
    availableBalance,
    pendingCashback,
    paidOut,
    lifetimeEarned: round(availableBalance + pendingCashback + paidOut),
    averageOrderValue: counted.length ? round(totalSpent / counted.length) : 0,
    topStoreName,
  };
}
