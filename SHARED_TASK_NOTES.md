# Shared Task Notes

## Context
Working on Lighthouse audit improvements per `.claude/plans/plan.md`.

## Completed This Iteration
- Removed duplicate component folders (Menu/, Footer/, Home/, Header/, Contact.vue)
- Fixed footer color contrast (removed opacity-80 and opacity-70 classes)
- Added missing meta tags (lang, charset, viewport, author, format-detection)
- Added security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy)
- Added og:image dimensions to all 3 pages

## Next Priority Tasks
1. **Fix non-crawlable mobile nav links** - Mobile nav uses `#` hrefs instead of real routes
2. **Add dimensions to nav logo and map marker images** - Missing width/height attributes
3. **Add analytics** - Either Plausible or GA4 (see plan section 1.1)
4. **Add skeleton loading states to Menu** - Replace "Loading..." text (see plan section 2.2)
5. **Defer map loading with IntersectionObserver** - HomeLocation.vue (see plan section 2.3)
6. **Add ARIA roles to menu tabs** - Menu.vue (see plan section 2.4)

## Key Files
- `components/features/navigation/NavBar.vue` - mobile nav links issue
- `components/features/menu/Menu.vue` - skeleton loading & ARIA roles
- `components/sections/HomeLocation.vue` - lazy map loading
- `nuxt.config.ts` - analytics script

## Build Status
Build passes. Font warnings about resolution at runtime are pre-existing and not blocking.
