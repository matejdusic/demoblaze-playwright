import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('https://www.demoblaze.com/');
});

  //navbar
  test('navbar elements are visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
    await expect(page.locator('#navbarExample')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home (current)' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About us' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
  });

  //footer
  test('footer is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#footc')).toBeVisible(); 
    await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'PRODUCT STORE' })).toBeVisible();
  });

  //categories and products
  test('categories and products section is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'CATEGORIES' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Phones' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Laptops' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Monitors' })).toBeVisible();
  });

  //product grid item visibility
  test('product grid items are visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Nokia lumia' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Samsung galaxy s7' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sony vaio i7' })).toBeVisible();
    await expect(page.locator('#prev2')).toBeVisible();
    await expect(page.locator('#next2')).toBeVisible();
    await page.locator('#next2').click();
    await expect(page.getByRole('link', { name: 'Dell 15.6 Inch' })).toBeVisible();
    await expect(page.locator('#prev2')).toBeVisible();
  });

  //phones category products visibility
  test('phones category products are visible', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Phones' }).click();
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toBeVisible();
  });

  //laptops category products visibility
  test('laptops category products are visible', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Laptops' }).click();
    await expect(page.getByRole('link', { name: 'MacBook air' })).toBeVisible();
  });

  //monitors category products visibility
  test('monitors category products are visible', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Monitors' }).click();
    await expect(page.getByRole('link', { name: 'Apple monitor 24' })).toBeVisible();
  });

  //product details
  test('product details are visible', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'CATEGORIES' }).click();
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=1');
    await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '$360 *includes tax' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add to cart' })).toBeVisible();
  });

  //carousel
  test('carousel is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('img', { name: 'First slide' })).toBeVisible();
    await expect(page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Next' })).toBeVisible();
    await expect (page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Previous' })).toBeVisible();
  });
});
