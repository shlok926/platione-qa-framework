# Pull Request Template

## Description
Please include a brief summary of the changes introduced in this PR, along with relevant motivation, context, and issue tickets resolved.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Test Framework / Utility update (no application changes)

## Verification Checklist

### Code Quality & Validation
- [ ] **Typecheck**: Compiled successfully locally (`npm run typecheck`).
- [ ] **Linter**: Passed linter rules cleanly (`npm run lint`).
- [ ] **Formatting**: Ran Prettier formatter.

### Test Coverage Results
- [ ] **API Tests**: Passed locally (`npx playwright test --project=api`).
- [ ] **UI Tests**: Passed locally (`npx playwright test --project=chromium --grep @ui`).
- [ ] **E2E Tests**: Passed locally (`npx playwright test --project=chromium --grep @e2e`).

### Data & Migrations (if applicable)
- [ ] **SQL Migrations**: Tested migration files locally against target database.
- [ ] **Seeders**: Seeded baseline and scenario data successfully (`npm run seed:db`).

## Test Execution Proof
Please attach or paste a terminal execution snippet or screenshot showing successful local runs of the Playwright test suite.
