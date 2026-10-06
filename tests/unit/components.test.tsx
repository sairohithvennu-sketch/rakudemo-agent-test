import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { getStoreById, stores } from "@/data/stores";
import ActivateCashbackButton from "@/components/ActivateCashbackButton";
import FavoriteButton from "@/components/FavoriteButton";
import FavoritesList from "@/components/FavoritesList";
import StoreBrowser from "@/components/StoreBrowser";
import StoreCard from "@/components/StoreCard";
import TripsTable from "@/components/TripsTable";
import { FAVORITES_KEY, ACTIVATIONS_KEY } from "@/lib/hooks";
import { getTrips } from "@/lib/trips";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("StoreCard", () => {
  it("shows name, category, cashback rate and links to the store page", () => {
    render(<StoreCard store={getStoreById("macys")!} />);
    const card = screen.getByTestId("store-card-macys");
    expect(within(card).getByRole("heading", { name: "Macy's" })).toBeInTheDocument();
    expect(within(card).getByText("Department")).toBeInTheDocument();
    expect(within(card).getByText("8% Cash Back")).toBeInTheDocument();
    expect(within(card).getByRole("link")).toHaveAttribute("href", "/stores/macys");
    expect(within(card).getByAltText("Macy's logo")).toHaveAttribute("src", "/logos/macys.svg");
  });
});

describe("StoreBrowser", () => {
  it("lists all stores and the count", () => {
    render(<StoreBrowser stores={stores} />);
    expect(screen.getByTestId("results-count")).toHaveTextContent(`${stores.length} stores`);
  });

  it("filters by search text", async () => {
    const user = userEvent.setup();
    render(<StoreBrowser stores={stores} />);
    await user.type(screen.getByTestId("search-input"), "walmart");
    const results = screen.getByTestId("store-results");
    expect(within(results).getByTestId("store-card-walmart")).toBeInTheDocument();
    expect(within(results).queryByTestId("store-card-target")).not.toBeInTheDocument();
  });

  it("filters by category", async () => {
    const user = userEvent.setup();
    render(<StoreBrowser stores={stores} />);
    await user.click(screen.getByTestId("category-filter-Electronics"));
    expect(screen.getByTestId("store-card-best-buy")).toBeInTheDocument();
    expect(screen.queryByTestId("store-card-nike")).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<StoreBrowser stores={stores} />);
    await user.type(screen.getByTestId("search-input"), "qqqqq");
    expect(screen.getByTestId("no-results")).toBeInTheDocument();
  });
});

describe("favorites", () => {
  it("toggles a favorite and persists it to localStorage", async () => {
    const user = userEvent.setup();
    render(<FavoriteButton storeId="target" storeName="Target" />);
    const button = screen.getByRole("button", { name: "Add Target to favorites" });
    await user.click(button);
    expect(screen.getByRole("button", { name: "Remove Target from favorites" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(JSON.parse(localStorage.getItem(FAVORITES_KEY)!)).toEqual(["target"]);

    await user.click(screen.getByRole("button", { name: "Remove Target from favorites" }));
    expect(JSON.parse(localStorage.getItem(FAVORITES_KEY)!)).toEqual([]);
  });

  it("restores favorites from localStorage", () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(["adidas"]));
    render(<FavoriteButton storeId="adidas" storeName="Adidas" />);
    expect(screen.getByRole("button", { name: "Remove Adidas from favorites" })).toBeInTheDocument();
  });

  it("FavoritesList shows saved stores and an empty state", () => {
    const { unmount } = render(<FavoritesList stores={stores} />);
    expect(screen.getByTestId("favorites-empty")).toBeInTheDocument();
    unmount();

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(["walmart", "gap"]));
    render(<FavoritesList stores={stores} />);
    expect(screen.getByTestId("favorite-card-walmart")).toBeInTheDocument();
    expect(screen.getByTestId("favorite-card-gap")).toBeInTheDocument();
    expect(screen.queryByTestId("favorite-card-nike")).not.toBeInTheDocument();
  });
});

describe("ActivateCashbackButton", () => {
  it("activates cashback and shows a confirmation (Target)", async () => {
    const user = userEvent.setup();
    render(<ActivateCashbackButton store={getStoreById("target")!} />);
    expect(screen.queryByTestId("activation-confirmation")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Activate Cashback" }));

    const confirmation = await screen.findByTestId("activation-confirmation");
    expect(confirmation).toHaveTextContent("Cashback activated!");
    expect(confirmation).toHaveTextContent("2% cash back at Target");
    expect(screen.getByRole("button", { name: "Cashback Activated" })).toBeDisabled();
    expect(JSON.parse(localStorage.getItem(ACTIVATIONS_KEY)!)).toHaveProperty("target");
  });

  it("restores an active activation from localStorage", () => {
    const expires = new Date(Date.now() + 3_600_000).toISOString();
    localStorage.setItem(
      ACTIVATIONS_KEY,
      JSON.stringify({
        adidas: {
          storeId: "adidas",
          storeName: "Adidas",
          cashbackRate: 6,
          trackingLink: "https://x.example",
          activatedAt: new Date().toISOString(),
          expiresAt: expires,
        },
      }),
    );
    render(<ActivateCashbackButton store={getStoreById("adidas")!} />);
    expect(screen.getByTestId("activation-confirmation")).toBeInTheDocument();
  });
});

describe("TripsTable", () => {
  it("renders every trip with store, amount and status", () => {
    const trips = getTrips();
    render(<TripsTable trips={trips} />);
    expect(screen.getAllByTestId(/^trip-row-/)).toHaveLength(trips.length);
    const row = screen.getByTestId("trip-row-trip-1010");
    expect(within(row).getByText("Best Buy")).toBeInTheDocument();
    expect(within(row).getByText("$649.00")).toBeInTheDocument();
    expect(within(row).getByText("Confirmed")).toBeInTheDocument();
  });
});
