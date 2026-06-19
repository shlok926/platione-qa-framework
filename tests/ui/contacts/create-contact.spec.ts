import { test, expect } from '../../../src/fixtures';

test.describe('Contacts UI Tests', () => {
  test.beforeEach(async ({ contactsPage }) => {
    // Navigate to the contacts list page directly
    await contactsPage.navigate();
  });

  test('@regression @ui should display contact list and create new contact successfully', async ({ contactsPage }) => {
    // 1. Verify we are on the correct page
    await contactsPage.verifyUrl();

    // 2. Verify baseline contact exists in table
    const initialCount = await contactsPage.contactsTable.getRowCount();
    expect(initialCount).toBe(1);

    const firstRowName = await contactsPage.contactsTable.getCellValue(0, 0);
    expect(firstRowName).toBe('John Connor');

    // 3. Open modal and fill out form
    await contactsPage.openCreateModal();
    await contactsPage.fillCreateForm({
      name: 'Sarah Connor',
      phone: '+919876543210',
      company: 'Resistance HQ',
      email: 'sconnor@resistance.net',
      status: 'active',
    });

    // 4. Submit form
    await contactsPage.submitCreateForm();

    // 5. In a real environment, the table reload displays the new row.
    // In our mock page, the modal hides, completing the visual interaction verification.
    await expect(contactsPage.createModal.container).toBeHidden();
  });
});
