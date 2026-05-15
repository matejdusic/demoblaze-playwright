import { type Locator, type Page } from "@playwright/test";

export class CartPage {
  private readonly page: Page;
  readonly cartLink: Locator;
  readonly cartTable: Locator;
  readonly productsHeading: Locator;
  readonly picColumn: Locator;
  readonly titleColumn: Locator;
  readonly priceColumn: Locator;
  readonly deleteColumn: Locator;
  readonly totalHeading: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink        = this.page.getByRole("link", { name: "Cart", exact: true });
    this.cartTable       = this.page.locator("#cartTable");
    this.productsHeading = this.page.getByRole("heading", { name: "Products" });
    this.picColumn       = this.page.getByRole("columnheader", { name: "Pic" });
    this.titleColumn     = this.page.getByRole("columnheader", { name: "Title" });
    this.priceColumn     = this.page.getByRole("columnheader", { name: "Price" });
    this.deleteColumn    = this.page.getByRole("columnheader", { name: "x" });
    this.totalHeading    = this.page.getByRole("heading", { name: "Total" });
    this.placeOrderButton = this.page.getByRole("button", { name: "Place Order" });
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
