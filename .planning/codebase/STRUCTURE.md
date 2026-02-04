# Codebase Structure

**Analysis Date:** 2024-02-04

## Directory Layout

```
/home/deck/Sites/chickpeas/
├── app.vue                 # Root application component
├── nuxt.config.ts         # Nuxt configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration for testing
├── lighthouserc.js        # Lighthouse CI configuration
├── ecosystem.config.cjs   # PM2 production configuration
├── package.json           # Dependencies and scripts
│
├── pages/                 # Page components (routes)
│   ├── index.vue          # Home page
│   ├── menu.vue          # Menu page
│   └── contact.vue        # Contact page
│
├── layouts/               # Layout templates
│   └── default.vue        # Main layout with nav/footer
│
├── components/            # Reusable components
│   ├── sections/          # Page sections
│   │   ├── HomePage.vue   # Home hero section
│   │   ├── ContactForm.vue # Contact form
│   │   └── ContactInfo.vue # Contact information
│   │
│   ├── features/          # Feature components
│   │   ├── navigation/    # Navigation components
│   │   │   └── NavBar.vue
│   │   │
│   │   ├── menu/          # Menu components
│   │   │   ├── Menu.vue   # Main menu component
│   │   │   ├── Breakfast.vue
│   │   │   ├── Appetizers.vue
│   │   │   ├── Dinner.vue
│   │   │   └── ...
│   │   │
│   │   └── footer/        # Footer components
│   │       └── Footer.vue
│
├── composables/          # Reusable logic
│   ├── useMenuData.ts    # Menu data fetching
│   ├── useSiteData.ts    # Site data fetching
│   ├── useBusinessInfo.ts # Business information
│   └── useSchemaOrg.ts   # Schema.org utilities
│
├── server/               # Server-side code
│   ├── api/              # API endpoints
│   │   └── menu.get.ts   # Menu API endpoint
│   └── routes/          # Server routes
│       └── sitemap.xml.get.ts
│
├── public/               # Static assets
│   ├── img/              # Images
│   └── data.json         # Static menu data fallback
│
├── assets/               # Build assets
│   └── css/              # CSS files
│       ├── main.css      # Global styles
│       ├── tailwind.css  # Tailwind styles
│       └── fonts.css     # Font definitions
│
├── tests/                # Test files
│   └── unit/             # Unit tests
│       └── components/   # Component tests
│
├── types/                # TypeScript definitions
├── .planning/            # Planning documents
│   └── codebase/         # Architecture documents
│
├── .output/              # Build output (generated)
├── .nuxt/                # Nuxt build cache (generated)
└── node_modules/         # Dependencies (generated)
```

## Directory Purposes

**pages/:**
- Purpose: Route definitions and page components
- Contains: Vue components that correspond to URL routes
- Key files: `index.vue` (home), `menu.vue` (menu), `contact.vue` (contact)

**components/:**
- Purpose: Reusable Vue components organized by feature
- Contains: Organized component hierarchy (sections, features)
- Key files: `NavBar.vue`, `Footer.vue`, menu components

**composables/:**
- Purpose: Reusable reactive logic and data fetching
- Contains: Clean, decoupled business logic
- Key files: `useMenuData.ts`, `useSiteData.ts`

**server/:**
- Purpose: Server-side API endpoints and routes
- Contains: API handlers, server utilities
- Key files: `menu.get.ts`, `sitemap.xml.get.ts`

**public/:**
- Purpose: Static assets served directly
- Contains: Images, JSON data, static files
- Key files: `data.json` (fallback data)

**layouts/:**
- Purpose: Page layout templates
- Contains: Common UI structure
- Key files: `default.vue` (main layout)

**assets/:**
- Purpose: Source assets processed by build system
- Contains: CSS, fonts, other build assets
- Key files: CSS configuration files

## Key File Locations

**Entry Points:**
- `app.vue`: Root application component
- `pages/index.vue`: Home page
- `layouts/default.vue`: Main layout

**Configuration:**
- `nuxt.config.ts`: Nuxt configuration with SSR, modules, caching
- `tsconfig.json`: TypeScript configuration
- `vite.config.ts`: Testing configuration

**Core Logic:**
- `composables/useMenuData.ts`: Menu data fetching logic
- `server/api/menu.get.ts`: Menu API endpoint

**Testing:**
- `tests/unit/components/`: Component test files

## Naming Conventions

**Files:**
- PascalCase for components: `HomePage.vue`, `NavBar.vue`
- kebab-case for pages: `menu.vue`, `contact.vue`
- camelCase for composables: `useMenuData.ts`

**Directories:**
- kebab-case for feature directories: `navigation`, `menu`, `footer`
- lowercase for utility directories: `composables`, `assets`, `public`

## Where to Add New Code

**New Page:**
- Primary code: `pages/[page-name].vue`
- Layout: Reuses `layouts/default.vue`
- Components: `components/sections/` or `components/features/`

**New Component:**
- Implementation: `components/sections/` (page-specific) or `components/features/` (reusable)
- Styling: Component-scoped CSS or Tailwind classes

**New API Endpoint:**
- Implementation: `server/api/[endpoint].get.ts`
- Testing: `tests/unit/api/`

**New Composable:**
- Implementation: `composables/use[Feature]Data.ts`
- Testing: `tests/unit/composables/`

## Special Directories

**.output/:**
- Purpose: Build artifacts and deployment output
- Generated: Yes (Nuxt build process)
- Committed: No (added to .gitignore)

**.nuxt/:**
- Purpose: Development build cache
- Generated: Yes (during development)
- Committed: No (added to .gitignore)

**public/data.json:**
- Purpose: Static fallback menu data
- Generated: No (manual)
- Committed: Yes (fallback when WordPress unavailable)

---

*Structure analysis: 2024-02-04*
