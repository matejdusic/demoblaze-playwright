import { test, expect } from "../fixtures/pageFixtures";

test.describe("About Us Modal", () => {
  //about us
  test("about us modal is visible", async ({ homePage, aboutPage, page }) => {
    await homePage.goto();
    await aboutPage.open();
    await expect
      .soft(page.getByRole("heading", { name: "About us", exact: true }))
      .toBeVisible();
    await expect.soft(page.locator(".vjs-poster")).toBeVisible();
    await expect
      .soft(page.getByRole("button", { name: "Play Video" }))
      .toBeVisible();
    await expect
      .soft(
        page.locator("#videoModal").getByText("Close", { exact: true }).first(),
      )
      .toBeVisible();
    await expect(
      page.locator("#videoModal").getByLabel("Close").first(),
    ).toBeVisible();
  });
});
