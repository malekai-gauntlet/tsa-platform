/**
 * Playwright Configuration for Onboarding E2E Tests
 */

module.exports = {
  testDir: './tests',
  timeout: 60000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['line'], ['json', { outputFile: 'test-results.json' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Slow down for easier debugging
    actionTimeout: 5000,
    navigationTimeout: 10000,
    headless: false, // Show browser for debugging
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...require('@playwright/test').devices['Desktop Chrome'],
        // Enable console logs for debugging
        launchOptions: {
          args: ['--disable-web-security'],
        },
      },
    },
    {
      name: 'webkit',
      use: { ...require('@playwright/test').devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
};
