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

- [ ] Add subtle scroll-triggered animations (fade-in, slide-up) to content sections
- [ ] Add parallax effect to hero section background
- [ ] Stagger menu item animations on scroll
- [ ] Section header reveal animations
- [ ] Fix map pin to display actual chickpea logo image
- [ ] Respect prefers-reduced-motion for accessibility

### Out of Scope

- Complex timeline animations — keeping it subtle and polished
- Heavy animation libraries like full GSAP — using lightweight @vueuse/motion
- Horizontal scroll sections — not aligned with restaurant site UX
- 3D effects — overkill for this project

## Context

The site is already live and performing well. This enhancement focuses on adding polish through tasteful animations without impacting the existing performance optimizations.

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
| Use @vueuse/motion over GSAP | Lighter weight, native Nuxt integration, sufficient for subtle animations | — Pending |
| CSS scroll-driven for parallax | Zero JS overhead, good browser support | — Pending |
| Disable parallax on mobile | iOS Safari doesn't support background-attachment: fixed | — Pending |

---
*Last updated: 2026-02-10 after initialization*
