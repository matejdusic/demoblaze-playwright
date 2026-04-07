import { Locator, type Page } from "@playwright/test";

export class AboutPage {
  private readonly page: Page;
  readonly playButton: Locator;
  readonly aboutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.playButton = this.page.getByRole("button", { name: "Play Video" });
    this.aboutLink = this.page.getByRole("link", { name: "About us" });
  }

  async open() {
    await this.aboutLink.click();
  }
}
