import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage — encapsulates all interactions with the /index.html login screen.
 *
 * Follows the Page Object Model pattern: selectors and actions live here,
 * assertions live in the spec files (or delegated to BasePage helpers).
 */
export class LoginPage extends BasePage {
  readonly pageUrl = '/';

  // ----------------------------------------------------------------
  // LOCATORS  (use data-test attributes when available — they're stable)
  // ----------------------------------------------------------------
  private get usernameInput() {
    return this.page.locator('[data-test="username"]');
  }

  private get passwordInput() {
    return this.page.locator('[data-test="password"]');
  }

  private get loginButton() {
    return this.page.locator('[data-test="login-button"]');
  }

  private get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  private get errorCloseButton() {
    return this.page.locator('[data-test="error"] button.error-button');
  }

  // ----------------------------------------------------------------
  // ACTIONS
  // ----------------------------------------------------------------

  /** Navigate to the login page. */
  async goto(): Promise<void> {
    await this.navigate(this.pageUrl);
    await this.waitForPageLoad();
  }

  /** Type username into the username field. */
  async enterUsername(username: string): Promise<void> {
    await this.fillField(this.usernameInput, username);
  }

  /** Type password into the password field. */
  async enterPassword(password: string): Promise<void> {
    await this.fillField(this.passwordInput, password);
  }

  /** Click the login button. */
  async clickLogin(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  /** High-level convenience: fill credentials and submit. */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /** Dismiss the error banner by clicking its × button. */
  async dismissError(): Promise<void> {
    await this.clickElement(this.errorCloseButton);
  }

  // ----------------------------------------------------------------
  // ASSERTIONS (login-specific)
  // ----------------------------------------------------------------

  /** Assert a specific error message is displayed. */
  async assertErrorMessage(expectedText: string): Promise<void> {
    await this.assertVisible(this.errorMessage, 'Error banner should be visible');
    await this.assertTextContains(this.errorMessage, expectedText);
  }

  /** Assert the error banner is no longer visible. */
  async assertErrorDismissed(): Promise<void> {
    await this.errorMessage.waitFor({ state: 'hidden' });
  }
}