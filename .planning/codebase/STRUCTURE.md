# Codebase Structure

**Analysis Date:** 2026-02-10

## Directory Layout

```
chickpeas/
├── .output/           # Nuxt build output
├── .nuxt/             # Nuxt dev/build temporary files
├── assets/            # Static assets
│   ├── css/           # Global stylesheets
│   └── fonts/         # Web fonts
├── components/        # Vue components
│   ├── HomePage/      # Home page specific components
│   ├── Menu/          # Menu page components
│   └── NavBar/        # Navigation components
├── composables/       # Nuxt composables (Vue logic)
├── layouts/           # Application layouts
├── pages/             # Page route components
├── plugins/           # Vue/Nuxt plugins
├── public/            # Publicly served files
│   ├── data/          # Static data files
│   └── img/           # Images and graphics
├── server/            # Server-side code
│   └── api/           # API route handlers
└── tests/             # Test suites
    ├── e2e/           # End-to-end tests
    └── unit/          # Unit and component tests
```

## Directory Purposes

**`assets/`:**
- Purpose: Static design resources
- Contains: CSS, fonts, design tokens
- Key files:
  - `css/main.css`: Global styles
  - `css/tailwind.css`: Tailwind CSS configuration

**`components/`:**
- Purpose: Reusable UI components
- Contains: Vue component definitions
- Organized by feature/page

**`composables/`:**
- Purpose: Shared Vue logic and data fetching
- Contains: Reusable reactive functions
- Key files:
  - `useMenuData.ts`: Menu data retrieval logic

**`pages/`:**
- Purpose: Page route components
- Contains: Vue components that define page routes
- Follows Nuxt file-based routing

**`server/api/`:**
- Purpose: Server-side API endpoints
- Contains: Serverless route handlers
- Key files:
  - `menu.get.ts`: Menu data API endpoint

**`tests/`:**
- Purpose: Application testing
- Contains: Unit, component, and E2E tests
- Organized by test type and feature

## Key File Locations

**Entry Points:**
- `app.vue`: Root application component
- `nuxt.config.ts`: Nuxt configuration
- `server/api/menu.get.ts`: Menu data API handler

**Configuration:**
- `nuxt.config.ts`: Primary configuration
- `.env`: Environment variables

**Core Logic:**
- `composables/useMenuData.ts`: Data fetching
- `server/api/menu.get.ts`: Data transformation

**Testing:**
- `tests/unit/`: Component and function tests
- `tests/e2e/`: Browser-based tests

## Naming Conventions

**Files:**
- Lowercase with hyphens: `menu-item.vue`
- Composables prefixed with `use`: `useMenuData.ts`
- API routes: `resource.method.ts`

**Directories:**
- Kebab-case for feature groups
- Noun or feature name

## Where to Add New Code

**New Feature:**
- Components: `components/`
- Page: `pages/`
- Server Logic: `server/api/`
- Shared Logic: `composables/`

**New Component:**
- Implementation: `components/`
- Tests: `tests/unit/`

**Utilities:**
- Shared helpers: Create in `composables/`
- Avoid utility-only files

---

*Structure analysis: 2026-02-10*