# Architecture

**Analysis Date:** 2026-02-10

## Pattern Overview

**Overall:** Nuxt 3 Modular Architecture
- Server-Side Rendering (SSR) with Static Site Generation (SSG) capabilities
- Lightweight, performance-focused design
- Decoupled frontend with server-side API endpoints

## Layers

**Frontend Layer:**
- Purpose: Render user interface and manage client-side interactions
- Location: `pages/`, `components/`, `layouts/`
- Contains: Vue components, page definitions, UI elements
- Depends on: Nuxt composables, server API
- Used by: User browser

**Server Layer:**
- Purpose: Handle data fetching, API endpoints, server-side logic
- Location: `server/api/`, `server/middleware/`
- Contains: Server-side route handlers, data transformations
- Depends on: Runtime configuration, external services
- Used by: Frontend, external API consumers

**Data Layer:**
- Purpose: Manage application data and state
- Location: `composables/`, `plugins/`
- Contains: Data fetching logic, state management utilities
- Depends on: Server API, external data sources
- Used by: Frontend components

## Data Flow

**Menu Data Retrieval:**
1. Client requests menu via `useMenuData()` composable
2. Nuxt server fetches data from WordPress endpoint or fallback JSON
3. Transformed menu data returned to client
4. Data cached server-side for 5 minutes (ISR strategy)

## Key Abstractions

**Menu Data Transformation:**
- Purpose: Standardize menu item structure
- Location: `server/api/menu.get.ts`
- Pattern: Data mapping and normalization
- Handles multiple data sources (WordPress, static JSON)

**Configuration Management:**
- Purpose: Centralized application configuration
- Location: `nuxt.config.ts`
- Pattern: Runtime and public configuration separation

## Entry Points

**Frontend Entry:**
- Location: `app.vue`
- Triggers: Initial page load
- Responsibilities: Root component, layout management

**API Entry:**
- Location: `server/api/menu.get.ts`
- Triggers: Menu data requests
- Responsibilities: Fetch and transform menu data

## Error Handling

**Strategy:** Graceful degradation
- Fallback to static data if external API fails
- Centralized error creation with `createError()`

## Cross-Cutting Concerns

**Logging:** Plausible Analytics integration
**Performance Optimization:**
- Lazy component loading
- Payload extraction
- Asset compression
**SEO:** Prerender critical pages
**Caching:** Intelligent server-side caching strategies

---

*Architecture analysis: 2026-02-10*