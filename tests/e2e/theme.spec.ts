import { expect, test } from "@playwright/test";

const LIGHT_BG = "rgb(248, 250, 252)";
const DARK_BG = "rgb(2, 6, 23)";
const DARK_HEADING = "rgb(241, 245, 249)";

test.describe("dark mode", () => {
  test("DM-1 toggle switches light and dark", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByTestId("theme-toggle");
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute("aria-label", "Switch to light mode");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(await page.evaluate(() => localStorage.getItem("rakudemo:theme"))).toBe(
      JSON.stringify("dark"),
    );
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(DARK_BG);

    await toggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute("aria-label", "Switch to dark mode");
    expect(await page.evaluate(() => localStorage.getItem("rakudemo:theme"))).toBe(
      JSON.stringify("light"),
    );
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(LIGHT_BG);
  });

  test("DM-2 theme persists across reload without flashing light", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("theme-toggle").click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.addInitScript(() => {
      const w = window as unknown as { __themeLog?: string[] };
      w.__themeLog = [];
      const attach = () => {
        const root = document.documentElement;
        if (!root || root.dataset.themeWatch === "1") return;
        root.dataset.themeWatch = "1";
        new MutationObserver(() => {
          w.__themeLog?.push(root.className);
        }).observe(root, { attributes: true, attributeFilter: ["class"] });
      };
      attach();
      new MutationObserver(attach).observe(document, { childList: true, subtree: true });
    });

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.getByTestId("theme-toggle")).toHaveAttribute("aria-pressed", "true");
    expect(await page.evaluate(() => localStorage.getItem("rakudemo:theme"))).toBe(
      JSON.stringify("dark"),
    );
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(DARK_BG);

    const seen = await page.evaluate(() => (window as unknown as { __themeLog: string[] }).__themeLog);
    const droppedDark = seen.some((value, index) => {
      const hadDark = seen.slice(0, index).some((entry) => entry.split(/\s+/).includes("dark"));
      return hadDark && !value.split(/\s+/).includes("dark");
    });
    expect(droppedDark).toBe(false);
  });

  test("DM-3 dark theme applies site-wide including 404", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("theme-toggle").click();

    for (const path of ["/", "/stores", "/stores/nike", "/trips", "/favorites", "/account", "/does-not-exist"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveClass(/dark/);
      expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(DARK_BG);
      await expect(page.getByTestId("theme-toggle")).toBeVisible();
    }

    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    expect(await page.evaluate(() => getComputedStyle(document.querySelector("h1")!).color)).toBe(
      DARK_HEADING,
    );
  });

  test("DM-4 fresh storage defaults to light and ignores system preference", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect(page.getByTestId("theme-toggle")).toHaveAttribute("aria-label", "Switch to dark mode");
    expect(await page.evaluate(() => localStorage.getItem("rakudemo:theme"))).toBeNull();
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(LIGHT_BG);

    const html = await (await page.request.get("/")).text();
    const script = html.match(/<script id="rakudemo-theme">([\s\S]*?)<\/script>/);
    expect(script?.[1]).toContain('localStorage.getItem("rakudemo:theme")');
    expect(script?.[1]).not.toContain("matchMedia");
    expect(script?.[1]).not.toContain("prefers-color-scheme");
  });
});
