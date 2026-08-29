# Codebase Concerns

**Analysis Date:** 2026-02-04

## Tech Debt

**Large Menu Component Complexity:**
- Issue: `components/features/menu/Menu.vue` is 554 lines and handles too many responsibilities
- Files: `components/features/menu/Menu.vue`
- Impact: Difficult to maintain, test, and understand; high cognitive load
- Fix approach: Split into smaller components (MenuHeader, MenuCategories, MenuItemCard) and extract logic into composables

**Raw WordPress Data Handling:**
- Issue: Components directly consume WordPress API responses without data transformation layer
- Files: `components/features/menu/Breakfast.vue`, `components/features/menu/Dinner.vue`, `components/features/menu/Appetizers.vue`
- Impact: Inconsistent data handling, UI errors when data is malformed, tight coupling to WordPress structure
- Fix approach: Create data transformation service in composables, normalize data structure, add type safety

## Known Bugs

**Schema Generation Data Loss:**
- Symptoms: Schema.org markup fails when menu data is empty
- Files: `composables/useSchemaOrg.ts:97`
- Trigger: Empty menu array passed to menuSchema function
- Workaround: Function returns null instead of gracefully handling empty state

**Error State Display Inconsistency:**
- Symptoms: Different components show different error formats
- Files: `components/features/menu/Breakfast.vue`, `components/features/menu/Dinner.vue`, `components/features/menu/Appetizers.vue`
- Trigger: API failures
- Workaround: Each component handles error display differently

## Security Considerations

**Formspree Endpoint Hardcoded:**
- Risk: External service dependency could break or change
- Files: `nuxt.config.ts:38`, `tests/unit/components/ContactForm.test.ts`
- Current mitigation: Uses public config with specific form ID
- Recommendations: Add validation and fallback for external service

**Missing Environment Validation:**
- Risk: Config values used without validation
- Files: `nuxt.config.ts`
- Current mitigation: No validation, uses defaults
- Recommendations: Add schema validation for runtime config

## Performance Bottlenecks

**Excessive Console Logging:**
- Problem: 75+ files contain console statements in production
- Files: Throughout components directory
- Cause: Debug statements not removed
- Improvement path: Remove or conditionally disable console statements

**Large Component File Sizes:**
- Problem: Several components exceed 200 lines
- Files: `components/features/menu/Menu.vue` (554 lines), `components/sections/HomeLocation.vue` (353 lines)
- Cause: Multiple responsibilities in single components
- Improvement path: Split into smaller, focused components

## Fragile Areas

**Form Submission Logic:**
- Files: `components/sections/ContactForm.vue`
- Why fragile: Tightly coupled to external Formspree API, handles multiple async states
- Safe modification: Extract form logic into composable, add interface for service layer
- Test coverage: Good unit test coverage exists in `tests/unit/components/ContactForm.test.ts`

**Menu Data Loading:**
- Files: Multiple menu components
- Why fragile: Depends on WordPress API structure, no caching layer
- Safe modification: Add data transformation layer, implement retry logic
- Test coverage: Partial coverage in `tests/unit/composables/useMenuData.test.ts`

## Scaling Limits

**Client-Side Menu Rendering:**
- Current capacity: Limited by JavaScript execution
- Limit: Large menus may cause performance issues
- Scaling path: Implement server-side rendering or pagination

**Static Asset Loading:**
- Current capacity: Multiple external dependencies (Leaflet, Plausible)
- Limit: Could impact page load time
- Scaling path: Implement lazy loading for external scripts

## Dependencies at Risk

**Formspree External Service:**
- Risk: Third-party service could be discontinued or change pricing
- Impact: Contact form functionality breaks
- Migration plan: Implement fallback to native email submission or other form service

**WordPress API Dependency:**
- Risk: WordPress site could go down or change API structure
- Impact: Menu data becomes unavailable
- Migration plan: Implement local fallback data, add caching layer

## Missing Critical Features

**Loading State Management:**
- Problem: No centralized loading state management
- Blocks: Consistent user experience during data fetching
- Priority: Medium

**Error Boundary Component:**
- Problem: No error boundary to catch and display errors gracefully
- Blocks: Poor UX when components fail
- Priority: High

**Performance Monitoring:**
- Problem: No performance metrics collection
- Blocks: Cannot identify performance issues
- Priority: Low

## Test Coverage Gaps

**Component Integration Testing:**
- What's not tested: Component interactions and data flow
- Files: Most component files
- Risk: Changes could break complex component interactions
- Priority: Medium

**End-to-End Testing:**
- What's not tested: Full user flows (menu browsing, contact submission)
- Files: No E2E tests found
- Risk: User flows could break without detection
- Priority: High

**Accessibility Testing:**
- What's not tested: ARIA labels, keyboard navigation, screen reader support
- Files: All components
- Risk: Inaccessible user experience
- Priority: Medium

*Concerns audit: 2026-02-04*