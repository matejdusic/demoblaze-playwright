# demoblaze-playwright

Playwright learning project — UI, API, integration and visual regression tests for [demoblaze.com](https://www.demoblaze.com).

---

## Project structure

```
pages/           Page Object classes — one per page/feature
fixtures/        Extends Playwright's test with all page objects
tests/           Test specs — one file per feature area
tests/setup/     Auth setup script (login once, save session)
utils/           Shared helpers (e.g. addProductToCart)
data/            Mock JSON fixtures for route interception
```

The separation between `pages/` and `tests/` is the point. When a selector breaks, you fix it in the page object — not in every test file that uses it.

---

## Running tests

```bash
npx playwright test                          # full suite
npx playwright test tests/login.spec.ts      # single file
npx playwright test --ui                     # visual runner
npx playwright test --update-snapshots       # regenerate visual baselines
```

---

## Core concepts

**Page Object Model** — each page is a class. Locators are `readonly` properties defined in the constructor. Action methods (`login()`, `fillAndSend()`) use those locators. Tests never call `page.locator()` directly — everything goes through the page object.

**Fixtures** — always import `test` and `expect` from `../fixtures/pageFixtures`, not from `@playwright/test`. This wires up all page objects as typed test parameters automatically.

**Selector priority** — `getByRole` → `getByText` → `getByLabel` → `locator("#id")`. Semantic selectors survive CSS and layout changes better than class or ID selectors.

**storageState** — the `setup` project logs in once and saves the browser session to `tests/setup/data.json`. The `e2e` project loads it before each test, skipping the login step entirely. Tests that need to be logged *out* override this with `test.use({ storageState: { cookies: [], origins: [] } })` at the top of the file.

**Integration tests** — `page.waitForResponse()` and `page.waitForRequest()` let you assert on real network traffic triggered by UI actions without calling the API yourself.

**API tests** — the `request` fixture makes plain HTTP calls with no browser involved. Faster and more stable than UI tests for verifying backend contracts.

**Mock data** — `page.route(url, handler)` intercepts a browser request before it reaches the server and serves local JSON instead. Useful for testing how the UI handles specific data without depending on the real API.

**Visual regression** — `toHaveScreenshot()` compares against a saved baseline image. Fails if pixels changed. Run `--update-snapshots` when a UI change is intentional. Baselines are OS-specific, so they live locally (macOS). CI skips the comparison with `--ignore-snapshots`.

---

## Auth

Credentials go in `.env` locally (gitignored). CI reads them from GitHub Secrets (`USERNAME`, `PASSWORD`). The setup script reads `process.env.USERNAME` — same code, different source depending on environment.

`tests/setup/data.json` is gitignored — it gets regenerated on every test run.

---

## CI

GitHub Actions runs the full suite on every push. Visual snapshot comparisons are skipped on CI (`--ignore-snapshots`) because baselines are macOS-specific and CI runs Linux.
