import { test, expect } from "../fixtures/pageFixtures";

test.describe("Visual Regression", () => {
  test.describe("Homepage", () => {
    test("navbar matches snapshot", async ({ homePage }) => {
      await homePage.goto();
      await homePage.firstProductCard().waitFor();
      await expect(homePage.navbar).toHaveScreenshot("homepage-navbar.png");
    });

    test("footer matches snapshot", async ({ homePage }) => {
      await homePage.goto();
      await homePage.firstProductCard().waitFor();
      await expect(homePage.footer).toHaveScreenshot("homepage-footer.png");
    });

    test("product grid matches snapshot", async ({ homePage }) => {
      await homePage.goto();
      await homePage.firstProductCard().waitFor();
      await expect(homePage.productGrid).toHaveScreenshot(
        "homepage-product-grid.png",
      );
    });

    test("full page matches snapshot", async ({ homePage }) => {
      await homePage.goto();
      await homePage.firstProductCard().waitFor();
      await expect(homePage.page).toHaveScreenshot("homepage-full.png", {
        fullPage: true,
      });
    });
  });

  test.describe("Cart Page", () => {
    test("empty cart matches snapshot", async ({ homePage, cartPage }) => {
      await homePage.goto();
      await cartPage.open();
      await expect(cartPage.page).toHaveScreenshot("cart-empty.png", {
        fullPage: true,
      });
    });
  });
});
