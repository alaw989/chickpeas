# Shared Task Notes

## Current Focus
Working through `.claude/plans/plan.md` - Lighthouse improvements for performance, SEO, and accessibility.

## Completed This Iteration
- Removed duplicate component folders (`components/Menu/`, `components/Home/`, `components/Header/`, `components/Footer/`)
- Added skeleton loading states to Menu.vue (replaces "Loading menu..." text with animated skeleton cards)
- Added ARIA roles to menu tabs (tablist, tab, tabpanel with keyboard navigation)

## Next Priority Tasks (from plan.md checklist)

### Critical
- [ ] Fix non-crawlable mobile nav links (NavBar.vue uses `#` hrefs)
- [ ] Add dimensions to nav logo and map marker images
- [ ] Add analytics (Plausible or GA4)

### High
- [ ] Reduce unused JavaScript (~120KB)
- [ ] Fix layout shifts in hero CTA and main content
- [ ] Defer map loading with IntersectionObserver in HomeLocation.vue

### Medium
- [ ] Add PWA support (@vite-pwa/nuxt)
- [ ] Subset fonts

## Key Files
- `components/features/menu/Menu.vue` - Main menu component (just updated)
- `components/features/navigation/NavBar.vue` - Navigation (needs crawlable links fix)
- `components/sections/HomeLocation.vue` - Map component (needs lazy loading)
- `nuxt.config.ts` - Config for analytics, headers, meta tags

## Notes
- Run `npx lighthouse http://localhost:3000` after changes to verify improvements
- The project uses Nuxt 3, Tailwind CSS v4, and Vue 3
