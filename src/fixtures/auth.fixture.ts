import { test as baseTest, Page } from '@playwright/test';
import { LoginPage } from '../ui/pages/login.page';
import { ConfigManager } from '../utils/config';
import { mockAPIServer } from '../api/mock/mock-api-server';

export interface AuthFixtures {
  authToken: string;
  authenticatedPage: Page;
}

export const authTest = baseTest.extend<AuthFixtures>({
  /**
   * Provides a valid mock authentication token.
   */
  // eslint-disable-next-line no-empty-pattern
  authToken: async ({}, use) => {
    const token = 'mock-jwt-token-xyz';
    await use(token);
  },

  /**
   * Provides a page that is pre-authenticated using test credentials.
   */
  authenticatedPage: async ({ page }, use) => {
    // Setup stateful routing on the page first
    await mockAPIServer.setupMockRoutes(page);

    // Authenticate using the LoginPage object
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(ConfigManager.testUserEmail, ConfigManager.testUserPassword);

    await use(page);
  },
});
