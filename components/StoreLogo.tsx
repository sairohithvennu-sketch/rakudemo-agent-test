import type { Store } from "@/data/stores";

interface Props {
  store: Store;
  size?: number;
  className?: string;
}

export default function StoreLogo({ store, size = 64, className = "" }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={store.logo}
      alt={`${store.name} logo`}
      width={size}
      height={size}
      data-testid={`store-logo-${store.id}`}
      className={`rounded-xl object-contain bg-white ${className}`}
    />
  );
}
