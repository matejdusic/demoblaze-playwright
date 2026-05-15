import { test, expect } from "../fixtures/pageFixtures";

test.describe("Mock Data", () => {
  // Demonstrates page.route() — intercepting a real network request and replacing
  // the response with local fixture data so the UI renders our fake product instead
  // of whatever the live API returns.
  test("mocked monitors category shows mock product", async ({
    page,
    homePage,
  }) => {
    // Intercept the /bycat POST request and fulfill it with our local JSON fixture.
    // The browser never reaches the real API — it receives our fake response instead.
    await page.route("https://api.demoblaze.com/bycat", (route) =>
      route.fulfill({ path: "data/monitors.json" }),
    );

    await homePage.goto();
    await homePage.categoryLink("Monitors").click();

    // If the intercept worked, the UI will render the title from our JSON fixture.
    await expect(page.getByText("Mock Monitor Pro")).toBeVisible();
  });

  // Demonstrates that the route intercept truly replaced the real API data —
  // no real product names should appear when the mock is active.
  test("mocked monitors category does not show real products", async ({
    page,
    homePage,
  }) => {
    // Same intercept as above — all /bycat responses are replaced with our fixture.
    await page.route("https://api.demoblaze.com/bycat", (route) =>
      route.fulfill({ path: "data/monitors.json" }),
    );

    await homePage.goto();
    await homePage.categoryLink("Monitors").click();

    // "Apple monitor 24" is a real product name. If it appears, the mock failed
    // and the live API data leaked through.
    await expect(page.getByText("Apple monitor 24")).not.toBeVisible();
  });
});
