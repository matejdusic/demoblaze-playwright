import { test, expect } from "../fixtures/pageFixtures";

// Signup tests open the modal via the "Sign up" nav link, which only exists
// when logged out. Must run without the stored auth session.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Signup Modal", () => {
  test("signup modal is visible", async ({ homePage, signupPage }) => {
    await homePage.goto();
    await signupPage.open();
    await expect(signupPage.heading).toBeVisible();
  });

  test("Username and password fields are visible", async ({ homePage, signupPage }) => {
    await homePage.goto();
    await signupPage.open();
    await expect.soft(signupPage.usernameInput).toBeVisible();
    await expect(signupPage.passwordInput).toBeVisible();
  });

  test("Sign up button is visible", async ({ homePage, signupPage }) => {
    await homePage.goto();
    await signupPage.open();
    await expect(signupPage.signupButton).toBeVisible();
  });

  test("close button functionality", async ({ homePage, signupPage }) => {
    await homePage.goto();
    await signupPage.open();
    await signupPage.closeButton.click();
    await expect(signupPage.heading).not.toBeVisible();
  });

  test("close button functionality with X", async ({ homePage, signupPage }) => {
    await homePage.goto();
    await signupPage.open();
    await signupPage.closeX.click();
    await expect(signupPage.heading).not.toBeVisible();
  });

  test("empty signup form validation", async ({ page, homePage, signupPage }) => {
    await homePage.goto();
    await signupPage.open();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Please fill out Username and Password.");
      await dialog.accept();
    });
    await signupPage.signupButton.click();
  });

  test("successful signup validation", async ({ page, homePage, signupPage }) => {
    await homePage.goto();
    await signupPage.open();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Sign up successful.");
      await dialog.accept();
    });
    await signupPage.signup("mdusic", "Test111?");
  });
});
