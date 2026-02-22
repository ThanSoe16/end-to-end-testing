import { test, expect } from "@playwright/test";

// ─── Login Page Tests ───────────────────────────────────────────────────────

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("renders login form with all fields", async ({ page }) => {
    // Title
    await expect(page.locator("#login-title")).toHaveText("Welcome back");

    // Form
    await expect(page.locator("#login-form")).toBeVisible();

    // Email input
    await expect(page.locator("#login-email")).toBeVisible();

    // Password input
    await expect(page.locator("#login-password")).toBeVisible();

    // Remember me checkbox
    await expect(page.locator("#login-remember")).toBeVisible();

    // Submit button
    await expect(page.locator("#login-submit")).toHaveText("Sign In");

    // Social login buttons
    await expect(page.locator("#login-google")).toBeVisible();
    await expect(page.locator("#login-github")).toBeVisible();
  });

  test("shows validation errors on empty submission", async ({ page }) => {
    // Click submit without filling fields
    await page.locator("#login-submit").click();

    // Error messages should appear
    await expect(page.locator("#login-email-error")).toHaveText(
      "Email is required",
    );
    await expect(page.locator("#login-password-error")).toHaveText(
      "Password is required",
    );
  });

  test("shows email validation error for invalid email", async ({ page }) => {
    await page.locator("#login-email").fill("not-a-valid-email");
    await page.locator("#login-password").fill("password123");
    await page.locator("#login-submit").click();

    await expect(page.locator("#login-email-error")).toHaveText(
      "Please enter a valid email",
    );
  });

  test("shows password validation error for short password", async ({
    page,
  }) => {
    await page.locator("#login-email").fill("test@example.com");
    await page.locator("#login-password").fill("123");
    await page.locator("#login-submit").click();

    await expect(page.locator("#login-password-error")).toHaveText(
      "Password must be at least 6 characters",
    );
  });

  test("password toggle shows and hides password", async ({ page }) => {
    const passwordInput = page.locator("#login-password");

    // Initially type is password
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Click toggle
    await page.locator("#login-toggle-password").click();

    // Now type is text
    await expect(passwordInput).toHaveAttribute("type", "text");

    // Click toggle again
    await page.locator("#login-toggle-password").click();

    // Back to password
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("forgot password and sign up links are present", async ({ page }) => {
    await expect(page.locator("#login-forgot-password")).toBeVisible();
    await expect(page.locator("#login-sign-up")).toBeVisible();
  });

  test("clears errors when user starts typing", async ({ page }) => {
    // Trigger errors
    await page.locator("#login-submit").click();
    await expect(page.locator("#login-email-error")).toBeVisible();

    // Start typing in email
    await page.locator("#login-email").fill("t");

    // Error should be cleared
    await expect(page.locator("#login-email-error")).not.toBeVisible();
  });
});
