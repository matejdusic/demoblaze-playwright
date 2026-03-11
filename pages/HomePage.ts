import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly navbar: Locator;
  readonly footer: Locator;
  readonly productGrid: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = this.page.locator("#navbarExample");
    this.footer = this.page.locator("#footc");
    this.productGrid = this.page.locator("#tbodyid");
  }

  async goto() {
    await this.page.goto("/");
  }

  // Navbar locators
  navbarLink(name: string): Locator {
    return this.page.getByRole("link", { name });
  }

  // Footer locators
  footerHeading(name: string): Locator {
    return this.page.getByRole("heading", { name });
  }

  // Category locators
  categoryLink(name: string): Locator {
    return this.page.getByRole("link", { name });
  }
  // Click category method
  async clickCategory(name: string) {
    await this.categoryLink(name).click();
  }

  // Product grid locators
  productCards(): Locator {
    return this.page.locator("#tbodyid a.hrefch");
  }
  firstProductCard(): Locator {
    return this.productCards().first();
  }
  productCardByName(name: string): Locator {
    return this.productGrid.getByRole("link", { name });
  }

  // Open product details method
  async openProductDetails(name: string) {
    await this.productCardByName(name).click();
  }

  // Pagination locators
  nextButton(): Locator {
    return this.page.locator("#next2");
  }
  prevButton(): Locator {
    return this.page.locator("#prev2");
  }

  // Pagination actions
  async goToNextPage() {
    await this.nextButton().click();
  }
  async goToPreviousPage() {
    await this.prevButton().click();
  }
}
