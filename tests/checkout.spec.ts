import { test, expect } from '../fixtures/page.fixtures';
import data from '../test-data/data.json';

test.describe('End-to-End Checkout Flow', () => {
    test('@checkout End-to-End Successful Checkout', async ({ loginPage, inventoryPage, cartPage, checkoutForm, checkoutOverview
     }) => {
    // Login
    await loginPage.goto();
    await loginPage.login(process.env.VALID_USERNAME!, process.env.VALID_PASSWORD!);
    await inventoryPage.assertOnInventoryPage();

    // Add two distinct items to the cart.
    await inventoryPage.addProductToCart(data.productsToAdd[0].product1!);
    await inventoryPage.addProductToCart(data.productsToAdd[1].product2!);
    await inventoryPage.assertCartCount(2);

    // Navigate to the Cart page and verify the correct items are listed.
    await inventoryPage.goToCart();
    await cartPage.assertOnCartPage();
    await cartPage.assertItemInCart(data.productsToAdd[0].product1!);
    await cartPage.assertItemInCart(data.productsToAdd[1].product2!);

    // Proceed to Checkout and complete the customer information form.
    await cartPage.proceedToCheckout();
    await checkoutForm.enterFirstName(data.customerInfo.firstName);
    await checkoutForm.enterLastName(data.customerInfo.lastName);
    await checkoutForm.enterPostalCode(data.customerInfo.postalCode);
    await checkoutForm.clickContinue();

    // Critical Assertion: On the "Checkout: Overview" page, calculate and assert that
        await test.step('CRITICAL: assert Item Total + Tax equals the displayed Total', async () => {
 
        // Read all three price values from the overview page
        const { itemTotal, tax, total } = await checkoutOverview.getPriceSummary();
 
        const calculatedTotal = parseFloat((itemTotal + tax).toFixed(2));
        const displayedTotal  = parseFloat(total.toFixed(2));
 
        // Log all figures for traceability in the HTML report
        // console.log(
        //   `\n  ─────────────────────────────────────────\n` +
        //   `  💰  Checkout Overview — Price Breakdown\n` +
        //   `  ─────────────────────────────────────────\n` +
        //   `  Item Total  : $${itemTotal.toFixed(2)}\n` +
        //   `  Tax         : $${tax.toFixed(2)}\n` +
        //   `  ─────────────────────────────────────────\n` +
        //   `  Calculated  : $${calculatedTotal.toFixed(2)}  (Item Total + Tax)\n` +
        //   `  Displayed   : $${displayedTotal.toFixed(2)}  (Total label on page)\n` +
        //   `  ─────────────────────────────────────────\n` +
        //   `  Match       : ${calculatedTotal === displayedTotal ? '✅ PASS' : '❌ FAIL'}`,
        // );
 
        // 🔴 CRITICAL ASSERTION
        expect(
          calculatedTotal,
          `Price mismatch on Checkout Overview:\n` +
          `  Item Total ($${itemTotal.toFixed(2)}) + Tax ($${tax.toFixed(2)})\n` +
          `  = Calculated $${calculatedTotal.toFixed(2)}\n` +
          `  ≠ Displayed  $${displayedTotal.toFixed(2)}\n` +
          `  Difference   $${Math.abs(calculatedTotal - displayedTotal).toFixed(2)}`,
        ).toBe(displayedTotal);
 
        // Additional sanity guards
        expect(itemTotal, 'Item Total must be a positive number').toBeGreaterThan(0);
        expect(tax,       'Tax must be a non-negative number').toBeGreaterThanOrEqual(0);
        expect(total,     'Grand Total must be greater than Item Total when tax > 0')
          .toBeGreaterThanOrEqual(itemTotal);
      });
    // Complete the order and verify the "Thank You" confirmation message.
    await checkoutOverview.clickFinish();
    await checkoutOverview.assertOnConfirmationPage();
  });
})