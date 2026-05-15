import { test, expect } from "../fixtures/pageFixtures";

test.describe("API Tests", () => {
  // Testing a GET endpoint directly — no browser needed, just an HTTP request to the server.
  test("GET /entries returns a non-empty product list", async ({ request }) => {
    const response = await request.get("https://api.demoblaze.com/entries");

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(Array.isArray(data.Items)).toBeTruthy();
    expect(data.Items.length).toBeGreaterThan(0);
  });

  // Testing a POST endpoint with a request body — verifies the server returns the right resource.
  test("POST /view returns correct product data", async ({ request }) => {
    const response = await request.post("https://api.demoblaze.com/view", {
      data: { id: "1" },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(typeof data.title).toBe("string");
    expect(data.title.length).toBeGreaterThan(0);
  });

  // Testing category filtering via POST — confirms the API returns only items for the requested category.
  test("POST /bycat returns products for a category", async ({ request }) => {
    const response = await request.post("https://api.demoblaze.com/bycat", {
      data: { cat: "phone" },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(Array.isArray(data.Items)).toBeTruthy();
    expect(data.Items.length).toBeGreaterThan(0);
  });
});
