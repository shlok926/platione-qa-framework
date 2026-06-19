import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';
import { SidebarComponent } from '../components/sidebar.component';
import { NavbarComponent } from '../components/navbar.component';

export class DashboardPage extends BasePage {
  readonly sidebar: SidebarComponent;
  readonly navbar: NavbarComponent;
  readonly welcomeMessage: Locator;
  readonly pipelineChart: Locator;

  constructor(page: Page) {
    super(page, '/dashboard');
    this.sidebar = new SidebarComponent(page);
    this.navbar = new NavbarComponent(page);
    this.welcomeMessage = this.page.locator('[data-testid="welcome-message"]');
    this.pipelineChart = this.page.locator('[data-testid="pipeline-chart"]');
  }

  /**
   * Overridden to wait until the dashboard's welcome message is visible.
   */
  async waitForLoad(): Promise<void> {
    await super.waitForLoad();
    await this.welcomeMessage.waitFor({ state: 'visible' });
  }
}
