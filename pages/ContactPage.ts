import { type Page } from "@playwright/test";

export class ContactPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.getByRole("link", { name: "Contact" }).click();
  }
}
