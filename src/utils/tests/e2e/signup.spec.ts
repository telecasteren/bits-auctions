import { test, expect } from "@playwright/test";
import { mockedEnv } from "./tests-env";

const uniqueId = () => {
  return Math.random().toString(36).substring(2, 10);
};

test.describe("Signup", () => {
  test("Signup form displays", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.locator("#auth-form-title")).toBeVisible();

    const h2 = page.locator("#auth-form-title");
    await expect(h2).toHaveText("Create your account");
  });

  test("User can sign up", async ({ page }) => {
    const username = `user_${uniqueId()}`;
    const email = `user_${uniqueId()}@stud.noroff.no`;
    const password = mockedEnv.TEST_SIGNUP_PASSWORD || "TestPass123!";

    await page.route("**/auth/register", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        json: { data: { username } },
      });
    });

    await page.route("**/auth/login", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        json: { data: { accessToken: "fake-token", name: username, email } },
      });
    });

    await page.route("**/auction/profiles/**", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        json: {
          data: {
            id: "mock-id",
            name: username,
            email,
            bio: "",
            banner: { url: "", alt: "" },
            avatar: { url: "", alt: "" },
            credits: 1000,
            _count: { listings: 0, bids: 0 },
            wins: [],
            listings: [],
          },
        },
      });
    });

    await page.goto("/signup");
    await expect(page.locator('input[name="username"]')).toBeVisible();

    // Then we fill out the form with valid data
    await page.locator('input[name="username"]').fill(username!);
    await page.locator('input[name="email"]').fill(email!);
    await page.locator('input[name="password"]').fill(password!);
    await page.locator('input[name="confirm-password"]').fill(password!);
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(
      new RegExp(`/account/${username}$`),
    );
    await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
  });

  test("User cannot sign up with invalid email", async ({ page }) => {
    const username = `user_${uniqueId()}`;
    const password = mockedEnv.TEST_SIGNUP_PASSWORD || "TestPass123!";

    await page.goto("/signup");
    await expect(page.locator('input[name="username"]')).toBeVisible();

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
