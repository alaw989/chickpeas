# Technology Stack

**Analysis Date:** 2026-02-10

## Languages

**Primary:**
- TypeScript 5.8.3 - Primary language for type-safe development
- Vue 3.5.13 - Frontend framework
- HTML5/CSS3 - Markup and styling

**Secondary:**
- JavaScript (via Vue) - Runtime language

## Runtime

**Environment:**
- Node.js - Specified by Nuxt 3.16.2
- Module type: ECMAScript Modules (ESM)

**Package Manager:**
- npm - Default for package.json
- Lockfile: package-lock.json (implied)

## Frameworks

**Core:**
- Nuxt 3.16.2 - Vue.js meta-framework
- Vue 3.5.13 - Frontend framework
- Vue Router 4.5.0 - Client-side routing
- Tailwind CSS 4.1.8 - Utility-first CSS framework

**Testing:**
- Vitest 3.2.4 - Unit and component testing
- Playwright 1.58.1 - End-to-end testing
- Vue Test Utils 2.4.6 - Vue testing utilities

**Build/Dev:**
- Vite - Build tool (via Nuxt)
- ESLint 9.24.0 - Code linting

## Key Dependencies

**Critical:**
- Axios 1.11.0 - HTTP client
- Better SQLite3 12.6.2 - Local database
- Leaflet 1.9.4 - Interactive maps
- Vue Toastification 2.0.0 - Notification system

**Infrastructure:**
- @nuxt/content 3.5.1 - Content management
- @nuxt/image 1.10.0 - Image optimization
- @nuxt/fonts - Font management
- @nuxt/icon - Icon system
- Plausible Analytics - Privacy-focused analytics

## Configuration

**Environment:**
- `.env` file support (implied by Nuxt configuration)
- Runtime config with public and server-only settings

**Build:**
- Nuxt configuration in `nuxt.config.ts`
- Tailwind configuration (implied)
- Vite build optimizations

## Platform Requirements

**Development:**
- Node.js 18+ (inferred from Nuxt 3)
- npm 8+

**Production:**
- Static site generation or server-side rendering
- Deployment targets: Vercel, Netlify, or similar JAMstack platforms

---

*Stack analysis: 2026-02-10*