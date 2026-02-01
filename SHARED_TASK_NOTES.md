# Shared Task Notes

## Completed This Iteration
- Added `lang="en"` to HTML element
- Added security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy)
- Added hero image preloading (`/img/banner.webp`, `/img/chickpeas.webp`) and route prefetching
- Added missing meta tags (charset, viewport, author, format-detection)
- Fixed ContactForm.vue accessibility: aria-required, aria-invalid, aria-describedby, role="alert" on errors
- Added visible focus indicators in main.css (:focus-visible styles)

## Next Priority Tasks (from plan.md)

### Critical - Should do next
1. **Fix color contrast in footer text** - Footer text on green background fails WCAG
2. **Fix non-crawlable mobile nav links** - Mobile nav uses `#` hrefs instead of real routes
3. **Add dimensions to nav logo and map marker images** - Prevents layout shifts
4. **Remove duplicate components** - Delete `/components/Menu/`, `/components/Footer/`, `/components/Home/`, `/components/Header/` folders (keep `/components/features/` and `/components/sections/`)

### High Priority
5. **Add skeleton loading states to Menu.vue** - Replace "Loading..." with skeleton UI
6. **Defer map loading with IntersectionObserver** - HomeLocation.vue lazy load
7. **Add ARIA roles to menu tabs** - role="tablist", role="tab", role="tabpanel"

## Files Modified This Iteration
- `nuxt.config.ts` - Added lang, meta tags, security headers, image preloading
- `components/sections/ContactForm.vue` - Full accessibility overhaul
- `assets/css/main.css` - Focus indicators
- `.claude/plans/plan.md` - Updated checklist

## Notes
- Build passes with warnings about font paths (pre-existing issue)
- Font warnings are about `/fonts/` paths not resolving at build time - fonts work at runtime
