import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutForm } from '../pages/CheckoutForm';
import { CheckoutOverview } from '../pages/CheckoutOverview';
import { quickLogin } from '../utils/helpers';

// ----------------------------------------------------------------
// Fixture type definitions
// ----------------------------------------------------------------
type PageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutForm: CheckoutForm;
  checkoutOverview: CheckoutOverview;
  /** An authenticated page — skips UI login via quickLogin helper. */
  authenticatedPage: Page;
};

/**
 * Extended test object with pre-built page object fixtures.
 *
 * Usage in specs:
 *   import { test } from '../fixtures/page.fixtures';
 *   test('...', async ({ loginPage }) => { ... });
 */
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutForm: async ({ page }, use) => {
    const checkoutForm = new CheckoutForm(page);
    await use(checkoutForm);
  },

  checkoutOverview: async ({ page }, use) => {
    const checkoutOverview = new CheckoutOverview(page);
    await use(checkoutOverview);
  },

  authenticatedPage: async ({ page }, use) => {
    // Perform a fast programmatic login before each test that needs auth
    const username = process.env.STANDARD_USER!;
    const password = process.env.TEST_PASSWORD!;
    await quickLogin(page, username, password);
    await use(page);
  }
});

// Re-export expect so specs only need one import
export { expect } from '@playwright/test';