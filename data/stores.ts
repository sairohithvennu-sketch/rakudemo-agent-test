export type Category =
  | "Fashion"
  | "Electronics"
  | "Department"
  | "Home"
  | "Beauty"
  | "Travel";

export const CATEGORIES: Category[] = [
  "Fashion",
  "Electronics",
  "Department",
  "Home",
  "Beauty",
  "Travel",
];

export interface Store {
  id: string;
  name: string;
  category: Category;
  /** Base cashback percentage, e.g. 5 means 5% */
  cashbackRate: number;
  tagline: string;
  description: string;
  logo: string;
  brandColor: string;
  url: string;
  featured: boolean;
  terms: string[];
}

const defaultTerms = [
  "Cashback is tracked after you activate and complete your purchase in the same session.",
  "Gift cards, taxes, and shipping are not eligible for cashback.",
  "Returned or cancelled orders are deducted from your pending cashback.",
];

export const stores: Store[] = [
  {
    id: "nike",
    name: "Nike",
    category: "Fashion",
    cashbackRate: 5,
    tagline: "Performance footwear and apparel",
    description:
      "Shop running shoes, training gear, and lifestyle sneakers from the world's best-known athletic brand. Members earn cashback on full-price and sale items alike.",
    logo: "/logos/nike.svg",
    brandColor: "#111827",
    url: "https://www.nike.com",
    featured: true,
    terms: defaultTerms,
  },
  {
    id: "adidas",
    name: "Adidas",
    category: "Fashion",
    cashbackRate: 6,
    tagline: "Sport-inspired style, built for movement",
    description:
      "From Originals classics to performance running, Adidas offers footwear, apparel, and accessories for every athlete. Earn cashback on new arrivals and outlet picks.",
    logo: "/logos/adidas.svg",
    brandColor: "#1d4ed8",
    url: "https://www.adidas.com",
    featured: true,
    terms: defaultTerms,
  },
  {
    id: "target",
    name: "Target",
    category: "Department",
    cashbackRate: 2,
    tagline: "Everyday essentials and more",
    description:
      "Groceries, home goods, electronics, and apparel under one roof. Activate cashback before checking out online for pickup, drive up, or delivery orders.",
    logo: "/logos/target.svg",
    brandColor: "#dc2626",
    url: "https://www.target.com",
    featured: true,
    terms: [
      ...defaultTerms,
      "Same-day delivery fees are excluded from cashback calculations.",
    ],
  },
  {
    id: "walmart",
    name: "Walmart",
    category: "Department",
    cashbackRate: 1.5,
    tagline: "Save money. Live better.",
    description:
      "A huge selection of groceries, electronics, toys, and household items at everyday low prices. Earn cashback on eligible online orders shipped or picked up.",
    logo: "/logos/walmart.svg",
    brandColor: "#2563eb",
    url: "https://www.walmart.com",
    featured: false,
    terms: defaultTerms,
  },
  {
    id: "best-buy",
    name: "Best Buy",
    category: "Electronics",
    cashbackRate: 2.5,
    tagline: "Tech, appliances, and expert help",
    description:
      "Laptops, TVs, gaming, smart home, and major appliances from leading brands. Cashback applies to most products; select Apple items are excluded.",
    logo: "/logos/best-buy.svg",
    brandColor: "#1e3a8a",
    url: "https://www.bestbuy.com",
    featured: true,
    terms: [
      ...defaultTerms,
      "Select Apple products and gift cards are excluded from cashback.",
    ],
  },
  {
    id: "macys",
    name: "Macy's",
    category: "Department",
    cashbackRate: 8,
    tagline: "Fashion, beauty, and home for every occasion",
    description:
      "Shop designer and private-label fashion, beauty, bedding, and kitchen essentials. Macy's regularly runs bonus cashback events for members.",
    logo: "/logos/macys.svg",
    brandColor: "#b91c1c",
    url: "https://www.macys.com",
    featured: true,
    terms: defaultTerms,
  },
  {
    id: "sephora",
    name: "Sephora",
    category: "Beauty",
    cashbackRate: 4,
    tagline: "Prestige beauty and skincare",
    description:
      "Makeup, skincare, fragrance, and hair care from hundreds of brands. Cashback is earned on eligible merchandise totals after discounts.",
    logo: "/logos/sephora.svg",
    brandColor: "#111111",
    url: "https://www.sephora.com",
    featured: false,
    terms: defaultTerms,
  },
  {
    id: "ulta",
    name: "Ulta Beauty",
    category: "Beauty",
    cashbackRate: 3,
    tagline: "All things beauty, all in one place",
    description:
      "Drugstore favorites to luxury brands, plus salon-quality hair care. Earn cashback on orders shipped to you or picked up in store.",
    logo: "/logos/ulta.svg",
    brandColor: "#ea580c",
    url: "https://www.ulta.com",
    featured: false,
    terms: defaultTerms,
  },
  {
    id: "home-depot",
    name: "Home Depot",
    category: "Home",
    cashbackRate: 2,
    tagline: "Tools, building materials, and decor",
    description:
      "Everything for your next project: tools, lumber, appliances, and outdoor living. Cashback excludes special-order and installation services.",
    logo: "/logos/home-depot.svg",
    brandColor: "#f97316",
    url: "https://www.homedepot.com",
    featured: false,
    terms: [
      ...defaultTerms,
      "Installation services and special orders are not eligible.",
    ],
  },
  {
    id: "gap",
    name: "Gap",
    category: "Fashion",
    cashbackRate: 7,
    tagline: "Casual American classics",
    description:
      "Denim, tees, and everyday basics for the whole family. Cashback boosts frequently align with seasonal sales.",
    logo: "/logos/gap.svg",
    brandColor: "#1e40af",
    url: "https://www.gap.com",
    featured: false,
    terms: defaultTerms,
  },
  {
    id: "expedia",
    name: "Expedia",
    category: "Travel",
    cashbackRate: 3.5,
    tagline: "Flights, hotels, and vacation packages",
    description:
      "Book hotels, flights, car rentals, and bundles. Cashback is confirmed after your stay or trip is completed.",
    logo: "/logos/expedia.svg",
    brandColor: "#facc15",
    url: "https://www.expedia.com",
    featured: false,
    terms: [
      "Cashback on travel bookings is confirmed after check-out or completion of travel.",
      "Cancelled bookings are not eligible for cashback.",
    ],
  },
  {
    id: "kohls",
    name: "Kohl's",
    category: "Department",
    cashbackRate: 5.5,
    tagline: "Style, savings, and Kohl's Cash",
    description:
      "Apparel, shoes, home goods, and beauty at department-store variety with outlet-style prices.",
    logo: "/logos/kohls.svg",
    brandColor: "#7c3aed",
    url: "https://www.kohls.com",
    featured: false,
    terms: defaultTerms,
  },
];

export function getStoreById(id: string): Store | undefined {
  return stores.find((s) => s.id === id);
}
