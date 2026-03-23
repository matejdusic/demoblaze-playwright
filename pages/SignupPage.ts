import { type Page } from "@playwright/test";

export class SignupPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.getByRole("link", { name: "Sign up" }).click();
  }
}
