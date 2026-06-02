# Chickpeas Mediterranean Kitchen

## Tech Stack
- **Framework**: Nuxt 3, Vue 3 (Composition API), TypeScript
- **Styling**: Tailwind CSS (v4) with `@tailwindcss/vite`
- **CMS**: WordPress headless via REST API (menu data)
- **Maps**: Leaflet
- **Forms**: Formspree
- **Analytics**: Plausible (privacy-friendly)
- **Testing**: Vitest (unit), Playwright (E2E)
- **Deploy**: GitHub Actions (build on CI) → rsync to DigitalOcean droplet → PM2 restart

## Commands
```bash
npm run dev                # Development server (localhost:3000)
npm run build              # Production build
npm run generate           # Static site generation
npm run preview            # Preview production build
npm run test               # Run unit tests (vitest)
npm run test:run           # Run tests once (CI mode)
npm run test:e2e           # E2E tests (Playwright)
```

## Architecture
- Server-side rendering for SEO (restaurant site — Google discoverability is critical)
- ISR (Incremental Static Regeneration) on menu page with 5-minute revalidation
- Menu data fetched from WordPress REST API (`_embed` param for featured images), with bundled `data.json` as static fallback
- Menu images: WP featured media transformed to `{ guid: source_url }` in `server/api/menu.get.ts`
- Aggressive caching: 1-year headers for static assets, critical resource preloading
- Image optimization: WebP/AVIF via `@nuxt/image`, responsive sizing
- Code splitting: separate chunks for Leaflet and Vue core
- Map uses custom chickpea favicon as pin marker (`/img/chickpea-icon.webp`)

## Pages
- `/` — Home (hero, featured items, gallery, map)
- `/menu` — Dynamic menu by category (Breakfast, Appetizers, Dinner, etc.)
- `/contact` — Contact form (Formspree) and restaurant info

## Environment
Optional: `WP_MENU_ENDPOINT` (defaults to the live WordPress API). No other env vars required for local dev.

## Conventions
- Vue 3 Composition API (`<script setup>`)
- Tailwind CSS utility classes — no custom CSS files
- Restaurant schema markup for SEO (structured data in page head)
- Mobile-first responsive design
