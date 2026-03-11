import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
});

test.describe("Homepage", () => {
  test("homepage loads correctly", async ({ homePage }) => {
    await expect(homePage.page).toHaveURL(/demoblaze/);
  });

  //navbar
  test("navbar elements are visible", async ({ homePage }) => {
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
    await expect.soft(homePage.footer).toBeVisible();
    await expect.soft(homePage.footerHeading("About Us")).toBeVisible();
    await expect.soft(homePage.footerHeading("Get in Touch")).toBeVisible();
    await expect(homePage.footerHeading("PRODUCT STORE")).toBeVisible();
  });

  //categories and products
  test("categories and products section is visible", async ({ homePage }) => {
    await expect.soft(homePage.categoryLink("Phones")).toBeVisible();
    await expect.soft(homePage.categoryLink("Laptops")).toBeVisible();
    await expect(homePage.categoryLink("Monitors")).toBeVisible();
  });

  //product grid item visibility
  test("product grid items are visible", async ({ homePage }) => {
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
    await homePage.clickCategory("Phones");
    await homePage.openProductDetails("Samsung galaxy s6");
  });

  //laptops category products visibility
  test("laptops category products are visible", async ({ homePage }) => {
    await homePage.clickCategory("Laptops");
    await homePage.openProductDetails("MacBook air");
  });

  //monitors category products visibility
  test("monitors category products are visible", async ({ homePage }) => {
    await homePage.clickCategory("Monitors");
    await homePage.openProductDetails("Apple monitor 24");
  });

  //product details
  test("product details are visible", async ({ homePage }) => {
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

  //contact form
  test("contact form is visible", async ({ homePage }) => {
    await homePage.page.getByRole("link", { name: "Contact" }).click();
    await expect
      .soft(homePage.page.getByRole("heading", { name: "New message" }))
      .toBeVisible();
    await expect.soft(homePage.page.locator("#recipient-email")).toBeVisible();
    await expect
      .soft(
        homePage.page.getByRole("textbox", {
          name: "Contact Email: Contact Name:",
        }),
      )
      .toBeVisible();
    await expect
      .soft(homePage.page.getByRole("textbox", { name: "Message:" }))
      .toBeVisible();
    await expect
      .soft(homePage.page.getByLabel("New message").getByText("Close"))
      .toBeVisible();
    await expect
      .soft(homePage.page.getByRole("button", { name: "Send message" }))
      .toBeVisible();
    await expect(
      homePage.page
        .getByRole("dialog", { name: "New message" })
        .getByLabel("Close"),
    ).toBeVisible();
  });

  //about us
  test("about us modal is visible", async ({ homePage }) => {
    await homePage.page.getByRole("link", { name: "About us" }).click();
    await expect
      .soft(
        homePage.page.getByRole("heading", { name: "About us", exact: true }),
      )
      .toBeVisible();
    await expect.soft(homePage.page.locator(".vjs-poster")).toBeVisible();
    await expect
      .soft(homePage.page.getByRole("button", { name: "Play Video" }))
      .toBeVisible();
    await expect
      .soft(
        homePage.page
          .locator("#videoModal")
          .getByText("Close", { exact: true })
          .first(),
      )
      .toBeVisible();
    await expect(
      homePage.page.locator("#videoModal").getByLabel("Close").first(),
    ).toBeVisible();
  });

  //cart
  test("cart is visible", async ({ homePage }) => {
    await homePage.page.getByRole("link", { name: "Cart" }).click();
    await expect
      .soft(homePage.page)
      .toHaveURL("https://www.demoblaze.com/cart.html");
    await expect
      .soft(homePage.page.getByRole("heading", { name: "Products" }))
      .toBeVisible();
    await expect
      .soft(homePage.page.getByRole("columnheader", { name: "Pic" }))
      .toBeVisible();
    await expect
      .soft(homePage.page.getByRole("columnheader", { name: "Title" }))
      .toBeVisible();
    await expect
      .soft(homePage.page.getByRole("columnheader", { name: "Price" }))
      .toBeVisible();
    await expect
      .soft(homePage.page.getByRole("columnheader", { name: "x" }))
      .toBeVisible();
    await expect
      .soft(homePage.page.getByRole("heading", { name: "Total" }))
      .toBeVisible();
    await expect(
      homePage.page.getByRole("button", { name: "Place Order" }),
    ).toBeVisible();
  });

  //login
  test("login modal is visible", async ({ homePage }) => {
    await homePage.page.getByRole("link", { name: "Log in" }).click();
    await expect
      .soft(homePage.page.getByRole("heading", { name: "Log in" }))
      .toBeVisible();
    await expect.soft(homePage.page.locator("#loginusername")).toBeVisible();
    await expect.soft(homePage.page.locator("#loginpassword")).toBeVisible();
    await expect
      .soft(homePage.page.getByRole("button", { name: "Log in" }))
      .toBeVisible();
    await expect
      .soft(homePage.page.getByLabel("Log in").getByText("Close"))
      .toBeVisible();
    await expect(
      homePage.page.getByRole("dialog", { name: "Log in" }).getByLabel("Close"),
    ).toBeVisible();
  });

  //signup
  test("signup modal is visible", async ({ homePage }) => {
    await homePage.page.getByRole("link", { name: "Sign up" }).click();
    await expect
      .soft(homePage.page.getByRole("heading", { name: "Sign up" }))
      .toBeVisible();
    await expect
      .soft(homePage.page.getByRole("textbox", { name: "Username:" }))
      .toBeVisible();
    await expect(
      homePage.page.getByRole("textbox", { name: "Password:" }),
    ).toBeVisible();
    await expect
      .soft(homePage.page.getByRole("button", { name: "Sign up" }))
      .toBeVisible();
    await expect
      .soft(homePage.page.getByLabel("Sign up").getByText("Close"))
      .toBeVisible();
    await expect(
      homePage.page
        .getByRole("dialog", { name: "Sign up" })
        .getByLabel("Close"),
    ).toBeVisible();
  });
});
