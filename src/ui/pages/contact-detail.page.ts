import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';
import { SidebarComponent } from '../components/sidebar.component';
import { NavbarComponent } from '../components/navbar.component';
import { TableComponent } from '../components/table.component';
import { ModalComponent } from '../components/modal.component';

export class ContactDetailPage extends BasePage {
  readonly sidebar: SidebarComponent;
  readonly navbar: NavbarComponent;
  readonly actionsTable: TableComponent;
  readonly addActionModal: ModalComponent;

  readonly contactName: Locator;
  readonly contactCompany: Locator;
  readonly leadScoreValue: Locator;
  readonly leadStageSelect: Locator;
  readonly updateLeadBtn: Locator;

  readonly openActionModalBtn: Locator;
  readonly scoreInput: Locator;

  // Add Action Form Inputs (inside modal)
  readonly actionTypeSelect: Locator;
  readonly actionDueDateInput: Locator;
  readonly actionNotesInput: Locator;

  constructor(page: Page) {
    super(page, '/contacts/:id');
    this.sidebar = new SidebarComponent(page);
    this.navbar = new NavbarComponent(page);
    this.actionsTable = new TableComponent(page, 'actions-table');
    this.addActionModal = new ModalComponent(page, 'add-action-modal');

    this.contactName = this.page.locator('[data-testid="detail-name"]');
    this.contactCompany = this.page.locator('[data-testid="detail-company"]');
    this.leadScoreValue = this.page.locator('[data-testid="detail-score"]');
    this.leadStageSelect = this.page.locator('[data-testid="detail-stage-select"]');
    this.scoreInput = this.page.locator('[data-testid="detail-score-input"]');
    this.updateLeadBtn = this.page.locator('[data-testid="update-lead-btn"]');

    this.openActionModalBtn = this.page.locator('[data-testid="open-action-modal-btn"]');

    // Add action form selectors
    const modal = this.addActionModal.container;
    this.actionTypeSelect = modal.locator('[data-testid="action-type-select"]');
    this.actionDueDateInput = modal.locator('[data-testid="action-duedate-input"]');
    this.actionNotesInput = modal.locator('[data-testid="action-notes-input"]');
  }

  /**
   * Retrieves the current contact name shown on details view.
   */
  async getContactName(): Promise<string> {
    return (await this.contactName.textContent()) || '';
  }

  /**
   * Retrieves the current lead score.
   */
  async getLeadScore(): Promise<number> {
    const text = await this.leadScoreValue.textContent();
    return Number(text) || 0;
  }

  /**
   * Updates lead score and stage details.
   */
  async updateLeadDetails(score: number, stage: string): Promise<void> {
    await this.scoreInput.fill(String(score));
    await this.leadStageSelect.selectOption({ value: stage });
    await this.updateLeadBtn.click();
  }

  /**
   * Triggers open on the action creation modal.
   */
  async openAddActionModal(): Promise<void> {
    await this.openActionModalBtn.click();
    await this.addActionModal.waitForVisible();
  }

  /**
   * Fills out action creation form.
   */
  async fillActionForm(data: {
    type: 'call' | 'email' | 'meeting' | 'task';
    dueDate: string;
    notes?: string;
  }): Promise<void> {
    await this.actionTypeSelect.selectOption({ value: data.type });
    await this.actionDueDateInput.fill(data.dueDate);
    if (data.notes) {
      await this.actionNotesInput.fill(data.notes);
    }
  }

  /**
   * Submits action creation form.
   */
  async submitActionForm(): Promise<void> {
    await this.addActionModal.confirm();
    await this.addActionModal.waitForHidden();
  }

  /**
   * Overridden to wait for details header components.
   */
  async waitForLoad(): Promise<void> {
    await super.waitForLoad();
    await this.contactName.waitFor({ state: 'visible' });
  }
}
