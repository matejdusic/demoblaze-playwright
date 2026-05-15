import { Locator, type Page } from "@playwright/test";

export class ContactPage {
  private readonly page: Page;
  readonly contactLink: Locator;
  readonly emailInput: Locator;
  readonly nameInput: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly closeButton: Locator;
  readonly closeX: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactLink  = this.page.getByRole("link", { name: "Contact" });
    this.emailInput   = this.page.locator("#recipient-email");
    this.nameInput    = this.page.getByRole("textbox", { name: "Contact Email: Contact Name:" });
    this.messageInput = this.page.getByRole("textbox", { name: "Message:" });
    this.sendButton   = this.page.getByRole("button", { name: "Send message" });
    this.closeButton  = this.page.getByLabel("New message").getByText("Close");
    this.closeX       = this.page.getByRole("dialog", { name: "New message" }).getByLabel("Close");
    this.heading      = this.page.getByRole("heading", { name: "New message" });
  }

  async open() {
    await this.contactLink.click();
  }

  async fillAndSend(email: string, name: string, message: string) {
    await this.emailInput.fill(email);
    await this.nameInput.fill(name);
    await this.messageInput.fill(message);
    await this.sendButton.click();
  }
}
