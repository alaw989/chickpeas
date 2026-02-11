---
phase: 04-specials-section
plan: 01
subsystem: ui
tags: [vue, nuxt, wordpress, rest-api, ssr]

# Dependency graph
requires:
  - phase: 01-animation-infrastructure
    provides: v-motion directive and animation patterns
provides:
  - WordPress specials API endpoint (/api/specials)
  - useSpecialsData composable
  - HomeSpecials component with responsive grid
  - Homepage integration with conditional rendering
affects: [05-qr-menu]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - WordPress REST API proxy pattern (server/api/*.get.ts)
    - Conditional section rendering (v-if with data.length)

key-files:
  created:
    - server/api/specials.get.ts
    - composables/useSpecialsData.ts
    - components/sections/HomeSpecials.vue
  modified:
    - nuxt.config.ts
    - pages/index.vue
    - components/sections/HomePage.vue

key-decisions:
  - "Use $fetch with ignoreResponseError for graceful 404 handling"
  - "Return empty array on WordPress errors to avoid breaking page"
  - "Position specials between hero and triangle for visual flow"

patterns-established:
  - "API endpoint returns empty array on error, not throw"
  - "Conditional sections: v-if on data array length"
  - "Staggered card animations: base delay + (index * 50ms)"

# Metrics
duration: 65min
completed: 2026-02-11
---

# Phase 04 Plan 01: Specials Section Summary

**WordPress-managed specials section with responsive grid display, staggered animations, and conditional rendering on homepage**

## Performance

- **Duration:** 65 min
- **Started:** 2026-02-11T16:18:10Z
- **Completed:** 2026-02-11T17:23:38Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments

- WordPress REST API proxy for specials custom post type
- Responsive grid component (1/2/3 columns) with photo, name, price, description
- Homepage integration with conditional rendering (hidden when no specials)
- Graceful error handling that returns empty array instead of breaking page
- Staggered entrance animations following existing site patterns

## Task Commits

Each task was committed atomically:

1. **Task 1: Create specials API endpoint and composable** - `8036add` (feat)
2. **Task 2: Create HomeSpecials component** - `24f8a84` (feat)
3. **Task 3: Integrate specials into homepage** - `5145e7c` (feat)

## Files Created/Modified

- `server/api/specials.get.ts` - WordPress REST API proxy, transforms response to Special[] interface
- `composables/useSpecialsData.ts` - SSR-compatible data fetching composable
- `components/sections/HomeSpecials.vue` - Responsive grid with animations (133 lines)
- `nuxt.config.ts` - Added wpSpecialsEndpoint to runtimeConfig
- `pages/index.vue` - Fetch specials data, pass to HomePage
- `components/sections/HomePage.vue` - Added Specials component with conditional render

## Decisions Made

- **Graceful 404 handling:** WordPress endpoint returns 404 until specials post type exists. Using `ignoreResponseError: true` with `$fetch.raw()` to catch this and return empty array.
- **Position after hero:** Specials placed between hero and triangle divider for natural content flow.
- **Cream background:** Matches Info section aesthetic for visual consistency.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- **Build intermittent failures:** Initial builds failed with 500 Server Error during prerender. Root cause was network timeouts when fetching from WordPress endpoint. Builds succeeded on retry. No code changes required.
- **WordPress endpoint 404:** The specials custom post type doesn't exist yet in WordPress, so endpoint returns 404. Error handling ensures this gracefully returns empty array.

## User Setup Required

None - no external service configuration required. WordPress specials post type must be created separately in WordPress admin.

## Next Phase Readiness

- Specials infrastructure complete and tested
- Ready for WordPress admin to add specials custom post type
- Once WordPress has specials, they will automatically appear on homepage via ISR (5-min cache)
- No blockers for Phase 05 (QR Menu)

## Self-Check: PASSED

---
*Phase: 04-specials-section*
*Completed: 2026-02-11*
