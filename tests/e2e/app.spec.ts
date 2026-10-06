import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test("homepage shows featured deals, store cards and filters", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Get cash back");
    await expect(page.getByTestId("featured-stores").locator("article")).toHaveCount(4);
    await expect(page.getByTestId("store-results").locator("article")).toHaveCount(12);
    await expect(page.getByTestId("category-filter-Electronics")).toBeVisible();
  });

  test("main navigation reaches every page", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });

    await nav.getByRole("link", { name: "Stores" }).click();
    await expect(page).toHaveURL(/\/stores$/);
    await expect(page.getByRole("heading", { name: "All stores" })).toBeVisible();

    await nav.getByRole("link", { name: "Shopping Trips" }).click();
    await expect(page).toHaveURL(/\/trips$/);
    await expect(page.getByTestId("trips-table")).toBeVisible();

    await nav.getByRole("link", { name: /Favorites/ }).click();
    await expect(page).toHaveURL(/\/favorites$/);
    await expect(page.getByTestId("favorites-empty")).toBeVisible();

    await nav.getByRole("link", { name: "Account" }).click();
    await expect(page).toHaveURL(/\/account$/);
    await expect(page.getByTestId("profile-name")).toHaveText("Jordan Rivera");
  });
});

test.describe("store pages", () => {
  for (const [slug, name] of [
    ["nike", "Nike"],
    ["adidas", "Adidas"],
    ["target", "Target"],
    ["walmart", "Walmart"],
    ["best-buy", "Best Buy"],
    ["macys", "Macy's"],
  ]) {
    test(`${name} store page renders`, async ({ page }) => {
      await page.goto(`/stores/${slug}`);
      await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
      await expect(page.getByTestId("store-cashback-rate")).toContainText("Cash Back");
      await expect(page.getByRole("button", { name: "Activate Cashback" })).toBeVisible();
      await expect(page.getByTestId("related-stores").locator("article")).toHaveCount(3);
    });
  }

  test("unknown store shows not-found page", async ({ page }) => {
    await page.goto("/stores/does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });

  test("activating cashback at Target shows confirmation and persists", async ({ page }) => {
    await page.goto("/stores/target");
    await page.getByRole("button", { name: "Activate Cashback" }).click();
    await expect(page.getByTestId("activation-confirmation")).toContainText("Cashback activated!");

    await page.reload();
    await expect(page.getByTestId("activation-confirmation")).toBeVisible();

    await page.goto("/account");
    await expect(page.getByTestId("active-offers")).toContainText("Target");
  });
});

test.describe("search and filters", () => {
  test("searching for Target shows only Target", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("search-input").fill("Target");
    const results = page.getByTestId("store-results").locator("article");
    await expect(results).toHaveCount(1);
    await expect(results.first()).toContainText("Target");
  });

  test("category filter narrows results", async ({ page }) => {
    await page.goto("/stores");
    await page.getByTestId("category-filter-Beauty").click();
    await expect(page.getByTestId("store-results").locator("article")).toHaveCount(2);
  });

  test("shows empty state for unmatched search", async ({ page }) => {
    await page.goto("/stores");
    await page.getByTestId("search-input").fill("qqqqq");
    await expect(page.getByTestId("no-results")).toBeVisible();
  });
});

test.describe("favorites", () => {
  test("favorites persist across reloads and appear on the favorites page", async ({ page }) => {
    await page.goto("/stores/walmart");
    await page.getByTestId("favorite-toggle-walmart").first().click();
    await expect(page.getByTestId("favorites-count")).toHaveText("1");

    await page.reload();
    await expect(page.getByTestId("favorite-toggle-walmart").first()).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await page.goto("/favorites");
    await expect(page.getByTestId("favorite-card-walmart")).toBeVisible();

    await page.getByTestId("favorite-toggle-walmart").click();
    await expect(page.getByTestId("favorites-empty")).toBeVisible();
  });
});

test.describe("trips and account", () => {
  test("trips page lists purchases with cashback status", async ({ page }) => {
    await page.goto("/trips");
    await expect(page.locator("[data-testid^=trip-row-]")).toHaveCount(12);
    const row = page.getByTestId("trip-row-trip-1010");
    await expect(row).toContainText("Best Buy");
    await expect(row).toContainText("$649.00");
    await expect(row.getByTestId("trip-status")).toHaveText("Confirmed");
  });

  test("account shows balance and statistics", async ({ page }) => {
    await page.goto("/account");
    await expect(page.getByTestId("cashback-balance")).toHaveText(/^\$\d/);
    await expect(page.getByTestId("stat-total-trips")).toHaveText("11");
    await expect(page.getByTestId("stat-top-store")).toHaveText("Best Buy");
  });
});
