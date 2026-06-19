import { Page, Locator } from '@playwright/test';

export class FormHelper {
  constructor(private page: Page) {}

  /**
   * Focuses, clears, and fills a text input field to ensure old values are wiped.
   */
  async clearAndFill(locator: Locator, value: string): Promise<void> {
    await locator.focus();
    // Simulate keyboard select all + backspace
    await this.page.keyboard.down('Control');
    await this.page.keyboard.press('a');
    await this.page.keyboard.up('Control');
    await this.page.keyboard.press('Backspace');
    await locator.fill(value);
  }

  /**
   * Ensures a checkbox or toggle element matches the desired state.
   */
  async setCheckbox(locator: Locator, checked: boolean): Promise<void> {
    const currentState = await locator.isChecked();
    if (currentState !== checked) {
      await locator.click();
    }
  }

  /**
   * Selects an option from a dropdown locator by its value attribute.
   */
  async selectOptionByValue(locator: Locator, value: string): Promise<void> {
    await locator.selectOption({ value });
  }

  /**
   * Selects an option from a dropdown locator by its visible label.
   */
  async selectOptionByLabel(locator: Locator, label: string): Promise<void> {
    await locator.selectOption({ label });
  }
}
