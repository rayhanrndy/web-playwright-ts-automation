import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — abstract parent for all Page Object classes.
 *
 * Provides reusable, self-documenting wrappers around Playwright's raw API
 * so individual pages stay thin and focused on their own selectors/actions.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  // ----------------------------------------------------------------
  // NAVIGATION
  // ----------------------------------------------------------------

  /** Navigate to a path relative to baseURL. */
  async navigate(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /** Wait for the page to reach a stable "networkidle" state. */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  // ----------------------------------------------------------------
  // ELEMENT INTERACTIONS
  // ----------------------------------------------------------------

  /** Click an element and wait for it to be actionable first. */
  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /** Clear field, then type text character by character. */
  async fillField(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }

  /** Return trimmed inner text of an element. */
  async getText(locator: Locator): Promise<string> {
  await expect(locator).toBeVisible();
    return (await locator.innerText()).trim();
  }

  // ----------------------------------------------------------------
  // ASSERTIONS
  // ----------------------------------------------------------------

  /** Assert that the current URL contains the given substring. */
  async assertUrlContains(fragment: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  /** Assert element is visible in the viewport. */
  async assertVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  /** Assert element contains expected text. */
  async assertText(locator: Locator, expected: string): Promise<void> {
    await expect(locator).toHaveText(expected);
  }

  /** Assert element contains expected text (partial match). */
  async assertTextContains(locator: Locator, expected: string): Promise<void> {
    await expect(locator).toContainText(expected);
  }

abstract get pageUrl(): string;
}