import { getStoreById, type Store } from "@/data/stores";
import { trips, type Trip } from "@/data/trips";
import { calculateCashback } from "@/lib/cashback";

export interface TripWithDetails extends Trip {
  store: Store;
  cashback: number;
}

export function getTrips(): TripWithDetails[] {
  return trips
    .map((trip) => {
      const store = getStoreById(trip.storeId);
      if (!store) return null;
      const cashback =
        trip.status === "declined" ? 0 : calculateCashback(trip.amount, store.cashbackRate);
      return { ...trip, store, cashback };
    })
    .filter((t): t is TripWithDetails => t !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}
