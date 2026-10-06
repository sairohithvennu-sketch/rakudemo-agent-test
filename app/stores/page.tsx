import type { Metadata } from "next";
import { stores } from "@/data/stores";
import StoreBrowser from "@/components/StoreBrowser";

export const metadata: Metadata = { title: "All stores" };

export default function StoresPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">All stores</h1>
      <StoreBrowser stores={stores} />
    </div>
  );
}
