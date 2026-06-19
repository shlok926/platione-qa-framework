import { Page, Locator } from '@playwright/test';

export class SidebarComponent {
  readonly container: Locator;
  readonly dashboardLink: Locator;
  readonly contactsLink: Locator;
  readonly actionsLink: Locator;

  constructor(private page: Page) {
    this.container = this.page.locator('[data-testid="sidebar-container"]');
    this.dashboardLink = this.container.locator('[data-testid="nav-dashboard"]');
    this.contactsLink = this.container.locator('[data-testid="nav-contacts"]');
    this.actionsLink = this.container.locator('[data-testid="nav-actions"]');
  }

  /**
   * Clicks the dashboard navigation link.
   */
  async navigateToDashboard(): Promise<void> {
    await this.dashboardLink.click();
  }

  /**
   * Clicks the contacts navigation link.
   */
  async navigateToContacts(): Promise<void> {
    await this.contactsLink.click();
  }

  /**
   * Clicks the actions navigation link.
   */
  async navigateToActions(): Promise<void> {
    await this.actionsLink.click();
  }
}
