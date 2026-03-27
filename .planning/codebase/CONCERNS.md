# Codebase Concerns

**Analysis Date:** 2026-02-10

## Tech Debt

**Nuxt Configuration:**
- Issue: Hardcoded environment variables directly in configuration
- Files: `nuxt.config.ts`
- Impact: Reduced deployment flexibility and potential security risk
- Fix approach: Move sensitive values to .env, use runtime config more extensively

**Performance Configuration:**
- Issue: Experimental performance features may have unintended consequences
- Files: `nuxt.config.ts`
- Impact: Potential unexpected behavior in production
- Fix approach: Carefully test experimental features, consider gradual rollout

## Known Bugs

**Environment Configuration:**
- Symptoms: Hardcoded WordPress menu endpoint and FormSpree endpoint
- Files: `nuxt.config.ts`
- Trigger: Potential issues with environment-specific deployments
- Workaround: Implement more robust environment variable handling

## Security Considerations

**Configuration Exposure:**
- Risk: Business details and endpoints are directly in configuration
- Files: `nuxt.config.ts`
- Current mitigation: None
- Recommendations:
  - Use environment-specific configuration
  - Implement stricter access controls
  - Remove hardcoded sensitive information

## Performance Bottlenecks

**Build Configuration:**
- Problem: Large chunk size warning limit of 500KB
- Files: `nuxt.config.ts`
- Cause: Potential large vendor chunks
- Improvement path:
  - Further optimize chunk splitting
  - Review and minimize external dependencies

## Fragile Areas

**Module Configuration:**
- Files: `nuxt.config.ts`
- Why fragile: Heavy reliance on experimental features
- Safe modification:
  - Carefully test each experimental feature
  - Maintain fallback configurations
- Test coverage: Needs comprehensive end-to-end testing

## Scaling Limits

**Asset Loading:**
- Current capacity: Multiple image formats and preloading strategies
- Limit: Potential performance impact with many preloaded assets
- Scaling path:
  - Implement more selective preloading
  - Use modern image loading techniques

## Dependencies at Risk

**External Script Dependency:**
- Risk: Reliance on Plausible.io analytics script
- Impact: Potential site functionality or performance issues if script fails
- Migration plan:
  - Implement fallback analytics
  - Add error handling for external script loading

## Missing Critical Features

**Error Handling:**
- Problem: No visible global error handling strategy
- Blocks: Robust error reporting and user feedback

## Test Coverage Gaps

**Configuration Testing:**
- What's not tested: Nuxt configuration edge cases
- Files: `nuxt.config.ts`
- Risk: Unexpected behavior in different environments
- Priority: High

---

*Concerns audit: 2026-02-10*