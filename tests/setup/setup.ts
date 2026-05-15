import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { STORAGE_STATE } from '../../playwright.config';

// This is not a regular test — it's a one-time login script that runs before
// the rest of the test suite. It saves the browser's session state (cookies,
// localStorage) to a file so other tests can load it and skip logging in.
setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');
  await loginPage.open();
  await loginPage.login(
    process.env.USERNAME as string,
    process.env.PASSWORD as string,
  );

  // Wait until we are actually logged in before saving state
  await expect(loginPage.loggedInUser).toBeVisible({ timeout: 20000 });

  // Save the browser's session (cookies + localStorage) to a file.
  // The e2e project loads this file before every test.
  await page.context().storageState({ path: STORAGE_STATE });
});
