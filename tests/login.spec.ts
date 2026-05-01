import { test } from '../fixtures/page.fixtures';


test.describe('Authentication — Customer Login & Validation', () => {

  // POSITIVE SCENARIOS
  // =============================================================
  test('@positive Successful login with valid credentials', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.VALID_USERNAME!, process.env.VALID_PASSWORD!);
    await inventoryPage.assertOnInventoryPage();
  });



  // NEGATIVE SCENARIOS
  // =============================================================
  test('@negative Login with locked-out user account', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.LOCKED_USERNAME!, process.env.VALID_PASSWORD!);

    // Assert
    await loginPage.assertErrorMessage(process.env.LOCKED_USER_ERROR!);
  });

  test('@negative Login with invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.INVALID_USERNAME!, process.env.INVALID_PASSWORD!);

    // Assert
    await loginPage.assertErrorMessage(process.env.INVALID_CREDENTIALS_ERROR!);
  });

  test('@negative Login with empty username and password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.clickLogin();

    // Assert
    await loginPage.assertErrorMessage(process.env.EMPTY_CREDENTIALS_ERROR!);
  });

  test('@negative Login with empty password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.enterUsername(process.env.VALID_USERNAME!);
    await loginPage.clickLogin();

    // Assert
    await loginPage.assertErrorMessage(process.env.EMPTY_PASSWORD_ERROR!);
  });

});