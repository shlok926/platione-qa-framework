import { apiTest } from './api.fixture';
import { ContactAPISeeder } from '../data/seeders/api/contact.api-seeder';
import { ActionAPISeeder } from '../data/seeders/api/action.api-seeder';

export interface DataFixtures {
  contactSeeder: ContactAPISeeder;
  actionSeeder: ActionAPISeeder;
}

export const dataTest = apiTest.extend<DataFixtures>({
  contactSeeder: async ({ request }, use) => {
    const seeder = new ContactAPISeeder(request, 'mock-jwt-token-xyz');
    await use(seeder);
    // Automatic cleanup of seeded contacts after test completes
    await seeder.cleanup();
  },

  actionSeeder: async ({ request }, use) => {
    const seeder = new ActionAPISeeder(request, 'mock-jwt-token-xyz');
    await use(seeder);
    // Automatic cleanup of seeded actions after test completes
    await seeder.cleanup();
  },
});
