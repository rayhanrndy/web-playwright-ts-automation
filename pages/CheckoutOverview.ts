import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { parsePriceToNumber } from '../utils/helpers';

export class CheckoutOverview extends BasePage {
readonly pageUrl = '/';

// ----------------------------------------------------------------
// LOCATORS
// ----------------------------------------------------------------
private get pageTitle() {
    return this.page.locator('.title');
    }  
private get taxLabel() {
    return this.page.locator('.summary_tax_label');
    }
private get itemTotalLabel() {
    return this.page.locator('.summary_subtotal_label');
    }
private get totalLabel() {
    return this.page.locator('.summary_total_label');
    }
private get finishButton() {
    return this.page.locator('[data-test="finish"]');
    }
private get confirmationHeader() {
    return this.page.locator('.complete-header');
    }
private get confirmationText() {
    return this.page.locator('.complete-text');
    }

// ----------------------------------------------------------------
// GETTERS
// ----------------------------------------------------------------
async getItemTotal(): Promise<number> {
    const raw = await this.getText(this.itemTotalLabel);
    return parsePriceToNumber(raw);
}
async getTax(): Promise<number> {
    const raw = await this.getText(this.taxLabel);
    return parsePriceToNumber(raw);
  }
async getTotal(): Promise<number> {
    const raw = await this.getText(this.totalLabel);
    return parsePriceToNumber(raw);
  }

async getPriceSummary(): Promise<{ itemTotal: number; tax: number; total: number }> {
    const [itemTotal, tax, total] = await Promise.all([
      this.getItemTotal(),
      this.getTax(),
      this.getTotal(),
    ]);
    return { itemTotal, tax, total };
  }

// ----------------------------------------------------------------
// ACTIONS
// ----------------------------------------------------------------
async clickFinish(): Promise<void> {
    await this.clickElement(this.finishButton);
    }

// ----------------------------------------------------------------
// ASSERTIONS
// ----------------------------------------------------------------
 async assertOnConfirmationPage(): Promise<void> {
    await this.assertUrlContains('checkout-complete');
    await this.assertText(this.confirmationHeader, 'Thank you for your order!');
    await this.assertVisible(this.confirmationText)
    }
}