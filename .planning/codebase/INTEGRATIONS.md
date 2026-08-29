# External Integrations

**Analysis Date:** 2026-02-04

## APIs & External Services

**WordPress API:**
- WordPress REST API - Menu data integration
  - Endpoint: WP_MENU_ENDPOINT (configurable, defaults to https://wp.chickpeas-mobile.com/wp-json/wp/v2/menu_item?per_page=100&order=asc)
  - SDK/Client: Native $fetch from Nuxt
  - Usage: Fetches menu items with categories, descriptions, prices
  - Fallback: Static JSON file in public/data.json

**Static Data:**
- Static JSON menu data - Fallback when WordPress API unavailable
  - Location: `public/data.json`
  - Usage: Transformed to match WordPress API format

## Data Storage

**Databases:**
- SQLite (better-sqlite3) - Listed as dependency but not currently used in codebase
- No other database integrations detected

**File Storage:**
- Local filesystem - Static assets stored in `/public` directory
- Image optimization via @nuxt/image

**Caching:**
- Nuxt nitro cache headers - Static assets with long cache (1 year)
- API response caching - 5-minute client cache, 1-minute server cache for menu data

## Authentication & Identity

**Auth Provider:**
- No authentication system detected
- Public-facing restaurant website

## Monitoring & Observability

**Error Tracking:**
- None detected - No Sentry, Bugsnag, or similar services

**Logs:**
- Console logging - Basic error logging in composables
- No structured logging system

## CI/CD & Deployment

**Hosting:**
- DigitalOcean Droplet - Production deployment
- GitHub Actions workflow - Automated deployment on push to main

**CI Pipeline:**
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Steps: SSH deployment, npm install, build with increased heap size, PM2 restart
- Performance checks: Bundle size validation via `check:bundle` script
- OOM mitigation: 2GB swap file allocation

## Environment Configuration

**Required env vars:**
- WP_MENU_ENDPOINT - WordPress API endpoint (optional, has default)
- DROPLET_HOST - DigitalOcean server hostname
- DROPLET_USER - SSH username
- DROPLET_SSH_KEY - SSH private key

**Secrets location:**
- GitHub Actions secrets for deployment credentials

## Webhooks & Callbacks

**Incoming:**
- GitHub Actions deployment webhook - Triggered on push to main branch
- Manual GitHub Actions trigger available

**Outgoing:**
- Form submissions to Formspree - Contact form endpoint

## Marketing & Analytics

**Analytics:**
- Plausible Analytics - Privacy-focused analytics
  - Script: https://plausible.io/js/script.js
  - Domain: chickpeas-mobile.com
  - Integration: Added via Nuxt app.head script configuration

**Form Handling:**
- Formspree - Contact form submission service
  - Endpoint: https://formspree.io/f/xrblrpla (configured in runtime config)
  - Features: Email notifications, honeypot spam protection

## Mapping Services

**Maps:**
- Leaflet - Interactive map library
  - CSS: leaflet/dist/leaflet.css
  - JavaScript: Dynamic import of leaflet
  - Usage: Restaurant location display
  - No external map tile provider detected (likely uses default tiles)

## Third-Party Libraries

**UI Components:**
- Vue Toastification - Toast notifications
- No other UI framework libraries detected

**Development Tools:**
- Lighthouse CI - Performance monitoring
  - Configuration: lighthouserc.js
  - Scripts: lhci autorun for performance testing