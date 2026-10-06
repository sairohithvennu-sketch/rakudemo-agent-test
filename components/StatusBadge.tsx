import type { TripStatus } from "@/data/trips";

const styles: Record<TripStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-800",
  confirmed: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:ring-sky-800",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-800",
  declined: "bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
};

const labels: Record<TripStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  paid: "Paid",
  declined: "Declined",
};

export default function StatusBadge({ status }: { status: TripStatus }) {
  return (
    <span
      data-testid="trip-status"
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
