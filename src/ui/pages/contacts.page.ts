import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';
import { SidebarComponent } from '../components/sidebar.component';
import { NavbarComponent } from '../components/navbar.component';
import { TableComponent } from '../components/table.component';
import { ModalComponent } from '../components/modal.component';

export class ContactsPage extends BasePage {
  readonly sidebar: SidebarComponent;
  readonly navbar: NavbarComponent;
  readonly contactsTable: TableComponent;
  readonly createModal: ModalComponent;

  readonly createContactBtn: Locator;
  readonly searchBar: Locator;

  // Contact Creation Form Inputs (inside modal)
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly companyInput: Locator;
  readonly emailInput: Locator;
  readonly statusSelect: Locator;

  constructor(page: Page) {
    super(page, '/contacts');
    this.sidebar = new SidebarComponent(page);
    this.navbar = new NavbarComponent(page);
    this.contactsTable = new TableComponent(page, 'contacts-table');
    this.createModal = new ModalComponent(page, 'create-contact-modal');

    this.createContactBtn = this.page.locator('[data-testid="create-contact-btn"]');
    this.searchBar = this.page.locator('[data-testid="search-bar"]');

    // Form inputs within the modal container
    const modal = this.createModal.container;
    this.nameInput = modal.locator('[data-testid="form-name"]');
    this.phoneInput = modal.locator('[data-testid="form-phone"]');
    this.companyInput = modal.locator('[data-testid="form-company"]');
    this.emailInput = modal.locator('[data-testid="form-email"]');
    this.statusSelect = modal.locator('[data-testid="form-status"]');
  }

  /**
   * Searches for a contact by filling the search bar.
   */
  async searchContact(query: string): Promise<void> {
    await this.searchBar.fill(query);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Opens the create contact modal dialogue.
   */
  async openCreateModal(): Promise<void> {
    await this.createContactBtn.click();
    await this.createModal.waitForVisible();
  }

  /**
   * Fills out the contact creation form inside the modal.
   */
  async fillCreateForm(data: {
    name: string;
    phone: string;
    company: string;
    email?: string | null;
    status?: 'active' | 'inactive' | 'archived';
  }): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.phoneInput.fill(data.phone);
    await this.companyInput.fill(data.company);
    if (data.email) {
      await this.emailInput.fill(data.email);
    }
    if (data.status) {
      await this.statusSelect.selectOption({ value: data.status });
    }
  }

  /**
   * Submits the contact creation modal form.
   */
  async submitCreateForm(): Promise<void> {
    await this.createModal.confirm();
    await this.createModal.waitForHidden();
  }

  /**
   * Clicks a contact row matching the provided name.
   */
  async clickContactByName(name: string): Promise<void> {
    const row = this.page.locator(`[data-testid="contacts-table"] tbody tr:has-text("${name}")`);
    await row.click();
  }

  /**
   * Overridden to wait for contact list components to render.
   */
  async waitForLoad(): Promise<void> {
    await super.waitForLoad();
    await this.createContactBtn.waitFor({ state: 'visible' });
  }
}
