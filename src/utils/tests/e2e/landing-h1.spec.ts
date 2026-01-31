import { test, expect } from "@playwright/test";

test("Landing page displays correct title", async ({ page }) => {
  await page.goto("/");

  const h1 = page.locator("#page-title");

  await expect(h1).toHaveText(/Bits Auctions/i);
});
