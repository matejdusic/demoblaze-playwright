import { HomePage } from "../pages/HomePage";

export async function addProductToCart(homePage: HomePage, name: string) {
  await homePage.openProductDetails(name);
  await homePage.addToCart();
}
