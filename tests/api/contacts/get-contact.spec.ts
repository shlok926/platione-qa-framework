import { test } from '../../../src/fixtures';
import { ContactFactory } from '../../../src/data/factories/contact.factory';
import { APIResponseValidator } from '../../../src/api/validators/response.validator';

test.describe('Contact Retrieval API Tests', () => {
  test('@smoke @api GET /api/v1/contacts/:id should retrieve the seeded contact details', async ({ contactClient, contactSeeder }) => {
    // 1. Seed a contact using the seeder fixture
    const payload = ContactFactory.build({
      name: 'Sarah Connor',
      company: 'Cyberdyne Systems',
    });
    const seededContact = await contactSeeder.seed(payload);

    // 2. Query the API to fetch details of the seeded contact
    const response = await contactClient.getContact(seededContact.id);

    // 3. Run validations
    APIResponseValidator.expectStatus(response, 200);
    await APIResponseValidator.expectContactShape(response);
    await APIResponseValidator.expectBodyToMatch(response, {
      id: seededContact.id,
      name: 'Sarah Connor',
      company: 'Cyberdyne Systems',
    });
  });

  test('@regression @api GET /api/v1/contacts/:id should return 404 for a non-existent contact ID', async ({ contactClient }) => {
    const nonExistentId = 'non-existent-uuid-12345';
    const response = await contactClient.getContact(nonExistentId);
    
    await APIResponseValidator.expectErrorResponse(response, 404, `Contact with ID ${nonExistentId} not found`);
  });
});
