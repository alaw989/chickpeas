# Chickpeas Mediterranean Kitchen Website

## What This Is

A Nuxt 3 website for Chickpeas Mediterranean Kitchen, a restaurant in Mobile, AL. The site displays the menu (fetched from WordPress), contact information with a form, and location details with an interactive map. Currently live at chickpeas-mobile.com.

## Core Value

Visitors can quickly find the menu, hours, location, and contact the restaurant — with a polished, professional feel that reflects the quality of the food.

## Requirements

### Validated

- ✓ Menu display with categories from WordPress — existing
- ✓ Contact form via Formspree — existing
- ✓ Interactive Leaflet map with location — existing
- ✓ Responsive design with Tailwind CSS — existing
- ✓ SEO optimization with structured data — existing
- ✓ Performance optimizations (ISR, lazy loading, image optimization) — existing

### Active

- [ ] Specials section below hero (WordPress-managed)
- [ ] Menu QR code for printing

### Out of Scope

- Complex timeline animations — keeping it subtle and polished
- Heavy animation libraries like full GSAP — using lightweight @vueuse/motion
- Horizontal scroll sections — not aligned with restaurant site UX
- 3D effects — overkill for this project

## Current Milestone: v1.2 Specials & QR Menu

**Goal:** Let the restaurant highlight daily specials on the homepage and provide a scannable QR code for the menu.

**Target features:**
- Specials section below hero with photo, name, price, description
- Support for multiple specials, managed from WordPress
- Section disappears when no specials active
- Static QR code image linking to menu page for printing

## Context

The site is already live and performing well with smooth animations added in v1.1. This milestone adds practical restaurant features — a way to promote specials and make the menu accessible via QR code.

**Current stack:**
- Nuxt 3.16.2 with Vue 3.5
- Tailwind CSS 4.1.8
- @nuxt/image for image optimization
- Leaflet for maps
- WordPress REST API for menu data

**Animation approach:**
- @vueuse/motion for declarative scroll-triggered animations
- CSS scroll-driven animations for hero parallax
- Keep animations subtle (16-32px movement, 0.4-0.8s duration)

## Constraints

- **Performance**: Must maintain current Lighthouse scores — use only GPU-accelerated properties (transform, opacity)
- **Accessibility**: Must respect prefers-reduced-motion media query
- **Mobile**: Disable parallax on mobile (iOS Safari limitations)
- **Bundle size**: Keep animation library lightweight (<25kb)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use @vueuse/motion over GSAP | Lighter weight, native Nuxt integration, sufficient for subtle animations | ✓ Delivered in v1.1 |
| CSS scroll-driven for parallax | Zero JS overhead, good browser support | ✓ Delivered in v1.1 |
| Disable parallax on mobile | iOS Safari doesn't support background-attachment: fixed | ✓ Delivered in v1.1 |

## Completed Milestones

| Version | Name | Date | Summary |
|---------|------|------|---------|
| v1.1 | Animation Polish | 2026-02-10 | Scroll animations, hero parallax, map pin branding |

---
*Last updated: 2026-02-11 after v1.2 milestone start*
