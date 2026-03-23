import { Locator, type Page } from "@playwright/test";

export class CartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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
    await this.page.getByRole("link", { name: "Cart", exact: true }).click();
    await cartLoaded;
  }
}
