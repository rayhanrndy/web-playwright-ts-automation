# Saucedemo Playwright Web Automation

Automated end-to-end testing of e-commerce on Saucedemo using **Playwright Typescript**, **POM**, and **Allure Reporting**.

This project performs:
1. Customer Login & Validation
   - Login with valid credentials.
   - Verify successful redirection to the Product Listing page.
   - Negative Case: Verify the correct error message appears for wrong credentials.
2. End-to-End Checkout Flow
   - Add two distinct items to the cart.
   - Navigate to the Cart page and verify the correct items are listed.
   - Proceed to Checkout and complete the customer information form.
   - Critical Assertion: On the "Checkout: Overview" page, calculate and assert that the Item Total + Tax equals the Total displayed.
   - Complete the order and verify the "Thank You" confirmation message.
3. Sorting Functionality
   - On the Product Listing page, change the sort order to "Price (high to low)".
   - Assert that the first item displayed is indeed the most expensive item in the list.
---

## 🚀 Tools & Frameworks
- [Playwright](https://playwright.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Allure](https://allurereport.org/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

---

## 🛠 Installation
Clone this repo and install dependencies:
- git clone https://github.com/rayhanrndy/web-playwright-ts-automation.git
- cd web-playwright-ts-automation
- npm install

---

## 🧪 How to run tests
### Run tests in interactive mode
npx playwright test --ui
### Run tests headless
npx playwright test
### Open allure report
allure serve allure-results
### Open HTML report
npx playwright show-report

---



### *Rayhan Rendy*
#### Software QA Engineer
