import { Page, expect } from '@playwright/test';

export class NavigationHelper {
  constructor(private page: Page) {}

  /**
   * Asserts that the current browser URL matches the expected application path.
   */
  async verifyOnPath(path: string): Promise<void> {
    const formattedPath = path.replace(':id', '[^/]+');
    await this.page.waitForURL(new RegExp(formattedPath + '$'));
    expect(this.page.url()).toContain(path.replace(':id', ''));
  }

  /**
   * Navigates back in browser history and waits for page idle.
   */
  async navigateBack(): Promise<void> {
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigates forward in browser history and waits for page idle.
   */
  async navigateForward(): Promise<void> {
    await this.page.goForward();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Reloads the current page and waits for page idle.
   */
  async refreshPage(): Promise<void> {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }
}
