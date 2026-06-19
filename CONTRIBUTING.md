# Contributing to Platione QA Framework

This guide outlines the conventions, patterns, and workflows to follow when contributing to the Platione Sales Assist QA Automation Framework.

---

## How to Add a New API Test

To add a new API integration test for a resource (e.g. Contacts):

1. **Leverage the Factory** to generate dynamic test payloads.
2. **Inject the Client** through Playwright fixtures.
3. **Execute Requests** via the client method.
4. **Assert Responses** using the `APIResponseValidator` and/or Playwright expect matches.

### Real Code Example (`tests/api/contacts/create-contact.spec.ts`)
```typescript
import { test } from '../../../src/fixtures';
import { ContactFactory } from '../../../src/data/factories/contact.factory';
import { APIResponseValidator } from '../../../src/api/validators/response.validator';

test.describe('Contact Creation API Tests', () => {
  test('@smoke @api POST /api/v1/contacts should create a new contact successfully', async ({ contactClient }) => {
    // 1. Build test data using the Factory
    const payload = ContactFactory.build();

    // 2. Call the API Client
    const response = await contactClient.createContact(payload);

    // 3. Validate status code and shape
    APIResponseValidator.expectStatus(response, 201);
    await APIResponseValidator.expectContactShape(response);
  });
});
```

---

## How to Add a New Page Object

UI tests utilize the Page Object Model (POM) pattern. All page objects must extend `BasePage` and declare selectors as type `Locator`.

1. **Create Page Object**: Inherit `BasePage` and pass the page reference along with the route suffix.
2. **Define Selectors**: Declare selectors using `this.page.locator` or `this.page.getByTestId` inside the constructor.
3. **Expose Actions**: Add public async methods performing user actions.
4. **Register Fixture**: Define the page in `src/fixtures/ui.fixture.ts` for clean test injections.

### Real Code Example (`src/ui/pages/contacts.page.ts`)
```typescript
import { Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { ModalComponent } from '../components/modal.component';

export class ContactsPage extends BasePage {
  readonly createContactButton: Locator;
  readonly createModal: ModalComponent;

  constructor(page: any) {
    super(page, '/contacts');
    this.createContactButton = this.page.getByTestId('create-contact-btn');
    this.createModal = new ModalComponent(this.page, 'create-contact-modal');
  }

  async openCreateModal(): Promise<void> {
    await this.createContactButton.click();
    await this.createModal.waitForVisible();
  }
}
```

---

## How to Add a New Factory

Factories generate mock payloads using `@faker-js/faker`. They live in `src/data/factories/`.

1. **Specify Entity Type**: Use type definitions in `src/types/`.
2. **Implement build()**: Provide realistic default properties.
3. **Support Overrides**: Accept `Partial<T>` and spread it at the end to allow test customization.
4. **Implement buildMany()**: Support multi-record generation.

### Real Code Example (`src/data/factories/contact.factory.ts`)
```typescript
import { faker } from '@faker-js/faker';
import { ContactPayload } from '../../types';

export class ContactFactory {
  /**
   * Builds a single Contact payload.
   */
  static build(overrides?: Partial<ContactPayload>): ContactPayload {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.helpers.fromRegExp(/\+91[6-9]\d{9}/), // Formatted Indian mobile number
      company: faker.company.name(),
      status: faker.helpers.arrayElement(['active', 'inactive']),
      ...overrides,
    };
  }

  /**
   * Builds an array of Contact payloads.
   */
  static buildMany(count: number, overrides?: Partial<ContactPayload>): ContactPayload[] {
    return Array.from({ length: count }, () => this.build(overrides));
  }
}
```

---

## Commit Message Convention

We enforce standard conventional commits format:
* `feat:` — Introducing new test files, seeders, or framework utilities.
* `fix:` — Correcting selector definitions, flaky assertions, or compilation issues.
* `test:` — Editing existing test specifications or adding verification scenarios.
* `docs:` — Documenting guides, readmes, or code comments.
* `chore:` — Modifying configuration files, dependencies, or workspace parameters.

*Example:* `feat: add action api client and integration test spec`

---

## Test Tagging Rules

Every test script must declare appropriate metadata tags within the description string:
* `@smoke` — Critical path user journeys (e.g. login, smoke E2E pipeline gates).
* `@regression` — Complete coverage verification representing thorough boundary and negative scenarios.
* `@api` — HTTP backend API integration checks.
* `@ui` — Page component/layout visual and interactive checks.
* `@e2e` — Multi-system user workflow runs.

---

## PR Checklist

Ensure your branch complies with these criteria before opening a PR:
- [ ] **Data Cleanup**: Seeded items call the appropriate `seeder.cleanup()` or DB deletion hook.
- [ ] **Dependency Injection**: Test scripts use page objects/clients injected from fixtures, avoiding manual instantiations.
- [ ] **Tagging**: Test descriptions declare either `@smoke` or `@regression` along with layer tags (`@api`/`@ui`/`@e2e`).
- [ ] **Linter check**: Running `npm run lint` passes with 0 warnings or errors.
- [ ] **Typecheck**: Running `npm run typecheck` resolves with 0 compilation warnings.
