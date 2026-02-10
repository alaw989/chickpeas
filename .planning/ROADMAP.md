# Roadmap: Chickpeas Animation Enhancement

**Created:** 2026-02-10
**Milestone:** v1.1 - Animation Polish

## Phases

### Phase 1: Animation Infrastructure
**Goal:** Set up @vueuse/motion and accessibility foundations

**Requirements:** ANIM-01, ANIM-06

**Plans:** 1 plan

Plans:
- [x] 01-01-PLAN.md — Install @vueuse/motion and add reduced-motion CSS ✓

**Status:** Complete (2026-02-10)

**Success Criteria:**
1. @vueuse/motion installed and configured as Nuxt module
2. Motion presets available in components via auto-import
3. prefers-reduced-motion utility or CSS rule in place
4. Dev server runs without errors

---

### Phase 2: Section Animations
**Goal:** Add subtle scroll-triggered animations to hero and content sections

**Requirements:** ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-07

**Plans:** 3 plans

Plans:
- [x] 02-01-PLAN.md — Hero parallax with CSS scroll-driven animation ✓
- [x] 02-02-PLAN.md — Content section fade-in and header slide-up animations ✓
- [x] 02-03-PLAN.md — Menu items staggered fade-in animation ✓

**Status:** Complete (2026-02-10)

**Success Criteria:**
1. Hero background has parallax effect (moves slower than scroll)
2. Content sections fade-in when entering viewport
3. Menu items animate with staggered timing
4. Section headers slide up on entry
5. Parallax disabled on mobile (touch devices)
6. Animations feel subtle and polished, not distracting

---

### Phase 3: Map Pin Fix
**Goal:** Update map marker to display chickpea logo

**Requirements:** MAP-01

**Plans:** 1 plan

Plans:
- [ ] 03-01-PLAN.md — Replace SVG circles with chickpea logo image

**Success Criteria:**
1. Map pin shows /img/chickpea-icon.webp instead of SVG circles
2. Pin maintains proper sizing and positioning
3. Popup still works on click

---

## Summary

| Phase | Name | Requirements | Plans |
|-------|------|--------------|-------|
| 1 | Animation Infrastructure | 2 | 1 ✓ |
| 2 | Section Animations | 5 | 3 ✓ |
| 3 | Map Pin Fix | 1 | 1 |

**Total:** 3 phases, 8 requirements

---
*Roadmap created: 2026-02-10*
