# Shared Task Notes

## Current Status

All **Critical** and **High** priority items from `.claude/plans/plan.md` are complete:

### Critical (Done)
- Analytics (Plausible) - `nuxt.config.ts:56-62`
- Form accessibility - `components/sections/ContactForm.vue` (aria attributes)
- Focus indicators - `assets/css/main.css:14-33`
- Duplicate components removed (old folders deleted)

### High (Done)
- Image preloading - `nuxt.config.ts:49-53`
- Skeleton loading states - `components/features/menu/Menu.vue:28-37, 460-547`
- Deferred map loading with IntersectionObserver - `components/sections/HomeLocation.vue:127-141`
- ARIA roles for menu tabs - `components/features/menu/Menu.vue:10-25, 42-48`

## Next Priorities (Medium)

From the plan, these are ready to implement next:

1. **Add security headers** - `nuxt.config.ts` nitro routeRules
2. **Add PWA support** - Install `@vite-pwa/nuxt`
3. **Subset fonts** - Reduce font file sizes
4. **Add missing meta tags** - Additional SEO meta
5. **Add og:image dimensions** - In page SEO meta

## Notes

- Build passes (`npm run build` exits 0)
- Font warnings at build time are non-blocking (resolved at runtime)
- Browserslist warning can be addressed with `npx update-browserslist-db@latest`
