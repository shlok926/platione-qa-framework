import { request } from '@playwright/test';
import { ConfigManager } from '../src/utils/config';
import { logger } from '../src/utils/logger';
import { ContactAPISeeder } from '../src/data/seeders/api/contact.api-seeder';
import { ActionAPISeeder } from '../src/data/seeders/api/action.api-seeder';
import { ContactFactory } from '../src/data/factories/contact.factory';
import { ActionFactory } from '../src/data/factories/action.factory';
import { AuthAPIClient } from '../src/api/clients/auth.api-client';

async function run() {
  logger.info('Starting API Seeder script...');

  // Initialize a standalone Playwright APIRequestContext
  const requestContext = await request.newContext({
    baseURL: ConfigManager.apiBaseUrl,
  });

  try {
    // 1. Authenticate to obtain token
    logger.info('Logging in to retrieve Bearer token...');
    const authClient = new AuthAPIClient(requestContext);
    const authResponse = await authClient.login({
      email: ConfigManager.testUserEmail,
      password: ConfigManager.testUserPassword,
    });
    const authData = await authResponse.json();
    const token = authData.token;
    logger.info('Logged in successfully. Token acquired.');

    // 2. Initialize Seeders
    const contactSeeder = new ContactAPISeeder(requestContext, token);
    const actionSeeder = new ActionAPISeeder(requestContext, token);

    // 3. Seed Contacts
    logger.info('Seeding contacts...');
    const contactPayloads = ContactFactory.buildMany(3);
    const seededContacts = [];

    for (const payload of contactPayloads) {
      const contact = await contactSeeder.seed(payload);
      seededContacts.push(contact);
      logger.info(`Seeded contact: "${contact.name}" (ID: ${contact.id})`);
    }

    // 4. Seed Action History for the first contact
    logger.info('Seeding actions...');
    const targetContact = seededContacts[0];
    const actionPayloads = ActionFactory.buildMany(2, { contact_id: targetContact.id });

    for (const payload of actionPayloads) {
      const action = await actionSeeder.seed(payload);
      logger.info(`Seeded action: "${action.type}" status: "${action.status}" for Contact ID ${targetContact.id}`);
    }

    logger.info('API Seeding completed successfully.');
  } catch (error) {
    logger.error('API Seeding execution failed:', error);
    process.exit(1);
  } finally {
    await requestContext.dispose();
  }
}

run().catch((err) => {
  logger.error('Fatal unhandled error in API seeder script:', err);
  process.exit(1);
});
