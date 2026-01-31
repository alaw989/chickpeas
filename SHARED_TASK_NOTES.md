# Chickpeas Website Improvement Plan - Task Notes

## Status: Critical & High Priority Items COMPLETE

All Critical (Priority 1) and High (Priority 2) items from `.claude/plans/plan.md` have been implemented:

### Completed This Iteration:
- Added Plausible analytics
- Added image/page preloading (banner.webp, chickpeas.webp, /menu, /contact)
- Fixed form accessibility (aria-required, aria-invalid, aria-describedby, role="alert")
- Added visible focus indicators (:focus-visible styles)
- Removed duplicate component folders (Footer/, Menu/, Home/, Header/, Contact.vue)
- Added skeleton loading states to Menu.vue
- Deferred map loading with IntersectionObserver in HomeLocation.vue
- Added ARIA roles to menu tabs (role="tablist", role="tab", role="tabpanel", keyboard navigation)

### Remaining (Medium/Low Priority):
Priority 3 items from plan.md are not yet implemented:
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- PWA support (@vite-pwa/nuxt)
- Font subsetting
- Missing meta tags (author, format-detection)
- og:image dimensions on all pages

Priority 4 items (decorative SVG accessibility, color contrast audit, ContactPoint schema) are lower priority.

## Next Steps
If continuing work, implement Priority 3 (Medium) items from `.claude/plans/plan.md`.
