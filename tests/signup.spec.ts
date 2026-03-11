import { test, expect } from "../fixtures/pageFixtures";

test.describe("Signup Modal", () => {
  //signup
  test("signup modal is visible", async ({ homePage, signupPage, page }) => {
    await homePage.goto();
    await signupPage.open();
    await expect
      .soft(page.getByRole("heading", { name: "Sign up" }))
      .toBeVisible();
    await expect
      .soft(page.getByRole("textbox", { name: "Username:" }))
      .toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Password:" }),
    ).toBeVisible();
    await expect
      .soft(page.getByRole("button", { name: "Sign up" }))
      .toBeVisible();
    await expect
      .soft(page.getByLabel("Sign up").getByText("Close"))
      .toBeVisible();
    await expect(
      page.getByRole("dialog", { name: "Sign up" }).getByLabel("Close"),
    ).toBeVisible();
  });
});
