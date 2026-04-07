import { Locator, type Page } from "@playwright/test";

export class CartPage {
  private readonly page: Page;
  readonly cartLink: Locator;
  readonly cartTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = this.page.getByRole("link", { name: "Cart", exact: true });
    this.cartTable = this.page.locator("#cartTable");
  }

  productInCart(name: string): Locator {
    return this.page.getByRole("cell", { name });
  }

  cartRowByProductName(name: string): Locator {
    return this.page.locator("tr", {
      has: this.page.getByRole("cell", { name }),
    });
  }

  async deleteProduct(name: string) {
    await this.cartRowByProductName(name)
      .getByRole("link", { name: "Delete" })
      .click();
  }

  async open() {
    const cartLoaded = this.page.waitForResponse(
      (response) =>
        response.url() === "https://api.demoblaze.com/viewcart" &&
        response.status() === 200,
    );
    await this.cartLink.click();
    await cartLoaded;
  }
}
