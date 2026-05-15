import { test, expect } from "../fixtures/pageFixtures";

test.describe("About Us Modal", () => {
  test("about us modal is visible", async ({ homePage, aboutPage }) => {
    await homePage.goto();
    await aboutPage.open();
    await expect(aboutPage.heading).toBeVisible();
  });

  test("Video player is visible", async ({ homePage, aboutPage }) => {
    await homePage.goto();
    await aboutPage.open();
    await expect(aboutPage.videoPlayer).toBeVisible();
  });

  test("Play button is visible", async ({ homePage, aboutPage }) => {
    await homePage.goto();
    await aboutPage.open();
    await expect(aboutPage.playButton).toBeVisible();
  });

  test("close button functionality", async ({ homePage, aboutPage }) => {
    await homePage.goto();
    await aboutPage.open();
    await aboutPage.closeButton.click();
    await expect(aboutPage.heading).not.toBeVisible();
  });

  test("close button functionality with X", async ({ homePage, aboutPage }) => {
    await homePage.goto();
    await aboutPage.open();
    await aboutPage.closeX.click();
    await expect(aboutPage.heading).not.toBeVisible();
  });

  test("video player functionality", async ({ homePage, aboutPage }) => {
    await homePage.goto();
    await aboutPage.open();
    await aboutPage.playButton.click();
    await expect(aboutPage.playButton).toBeHidden();
    await expect(aboutPage.videoElement).toBeVisible();
  });
});
