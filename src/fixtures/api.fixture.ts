import { test as baseTest } from '@playwright/test';
import { AuthAPIClient } from '../api/clients/auth.api-client';
import { ContactAPIClient } from '../api/clients/contact.api-client';
import { ActionAPIClient } from '../api/clients/action.api-client';
import { mockAPIServer } from '../api/mock/mock-api-server';

export interface APIFixtures {
  authClient: AuthAPIClient;
  contactClient: ContactAPIClient;
  actionClient: ActionAPIClient;
}

export const apiTest = baseTest.extend<APIFixtures>({
  authClient: async ({ request }, use) => {
    // Intercept API calls using mock server routes
    await mockAPIServer.setupMockRoutes(request);
    const client = new AuthAPIClient(request);
    await use(client);
  },

  contactClient: async ({ request }, use) => {
    await mockAPIServer.setupMockRoutes(request);
    const client = new ContactAPIClient(request);
    await use(client);
  },

  actionClient: async ({ request }, use) => {
    await mockAPIServer.setupMockRoutes(request);
    const client = new ActionAPIClient(request);
    await use(client);
  },
});

export { expect } from '@playwright/test';
