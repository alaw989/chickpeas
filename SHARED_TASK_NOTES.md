# Shared Task Notes

## Completed This Iteration (Critical + High Priority Items)

### Critical Items (All Done)
- Analytics: Added Plausible analytics to nuxt.config.ts
- Form Accessibility: ContactForm.vue now has aria attributes, error states, and live region announcements
- Focus Indicators: Added `:focus-visible` styles in main.css for keyboard navigation
- Duplicate Components: Removed unused directories (Menu/, Footer/, Header/, Home/, Contact.vue)

### High Priority Items (All Done)
- Image Preloading: Added preload hints for banner.webp and chickpeas.webp
- Page Prefetching: Added prefetch for /menu and /contact routes
- Skeleton Loading: Menu.vue now shows animated skeleton cards instead of "Loading..."
- Deferred Map Loading: HomeLocation.vue uses IntersectionObserver to lazy-load the Leaflet map
- Menu Tabs ARIA: Menu tabs now have proper role="tablist"/role="tab"/role="tabpanel" with keyboard navigation (arrow keys, Home/End)

## Next Priority: Medium Items (from plan.md)

1. **Security Headers** - Add to nuxt.config.ts:
   - X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy

2. **PWA Support** - Install @vite-pwa/nuxt and configure manifest

3. **Font Subsetting** - Subset Cabinet Grotesk and PT Sans to reduce file size

4. **Missing Meta Tags** - Add author, format-detection meta tags

5. **og:image Dimensions** - Add ogImageWidth/ogImageHeight to pages

## Plan Files Location
- Main plan: `.claude/plans/plan.md`
- SEO plan: `.claude/plans/seo-performance-plan.md`

## Build Status
- Build passes successfully
- Some font warnings (existing issue, not introduced by this iteration)
