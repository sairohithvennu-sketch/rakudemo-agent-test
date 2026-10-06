import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-extrabold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-500">We couldn&apos;t find what you were looking for.</p>
      <Link href="/stores" className="mt-4 inline-block font-semibold text-raku-600">
        Browse stores
      </Link>
    </div>
  );
}
