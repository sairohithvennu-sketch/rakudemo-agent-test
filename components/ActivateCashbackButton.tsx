"use client";

import type { Store } from "@/data/stores";
import { formatRate } from "@/lib/format";
import { useActivations } from "@/lib/hooks";

interface Props {
  store: Store;
}

export default function ActivateCashbackButton({ store }: Props) {
  const { activate, getActive } = useActivations();
  const activation = getActive(store.id);

  function handleClick() {
    const result = activate(store);
    if (!result.ok) return;
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        data-testid="activate-cashback"
        onClick={handleClick}
        disabled={!!activation}
        className="w-full rounded-full bg-raku-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-raku-700 disabled:cursor-default disabled:bg-emerald-600 sm:w-auto"
      >
        {activation ? "Cashback Activated" : "Activate Cashback"}
      </button>

      {activation && (
        <div
          role="status"
          data-testid="activation-confirmation"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
        >
          <p className="font-semibold">Cashback activated!</p>
          <p className="mt-1">
            You&apos;ll earn {formatRate(activation.cashbackRate)} cash back at {store.name}. Offer
            valid until {new Date(activation.expiresAt).toLocaleString("en-US")}.
          </p>
          <a
            href={store.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-semibold text-emerald-800 underline"
          >
            Continue to {store.name}
          </a>
        </div>
      )}
    </div>
  );
}
