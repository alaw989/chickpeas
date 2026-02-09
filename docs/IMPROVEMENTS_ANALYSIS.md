# Website Improvement Analysis
## Chickpeas Mediterranean Kitchen

Generated: 2026-02-02

---

## Summary
This is a well-structured Nuxt 3 restaurant website with good SEO foundations, modern tech stack, and solid testing. Below are identified improvement opportunities organized by priority.

---

## HIGH PRIORITY IMPROVEMENTS

### 1. Data Inconsistencies & Bugs

#### Phone Number Mismatch
- **Issue**: Footer shows `(626) 264-2461` but nuxt.config.ts has `(251) 301-0770`
- **Location**: `components/features/footer/Footer.vue:19` vs `nuxt.config.ts:14`
- **Impact**: Customer confusion, lost business
- **Fix**: Update footer to use config value

#### Online Ordering Hours
- **Issue**: data.json shows "7:00 AM - 5:40 PM" but actual hours are different (6AM-6PM, 6AM-8PM, 6AM-4PM)
- **Impact**: Customer confusion

#### Duplicate/Unused Components
- **Issue**: Old component folders exist alongside new ones:
  - `components/Home/`, `components/Menu/`, `components/Header/`, `components/Footer/` vs
  - `components/sections/`, `components/features/`, `components/features/menu/`, `components/features/navigation/`, `components/features/footer/`
- **Impact**: Code bloat, confusion
- **Fix**: Remove old unused components

---

### 2. Accessibility Improvements

#### Mobile Menu Accessibility
- **Issue**: No `aria-expanded` attribute on hamburger button
- **Location**: `components/features/navigation/NavBar.vue:19-30`
- **Fix**: Add `:aria-expanded="showMenu"` to hamburger button

#### Skip Navigation Link
- **Issue**: No skip-to-content link for keyboard users
- **Fix**: Add skip link in `layouts/default.vue`

#### Heading Hierarchy
- **Issue**: HomePage.vue uses `h1` for hero, but Menu.vue also has `h1` when used on home
- **Location**: `pages/menu.vue:3` passes `headingLevel='h1'` but home page uses Menu component with default `h2`
- **Fix**: Already handled via prop, but verify in usage

#### Focus Management
- **Issue**: Mobile menu close doesn't return focus to trigger button
- **Fix**: Implement focus trap and return focus

---

### 3. Performance Optimizations

#### Leaflet Lazy Loading
- **Issue**: Leaflet library is imported but could be code-split better
- **Location**: `components/sections/HomeLocation.vue:87`
- **Current**: Dynamic import exists but could add loading skeleton

#### Image Optimization
- **Issue**: Hero image uses inline background-image instead of NuxtImg
- **Location**: `components/sections/HomePage.vue:6`
- **Fix**: Use `NuxtImg` component for proper optimization
- **Note**: Banner image is preloaded in head but could use priority prop

#### Font Display Strategy
- **Issue**: Fonts may cause layout shift without proper font-display
- **Location**: `assets/css/fonts.css`
- **Fix**: Add `font-display: swap` to @font-face declarations

---

## MEDIUM PRIORITY IMPROVEMENTS

### 4. SEO & Meta Enhancements

#### Missing Social Profiles
- **Issue**: Footer has Facebook SVG icon but no actual href/link
- **Location**: `components/features/footer/Footer.vue:67-75`
- **Fix**: Add actual Facebook URL or remove if not used

#### Missing Open Graph Image
- **Issue**: Some pages use `/img/banner.webp` fallback without verifying it exists
- **Fix**: Verify all OG images exist and are appropriate

#### Sitemap Generation
- **Status**: Dynamic sitemap endpoint exists (`server/routes/sitemap.xml.get.ts`)
- **Verify**: Ensure it's being generated correctly

#### Robots.txt
- **Issue**: No robots.txt file found
- **Fix**: Add robots.txt for better crawler guidance

---

### 5. User Experience Improvements

#### Mobile Menu Overlay
- **Issue**: No backdrop/dimming behind mobile menu
- **Location**: `components/features/navigation/NavBar.vue`
- **Fix**: Add backdrop with click-to-close

