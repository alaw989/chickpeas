# Technology Stack

**Analysis Date:** 2026-02-04

## Languages

**Primary:**
- TypeScript 5.8.3 - Primary language for application logic, types, and composables

**Secondary:**
- Vue 3.5.13 - Frontend framework
- HTML/CSS - Client-side markup and styling

## Runtime

**Environment:**
- Node.js 18+ (inferred from Nuxt 3 requirements)

**Package Manager:**
- npm 10+ (specified in package.json)
- Lockfile: package-lock.json (present)

## Frameworks

**Core:**
- Nuxt 3 3.16.2 - Vue-based full-stack framework with hybrid rendering, SSR/SSG
- Vue 3 3.5.13 - Progressive JavaScript framework
- Vue Router 4.5.0 - Client-side routing

**Testing:**
- Vitest 3.2.4 - Unit testing framework with Vite
- Playwright 1.55.0 - E2E testing
- @vue/test-utils 2.4.6 - Vue component testing utilities
- @nuxt/test-utils 3.23.0 - Nuxt-specific testing helpers

**Build/Dev:**
- Vite (via Nuxt) - Build tool and development server
- Nuxt DevTools 3.1.1 - Development assistance
- Sharp 0.34.5 - Image processing
- Happy DOM 20.4.0 - DOM environment for testing

## Key Dependencies

**Critical:**
- @nuxt/content 3.5.1 - Markdown content management (if used for content)
- @nuxt/image 1.10.0 - Image optimization with WebP support
- @tailwindcss/vite 4.1.8 - TailwindCSS integration
- @unhead/vue 2.0.5 - SEO and meta tag management
- vue-toastification 2.0.0-rc.5 - Toast notification system

**Infrastructure:**
- better-sqlite3 12.6.2 - SQLite database (currently unused, appears as dependency)
- leaflet 1.9.4 - Interactive maps
- eslint 9.24.0 - Code linting
- @nuxt/eslint 1.3.0 - Nuxt ESLint integration

## Configuration

**Environment:**
- Nuxt runtime config in `nuxt.config.ts`
- Environment variables: WP_MENU_ENDPOINT, siteUrl, business config, formSpreeEndpoint
- No .env files detected in repository

**Build:**
- Nuxt configuration with TypeScript
- ESLint configuration
- TailwindCSS configuration via @nuxtjs/tailwindcss
- Playwright configuration for E2E tests

## Platform Requirements

**Development:**
- Node.js 18+
- npm 10+
- No special build requirements

**Production:**
- DigitalOcean Droplet deployment (via GitHub Actions)
- PM2 process manager
- Minimum 1GB memory (with 2GB swap)
- Static asset optimization enabled
- CDN-ready static files