import { expect, test } from "@playwright/test";

test.describe("@regression", () => {
  test("@regression Nike: Activate Cashback shows a confirmation", async ({ page }) => {
    await page.goto("/stores/nike");
    await page.getByRole("button", { name: "Activate Cashback" }).click();
    await expect(page.getByTestId("activation-confirmation")).toContainText("Cashback activated!");
  });

  test("@regression Search: Nike returns only Nike", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("search-input").fill("Nike");
    const results = page.getByTestId("store-results").locator("article");
    await expect(results).toHaveCount(1);
    await expect(results.first()).toContainText("Nike");
    await expect(page.getByTestId("store-card-adidas")).toHaveCount(0);
  });

  test("@regression Best Buy: logo image loads", async ({ page }) => {
    await page.goto("/stores");
    const logo = page.getByTestId("store-card-best-buy").getByRole("img", { name: "Best Buy logo" });
    await expect(logo).toBeVisible();
    await expect
      .poll(() => logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
      .toBe(true);
  });
});
