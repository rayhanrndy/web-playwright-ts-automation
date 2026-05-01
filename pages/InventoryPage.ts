import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * InventoryPage — product listing screen at /inventory.html.
 *
 * Handles product browsing, sort, and add-to-cart interactions.
 */
export class InventoryPage extends BasePage {
  readonly pageUrl = '/inventory.html';

  // ----------------------------------------------------------------
  // LOCATORS
  // ----------------------------------------------------------------
  private get pageTitle() {
    return this.page.locator('.title');
  }

  private get inventoryList() {
    return this.page.locator('.inventory_list');
  }

  private get inventoryItems() {
    return this.page.locator('.inventory_item');
  }

  private get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  private get cartIcon() {
    return this.page.locator('.shopping_cart_link');
  }

  private get sortDropdown() {
    return this.page.locator('[data-test="product-sort-container"]');
  }

  /** Locator for the "Add to cart" button of a product by its name. */
  private addToCartButton(productName: string): Locator {
    return this.page
      .locator('.inventory_item', { hasText: productName })
      .locator('[data-test^="add-to-cart"]');
  }

  /** Locator for the "Remove" button of a product by its name. */
  private removeButton(productName: string): Locator {
    return this.page
      .locator('.inventory_item', { hasText: productName })
      .locator('[data-test^="remove"]');
  }

  /** Price element for a specific product. */
  private productPrice(productName: string): Locator {
    return this.page
      .locator('.inventory_item', { hasText: productName })
      .locator('.inventory_item_price');
  }

  // ----------------------------------------------------------------
  // ACTIONS
  // ----------------------------------------------------------------

  /** Add a product to the cart by its display name. */
  async addProductToCart(productName: string): Promise<void> {
    await this.clickElement(this.addToCartButton(productName));
  }

  /** Remove a product from the cart (from the inventory page). */
  async removeProductFromCart(productName: string): Promise<void> {
    await this.clickElement(this.removeButton(productName));
  }

  /** Navigate to the cart via the cart icon. */
  async goToCart(): Promise<void> {
    await this.clickElement(this.cartIcon);
  }

  /** Select a sort option from the dropdown.
   * @param option — e.g. 'az' | 'za' | 'lohi' | 'hilo'
   */
  async sortProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  // ----------------------------------------------------------------
  // GETTERS
  // ----------------------------------------------------------------

  /** Returns the number shown on the cart badge (or 0 if no badge). */
  async getCartCount(): Promise<number> {
    const badge = this.cartBadge;
    const isVisible = await badge.isVisible();
    if (!isVisible) return 0;
    const text = await badge.innerText();
    return parseInt(text, 10);
  }

  /** Returns the displayed price string for a product. */
  async getProductPrice(productName: string): Promise<string> {
    return this.getText(this.productPrice(productName));
  }

  /** Returns array of all product names currently displayed. */
  async getAllProductNames(): Promise<string[]> {
    const nameLocators = this.page.locator('.inventory_item_name');
    return nameLocators.allInnerTexts();
  }

  // ----------------------------------------------------------------
  // ASSERTIONS
  // ----------------------------------------------------------------

  /** Assert user has successfully landed on the inventory page. */
  async assertOnInventoryPage(): Promise<void> {
    await this.assertUrlContains('inventory');
    await this.assertText(this.pageTitle, 'Products');
    await this.assertVisible(this.inventoryList);
  }

  /** Assert cart badge shows a specific count. */
  async assertCartCount(expected: number): Promise<void> {
    if (expected === 0) {
      await this.cartBadge.waitFor({ state: 'hidden' });
    } else {
      await this.assertText(this.cartBadge, String(expected));
    }
  }
}