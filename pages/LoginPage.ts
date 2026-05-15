import { Locator, type Page } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  readonly loginLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loggedInUser: Locator;
  readonly logoutLink: Locator;
  readonly closeButton: Locator;
  readonly closeX: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink     = this.page.getByRole("link", { name: "Log in" });
    this.usernameInput = this.page.locator("#loginusername");
    this.passwordInput = this.page.locator("#loginpassword");
    this.loginButton   = this.page.getByRole("button", { name: "Log in" });
    this.loggedInUser  = this.page.getByRole("link", { name: /Welcome/ });
    this.logoutLink    = this.page.getByRole("link", { name: "Log out" });
    this.closeButton   = this.page.getByLabel("Log in").getByText("Close");
    this.closeX        = this.page.getByRole("dialog", { name: "Log in" }).getByLabel("Close");
    this.heading       = this.page.getByRole("heading", { name: "Log in" });
  }

  async open() {
    await this.loginLink.click();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
