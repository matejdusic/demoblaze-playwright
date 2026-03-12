import { test, expect } from "../fixtures/pageFixtures";

test.describe("Signup Modal", () => {
  //signup
  test("signup modal is visible", async ({ homePage, signupPage, page }) => {
    await homePage.goto();
    await signupPage.open();
    await expect(page.getByText("Sign up × Username: Password")).toBeVisible();
  });

  test("Username and password fields are visible", async ({
    homePage,
    signupPage,
    page,
  }) => {
    await homePage.goto();
    await signupPage.open();
    await expect
      .soft(page.getByRole("textbox", { name: "Username:" }))
      .toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Password:" }),
    ).toBeVisible();
  });

  test("Sign up button is visible", async ({ homePage, signupPage, page }) => {
    await homePage.goto();
    await signupPage.open();
    await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
  });

  test("close button functionality", async ({ homePage, signupPage, page }) => {
    await homePage.goto();
    await signupPage.open();
    await page.getByLabel("Sign up").getByText("Close").click();
    await expect(
      page.getByRole("heading", { name: "Sign up" }),
    ).not.toBeVisible();
  });

  test("close button functionality with X", async ({
    homePage,
    signupPage,
    page,
  }) => {
    await homePage.goto();
    await signupPage.open();
    await page
      .getByRole("dialog", { name: "Sign up" })
      .getByLabel("Close")
      .click();
    await expect(
      page.getByRole("heading", { name: "Sign up" }),
    ).not.toBeVisible();
  });

  test("empty signup form validation", async ({
    homePage,
    signupPage,
    page,
  }) => {
    await homePage.goto();
    await signupPage.open();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "Please fill out Username and Password.",
      );
      await dialog.accept();
    });
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  test("successful signup validation", async ({
    homePage,
    signupPage,
    page,
  }) => {
    await homePage.goto();
    await signupPage.open();
    await page.getByRole("textbox", { name: "Username:" }).fill("mdusic");
    await page.getByRole("textbox", { name: "Password:" }).fill("Test111?");
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Sign up successful.");
      await dialog.accept();
    });
    await page.getByRole("button", { name: "Sign up" }).click();
  });
});
