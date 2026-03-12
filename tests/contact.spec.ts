import { test, expect } from "../fixtures/pageFixtures";

test.describe("Contact Modal", () => {
  //contact form visibility
  test("contact form is visible", async ({ homePage, contactPage, page }) => {
    await homePage.goto();
    await contactPage.open();
    await expect
      .soft(page.getByRole("heading", { name: "New message" }))
      .toBeVisible();
    await expect.soft(page.locator("#recipient-email")).toBeVisible();
    await expect
      .soft(
        page.getByRole("textbox", {
          name: "Contact Email: Contact Name:",
        }),
      )
      .toBeVisible();
    await expect
      .soft(page.getByRole("textbox", { name: "Message:" }))
      .toBeVisible();
    await expect
      .soft(page.getByLabel("New message").getByText("Close"))
      .toBeVisible();
    await expect
      .soft(page.getByRole("button", { name: "Send message" }))
      .toBeVisible();
    await expect(
      page.getByRole("dialog", { name: "New message" }).getByLabel("Close"),
    ).toBeVisible();
  });

  test("contact form validation", async ({ homePage, contactPage, page }) => {
    await homePage.goto();
    await contactPage.open();
    await page.locator("#recipient-email").fill("test@testimus.com");
    await page
      .getByRole("textbox", { name: "Contact Email: Contact Name:" })
      .fill("Test User");
    await page
      .getByRole("textbox", { name: "Message:" })
      .fill("This is a test message.");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(homePage.page).toHaveURL(/demoblaze/);
  });

  test("close button functionality", async ({
    homePage,
    contactPage,
    page,
  }) => {
    await homePage.goto();
    await contactPage.open();
    await page.getByLabel("New message").getByText("Close").click();
    await expect(
      page.getByRole("heading", { name: "New message" }),
    ).not.toBeVisible();
  });

  test("close button functionality with X", async ({
    homePage,
    contactPage,
    page,
  }) => {
    await homePage.goto();
    await contactPage.open();
    await page
      .getByRole("dialog", { name: "New message" })
      .getByLabel("Close")
      .click();
    await expect(
      page.getByRole("heading", { name: "New message" }),
    ).not.toBeVisible();
  });
});
