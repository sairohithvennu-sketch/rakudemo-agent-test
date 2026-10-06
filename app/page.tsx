import Link from "next/link";
import { stores } from "@/data/stores";
import StoreBrowser from "@/components/StoreBrowser";
import StoreCard from "@/components/StoreCard";
import { formatRate } from "@/lib/format";

export default function HomePage() {
  const featured = stores
    .filter((s) => s.featured)
    .sort((a, b) => b.cashbackRate - a.cashbackRate)
    .slice(0, 4);
  const topRate = Math.max(...stores.map((s) => s.cashbackRate));

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-raku-600 to-raku-700 px-6 py-12 text-white shadow-card md:px-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-raku-100">
          Cash back, simplified
        </p>
        <h1 className="mt-2 max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl">
          Get cash back at {stores.length}+ stores, up to {formatRate(topRate)}.
        </h1>
        <p className="mt-4 max-w-xl text-raku-100">
          Activate cashback, shop like you normally do, and watch your rewards add up.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/stores"
            className="rounded-full bg-white px-6 py-3 font-semibold text-raku-700 shadow-sm hover:bg-raku-50"
          >
            Browse all stores
          </Link>
          <Link
            href="/account"
            className="rounded-full border border-white/50 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            View my cashback
          </Link>
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 id="featured-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Featured cashback deals
          </h2>
          <Link href="/stores" className="text-sm font-semibold text-raku-600 dark:text-rose-300">
            See all
          </Link>
        </div>
        <div data-testid="featured-stores" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((store) => (
            <StoreCard key={store.id} store={store} testIdPrefix="featured-card" />
          ))}
        </div>
      </section>

      <StoreBrowser stores={stores} />

      <section aria-labelledby="how-heading" className="space-y-4">
        <h2 id="how-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          How it works
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            ["1. Activate", "Pick a store and activate cashback before you shop."],
            ["2. Shop", "Complete your purchase as usual within 24 hours."],
            ["3. Earn", "Cashback shows up as pending, then confirmed, then paid."],
          ].map(([title, body]) => (
            <li key={title} className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
              <p className="font-bold text-raku-600 dark:text-rose-300">{title}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{body}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
