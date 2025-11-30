import { test, expect } from "@playwright/test";
import { bypassFadeOut } from "./test-setup";

test("Overview page h1 text", async ({ page }) => {
  await page.goto("/");
  await bypassFadeOut(page);

  const h1 = page.locator("#page-title");
  await expect(h1).toHaveText("Bits Auction-house");
});
