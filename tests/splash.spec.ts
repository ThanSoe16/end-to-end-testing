import { test, expect } from "@playwright/test";

// ─── Splash Screen Tests ────────────────────────────────────────────────────

test.describe("Splash Screen", () => {
  test("renders splash screen with logo, app name, and tagline", async ({
    page,
  }) => {
    await page.goto("/splash");

    // Splash screen container is visible
    await expect(page.locator("#splash-screen")).toBeVisible();

    // Logo is visible
    await expect(page.locator("#splash-logo")).toBeVisible();

    // App name
    await expect(page.locator("#splash-app-name")).toHaveText("ACME");

    // Tagline
    await expect(page.locator("#splash-tagline")).toHaveText(
      "Build Something Extraordinary",
    );

    // Loading bar
    await expect(page.locator("#splash-loading-bar")).toBeVisible();
  });

  test("auto-redirects to home page after delay", async ({ page }) => {
    await page.goto("/splash");

    // Wait for the redirect (3 seconds + buffer)
    await page.waitForURL("**/home", { timeout: 5000 });

    // Should now be on home page
    await expect(page.locator("#home-page")).toBeVisible();
  });
});
