import { Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  productInCart(name: string): Locator {
    return this.page.getByRole("cell", { name });
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
