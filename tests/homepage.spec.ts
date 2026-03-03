import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Homepage", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("homepage loads correctly", async ({ page }) => {
    await expect(page).toHaveURL(/demoblaze/);
  });

  //navbar
  test("navbar elements are visible", async ({ page }) => {
    await expect(homePage.navbar()).toBeVisible();
    await expect(homePage.navbarLink("PRODUCT STORE")).toBeVisible();
    await expect(homePage.navbarLink("Home (current)")).toBeVisible();
    await expect(homePage.navbarLink("Contact")).toBeVisible();
    await expect(homePage.navbarLink("About us")).toBeVisible();
    await expect(homePage.navbarLink("Cart")).toBeVisible();
    await expect(homePage.navbarLink("Log in")).toBeVisible();
    await expect(homePage.navbarLink("Sign up")).toBeVisible();
  });

  //footer
  test("footer is visible", async ({ page }) => {
    await expect(homePage.footer()).toBeVisible();
    await expect(homePage.footerHeading("About Us")).toBeVisible();
    await expect(homePage.footerHeading("Get in Touch")).toBeVisible();
    await expect(homePage.footerHeading("PRODUCT STORE")).toBeVisible();
  });

  //categories and products
  test("categories and products section is visible", async ({ page }) => {
    await expect(page.getByRole("link", { name: "CATEGORIES" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Phones" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Laptops" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Monitors" })).toBeVisible();
  });

  //product grid item visibility
  test("product grid items are visible", async ({ page }) => {
    await expect(page.locator("#tbodyid a.hrefch").first()).toBeVisible();
    await expect(page.locator("#prev2")).toBeVisible();
    await expect(page.locator("#next2")).toBeVisible();
    await page.locator("#next2").click();
    //next page product visibility
    await expect(page.locator("#tbodyid a.hrefch").first()).toBeVisible();
    await expect(page.locator("#prev2")).toBeVisible();
  });

  //phones category products visibility
  test("phones category products are visible", async ({ page }) => {
    await page.getByRole("link", { name: "Phones" }).click();
    await expect(
      page.getByRole("link", { name: "Samsung galaxy s6" }),
    ).toBeVisible();
  });

  //laptops category products visibility
  test("laptops category products are visible", async ({ page }) => {
    await page.getByRole("link", { name: "Laptops" }).click();
    await expect(page.getByRole("link", { name: "MacBook air" })).toBeVisible();
  });

  //monitors category products visibility
  test("monitors category products are visible", async ({ page }) => {
    await page.getByRole("link", { name: "Monitors" }).click();
    await expect(
      page.getByRole("link", { name: "Apple monitor 24" }),
    ).toBeVisible();
  });

  //product details
  test("product details are visible", async ({ page }) => {
    await page.getByRole("link", { name: "CATEGORIES" }).click();
    await page.getByRole("link", { name: "Samsung galaxy s6" }).click();
    await expect(page).toHaveURL("https://www.demoblaze.com/prod.html?idp_=1");
    await expect(
      page.getByRole("heading", { name: "Samsung galaxy s6" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "$360 *includes tax" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add to cart" })).toBeVisible();
  });

  //carousel
  test("carousel is visible", async ({ page }) => {
    await expect(page.getByRole("img", { name: "First slide" })).toBeVisible();
    await expect(
      page
        .locator("#carouselExampleIndicators")
        .getByRole("button", { name: "Next" }),
    ).toBeVisible();
    await expect(
      page
        .locator("#carouselExampleIndicators")
        .getByRole("button", { name: "Previous" }),
    ).toBeVisible();
  });

  //contact form
  test("contact form is visible", async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page.getByRole('heading', { name: 'New message' })).toBeVisible();
    await expect(page.locator('#recipient-email')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Contact Email: Contact Name:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message:' })).toBeVisible();
    await expect(page.getByLabel('New message').getByText('Close')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible();
    await expect(page.getByRole('dialog', { name: 'New message' }).getByLabel('Close')).toBeVisible();
  });

  //about us
  test("about us modal is visible", async ({ page }) => {
    await page.getByRole('link', { name: 'About us' }).click();
    await expect(page.getByRole('heading', { name: 'About us', exact: true })).toBeVisible();
    await expect(page.locator('.vjs-poster')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play Video' })).toBeVisible();
    await expect(page.locator('#videoModal').getByText('Close', { exact: true }).first()).toBeVisible();
    await expect(page.locator('#videoModal').getByLabel('Close').first()).toBeVisible();
  });

  //cart
  test("cart is visible", async ({ page }) => {
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page).toHaveURL('https://www.demoblaze.com/cart.html');
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Pic' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Price' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'x' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Total' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Place Order' })).toBeVisible();
  });

  //login
  test("login modal is visible", async ({ page }) => {
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();
    await expect(page.locator('#loginusername')).toBeVisible();
    await expect(page.locator('#loginpassword')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await expect(page.getByLabel('Log in').getByText('Close')).toBeVisible();
    await expect(page.getByRole('dialog', { name: 'Log in' }).getByLabel('Close')).toBeVisible();
  });

  //signup
  test("signup modal is visible", async ({ page }) => {
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password:' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
    await expect(page.getByLabel('Sign up').getByText('Close')).toBeVisible();
    await expect(page.getByRole('dialog', { name: 'Sign up' }).getByLabel('Close')).toBeVisible();
  });
});
