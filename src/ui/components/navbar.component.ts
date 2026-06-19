import { Page, Locator } from '@playwright/test';

export class NavbarComponent {
  readonly container: Locator;
  readonly profileDropdown: Locator;
  readonly logoutButton: Locator;
  readonly usernameDisplay: Locator;

  constructor(private page: Page) {
    this.container = this.page.locator('[data-testid="navbar-container"]');
    this.profileDropdown = this.container.locator('[data-testid="profile-dropdown"]');
    this.logoutButton = this.page.locator('[data-testid="logout-button"]');
    this.usernameDisplay = this.container.locator('[data-testid="username-display"]');
  }

  /**
   * Triggers the dropdown and clicks the logout button.
   */
  async logout(): Promise<void> {
    await this.profileDropdown.click();
    await this.logoutButton.click();
  }

  /**
   * Retrieves the displayed username of the logged-in user.
   */
  async getUsername(): Promise<string> {
    return (await this.usernameDisplay.textContent()) || '';
  }
}
