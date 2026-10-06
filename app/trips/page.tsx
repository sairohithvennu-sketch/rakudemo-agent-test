import type { Metadata } from "next";
import StatCard from "@/components/StatCard";
import TripsTable from "@/components/TripsTable";
import { getAccountStats } from "@/lib/account";
import { formatCurrency } from "@/lib/format";
import { getTrips } from "@/lib/trips";

export const metadata: Metadata = { title: "Shopping trips" };

export default function TripsPage() {
  const trips = getTrips();
  const stats = getAccountStats(trips);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Shopping trips</h1>
        <p className="text-slate-500 dark:text-slate-400">Your recent purchases and their cashback status.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending" value={formatCurrency(stats.pendingCashback)} hint="Awaiting merchant confirmation" />
        <StatCard label="Confirmed" value={formatCurrency(stats.availableBalance)} hint="Ready for next payout" />
        <StatCard label="Paid out" value={formatCurrency(stats.paidOut)} hint="Lifetime payouts" />
      </div>
      <TripsTable trips={trips} />
    </div>
  );
}
