import { test, expect } from "../fixtures/pageFixtures";

test.describe("Contact Modal", () => {
  //contact form
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
});
