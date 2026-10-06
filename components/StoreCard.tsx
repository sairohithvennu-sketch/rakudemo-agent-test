import Link from "next/link";
import type { Store } from "@/data/stores";
import { formatRate } from "@/lib/format";
import FavoriteButton from "@/components/FavoriteButton";
import StoreLogo from "@/components/StoreLogo";

interface Props {
  store: Store;
  testIdPrefix?: string;
}

export default function StoreCard({ store, testIdPrefix = "store-card" }: Props) {
  return (
    <article
      data-testid={`${testIdPrefix}-${store.id}`}
      className="relative flex flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-900 dark:ring-slate-800"
    >
      <div className="absolute right-3 top-3">
        <FavoriteButton storeId={store.id} storeName={store.name} />
      </div>
      <Link href={`/stores/${store.id}`} className="flex flex-col items-start gap-3">
        <StoreLogo store={store} size={64} className="ring-1 ring-slate-100 dark:ring-slate-700" />
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{store.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{store.tagline}</p>
        </div>
        <div className="mt-1 flex w-full items-center justify-between">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {store.category}
          </span>
          <span className="text-sm font-bold text-raku-600 dark:text-rose-300">
            {formatRate(store.cashbackRate)} Cash Back
          </span>
        </div>
      </Link>
    </article>
  );
}
