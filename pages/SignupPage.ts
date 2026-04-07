import { Locator, type Page } from "@playwright/test";

export class SignupPage {
  private readonly page: Page;
  readonly signupLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLink = this.page.getByRole("link", { name: "Sign up" });
  }

  async open() {
    await this.signupLink.click();
  }
}
