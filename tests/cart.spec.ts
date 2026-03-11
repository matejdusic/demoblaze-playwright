import { test, expect } from "../fixtures/pageFixtures";

test.describe("Cart Page", () => {
  //cart
  test("cart is visible", async ({ homePage, cartPage, page }) => {
    await homePage.goto();
    await cartPage.open();
    await expect.soft(page).toHaveURL("https://www.demoblaze.com/cart.html");
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
});
