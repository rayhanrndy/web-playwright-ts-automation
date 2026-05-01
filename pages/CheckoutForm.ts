import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutForm extends BasePage {
    readonly pageUrl = '/';

    // ----------------------------------------------------------------
    // LOCATORS
    // ----------------------------------------------------------------
    private get firstNameInput() {
        return this.page.locator('[data-test="firstName"]');
    }
    private get lastNameInput() {
        return this.page.locator('[data-test="lastName"]');
    }
    private get postalCodeInput() {
        return this.page.locator('[data-test="postalCode"]');
    }
    private get continueButton() {
        return this.page.locator('[data-test="continue"]');
    }
    // ----------------------------------------------------------------
    // ACTIONS
    // ----------------------------------------------------------------     
    async enterFirstName(firstName: string): Promise<void> {
        await this.fillField(this.firstNameInput, firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.fillField(this.lastNameInput, lastName);
    }

    async enterPostalCode(postalCode: string): Promise<void> {
        await this.fillField(this.postalCodeInput, postalCode);
    }

    async clickContinue(): Promise<void> {
        await this.clickElement(this.continueButton);
    }

}