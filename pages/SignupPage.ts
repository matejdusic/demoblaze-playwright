import { type Locator, type Page } from "@playwright/test";

export class SignupPage {
  private readonly page: Page;
  readonly signupLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signupButton: Locator;
  readonly closeButton: Locator;
  readonly closeX: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLink    = this.page.getByRole("link", { name: "Sign up" });
    this.usernameInput = this.page.getByRole("textbox", { name: "Username:" });
    this.passwordInput = this.page.getByRole("textbox", { name: "Password:" });
    this.signupButton  = this.page.getByRole("button", { name: "Sign up" });
    this.closeButton   = this.page.getByLabel("Sign up").getByText("Close");
    this.closeX        = this.page.getByRole("dialog", { name: "Sign up" }).getByLabel("Close");
    this.heading       = this.page.getByRole("heading", { name: "Sign up" });
  }

  async open() {
    await this.signupLink.click();
  }

  async signup(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signupButton.click();
  }
}
