# Coding Conventions

**Analysis Date:** 2024-06-18

## Naming Patterns

**Files:**
- Components: PascalCase ending with `.vue` (e.g., `ContactForm.vue`, `Menu.vue`)
- Composables: camelCase starting with `use` (e.g., `useMenuData.ts`, `useSiteData.ts`)
- Test files: PascalCase ending with `.test.ts` or `.spec.ts` (e.g., `ContactForm.test.ts`, `useMenuData.test.ts`)
- Server routes: kebab-case ending with `.get.ts` (e.g., `menu.get.ts`, `sitemap.xml.get.ts`)

**Functions:**
- Composable functions: camelCase starting with `use` (e.g., `useMenuData`)
- Regular functions: camelCase (e.g., `submit`, `validateForm`, `notifySuccess`)
- Private functions: camelCase prefixed with underscore (e.g., `_helperFunction`)

**Variables:**
- Reactivity variables: camelCase (e.g., `loading`, `ok`, `err`, `form`)
- Constants: UPPER_SNAKE_CASE (e.g., `mockMenuData`)
- Props: camelCase (e.g., `menuData`, `isLoading`, `loadError`)
- Refs/Reactive: camelCase (e.g., `data.value`, `error.value`)

**Types:**
- Type definitions: PascalCase (e.g., `FormState`, `MenuItem`, `MenuDataResponse`)
- Interface names: PascalCase (e.g., `interface MenuItem`)
- Union types: PascalCase (e.g., `string | number`)

## Code Style

**Formatting:**
- **Tool:** ESLint via @nuxt/eslint module
- **Indentation:** 2 spaces
- **Semicolons:** Not used (Nuxt default)
- **Quotes:** Single quotes for strings
- **Braces:** K&R style for JS/TS, K&R style for Vue script sections

**Vue Template Conventions:**
- Use `@submit.prevent` instead of `@submit.prevent="submit"`
- Component classes: kebab-case (e.g., `contact-form`, `menu-header`)
- IDs: kebab-case (e.g., `firstName`, `lastName`)
- Scoped styles: `<style scoped>`
- CSS class naming: kebab-case with utility prefixes (e.g., `button-dark`, `form-field`)

**Script Setup:**
```typescript
<script lang="ts" setup>
// Use <script setup> syntax
const loading = ref(false)
const form = reactive<FormState>({
  firstName: '',
  lastName: ''
})
</script>
```

**Imports:**
- Nuxt composables: `~/` prefix (e.g., `useNuxtApp()`, `useRuntimeConfig()`)
- Relative imports: `./` or `../` (e.g., `~/components/ContactForm.vue`)
- Third-party libraries: no prefix (e.g., `vue`, `vitest`)

## Import Organization

**Order:**
1. Nuxt composables
2. Third-party imports
3. Local imports with `~/` prefix

**Pattern:**
```typescript
// Nuxt composables
const { $toast } = useNuxtApp()
const config = useRuntimeConfig()

// Third-party imports
import { vi } from 'vitest'

// Local imports
import ContactForm from '~/components/sections/ContactForm.vue'
```

## Error Handling

**Patterns:**
- Use `try/catch` for async operations
- Transform errors for better UX
- Provide meaningful error messages
- Log errors with context

**Example:**
```typescript
try {
  await $fetch(endpoint, {
    method: 'POST',
    body: payload
  })
  ok.value = true
} catch (error: unknown) {
  let errMsg = 'Something went wrong.'
  const fetchError = error as { data?: { errors?: Array<{ message: string }> }; message?: string }
  if (fetchError?.data?.errors?.[0]?.message) {
    errMsg = fetchError.data.errors[0].message
  } else if (fetchError?.message) {
    errMsg = fetchError.message
  }
  err.value = errMsg
  notifyError(errMsg)
}
```

## Logging

**Framework:** Console logging with structured messages

**Patterns:**
- Use square brackets for contextual logging
- Include error details with context
- Format: `[ComponentName] Message`

**Example:**
```typescript
console.error('[useMenuData] Failed to fetch menu data:', result.error.value)
console.error('[useMenuData] Invalid menu data format:', typeof data)
```

## Comments

**When to Comment:**
- Complex business logic
- Non-obvious behavior
- API response handling
- Performance-critical sections
- TODO/FIXME items

**JSDoc/TSDoc:**
- Use for composables and complex functions
- Include parameters and return types
- Example usage

**Example:**
```typescript
/**
 * Fetches menu data with error handling and caching
 * Uses useAsyncData for SSR support and automatic caching
 */
export const useMenuData = (): MenuDataResponse => {
  // implementation
}
```

## Function Design

**Size:** Functions should be focused and under 50 lines
- Composables: Single responsibility
- Component methods: Handle specific interactions
- Validation functions: Pure functions

**Parameters:** Keep parameter lists small (3-5 max)
- Use object parameters for complex data
- Default parameters for optional values

**Return Values:**
- Composables: Return reactive refs and methods
- Component methods: Return void or promises
- Validation functions: Return booleans

## Module Design

**Exports:**
- Composables: Named exports only
- Components: Default exports
- Utils: Named exports

**Barrel Files:** Not used in this codebase

**Type Safety:**
- Define interfaces for data structures
- Use TypeScript types for function signatures
- Type assertions for unknown values

---

*Convention analysis: 2024-06-18*
```