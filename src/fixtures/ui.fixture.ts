import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../ui/pages/login.page';
import { DashboardPage } from '../ui/pages/dashboard.page';
import { ContactsPage } from '../ui/pages/contacts.page';
import { ContactDetailPage } from '../ui/pages/contact-detail.page';
import { mockAPIServer } from '../api/mock/mock-api-server';
import { FormHelper } from '../ui/helpers/form.helper';
import { NavigationHelper } from '../ui/helpers/navigation.helper';

export interface UIFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  contactsPage: ContactsPage;
  contactDetailPage: ContactDetailPage;
  formHelper: FormHelper;
  navHelper: NavigationHelper;
}

export const uiTest = baseTest.extend<UIFixtures>({
  page: async ({ page }, use) => {
    // Intercept browser page navigation and API calls
    await mockAPIServer.setupMockRoutes(page);
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    const pageObj = new LoginPage(page);
    await use(pageObj);
  },

  dashboardPage: async ({ page }, use) => {
    const pageObj = new DashboardPage(page);
    await use(pageObj);
  },

  contactsPage: async ({ page }, use) => {
    const pageObj = new ContactsPage(page);
    await use(pageObj);
  },

  contactDetailPage: async ({ page }, use) => {
    const pageObj = new ContactDetailPage(page);
    await use(pageObj);
  },

  formHelper: async ({ page }, use) => {
    const helper = new FormHelper(page);
    await use(helper);
  },

  navHelper: async ({ page }, use) => {
    const helper = new NavigationHelper(page);
    await use(helper);
  },
});
