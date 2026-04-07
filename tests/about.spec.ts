import { test, expect } from "../fixtures/pageFixtures";

test.describe("About Us Modal", () => {
  //about us
  test("about us modal is visible", async ({ homePage, aboutPage, page }) => {
    await homePage.goto();
    await aboutPage.open();
    await expect(page.getByText("About us × Video Player is")).toBeVisible();
    // await expect
    //   .soft(page.getByRole("heading", { name: "About us", exact: true }))
    //   .toBeVisible();
    // await expect.soft(page.locator(".vjs-poster")).toBeVisible();
    // await expect
    //   .soft(page.getByRole("button", { name: "Play Video" }))
    //   .toBeVisible();
    // await expect
    //   .soft(
    //     page.locator("#videoModal").getByText("Close", { exact: true }).first(),
    //   )
    //   .toBeVisible();
    // await expect(
    //   page.locator("#videoModal").getByLabel("Close").first(),
    // ).toBeVisible();
  });

  test("Video player is visible", async ({ homePage, aboutPage, page }) => {
    await homePage.goto();
    await aboutPage.open();
    await expect(page.locator(".vjs-poster")).toBeVisible();
  });

  test("Play button is visible", async ({ homePage, aboutPage, page }) => {
    await homePage.goto();
    await aboutPage.open();
    await expect(aboutPage.playButton).toBeVisible();
  });

  test("close button functionality", async ({ homePage, aboutPage, page }) => {
    await homePage.goto();
    await aboutPage.open();
    await page
      .locator("#videoModal")
      .getByText("Close", { exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "About us", exact: true }),
    ).not.toBeVisible();
  });

  test("close button functionality with X", async ({
    homePage,
    aboutPage,
    page,
  }) => {
    await homePage.goto();
    await aboutPage.open();
    await page.locator("#videoModal").getByLabel("Close").click();
    await expect(
      page.getByRole("heading", { name: "About us", exact: true }),
    ).not.toBeVisible();
  });

  test("video player functionality", async ({ homePage, aboutPage, page }) => {
    await homePage.goto();
    await aboutPage.open();
    await aboutPage.playButton.click();
    // Wait for the video to start playing by checking if the play button is hidden
    await expect(aboutPage.playButton).toBeHidden();
    await expect(page.locator("#example-video_html5_api")).toBeVisible();
  });
});
