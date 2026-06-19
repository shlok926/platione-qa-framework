import { Page, TestInfo } from '@playwright/test';
import path from 'path';

export class ScreenshotUtils {
  /**
   * Captures a full-page screenshot and attaches it directly to the Playwright test report.
   */
  static async captureAndAttach(page: Page, testInfo: TestInfo, name: string = 'screenshot'): Promise<void> {
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const filename = `${sanitizedName}_${Date.now()}.png`;
    const screenshotPath = path.join(testInfo.outputDir, filename);

    // Take the full-page screenshot
    const buffer = await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    // Attach to the current Playwright test report
    await testInfo.attach(name, {
      body: buffer,
      contentType: 'image/png',
    });
  }
}
