# Chickpeas Mediterranean Kitchen

Restaurant website for [Chickpeas Mediterranean Kitchen](https://chickpeas-mobile.com), a Mediterranean and Lebanese restaurant in Mobile, AL. Built with Nuxt 3 for server-side rendering, fast performance, and SEO optimization.

## What It Does

- **Restaurant landing page** — introduction, featured items, photo gallery, and location
- **Menu display** — dynamically loaded from WordPress REST API, with a static JSON fallback if the API is unavailable
- **Contact page** — contact form (Formspree integration) and restaurant information
- **Online ordering** — DoorDash integration links
- **SEO** — rich schema markup for restaurants and menus, auto-generated sitemap, Open Graph meta tags

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 3, Vue 3 (Composition API), TypeScript |
| Styling | Tailwind CSS (v4) |
| CMS | WordPress (headless, REST API) |
| Maps | Leaflet |
| Forms | Formspree |
| Analytics | Plausible (privacy-friendly) |
| Testing | Vitest (unit), Playwright (E2E) |
| Deploy | DigitalOcean App Platform, PM2 |

## Pages

- `/` — Home page with hero, featured items, gallery, and map
- `/menu` — Full menu with categories (Breakfast, Appetizers, Dinner, etc.)
- `/contact` — Contact form and restaurant info

## Setup

```bash
npm install
cp .env.example .env     # Set WP_MENU_ENDPOINT (optional, has a default)
npm run dev              # http://localhost:3000
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `WP_MENU_ENDPOINT` | `https://wp.chickpeas-mobile.com/wp-json/wp/v2/menu_item?per_page=100&order=asc` | WordPress REST API endpoint for menu data |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |

## Key Architecture Decisions

- **Dynamic menu with static fallback** — menu data is fetched from WordPress at build time with a 5-minute ISR revalidation interval. If the API is down, a bundled `data.json` serves as the fallback.
- **Aggressive caching** — 1-year cache headers for static assets, critical resource preloading, code splitting for Leaflet and Vue core
- **Image optimization** — WebP/AVIF formats with responsive sizing via `@nuxt/image`
- **ISR (Incremental Static Regeneration)** — menu page revalidates every 5 minutes for fresh content without full rebuilds

## License

Private project.
