import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/");
  }

  // Navbar locators
  navbar() {
    return this.page.locator("#navbarExample");
  }
  navbarLink(name: string) {
    return this.page.getByRole("link", { name });
  }

  // Footer locators
  footer() {
    return this.page.locator("#footc");
  }
  footerHeading(name: string) {
    return this.page.getByRole("heading", { name });
  }

  // Category locators
  categoryLink(name: string) {
    return this.page.getByRole("link", { name });
  }
  // Click category method
  async clickCategory(name: string) {
    await this.categoryLink(name).click();
  }
}
