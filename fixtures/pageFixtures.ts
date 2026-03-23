import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ContactPage } from "../pages/ContactPage";
import { AboutPage } from "../pages/AboutPage";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";

type PageFixtures = {
  homePage: HomePage;
  contactPage: ContactPage;
  aboutPage: AboutPage;
  cartPage: CartPage;
  loginPage: LoginPage;
  signupPage: SignupPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
});

export { expect } from "@playwright/test";
