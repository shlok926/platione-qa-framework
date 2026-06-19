import { Page, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(
    protected page: Page,
    protected path: string
  ) {}

  /**
   * Navigates directly to the page path using the base URL.
   */
  async navigate(): Promise<void> {
    await this.page.goto(this.path);
    await this.waitForLoad();
  }

  /**
   * Asserts that the browser's current URL matches this page's path.
   */
  async verifyUrl(): Promise<void> {
    await this.page.waitForURL(new RegExp(this.path.replace(':id', '[^/]+') + '$'));
    expect(this.page.url()).toContain(this.path.replace(':id', ''));
  }

  /**
   * Standard helper to wait for the page to be fully loaded.
   * Can be overridden by subclasses for specific page elements.
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Retrieves the document title of the current page.
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
