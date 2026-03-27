# Testing Patterns

**Analysis Date:** 2026-02-10

## Test Framework

**Runners:**
- Vitest (Unit Testing)
  - Config: `vitest.config.ts`
  - Environment: Nuxt
  - Excludes e2e tests

- Playwright (E2E Testing)
  - Config: `playwright.config.ts`
  - Multi-browser support
  - CI-aware configuration

**Assertion Library:**
- Built-in Vitest assertions
- `expect()` for validations
- Supports mocking and spying

**Run Commands:**
```bash
# Unit Tests
npm run test:unit       # Run unit tests
npm run test:unit:watch # Watch mode

# E2E Tests
npm run test:e2e        # Run end-to-end tests
npm run test:e2e:debug  # Debug E2E tests
```

## Test File Organization

**Location:**
- Unit tests: `tests/unit/`
- E2E tests: `tests/e2e/`

**Naming Convention:**
- Unit: `[ComponentName].test.ts`
- E2E: `[Scenario].spec.ts`

**Structure:**
```
tests/
├── unit/
│   ├── components/
│   │   ├── ContactForm.test.ts
│   │   └── NavBar.test.ts
│   └── composables/
│       └── useMenuData.test.ts
└── e2e/
    ├── navigation.spec.ts
    ├── mobile.spec.ts
    └── menu.spec.ts
```

## Test Suite Organization

**Typical Structure:**
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup before each test
  })

  describe('rendering', () => {
    // Tests for component rendering
  })

  describe('interactions', () => {
    // Tests for user interactions
  })

  describe('edge cases', () => {
    // Tests for unexpected scenarios
  })
})
```

## Mocking

**Framework:**
- Vitest built-in mocking
- `vi.fn()` for function mocks
- `vi.mocked()` for typed mocks

**Patterns:**
```typescript
// Global fetch mock example
global.fetch = vi.fn()

// Mocking a resolved value
vi.mocked(fetch).mockResolvedValue({
  ok: true,
  json: async () => ({})
})
```

**What to Mock:**
- External API calls
- Complex dependencies
- Global browser APIs
- Time-dependent functions

**What NOT to Mock:**
- Simple utility functions
- Pure computational logic
- Component internals when possible

## Fixtures and Test Data

**Test Data:**
- Inline test data in test files
- Minimal, representative datasets
- Covers various scenarios (valid, invalid inputs)

**Location:**
- Directly within test files
- No centralized test data management detected

## Coverage

**Requirements:**
- No explicit coverage threshold detected
- Recommend setting up coverage reporting

**View Coverage:**
```bash
npm run test:coverage
```

## Test Types

**Unit Tests:**
- Component rendering
- Interaction handling
- Form validation
- State management
- Composable logic

**Integration Tests:**
- Component interaction
- Data flow between components

**E2E Tests:**
- Browser navigation
- Mobile responsiveness
- User journey scenarios
- CI-integrated testing

## Common Patterns

**Async Testing:**
```typescript
it('handles async operations', async () => {
  const result = await asyncFunction()
  expect(result).toBeTruthy()
})
```

**Error Testing:**
```typescript
it('handles errors gracefully', async () => {
  vi.mocked(fetch).mockRejectedValue(new Error('Network error'))
  await expect(submitForm()).rejects.toThrow()
})
```

## Notable Practices

- Comprehensive form validation tests
- Mocking global APIs
- Testing loading and error states
- Simulating user interactions
- Browser and device compatibility testing

---

*Testing analysis: 2026-02-10*