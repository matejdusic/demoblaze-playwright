import { Locator, type Page } from "@playwright/test";

export class ContactPage {
  private readonly page: Page;
  readonly contactLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactLink = this.page.getByRole("link", { name: "Contact" });
  }

  async open() {
    await this.contactLink.click();
  }
}
