import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('https://www.demoblaze.com/');

  //navbar
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await expect(page.locator('#navbarExample')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home (current)' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About us' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();

  //categories and products
  await expect(page.getByRole('link', { name: 'CATEGORIES' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Phones' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Laptops' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Monitors' })).toBeVisible();

  //carousel
  await expect(page.locator('#carouselExampleIndicators')).toBeVisible();
  await expect(page.locator('#prev2')).toBeVisible();
  await expect(page.locator('#next2')).toBeVisible();

  //footer
  await expect(page.locator('#footc')).toBeVisible(); 
  await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'PRODUCT STORE' })).toBeVisible();

  //products
  await page.getByRole('link', { name: 'Phones' }).click();
  await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toBeVisible();
  await page.getByRole('link', { name: 'Laptops' }).click();
  await expect(page.getByRole('link', { name: 'MacBook air' })).toBeVisible();
  await page.getByRole('link', { name: 'Monitors' }).click();
  await expect(page.getByRole('link', { name: 'Apple monitor 24' })).toBeVisible();
  await page.getByRole('link', { name: 'CATEGORIES' }).click();
  await expect(page.getByRole('link', { name: 'Nokia lumia' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sony vaio i5' })).toBeVisible();
  await expect(page.locator('#prev2')).toBeVisible();
  await expect(page.locator('#next2')).toBeVisible();
  await page.locator('#next2').click();
  await expect(page.getByRole('link', { name: 'Dell 15.6 Inch' })).toBeVisible();
  await expect(page.locator('#prev2')).toBeVisible();

  //product details
  await page.getByRole('link', { name: 'CATEGORIES' }).click();
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=1');
  await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '$360 *includes tax' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add to cart' })).toBeVisible();
});
