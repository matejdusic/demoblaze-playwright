import { test, expect } from "../fixtures/pageFixtures";
import { addProductToCart } from "../utils/cartHelpers";

// Cart tests use an anonymous (logged-out) session so each test gets an
// isolated cart that isn't shared with other tests or persisted server-side.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Cart Page", () => {
  //cart
  test("cart URL verification", async ({ homePage, cartPage, page }) => {
    await homePage.goto();
    await cartPage.open();
    await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
  });

  test("Cart page elements visibility", async ({ homePage, cartPage }) => {
    await homePage.goto();
    await cartPage.open();
    await expect.soft(cartPage.productsHeading).toBeVisible();
    await expect.soft(cartPage.picColumn).toBeVisible();
    await expect.soft(cartPage.titleColumn).toBeVisible();
    await expect.soft(cartPage.priceColumn).toBeVisible();
    await expect.soft(cartPage.deleteColumn).toBeVisible();
    await expect.soft(cartPage.totalHeading).toBeVisible();
    await expect(cartPage.placeOrderButton).toBeVisible();
  });

  test("Adding product to cart and verifying it appears in cart", async ({
    homePage,
    cartPage,
  }) => {
    await homePage.goto();
    await addProductToCart(homePage, "Samsung galaxy s6");
    await cartPage.open();
    await expect(cartPage.productInCart("Samsung galaxy s6")).toBeVisible();
  });

  test("Removing product from cart and verifying it is removed", async ({
    homePage,
    cartPage,
  }) => {
    await homePage.goto();
    await addProductToCart(homePage, "Samsung galaxy s6");
    await cartPage.open();
    await expect(cartPage.productInCart("Samsung galaxy s6")).toBeVisible();
    await cartPage.deleteProduct("Samsung galaxy s6");
    await expect(cartPage.productInCart("Samsung galaxy s6")).not.toBeVisible();
  });
});
