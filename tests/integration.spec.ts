import { test, expect } from "../fixtures/pageFixtures";
import { addProductToCart } from "../utils/cartHelpers";

test.describe("Integration Tests", () => {
  test("products API returns data", async ({ page, homePage }) => {
    const responsePromise = page.waitForResponse(
      (res) => res.url().includes("/entries") && res.status() === 200,
    );

    await homePage.goto();

    const response = await responsePromise;
    const data = await response.json();

    expect(data.Items.length).toBeGreaterThan(0);
  });

  test("product details API returns correct data", async ({
    page,
    homePage,
  }) => {
    await homePage.goto();

    const responsePromise = page.waitForResponse(
      (res) => res.url().includes("/view") && res.status() === 200,
    );

    await homePage.openProductDetails("Samsung galaxy s6");

    const response = await responsePromise;
    const data = await response.json();

    expect(data.title).toContain("Samsung");
  });

  test("add to cart request", async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.openProductDetails("Samsung galaxy s6");

    const requestPromise = page.waitForRequest((req) =>
      req.url().includes("/addtocart"),
    );

    await homePage.addToCart();

    const request = await requestPromise;
    expect(request.method()).toBe("POST");
  });

  test("delete from cart request", async ({ page, homePage, cartPage }) => {
    const productName = "Samsung galaxy s6";

    await homePage.goto();
    await addProductToCart(homePage, productName);
    await cartPage.open();
    const deleteRequestPromise = page.waitForRequest((req) =>
      req.url().includes("/deleteitem"),
    );

    await cartPage.deleteProduct(productName);

    const deleteRequest = await deleteRequestPromise;
    expect(deleteRequest.method()).toBe("POST");
  });
});
