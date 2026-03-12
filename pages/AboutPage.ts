import { Locator, type Page } from "@playwright/test";

export class AboutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //playButton locator
  playButton(): Locator {
    return this.page.getByRole('button', { name: 'Play Video' });
  }

  async open() {
    await this.page.getByRole("link", { name: "About us" }).click();
  }
}
