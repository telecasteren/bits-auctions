import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test("Login form displays", async ({ page }) => {
    await page.goto("/bits-auctions/login");
    await page.locator("#auth-form-title").waitFor({ state: "visible" });

    const h2 = page.locator("#auth-form-title");
    await expect(h2).toHaveText(/Log in to your account/i);
  });

  test("User can log in", async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    await page.goto("/bits-auctions/login");
    await page.locator('input[name="email"]').waitFor({ state: "visible" });

    // Then we fill out the form with valid data
    await page.locator('input[name="email"]').fill(email!);
    await page.locator('input[name="password"]').fill(password!);
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole("button", { name: /log out/i })).toBeVisible();
  });

  test("Invalid user cannot log in", async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL;

    await page.goto("/bits-auctions/login");
    await page.locator('input[name="email"]').waitFor({ state: "visible" });

    // Then we fill out the form with invalid data
    await page.locator('input[name="email"]').fill(email!);
    await page.locator('input[name="password"]').fill("wrongpassworrd");
    await page.locator('button[type="submit"]').click();

    await expect(page.locator(".formError")).toHaveText(
      /Invalid email or password/i,
    );
  });
});
