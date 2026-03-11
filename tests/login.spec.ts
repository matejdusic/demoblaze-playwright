import { test, expect } from "../fixtures/pageFixtures";

test.describe("Login Modal", () => {
  //login
  test("login modal is visible", async ({ homePage, loginPage, page }) => {
    await homePage.goto();
    await loginPage.open();
    await expect
      .soft(page.getByRole("heading", { name: "Log in" }))
      .toBeVisible();
    await expect.soft(page.locator("#loginusername")).toBeVisible();
    await expect.soft(page.locator("#loginpassword")).toBeVisible();
    await expect
      .soft(page.getByRole("button", { name: "Log in" }))
      .toBeVisible();
    await expect
      .soft(page.getByLabel("Log in").getByText("Close"))
      .toBeVisible();
    await expect(
      page.getByRole("dialog", { name: "Log in" }).getByLabel("Close"),
    ).toBeVisible();
  });
});
