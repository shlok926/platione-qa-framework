import { Page, Locator } from '@playwright/test';

export class TableComponent {
  readonly container: Locator;
  readonly rows: Locator;
  readonly headers: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;

  constructor(private page: Page, testId: string = 'data-table') {
    this.container = this.page.locator(`[data-testid="${testId}"]`);
    this.rows = this.container.locator('tbody tr');
    this.headers = this.container.locator('thead th');
    this.nextButton = this.page.locator('[data-testid="pagination-next"]');
    this.prevButton = this.page.locator('[data-testid="pagination-prev"]');
  }

  /**
   * Gets the total number of body rows in the table.
   */
  async getRowCount(): Promise<number> {
    return await this.rows.count();
  }

  /**
   * Retrieves text from a specific cell index (0-indexed).
   */
  async getCellValue(rowIndex: number, colIndex: number): Promise<string> {
    const row = this.rows.nth(rowIndex);
    const cell = row.locator('td').nth(colIndex);
    return (await cell.textContent())?.trim() || '';
  }

  /**
   * Clicks a specific row.
   */
  async clickRow(rowIndex: number): Promise<void> {
    await this.rows.nth(rowIndex).click();
  }

  /**
   * Clicks a specific action element inside a row (such as a view or delete button).
   */
  async clickRowAction(rowIndex: number, actionTestId: string): Promise<void> {
    const row = this.rows.nth(rowIndex);
    await row.locator(`[data-testid="${actionTestId}"]`).click();
  }

  /**
   * Navigates to the next page of results.
   */
  async nextPage(): Promise<void> {
    await this.nextButton.click();
  }

  /**
   * Navigates to the previous page of results.
   */
  async prevPage(): Promise<void> {
    await this.prevButton.click();
  }
}
