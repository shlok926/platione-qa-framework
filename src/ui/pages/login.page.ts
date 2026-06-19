import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, '/login');
    this.emailInput = this.page.locator('[data-testid="email-input"]');
    this.passwordInput = this.page.locator('[data-testid="password-input"]');
    this.loginButton = this.page.locator('[data-testid="login-button"]');
    this.errorMessage = this.page.locator('[data-testid="error-message"]');
  }

  /**
   * Fills credentials and clicks the login button.
   */
  async login(email: string, pass: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  /**
   * Retrieves any visible error message on the page.
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }

  /**
   * Overridden to wait for login inputs to render.
   */
  async waitForLoad(): Promise<void> {
    await super.waitForLoad();
    await this.emailInput.waitFor({ state: 'visible' });
  }
}
