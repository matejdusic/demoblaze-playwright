import { test, expect } from "../fixtures/pageFixtures";
import { addProductToCart } from "../utils/cartHelpers";

test.describe("Cart Page", () => {
  //cart
  test("cart URL verification", async ({ homePage, cartPage, page }) => {
    await homePage.goto();
    await cartPage.open();
    await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
  });

  test("Cart page elements visibility", async ({
    homePage,
    cartPage,
    page,
  }) => {
    await homePage.goto();
    await cartPage.open();
    await expect
      .soft(page.getByRole("heading", { name: "Products" }))
      .toBeVisible();
    await expect
      .soft(page.getByRole("columnheader", { name: "Pic" }))
      .toBeVisible();
    await expect
      .soft(page.getByRole("columnheader", { name: "Title" }))
      .toBeVisible();
    await expect
      .soft(page.getByRole("columnheader", { name: "Price" }))
      .toBeVisible();
    await expect
      .soft(page.getByRole("columnheader", { name: "x" }))
      .toBeVisible();
    await expect
      .soft(page.getByRole("heading", { name: "Total" }))
      .toBeVisible();
    await expect(
      page.getByRole("button", { name: "Place Order" }),
    ).toBeVisible();
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
    await homePage.page.getByRole("link", { name: "Delete" }).click();
    await expect(cartPage.productInCart("Samsung galaxy s6")).not.toBeVisible();
  });
});
