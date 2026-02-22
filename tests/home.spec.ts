import { test, expect } from "@playwright/test";

// ─── Home Page Tests ────────────────────────────────────────────────────────

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/home");
  });

  test("renders navigation bar with logo and links", async ({ page }) => {
    // Navbar
    await expect(page.locator("#home-navbar")).toBeVisible();

    // Logo text
    await expect(page.locator("#home-logo-text")).toHaveText("ACME");

    // Nav links
    await expect(page.locator("#nav-home")).toBeVisible();
    await expect(page.locator("#nav-features")).toBeVisible();
    await expect(page.locator("#nav-pricing")).toBeVisible();

    // Sign in button
    await expect(page.locator("#nav-sign-in")).toBeVisible();
  });

  test("renders hero section with title and CTAs", async ({ page }) => {
    await expect(page.locator("#home-hero-title")).toBeVisible();
    await expect(page.locator("#home-hero-subtitle")).toBeVisible();
    await expect(page.locator("#home-cta-primary")).toBeVisible();
    await expect(page.locator("#home-cta-secondary")).toBeVisible();
  });

  test("renders all three feature cards", async ({ page }) => {
    await expect(page.locator("#feature-card-1")).toBeVisible();
    await expect(page.locator("#feature-card-2")).toBeVisible();
    await expect(page.locator("#feature-card-3")).toBeVisible();
  });

  test("renders footer", async ({ page }) => {
    await expect(page.locator("#home-footer")).toContainText("2026 ACME Inc");
  });

  test("Home nav link is highlighted by default", async ({ page }) => {
    const getAlpha = (color: string) => {
      const match = color.match(/[\d.]+/g);
      return match ? parseFloat(match[3] ?? "1") : 1;
    };

    // Home should be active (bright text + bg pill)
    const homeColor = await page
      .locator("#nav-home")
      .evaluate((el) => getComputedStyle(el).color);
    const featuresColor = await page
      .locator("#nav-features")
      .evaluate((el) => getComputedStyle(el).color);

    expect(getAlpha(homeColor)).toBeGreaterThan(getAlpha(featuresColor));

    const homeBg = await page
      .locator("#nav-home")
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    const featuresBg = await page
      .locator("#nav-features")
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    expect(getAlpha(homeBg)).toBeGreaterThan(getAlpha(featuresBg));
  });

  test("clicking Features moves highlight from Home to Features", async ({
    page,
  }) => {
    const getAlpha = (color: string) => {
      const match = color.match(/[\d.]+/g);
      return match ? parseFloat(match[3] ?? "1") : 1;
    };

    // Before click: Home is active
    const homeBgBefore = await page
      .locator("#nav-home")
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(getAlpha(homeBgBefore)).toBeGreaterThan(0);

    // Click Features
    await page.locator("#nav-features").click();

    // After click: Features should be active, Home should be inactive
    const featuresBgAfter = await page
      .locator("#nav-features")
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    const homeBgAfter = await page
      .locator("#nav-home")
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    const featuresColorAfter = await page
      .locator("#nav-features")
      .evaluate((el) => getComputedStyle(el).color);
    const homeColorAfter = await page
      .locator("#nav-home")
      .evaluate((el) => getComputedStyle(el).color);

    // Features should now have bg pill and bright text
    expect(getAlpha(featuresBgAfter)).toBeGreaterThan(getAlpha(homeBgAfter));
    expect(getAlpha(featuresColorAfter)).toBeGreaterThan(
      getAlpha(homeColorAfter),
    );
  });

  test("clicking Pricing moves highlight from Home to Pricing", async ({
    page,
  }) => {
    const getAlpha = (color: string) => {
      const match = color.match(/[\d.]+/g);
      return match ? parseFloat(match[3] ?? "1") : 1;
    };

    // Click Pricing
    await page.locator("#nav-pricing").click();

    // After click: Pricing should be active, Home should be inactive
    const pricingBg = await page
      .locator("#nav-pricing")
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    const homeBg = await page
      .locator("#nav-home")
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    const pricingColor = await page
      .locator("#nav-pricing")
      .evaluate((el) => getComputedStyle(el).color);
    const homeColor = await page
      .locator("#nav-home")
      .evaluate((el) => getComputedStyle(el).color);

    // Pricing should now have bg pill and bright text
    expect(getAlpha(pricingBg)).toBeGreaterThan(getAlpha(homeBg));
    expect(getAlpha(pricingColor)).toBeGreaterThan(getAlpha(homeColor));

    // Pricing section should be visible on the page
    await expect(page.locator("#pricing")).toBeVisible();
  });

  test("Sign In button navigates to login page", async ({ page }) => {
    await page.locator("#nav-sign-in").click();

    await page.waitForURL("**/login");
    await expect(page.locator("#login-page")).toBeVisible();
  });
});
