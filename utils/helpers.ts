import { Page } from '@playwright/test';

/**
 * Helpers — small, stateless utility functions used across test specs.
 *
 * Keep these pure and side-effect free where possible.
 */

// ----------------------------------------------------------------
// STRING HELPERS
// ----------------------------------------------------------------

/**
 * Parse a price string like "$29.99" and return its numeric value.
 * Throws if the string cannot be parsed.
 */
export function parsePriceToNumber(priceStr: string): number {
  const cleaned = priceStr.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  if (isNaN(num)) throw new Error(`Cannot parse price from string: "${priceStr}"`);
  return num;
}

/**
 * Returns true if an array of strings is sorted in ascending order.
 */
export function isSortedAscending(items: string[]): boolean {
  return items.every((val, i, arr) => i === 0 || arr[i - 1].localeCompare(val) <= 0);
}

/**
 * Returns true if an array of strings is sorted in descending order.
 */
export function isSortedDescending(items: string[]): boolean {
  return items.every((val, i, arr) => i === 0 || arr[i - 1].localeCompare(val) >= 0);
}

/**
 * Returns true if an array of numbers is sorted in ascending order.
 */
export function isNumberArraySortedAscending(nums: number[]): boolean {
  return nums.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
}

// ----------------------------------------------------------------
// PAGE / SESSION HELPERS
// ----------------------------------------------------------------

/**
 * Performs a fast login by injecting session cookies/storage directly,
 * avoiding a full UI login flow in tests that don't test authentication.
 */
export async function quickLogin(page: Page, username: string, password: string): Promise<void> {
  await page.goto('/');
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');
}

/**
 * Clear session storage to simulate a logged-out state.
 */
export async function clearSession(page: Page): Promise<void> {
  await page.evaluate(() => {
    const w = globalThis as any;
    w.sessionStorage.clear();
    w.localStorage.clear();
  });
}

// ----------------------------------------------------------------
// WAIT HELPERS
// ----------------------------------------------------------------

/**
 * Wait for a specific number of milliseconds. Use sparingly — prefer
 * explicit waits (waitForSelector, waitForURL) over arbitrary sleeps.
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a random email address for test data isolation.
 */
export function randomEmail(prefix = 'qa'): string {
  const unique = Date.now().toString(36);
  return `${prefix}+${unique}@test.example.com`;
}