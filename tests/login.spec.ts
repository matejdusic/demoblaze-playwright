import { test, expect } from "../fixtures/pageFixtures";

// Login tests open the modal via the "Log in" nav link, which only exists
// when logged out. Must run without the stored auth session.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login Modal", () => {
  test("login modal is visible", async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.open();
    await expect(loginPage.heading).toBeVisible();
  });

  test("Username and password fields are visible", async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.open();
    await expect.soft(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test("Log in button is visible", async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.open();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("close button functionality", async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.open();
    await loginPage.closeButton.click();
    await expect(loginPage.heading).not.toBeVisible();
  });

  test("close button functionality with X", async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.open();
    await loginPage.closeX.click();
    await expect(loginPage.heading).not.toBeVisible();
  });

  test("empty login form validation", async ({ page, homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.open();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Please fill out Username and Password.");
      await dialog.accept();
    });
    await loginPage.loginButton.click();
  });

  test("invalid login form validation", async ({ page, homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.open();
    await loginPage.usernameInput.fill("invalidUser");
    await loginPage.passwordInput.fill("nemasansedajenekoovostaviozapassword12345");
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("User does not exist.");
      await dialog.accept();
    });
    await loginPage.loginButton.click();
  });

  test("valid login form validation", async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.open();
    await loginPage.login("mdusic", "Test111?");
    await expect.soft(loginPage.loginButton).not.toBeVisible();
    await expect.soft(loginPage.logoutLink).toBeVisible();
    await expect(loginPage.loggedInUser).toBeVisible();
  });
});
