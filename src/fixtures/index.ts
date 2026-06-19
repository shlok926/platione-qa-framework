import { mergeTests } from '@playwright/test';
import { dataTest } from './data.fixture';
import { uiTest } from './ui.fixture';
import { authTest } from './auth.fixture';

export const test = mergeTests(dataTest, uiTest, authTest);
export { expect } from '@playwright/test';
