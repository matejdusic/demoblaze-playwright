import { type Locator, type Page } from "@playwright/test";

export class AboutPage {
  private readonly page: Page;
  readonly aboutLink: Locator;
  readonly playButton: Locator;
  readonly closeButton: Locator;
  readonly closeX: Locator;
  readonly videoPlayer: Locator;
  readonly videoElement: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.aboutLink    = this.page.getByRole("link", { name: "About us" });
    this.playButton   = this.page.getByRole("button", { name: "Play Video" });
    this.closeButton  = this.page.locator("#videoModal").getByText("Close", { exact: true });
    this.closeX       = this.page.locator("#videoModal").getByLabel("Close");
    this.videoPlayer  = this.page.locator(".vjs-poster");
    this.videoElement = this.page.locator("#example-video_html5_api");
    this.heading      = this.page.getByRole("heading", { name: "About us", exact: true });
  }

  async open() {
    await this.aboutLink.click();
  }
}
