import { test, expect } from "@playwright/test";
import { mockedEnv } from "./tests-env";

test.describe("Login", () => {
  test("Login form displays", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("#page-title")).toBeVisible();

    const h2 = page.locator("#auth-form-title");
    await expect(h2).toHaveText("Log in to your account");
  });

  test("User can log in", async ({ page }) => {
    const email = mockedEnv.TEST_USER_EMAIL;
    const password = mockedEnv.TEST_USER_PASSWORD;

    await page.goto("/login");
    await expect(page.locator('input[name="email"]')).toBeVisible();

    // Then we fill out the form with valid data
    await page.locator('input[name="email"]').fill(email!);
    await page.locator('input[name="password"]').fill(password!);
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
  });

  test("Invalid user cannot log in", async ({ page }) => {
    const email = mockedEnv.TEST_USER_EMAIL;

    await page.goto("/login");
    await expect(page.locator('input[name="email"]')).toBeVisible();

    // Then we fill out the form with invalid data
    await page.locator('input[name="email"]').fill(email!);
    await page.locator('input[name="password"]').fill("wrongpassworrd");
    await page.locator('button[type="submit"]').click();

    await expect(page.locator(".formError")).toHaveText(
      /Invalid email or password/i,
    );
  });
});
