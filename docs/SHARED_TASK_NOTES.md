# Shared Task Notes

## Project Overview
Chickpeas Mediterranean Kitchen website - Nuxt 3 restaurant site at chickpeas-mobile.com

## Current Status
Most improvements from the initial analysis have been completed. The site is well-structured with strong foundations.

## Recently Completed (This Iteration)
- ✅ Removed unused `@nuxt/ui` dependency from package.json and nuxt.config.ts
- ✅ Fixed ESLint error in server/api/menu.get.ts (unused error variable)

## Previously Completed
- ✅ Added aria-expanded to mobile menu button
- ✅ Added backdrop overlay to mobile menu (click to close)
- ✅ Added scroll lock when mobile menu is open
- ✅ Fixed phone number inconsistency - footer now uses config value
- ✅ Added social media links to footer (Facebook, Instagram)
- ✅ Removed unused old component folders (Home/, Menu/, Header/, Footer/)
- ✅ robots.txt already exists
- ✅ Added unit tests for HomePage, HomeInfo, HomeLocation, HomeGallery components
- ✅ Font display strategy (font-display: swap) already in place
- ✅ Added skip navigation link for keyboard users
- ✅ Added focus management for mobile menu close
- ✅ Fixed online ordering hours in data.json to match restaurant hours
- ✅ Image optimization - hero banner now uses NuxtImg component
- ✅ Moved FormSpree endpoint to nuxt config (formSpreeEndpoint)
- ✅ Added proper TypeScript types - removed all `any` types
- ✅ Removed unused components/Contact.vue (duplicate of ContactForm)
- ✅ Fixed failing unit tests (HomePage and ContactForm tests)
- ✅ Updated openingHours in nuxt.config.ts to match actual hours

## Test Status
- **Unit tests**: 131 tests pass (`npm run test:run`)
- **E2E tests**: BLOCKED by missing system dependencies - requires `sudo npx playwright install-deps`
- **Linting**: Minor style warnings only (attribute ordering, self-closing tags)

## Known False Positive Warning
- `Template ref "hamburgerButton" used on a non-ref value` - This is a known issue with `@nuxt/test-utils` and `<script setup>`. The code is correct for production; it's only a test environment artifact.

## Remaining Low-Priority Items
1. ESLint style warnings (attribute ordering, self-closing tags) - cosmetic only
2. E2E tests unblocked by installing browser deps (requires sudo access)
3. Advanced features (reservations, reviews integration, catering page) - future consideration
