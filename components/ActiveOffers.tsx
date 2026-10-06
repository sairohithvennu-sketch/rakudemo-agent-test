"use client";

import Link from "next/link";
import { formatRate } from "@/lib/format";
import { useActivations } from "@/lib/hooks";

export default function ActiveOffers() {
  const { activeList } = useActivations();

  return (
    <section aria-labelledby="active-offers" className="space-y-3">
      <h2 id="active-offers" className="text-lg font-bold text-slate-900 dark:text-slate-100">
        Active cashback offers
      </h2>
      {activeList.length === 0 ? (
        <p data-testid="no-active-offers" className="text-sm text-slate-500 dark:text-slate-400">
          No active offers. Activate cashback on a store page before you shop.
        </p>
      ) : (
        <ul data-testid="active-offers" className="space-y-2">
          {activeList.map((a) => (
            <li
              key={a.storeId}
              className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm shadow-card ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800"
            >
              <Link href={`/stores/${a.storeId}`} className="font-semibold text-slate-900 dark:text-slate-100">
                {a.storeName}
              </Link>
              <span className="text-slate-500 dark:text-slate-400">
                {formatRate(a.cashbackRate)} until {new Date(a.expiresAt).toLocaleString("en-US")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
