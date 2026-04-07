import { Locator, type Page } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = this.page.getByRole("link", { name: "Log in" });
  }

  async open() {
    await this.loginLink.click();
  }
}
