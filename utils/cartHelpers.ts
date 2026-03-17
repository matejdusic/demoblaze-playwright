import { HomePage } from "../pages/HomePage";

export async function addProductToCart(homePage: HomePage, name: string) {
  await homePage.openProductDetails(name);
  const dialogPromise = homePage.page.waitForEvent("dialog");
  await homePage.page.getByRole("link", { name: "Add to cart" }).click();
  const dialog = await dialogPromise;
  await dialog.accept();
}
