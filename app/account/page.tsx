import type { Metadata } from "next";
import ActiveOffers from "@/components/ActiveOffers";
import StatCard from "@/components/StatCard";
import { user } from "@/data/user";
import { getAccountStats } from "@/lib/account";
import { formatCurrency, formatDate } from "@/lib/format";
import { getTrips } from "@/lib/trips";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  const stats = getAccountStats(getTrips());
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-center gap-5 rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-raku-600 text-xl font-bold text-white">
          {initials}
        </div>
        <div className="flex-1">
          <h1 data-testid="profile-name" className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {user.name}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Member since {formatDate(user.memberSince)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 dark:text-slate-400">Available cashback</p>
          <p data-testid="cashback-balance" className="text-3xl font-extrabold text-raku-600 dark:text-rose-300">
            {formatCurrency(stats.availableBalance)}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Next payout {formatDate(user.nextPayoutDate)}</p>
        </div>
      </section>

      <section aria-labelledby="stats-heading" className="space-y-3">
        <h2 id="stats-heading" className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Shopping statistics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total trips" value={String(stats.totalTrips)} testId="stat-total-trips" />
          <StatCard label="Total spent" value={formatCurrency(stats.totalSpent)} testId="stat-total-spent" />
          <StatCard label="Lifetime earned" value={formatCurrency(stats.lifetimeEarned)} testId="stat-lifetime-earned" />
          <StatCard label="Pending cashback" value={formatCurrency(stats.pendingCashback)} testId="stat-pending" />
          <StatCard label="Paid out" value={formatCurrency(stats.paidOut)} testId="stat-paid-out" />
          <StatCard label="Avg. order" value={formatCurrency(stats.averageOrderValue)} testId="stat-avg-order" />
          <StatCard label="Top store" value={stats.topStoreName ?? "—"} testId="stat-top-store" />
          <StatCard label="Payout method" value={user.payoutMethod} />
        </div>
      </section>

      <ActiveOffers />
    </div>
  );
}
