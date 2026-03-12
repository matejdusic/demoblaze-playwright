import { test, expect } from "../fixtures/pageFixtures";

test.describe("Login Modal", () => {
  //login
  test("login modal is visible", async ({ homePage, loginPage, page }) => {
    await homePage.goto();
    await loginPage.open();
    await expect(page.getByText("Log in × Username: Password:")).toBeVisible();
  });

  test("Username and password fields are visible", async ({
    homePage,
    loginPage,
    page,
  }) => {
    await homePage.goto();
    await loginPage.open();
    await expect.soft(page.locator("#loginusername")).toBeVisible();
    await expect(page.locator("#loginpassword")).toBeVisible();
  });

  test("Log in button is visible", async ({ homePage, loginPage, page }) => {
    await homePage.goto();
    await loginPage.open();
    await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
  });

  test("close button functionality", async ({ homePage, loginPage, page }) => {
    await homePage.goto();
    await loginPage.open();
    await page.getByLabel("Log in").getByText("Close").click();
    await expect(
      page.getByRole("heading", { name: "Log in" }),
    ).not.toBeVisible();
  });

  test("close button functionality with X", async ({
    homePage,
    loginPage,
    page,
  }) => {
    await homePage.goto();
    await loginPage.open();
    await page
      .getByRole("dialog", { name: "Log in" })
      .getByLabel("Close")
      .click();
    await expect(
      page.getByRole("heading", { name: "Log in" }),
    ).not.toBeVisible();
  });

  test("empty login form validation", async ({ homePage, loginPage, page }) => {
    await homePage.goto();
    await loginPage.open();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "Please fill out Username and Password.",
      );
      await dialog.accept();
    });
    await page.getByRole("button", { name: "Log in" }).click();
  });

  test("invalid login form validation", async ({
    homePage,
    loginPage,
    page,
  }) => {
    await homePage.goto();
    await loginPage.open();
    await page.locator("#loginusername").fill("invalidUser");
    await page
      .locator("#loginpassword")
      .fill("nemasansedajenekoovostaviozapassword12345");
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("User does not exist.");
      await dialog.accept();
    });
    await page.getByRole("button", { name: "Log in" }).click();
  });

  test("valid login form validation", async ({
    homePage,
    loginPage,
    page,
  }) => {
    await homePage.goto();
    await loginPage.open();
    await page.locator("#loginusername").fill("mdusic");
    await page.locator("#loginpassword").fill("Test111?");
    await page.getByRole("button", { name: "Log in" }).click();
    await expect
      .soft(page.getByRole("button", { name: "Log in" }))
      .not.toBeVisible();
    await expect
      .soft(page.getByRole("link", { name: "Log out" }))
      .toBeVisible();
    await expect(
      page.getByRole("link", { name: "Welcome mdusic" }),
    ).toBeVisible();
  });
});
