# Architecture

**Analysis Date:** 2024-02-04

## Pattern Overview

**Overall:** Server-Side Rendered (SSR) Vue.js Application with Nuxt 3

**Key Characteristics:**
- Component-based architecture with lazy loading
- SSR with static generation for performance
- API-first data fetching with caching
- Responsive design with Tailwind CSS
- Progressive enhancement approach

## Layers

**Presentation Layer:**
- Purpose: User interface components and page layouts
- Location: `pages/`, `components/`, `layouts/`
- Contains: Vue components, pages, layout templates
- Depends on: composables, runtime config
- Used by: Nuxt router and rendering engine

**Business Logic Layer:**
- Purpose: Data fetching, state management, and business rules
- Location: `composables/`
- Contains: Data fetching utilities, transformations, business logic
- Depends on: Nuxt useAsyncData, runtime config
- Used by: Presentation layer components

**Data Access Layer:**
- Purpose: API endpoints and data transformation
- Location: `server/api/`
- Contains: Serverless API functions, data mapping, caching headers
- Depends on: WordPress API or static JSON files
- Used by: Business logic layer via HTTP requests

**Infrastructure Layer:**
- Purpose: Configuration, routing, and build setup
- Location: `nuxt.config.ts`, `tsconfig.json`, `vitest.config.ts`
- Contains: Nuxt configuration, TypeScript setup, testing config
- Depends on: Node.js, Nuxt modules
- Used by: All layers

## Data Flow

**Page Load Flow:**

1. **Request**: User accesses page (e.g., `/menu`)
2. **Server/SSR**: Nuxt processes request, executes `useAsyncData`
3. **API Call**: Composable calls `/api/menu.get.ts` server-side
4. **Data Source**: WordPress API or static JSON (`public/data.json`)
5. **Transformation**: API endpoint normalizes data format
6. **SSR Response**: Page renders with fetched data
7. **Client Hydration**: Interactive features become available

**Error Handling Flow:**
- Fallback UI shown during loading state
- Retry mechanism for failed API calls
- Graceful degradation when WordPress unavailable
- Static JSON backup for API failures

## Key Abstractions

**Composables:**
- Purpose: Reusable data fetching and business logic
- Examples: `useMenuData()`, `useSiteData()`, `useBusinessInfo()`
- Pattern: Composable functions using Nuxt's useAsyncData

**API Endpoints:**
- Purpose: Data access layer with caching and transformations
- Examples: `/api/menu.get.ts`, `/sitemap.xml.get.ts`
- Pattern: Serverless functions with proper HTTP headers

**Components:**
- Purpose: Reusable UI elements with scoped logic
- Examples: `HomePage.vue`, `ContactForm.vue`, `Menu.vue`
- Pattern: Async loading with proper TypeScript support

## Entry Points

**Main Application:**
- Location: `app.vue`
- Triggers: Nuxt lifecycle
- Responsibilities: Layout wrapper, route management

**Page Routes:**
- Location: `pages/index.vue`, `pages/menu.vue`, `pages/contact.vue`
- Triggers: User navigation
- Responsibilities: Page-specific composition and SEO

**Layout:**
- Location: `layouts/default.vue`
- Triggers: All page routes
- Responsibilities: Common structure (nav, footer, skip links)

**API Entry:**
- Location: `server/api/`
- Triggers: Component data fetching
- Responsibilities: Data retrieval and transformation

## Error Handling

**Strategy:** Progressive degradation with fallback content

**Patterns:**
- Loading states with pending/refresh logic
- Error boundaries for API failures
- Static data backup for external service failures
- User-friendly error messages
- Retry mechanisms for recoverable errors

## Cross-Cutting Concerns

**SEO:**
- Server-side meta tags and structured data
- Dynamic schema.org markup
- Canonical URLs and Open Graph tags

**Performance:**
- Server-side rendering
- Route-based caching headers
- Image optimization with WebP format
- Lazy loading of components

**Accessibility:**
- Semantic HTML5 structure
- Skip navigation links
- ARIA attributes and keyboard navigation
- Focus management

---

*Architecture analysis: 2024-02-04*
