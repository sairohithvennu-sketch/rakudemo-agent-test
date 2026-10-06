import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoreById, stores } from "@/data/stores";
import ActivateCashbackButton from "@/components/ActivateCashbackButton";
import FavoriteButton from "@/components/FavoriteButton";
import StoreCard from "@/components/StoreCard";
import StoreLogo from "@/components/StoreLogo";
import { formatRate } from "@/lib/format";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return stores.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const store = getStoreById(slug);
  return { title: store ? `${store.name} cash back` : "Store not found" };
}

export default async function StorePage({ params }: Params) {
  const { slug } = await params;
  const store = getStoreById(slug);
  if (!store) notFound();

  const sameCategory = stores.filter((s) => s.id !== store.id && s.category === store.category);
  const others = stores.filter((s) => s.id !== store.id && s.category !== store.category);
  const related = [...sameCategory, ...others].slice(0, 3);

  return (
    <div className="space-y-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400">
        <Link href="/stores" className="hover:text-raku-600 dark:hover:text-rose-300">
          Stores
        </Link>{" "}
        / <span className="text-slate-800 dark:text-slate-200">{store.name}</span>
      </nav>

      <section className="grid gap-8 rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800 md:grid-cols-[auto_1fr] md:p-10">
        <StoreLogo store={store} size={112} className="ring-1 ring-slate-100 dark:ring-slate-700" />
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{store.name}</h1>
              <p className="text-slate-500 dark:text-slate-400">{store.tagline}</p>
            </div>
            <FavoriteButton storeId={store.id} storeName={store.name} withLabel />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              data-testid="store-cashback-rate"
              className="rounded-full bg-raku-50 px-4 py-1.5 text-lg font-bold text-raku-700 dark:bg-raku-700/25 dark:text-rose-100"
            >
              {formatRate(store.cashbackRate)} Cash Back
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {store.category}
            </span>
          </div>

          <p className="max-w-2xl text-slate-700 dark:text-slate-300">{store.description}</p>

          <ActivateCashbackButton store={store} />
        </div>
      </section>

      <section aria-labelledby="terms-heading" className="space-y-2">
        <h2 id="terms-heading" className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Cashback terms
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {store.terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="related-heading" className="space-y-4">
        <h2 id="related-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Related stores
        </h2>
        <div data-testid="related-stores" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <StoreCard key={s.id} store={s} testIdPrefix="related-card" />
          ))}
        </div>
      </section>
    </div>
  );
}
