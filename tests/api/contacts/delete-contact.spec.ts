import { test } from '../../../src/fixtures';
import { ContactFactory } from '../../../src/data/factories/contact.factory';
import { APIResponseValidator } from '../../../src/api/validators/response.validator';

test.describe('Contact Deletion API Tests', () => {
  test('@smoke @api DELETE /api/v1/contacts/:id should delete the contact successfully', async ({ contactClient, contactSeeder }) => {
    // 1. Seed a contact using the seeder fixture
    const payload = ContactFactory.build({
      name: 'John Connor',
      company: 'Resistance',
    });
    const seededContact = await contactSeeder.seed(payload);

    // 2. Perform the DELETE operation via the API client
    const deleteResponse = await contactClient.deleteContact(seededContact.id);
    APIResponseValidator.expectStatus(deleteResponse, 204);

    // 3. Confirm the contact no longer exists
    const getResponse = await contactClient.getContact(seededContact.id);
    APIResponseValidator.expectStatus(getResponse, 404);
  });
});
