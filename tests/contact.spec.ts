import { test, expect } from "../fixtures/pageFixtures";

test.describe("Contact Modal", () => {
  test("contact form is visible", async ({ homePage, contactPage }) => {
    await homePage.goto();
    await contactPage.open();
    await expect.soft(contactPage.heading).toBeVisible();
    await expect.soft(contactPage.emailInput).toBeVisible();
    await expect.soft(contactPage.nameInput).toBeVisible();
    await expect.soft(contactPage.messageInput).toBeVisible();
    await expect.soft(contactPage.closeButton).toBeVisible();
    await expect.soft(contactPage.sendButton).toBeVisible();
    await expect(contactPage.closeX).toBeVisible();
  });

  test("contact form validation", async ({ page, homePage, contactPage }) => {
    await homePage.goto();
    await contactPage.open();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Thanks for the message!!");
      await dialog.accept();
    });
    await contactPage.fillAndSend("test@testimus.com", "Test User", "This is a test message.");
  });

  test("close button functionality", async ({ homePage, contactPage }) => {
    await homePage.goto();
    await contactPage.open();
    await contactPage.closeButton.click();
    await expect(contactPage.heading).not.toBeVisible();
  });

  test("close button functionality with X", async ({ homePage, contactPage }) => {
    await homePage.goto();
    await contactPage.open();
    await contactPage.closeX.click();
    await expect(contactPage.heading).not.toBeVisible();
  });
});
