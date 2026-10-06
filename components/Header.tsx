"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/lib/hooks";

const links = [
  { href: "/", label: "Home" },
  { href: "/stores", label: "Stores" },
  { href: "/trips", label: "Shopping Trips" },
  { href: "/favorites", label: "Favorites" },
  { href: "/account", label: "Account" },
];

export default function Header() {
  const pathname = usePathname();
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="RakuDemo home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-raku-600 text-lg font-extrabold text-white">
            R
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Raku<span className="text-raku-600">Demo</span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-1 text-sm font-medium">
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 transition ${
                  active ? "bg-raku-50 text-raku-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {label}
                {href === "/favorites" && favorites.length > 0 && (
                  <span
                    data-testid="favorites-count"
                    className="ml-1.5 rounded-full bg-raku-600 px-1.5 py-0.5 text-xs text-white"
                  >
                    {favorites.length}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
