import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

/**
 * CartPage — encapsulates the shopping cart screen at /cart.html.
 */
export class CartPage extends BasePage {
  readonly pageUrl = '/cart.html';

  // ----------------------------------------------------------------
  // LOCATORS
  // ----------------------------------------------------------------
  private get pageTitle() {
    return this.page.locator('.title');
  }

  private get cartItems() {
    return this.page.locator('.cart_item');
  }

  private get continueShoppingButton() {
    return this.page.locator('[data-test="continue-shopping"]');
  }

  private get checkoutButton() {
    return this.page.locator('[data-test="checkout"]');
  }

  /** Remove button scoped to a specific cart item by product name. */
  private removeItemButton(productName: string): Locator {
    return this.page
      .locator('.cart_item', { hasText: productName })
      .locator('[data-test^="remove"]');
  }

  /** Price element for a specific cart item. */
  private cartItemPrice(productName: string): Locator {
    return this.page
      .locator('.cart_item', { hasText: productName })
      .locator('.inventory_item_price');
  }

  // ----------------------------------------------------------------
  // ACTIONS
  // ----------------------------------------------------------------

  /** Remove a specific product from the cart. */
  async removeItem(productName: string): Promise<void> {
    await this.clickElement(this.removeItemButton(productName));
  }

  /** Click "Continue Shopping" to go back to the inventory. */
  async continueShopping(): Promise<void> {
    await this.clickElement(this.continueShoppingButton);
  }

  /** Click "Checkout" to proceed. */
  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton);
  }

  // ----------------------------------------------------------------
  // GETTERS
  // ----------------------------------------------------------------

  /** Returns the number of items currently in the cart view. */
  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  /** Returns all product names listed in the cart. */
  async getCartItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allInnerTexts();
  }

  /** Returns the price string for a specific item in the cart. */
  async getItemPrice(productName: string): Promise<string> {
    return this.getText(this.cartItemPrice(productName));
  }

  // ----------------------------------------------------------------
  // ASSERTIONS
  // ----------------------------------------------------------------

  /** Assert the user is on the cart page. */
  async assertOnCartPage(): Promise<void> {
    await this.assertUrlContains('cart');
    await this.assertText(this.pageTitle, 'Your Cart');
  }

  /** Assert a specific product is visible in the cart. */
  async assertItemInCart(productName: string): Promise<void> {
    const item = this.page.locator('.cart_item', { hasText: productName });
    await this.assertVisible(item, `"${productName}" should be visible in the cart`);
  }

  /** Assert a specific product is NOT in the cart. */
  async assertItemNotInCart(productName: string): Promise<void> {
    const item = this.page.locator('.cart_item', { hasText: productName });
    await expect(item).not.toBeVisible();
  }

  /** Assert the cart is empty (no items present). */
  async assertCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }
}