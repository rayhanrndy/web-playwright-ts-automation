import { test, expect } from '../fixtures/page.fixtures';

test.describe('Sorting Functionality', () => {
  test('@sorting On the Product Listing page, change the sort order to "Price (high to low)".', async ({ page, loginPage, inventoryPage }) => {
    // Arrange: Login and navigate to the inventory page
    await loginPage.goto();
    await loginPage.login(process.env.VALID_USERNAME!, process.env.VALID_PASSWORD!);
    await inventoryPage.assertOnInventoryPage();   

    // Act: Select "Price (high to low)" from the sort dropdown
    await inventoryPage.sortProductsBy('hilo');

    // Assert that the first item displayed is indeed the most expensive item in the list.
    const priceTexts = await page.locator('.inventory_item_price').allTextContents();
    const prices = priceTexts.map((text) => parseFloat(text.replace('$', '')));
    const sortedPrices = [...prices].sort((a, b) => b - a); // Sort in descending order
    expect(prices).toEqual(sortedPrices);
  })
})