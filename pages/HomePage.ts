import { type Locator, type Page } from "@playwright/test";

export class HomePage {
  private readonly page: Page;
  readonly navbar: Locator;
  readonly footer: Locator;
  readonly productGrid: Locator;
  readonly addToCartLink: Locator;
  readonly carousel: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;
  readonly productCards: Locator;
  readonly firstProductCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = this.page.locator("#navbarExample");
    this.footer = this.page.locator("#footc");
    this.productGrid = this.page.locator("#tbodyid");
    this.addToCartLink = this.page.getByRole("link", { name: "Add to cart" });
    this.carousel = this.page.locator("#carouselExampleIndicators");
    this.nextButton = this.page.locator("#next2");
    this.prevButton = this.page.locator("#prev2");
    this.productCards = this.page.locator("#tbodyid a.hrefch");
    this.firstProductCard = this.productCards.first();
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
  productCardByName(name: string): Locator {
    return this.productGrid.getByRole("link", { name });
  }

  // Open product details method
  async openProductDetails(name: string) {
    await this.productCardByName(name).click();
  }

  // Add current product to cart
  async addToCart() {
    const dialogPromise = this.page.waitForEvent("dialog");
    await this.addToCartLink.click();
    const dialog = await dialogPromise;
    await dialog.accept();
  }

  // heading locator
  heading(name: string): Locator {
    return this.page.getByRole("heading", { name });
  }

  // Carousel locators

  carouselImage(name: string): Locator {
    return this.page.getByRole("img", { name });
  }

  carouselButton(name: "Next" | "Previous"): Locator {
    return this.carousel.getByRole("button", { name });
  }

  // Pagination actions
  async goToNextPage() {
    await this.nextButton.click();
  }
  async goToPreviousPage() {
    await this.prevButton.click();
  }
}
