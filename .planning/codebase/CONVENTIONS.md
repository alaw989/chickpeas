# Coding Conventions

**Analysis Date:** 2026-02-10

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `ContactForm.vue`)
- Test files: `[ComponentName].test.ts` or `[ComponentName].spec.ts`
- Prefix for composables and reusable logic: `use` (e.g., `useMenuData`)

**Functions:**
- camelCase
- Descriptive verbs for actions (e.g., `submitForm`, `handleSubmit`)
- Asynchronous functions prefixed with `async`

**Variables:**
- camelCase
- Descriptive, lowercase
- Avoid single-letter variables
- Prefer full words (e.g., `firstName` over `fName`)

**Types/Interfaces:**
- PascalCase
- Use descriptive, domain-specific names
- Prefix interfaces with `I` (optional but recommended)

## Code Style

**Formatting:**
- Uses ESLint (via `eslint.config.mjs`)
- Follows Nuxt default configuration
- Implicit semicolon usage
- 2-space indentation

**Linting:**
- Vue-specific rules
- TypeScript type checking
- Prevents unused variables
- Enforces consistent import ordering

## Import Organization

**Order:**
1. Vue/Nuxt core imports
2. External library imports
3. Internal imports (components, composables)
4. Type imports

**Path Aliases:**
- `~` refers to project root
- Allows clean, short import paths
- Example: `import ContactForm from '~/components/sections/ContactForm.vue'`

## Error Handling

**Patterns:**
- Use `try`/`catch` for async operations
- Provide user-friendly error messages
- Log errors for debugging
- Graceful degradation of UI on errors

## Logging

**Framework:**
- Console logging during development
- No global logging library detected

**Patterns:**
- Use `console.log()` sparingly
- Prefer structured logging in production
- Remove or comment out debug logs

## Comments

**When to Comment:**
- Complex logic
- Non-obvious algorithmic steps
- API interaction details
- Reason for specific implementation choice

**JSDoc/TSDoc:**
- Type annotations preferred over comments
- Use for function signatures and complex types

## Function Design

**Size:**
- Prefer small, single-responsibility functions
- Maximum recommended length: 20-30 lines
- Extract complex logic into separate functions

**Parameters:**
- Use destructuring for multiple parameters
- Provide default values when possible
- Limit to 3-4 parameters before considering an object

**Return Values:**
- Explicitly typed
- Avoid `any`
- Use union types for multiple possible return types

## Module Design

**Exports:**
- Named exports preferred
- Default exports used for Vue components
- Consistent export pattern within modules

**Barrel Files:**
- Used for grouping related exports
- Simplifies import statements

---

*Convention analysis: 2026-02-10*