#### Scroll Lock
- **Issue**: Body scroll not locked when mobile menu is open
- **Fix**: Add scroll lock when menu opens

#### Loading States
- **Good**: Menu has skeleton loading state
- **Missing**: No loading state for initial page data fetch

#### Error Handling
- **Good**: Contact form has error handling
- **Missing**: No error boundary for component failures

---

### 6. Form & Contact Improvements

#### FormSpree Endpoint
- **Issue**: Hardcoded endpoint in component
- **Location**: `components/sections/ContactForm.vue:112`
- **Fix**: Move to nuxt config

#### Form Validation Feedback
- **Current**: Toast notifications for errors
- **Improvement**: Add inline validation messages for accessibility

---

## LOW PRIORITY IMPROVEMENTS

### 7. Code Quality & Maintainability

#### TypeScript Strict Mode
- **Issue**: Some components use `any` types
- **Example**: `server/api/menu.get.ts:22` - `menuItems: any[]`
- **Fix**: Define proper interfaces

#### Component Props Validation
- **Issue**: Some props missing validators
- **Example**: `components/sections/HomePage.vue:74-87` - props without TypeScript types

#### CSS Organization
- **Issue**: Mix of Tailwind utilities and scoped CSS
- **Consider**: Standardize on Tailwind where possible

---

### 8. Testing Gaps

#### Missing Tests
- **Components**: HomePage.vue, HomeLocation.vue, HomeInfo.vue, Gallery.vue
- **Composable**: useSiteData.ts
- **E2E**: Contact form submission flow, external link validation

#### Current Coverage
- 56 unit tests passing
- 30 E2E tests written (blocked by system dependencies)

---

### 9. Internationalization (i18n)

#### Consider Adding
- Multi-language support if restaurant serves diverse clientele
- Spanish translation option for Mobile, AL area

---

### 10. Advanced Features (Future Considerations)

#### Online Ordering Integration
- Current: Links to external platform (order.online)
- Consider: Direct ordering system or better integration

#### Reservations System
- Add table reservation functionality
- Integrate with reservation platform

#### Customer Reviews
- Add Google Reviews integration
- Display testimonials on site

#### Loyalty Program
- Consider adding loyalty program features

#### Catering Page
- Current: Catering inquiries through contact form
- Consider: Dedicated catering page with menu packages

---

## TECHNICAL DEBT

### Duplicate Code Patterns
- Button styles defined in multiple places
- Hours information repeated in multiple components
- Consider centralizing business hours in config

### Unused Dependencies Check
- `@nuxt/ui` is installed but may not be fully utilized
- Verify all npm packages are necessary

---

## QUICK WINS (Easy to implement)

1. Fix phone number inconsistency (5 minutes)
2. Add social media links to footer (10 minutes)
3. Add aria-expanded to mobile menu button (5 minutes)
4. Add backdrop to mobile menu (10 minutes)
5. Add scroll lock to mobile menu (5 minutes)
6. Remove unused old component folders (10 minutes)
7. Add robots.txt (5 minutes)

---

## POSITIVE OBSERVATIONS

- Well-organized component structure with features/sections separation
- Good use of Nuxt 3 composables (useAsyncData, useRuntimeConfig)
- Proper SEO meta tags and structured data (Schema.org)
- Comprehensive testing setup (unit + E2E)
- Performance optimizations (prerendering, caching, compression)
- Accessibility considerations (ARIA labels, keyboard navigation)
- Modern tech stack (Nuxt 3, TypeScript, Tailwind v4, Vitest, Playwright)
- Responsive design throughout
- Skeleton loading states
- Honeypot spam protection on contact form

---

## RECOMMENDED IMPLEMENTATION ORDER

1. **Fix critical bugs** (phone number, data inconsistencies)
2. **Accessibility improvements** (focus management, skip links, ARIA)
3. **UX polish** (mobile menu backdrop, scroll lock)
4. **Performance** (font-display, image optimization)
5. **SEO enhancements** (social links, robots.txt)
6. **Code quality** (TypeScript strict mode, remove duplicates)
7. **Advanced features** (reservations, reviews, catering page)
