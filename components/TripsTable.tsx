import Link from "next/link";
import type { TripWithDetails } from "@/lib/trips";
import { formatCurrency, formatDate } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge";

export default function TripsTable({ trips }: { trips: TripWithDetails[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-card ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
      <table className="w-full min-w-[560px] text-left text-sm" data-testid="trips-table">
        <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Store</th>
            <th className="px-4 py-3 text-right">Purchase</th>
            <th className="px-4 py-3 text-right">Cashback</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {trips.map((trip) => (
            <tr key={trip.id} data-testid={`trip-row-${trip.id}`}>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{formatDate(trip.date)}</td>
              <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                <Link href={`/stores/${trip.store.id}`} className="hover:text-raku-600 dark:hover:text-rose-300">
                  {trip.store.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-right">{formatCurrency(trip.amount)}</td>
              <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-100">
                {trip.status === "declined" ? "—" : formatCurrency(trip.cashback)}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={trip.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
