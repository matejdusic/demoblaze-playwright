import { test, expect } from "../fixtures/pageFixtures";
import { addProductToCart } from "../utils/cartHelpers";

test.describe("Integration Tests", () => {
  test("products API returns data", async ({ homePage }) => {
    const responsePromise = homePage.page.waitForResponse(
      (res) => res.url().includes("/entries") && res.status() === 200,
    );

    await homePage.goto();

    const response = await responsePromise;
    const data = await response.json();

    expect(data.Items.length).toBeGreaterThan(0);
  });

  test("product details API returns correct data", async ({ homePage }) => {
    await homePage.goto();

    const responsePromise = homePage.page.waitForResponse((res) =>
      res.url().includes("/view"),
    );

    await homePage.page
      .getByRole("link", { name: "Samsung galaxy s6" })
      .click();

    const response = await responsePromise;
    const data = await response.json();

    expect(data.title).toContain("Samsung");
  });

  test("add to cart request", async ({ homePage }) => {
    await homePage.goto();

    await homePage.page
      .getByRole("link", { name: "Samsung galaxy s6" })
      .click();

    const requestPromise = homePage.page.waitForRequest((req) =>
      req.url().includes("/addtocart"),
    );

    homePage.page.on("dialog", (dialog) => dialog.accept());
    await homePage.page.getByRole("link", { name: "Add to cart" }).click();

    const request = await requestPromise;

    expect(request.method()).toBe("POST");
  });

  test("delete from cart request", async ({ homePage, cartPage }) => {
    await homePage.goto();
    await addProductToCart(homePage, "Samsung galaxy s6");
    await cartPage.open();
    const deleteRequestPromise = homePage.page.waitForRequest((req) =>
      req.url().includes("/deleteitem"),
    );

    await homePage.page.getByRole("link", { name: "Delete" }).click();

    const deleteRequest = await deleteRequestPromise;

    expect(deleteRequest.method()).toBe("POST");
  });
});
