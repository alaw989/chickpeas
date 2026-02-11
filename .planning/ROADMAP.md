# Roadmap: Chickpeas v1.2 - Specials & QR Menu

**Created:** 2026-02-11
**Milestone:** v1.2 - Specials & QR Menu

## Phases

### Phase 4: Specials Section
**Goal:** Display WordPress-managed specials below the hero on the homepage

**Requirements:** SPEC-01, SPEC-02, SPEC-03, SPEC-04, SPEC-05

**Plans:** TBD

**Status:** Not started

**Success Criteria:**
1. Specials section appears below hero when specials exist in WordPress
2. Each special displays photo, name, price, and description
3. Multiple specials render in a grid/row layout
4. Section is completely hidden when no specials are published
5. Adding/removing specials in WordPress updates the site (via ISR or on-demand)

**Notes:**
- Requires WordPress custom post type "specials" with fields: title, featured image, price (custom field), description (excerpt or custom field)
- WordPress REST API endpoint: `/wp-json/wp/v2/specials`
- Consider ACF for custom fields if already installed, otherwise use native custom fields

---

### Phase 5: QR Code Generation
**Goal:** Provide a printable QR code that links to the menu page

**Requirements:** QR-01, QR-02

**Plans:** TBD

**Status:** Not started

**Success Criteria:**
1. QR code image exists linking to menu page URL
2. QR code is provided in print-ready format (PNG and/or SVG)
3. QR code scans correctly on mobile devices

**Notes:**
- Menu page URL: https://chickpeas-mobile.com/menu (or similar)
- One-time generation, stored in /public/img/ or delivered to client
- Can use any QR generator (online tool, npm package, or CLI)

---

## Summary

| Phase | Name | Requirements | Success Criteria |
|-------|------|--------------|------------------|
| 4 | Specials Section | SPEC-01 through SPEC-05 | 5 |
| 5 | QR Code Generation | QR-01, QR-02 | 3 |

**Total:** 2 phases, 7 requirements

---
*Roadmap created: 2026-02-11*
