import { test, expect } from "@playwright/test";

const uniqueId = () => {
  return Math.random().toString(36).substring(2, 10);
};

test.describe("Signup", () => {
  test("Signup form displays", async ({ page }) => {
    await page.goto("/bits-auctions/");
    await page.waitForLoadState("networkidle");

    await page.goto("/bits-auctions/signup");
    await page.locator("#auth-form-title").waitFor({ state: "visible" });

    const h2 = page.locator("#auth-form-title");
    await expect(page.locator("#auth-form-title")).toBeVisible({
      timeout: 15000,
    });

    await expect(h2).toHaveText(/Create your account/i);
  });

  test("User can sign up", async ({ page }) => {
    const username = `user_${uniqueId()}`;
    const email = `user_${uniqueId()}@stud.noroff.no`;
    const password = process.env.TEST_SIGNUP_PASSWORD || "TestPass123!";

    await page.goto("/bits-auctions/");
    await page.waitForLoadState("networkidle");

    await page.goto("/bits-auctions/signup");
    await page.locator('input[name="username"]').waitFor({ state: "visible" });

    // Then we fill out the form with valid data
    await page.locator('input[name="username"]').fill(username!);
    await page.locator('input[name="email"]').fill(email!);
    await page.locator('input[name="password"]').fill(password!);
    await page.locator('input[name="confirm-password"]').fill(password!);
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole("button", { name: /log out/i })).toBeVisible();
  });

  test("User cannot sign up with invalid email", async ({ page }) => {
    const username = `user_${uniqueId()}`;
    const password = process.env.TEST_SIGNUP_PASSWORD || "TestPass123!";

    await page.goto("/bits-auctions/");
    await page.waitForLoadState("networkidle");

    await page.goto("/bits-auctions/signup");
    await page.locator('input[name="username"]').waitFor({ state: "visible" });

    // Then we fill out the form with invalid email
    await page.locator('input[name="username"]').fill(username!);
    await page.locator('input[name="email"]').fill("testuser@example.com");
    await page.locator('input[name="password"]').fill(password!);
    const submit = page.locator('button[type="submit"]');
    await expect(submit).toBeDisabled();

    await expect(page.locator(".formError")).toHaveText(
      /Valid emails end with: @stud.noroff.no/i,
    );
  });
});
