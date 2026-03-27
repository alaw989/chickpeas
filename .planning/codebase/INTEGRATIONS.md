# External Integrations

**Analysis Date:** 2026-02-10

## APIs & External Services

**WordPress:**
- Service: WordPress REST API
- Endpoint: `{process.env.WP_MENU_ENDPOINT}`
- Purpose: Fetch menu items
- Location: `nuxt.config.ts`

**Form Submission:**
- Service: Formspree
- Endpoint: `https://formspree.io/f/xrblrpla`
- Purpose: Contact form submissions
- Location: `nuxt.config.ts`

## Data Storage

**Databases:**
- SQLite (Better SQLite3)
  - Type: Embedded, file-based database
  - Client: `better-sqlite3`
  - Purpose: Likely local data caching or small-scale persistence

**File Storage:**
- Local filesystem
  - Static assets in `/public`
  - Images optimized via `@nuxt/image`

## Authentication & Identity

**Auth Provider:**
- No explicit third-party auth detected
- Potential custom authentication approach

## Monitoring & Observability

**Analytics:**
- Plausible Analytics
  - Script: `https://plausible.io/js/script.js`
  - Domain: `chickpeas-mobile.com`
  - Privacy-focused, lightweight tracking

**Error Tracking:**
- No explicit error tracking service detected

## Webhooks & Callbacks

**Incoming:**
- WordPress menu endpoint
- Formspree form submission

**Outgoing:**
- None detected

## Environment Configuration

**Required env vars:**
- `WP_MENU_ENDPOINT` - WordPress menu API URL
- Public configuration in `nuxt.config.ts`

**Secrets location:**
- Likely in `.env` file (not exposed)

---

*Integration audit: 2026-02-10*