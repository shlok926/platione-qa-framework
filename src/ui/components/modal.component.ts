import { Page, Locator } from '@playwright/test';

export class ModalComponent {
  readonly container: Locator;
  readonly title: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;

  constructor(private page: Page, testId: string = 'modal-container') {
    this.container = this.page.locator(`[data-testid="${testId}"]`);
    this.title = this.container.locator('[data-testid="modal-title"]');
    this.confirmButton = this.container.locator('[data-testid="modal-confirm"]');
    this.cancelButton = this.container.locator('[data-testid="modal-cancel"]');
  }

  /**
   * Waits for the modal to be visible.
   */
  async waitForVisible(): Promise<void> {
    await this.container.waitFor({ state: 'visible' });
  }

  /**
   * Waits for the modal to be hidden.
   */
  async waitForHidden(): Promise<void> {
    await this.container.waitFor({ state: 'hidden' });
  }

  /**
   * Gets the text content of the modal header title.
   */
  async getTitleText(): Promise<string> {
    return (await this.title.textContent()) || '';
  }

  /**
   * Clicks the confirm/submit button of the modal.
   */
  async confirm(): Promise<void> {
    await this.confirmButton.click();
  }

  /**
   * Clicks the cancel/close button of the modal.
   */
  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
