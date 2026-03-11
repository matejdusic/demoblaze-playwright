import { test, expect } from "../fixtures/pageFixtures";

test.describe("Homepage", () => {
  test("homepage loads correctly", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.page).toHaveURL(/demoblaze/);
  });

  //navbar
  test("navbar elements are visible", async ({ homePage }) => {
    await homePage.goto();
    await expect.soft(homePage.navbar).toBeVisible();
    await expect.soft(homePage.navbarLink("PRODUCT STORE")).toBeVisible();
    await expect.soft(homePage.navbarLink("Home (current)")).toBeVisible();
    await expect.soft(homePage.navbarLink("Contact")).toBeVisible();
    await expect.soft(homePage.navbarLink("About us")).toBeVisible();
    await expect.soft(homePage.navbarLink("Cart")).toBeVisible();
    await expect.soft(homePage.navbarLink("Log in")).toBeVisible();
    await expect(homePage.navbarLink("Sign up")).toBeVisible();
  });

  //footer
  test("footer is visible", async ({ homePage }) => {
    await homePage.goto();
    await expect.soft(homePage.footer).toBeVisible();
    await expect.soft(homePage.footerHeading("About Us")).toBeVisible();
    await expect.soft(homePage.footerHeading("Get in Touch")).toBeVisible();
    await expect(homePage.footerHeading("PRODUCT STORE")).toBeVisible();
  });

  //categories and products
  test("categories and products section is visible", async ({ homePage }) => {
    await homePage.goto();
    await expect.soft(homePage.categoryLink("Phones")).toBeVisible();
    await expect.soft(homePage.categoryLink("Laptops")).toBeVisible();
    await expect(homePage.categoryLink("Monitors")).toBeVisible();
  });

  //product grid item visibility
  test("product grid items are visible", async ({ homePage }) => {
    await homePage.goto();
    await expect.soft(homePage.firstProductCard()).toBeVisible();
    await expect.soft(homePage.prevButton()).toBeVisible();
    await expect.soft(homePage.nextButton()).toBeVisible();
    await homePage.goToNextPage();
    //next page product visibility
    await expect.soft(homePage.firstProductCard()).toBeVisible();
    await expect(homePage.prevButton()).toBeVisible();
  });

  //phones category products visibility
  test("phones category products are visible", async ({ homePage }) => {
    await homePage.goto();
    await homePage.clickCategory("Phones");
    await homePage.openProductDetails("Samsung galaxy s6");
    await expect(
      homePage.page.getByRole("heading", { name: "Samsung galaxy s6" }),
    ).toBeVisible();
  });

  //laptops category products visibility
  test("laptops category products are visible", async ({ homePage }) => {
    await homePage.goto();
    await homePage.clickCategory("Laptops");
    await homePage.openProductDetails("MacBook air");
    await expect(
      homePage.page.getByRole("heading", { name: "MacBook air" }),
    ).toBeVisible();
  });

  //monitors category products visibility
  test("monitors category products are visible", async ({ homePage }) => {
    await homePage.goto();
    await homePage.clickCategory("Monitors");
    await homePage.openProductDetails("Apple monitor 24");
    await expect(
      homePage.page.getByRole("heading", { name: "Apple monitor 24" }),
    ).toBeVisible();
  });

  //product details
  test("product details are visible", async ({ homePage }) => {
    await homePage.goto();
    await homePage.clickCategory("Phones");
    await homePage.openProductDetails("Samsung galaxy s6");
    await expect
      .soft(homePage.page.getByRole("heading", { name: "Samsung galaxy s6" }))
      .toBeVisible();
    await expect
      .soft(homePage.page.getByRole("heading", { name: "$360 *includes tax" }))
      .toBeVisible();
    await expect(
      homePage.page.getByRole("link", { name: "Add to cart" }),
    ).toBeVisible();
  });

  //carousel
  test("carousel is visible", async ({ homePage }) => {
    await homePage.goto();
    await expect
      .soft(homePage.page.getByRole("img", { name: "First slide" }))
      .toBeVisible();
    await expect
      .soft(
        homePage.page
          .locator("#carouselExampleIndicators")
          .getByRole("button", { name: "Next" }),
      )
      .toBeVisible();
    await expect(
      homePage.page
        .locator("#carouselExampleIndicators")
        .getByRole("button", { name: "Previous" }),
    ).toBeVisible();
  });
});
