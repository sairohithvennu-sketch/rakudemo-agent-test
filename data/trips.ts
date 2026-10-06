export type TripStatus = "pending" | "confirmed" | "paid" | "declined";

export interface Trip {
  id: string;
  storeId: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  /** Purchase amount in USD */
  amount: number;
  status: TripStatus;
}

export const trips: Trip[] = [
  { id: "trip-1012", storeId: "nike", date: "2026-09-18", amount: 129.99, status: "pending" },
  { id: "trip-1011", storeId: "target", date: "2026-09-05", amount: 84.32, status: "pending" },
  { id: "trip-1010", storeId: "best-buy", date: "2026-08-22", amount: 649.0, status: "confirmed" },
  { id: "trip-1009", storeId: "macys", date: "2026-08-09", amount: 212.5, status: "confirmed" },
  { id: "trip-1008", storeId: "walmart", date: "2026-07-27", amount: 56.78, status: "confirmed" },
  { id: "trip-1007", storeId: "adidas", date: "2026-07-11", amount: 98.0, status: "paid" },
  { id: "trip-1006", storeId: "sephora", date: "2026-06-30", amount: 74.25, status: "paid" },
  { id: "trip-1005", storeId: "home-depot", date: "2026-06-14", amount: 310.4, status: "paid" },
  { id: "trip-1004", storeId: "expedia", date: "2026-05-19", amount: 1240.0, status: "declined" },
  { id: "trip-1003", storeId: "nike", date: "2026-04-02", amount: 165.0, status: "paid" },
  { id: "trip-1002", storeId: "target", date: "2026-03-15", amount: 47.9, status: "paid" },
  { id: "trip-1001", storeId: "gap", date: "2026-02-08", amount: 88.0, status: "paid" },
];
