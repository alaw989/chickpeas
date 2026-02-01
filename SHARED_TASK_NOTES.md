# Shared Task Notes

## Current Focus
Working through the Lighthouse optimization plan in `.claude/plans/plan.md`.

## What I Did This Iteration
- Added skeleton loading states to Menu component (`components/features/menu/Menu.vue`)
  - Replaced plain "Loading menu..." text with animated skeleton UI
  - Responsive design matching the actual menu item card layout
  - Shimmer animation for visual feedback

## Next Priority Tasks (from plan.md checklist)

### Critical
- [ ] Fix non-crawlable mobile nav links - NavBar mobile menu uses empty `url: ''` for takeout/delivery which may cause crawlability issues
- [ ] Add dimensions to nav logo image (`components/features/navigation/NavBar.vue` line 8-13)
- [ ] Add analytics (Plausible recommended per plan)

### High Priority
- [ ] Defer map loading with IntersectionObserver (`components/sections/HomeLocation.vue`)
- [ ] Add ARIA roles to menu tabs for accessibility

### Medium Priority
- [ ] Add PWA support
- [ ] Subset fonts (glyphhanger)

## Key Files
- Plan: `.claude/plans/plan.md`
- Lighthouse audit: `.claude/plans/chickpeas-lighthouse.json` (large file, ~770KB)
- Menu: `components/features/menu/Menu.vue`
- NavBar: `components/features/navigation/NavBar.vue`
- HomeLocation (map): `components/sections/HomeLocation.vue`
- Config: `nuxt.config.ts`
