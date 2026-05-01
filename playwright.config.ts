// import { defineConfig, devices } from '@playwright/test';
// import * as dotenv from 'dotenv';

// dotenv.config();

// export default defineConfig({
//   // =============================================================
//   // GENERAL SETTINGS
//   // =============================================================
//   testDir: './tests',
//   fullyParallel: true,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   workers: process.env.CI ? 2 : undefined,
//   timeout: 30_000,

//   // =============================================================
//   // REPORTING
//   // =============================================================
//   reporter: [
//     ['list'],
//     ['html', { outputFolder: 'playwright-report', open: 'never' }],
//   ],

//   // =============================================================
//   // SHARED SETTINGS ACROSS ALL PROJECTS
//   // =============================================================
//   use: {
//     baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
//     trace: 'on-first-retry',
//     screenshot: 'only-on-failure',
//     video: 'retain-on-failure',
//     headless: true,
//     actionTimeout: 10_000,
//     navigationTimeout: 15_000,
//   },

//   // =============================================================
//   // BROWSER PROJECTS
//   // =============================================================
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },
//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     },
//     // Mobile viewport
//     {
//       name: 'mobile-chrome',
//       use: { ...devices['Pixel 5'] },
//     },
//   ],
// });


import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

/**
 * Memastikan env ter-load dengan benar, 
 * bisa juga diarahkan ke file spesifik jika punya .env.staging / .env.production
 */
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Berikan 1 kali retry di lokal untuk cek flakiness
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,

  reporter: [
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['html', { open: 'never'}],
    ['junit', { outputFile: 'results.xml' }] // berguna jika nanti pakai Jenkins/Gitlab CI
  ],

  use: {
    baseURL: process.env.BASE_URL,
    
    // UBAH KE SINI: Sangat membantu untuk debugging tanpa harus nunggu retry
    trace: 'retain-on-failure', 
    
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    headless: true,
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    
    // Tambahan: Memastikan test gagal jika ada console error yang kritikal (opsional)
    // ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Jika ingin hemat resource di CI, Firefox & Webkit bisa dijalankan hanya di CI
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});