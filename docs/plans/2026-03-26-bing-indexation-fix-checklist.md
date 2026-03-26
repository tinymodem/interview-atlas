# Bing Indexation Fix Checklist

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the most likely Bing indexation blockers by fixing language signals, duplicate homepage signals, and GitHub Pages base-path inconsistencies.

**Architecture:** Keep the current static-exported Next.js architecture, but make all locale-aware routing and metadata generation consistent with the GitHub Pages `/interview-atlas` deployment path. Tighten multilingual rendering so each locale page presents one coherent language and one clear canonical identity.

**Tech Stack:** Next.js App Router, static export, GitHub Pages, TypeScript, existing Node test suite.

---

## Scope

This checklist is derived from the investigation in:

- [2026-03-26-bing-indexation-investigation.md](/Users/krystal/Documents/Playground/interview-atlas/docs/plans/2026-03-26-bing-indexation-investigation.md)

It covers the currently highest-value fixes:

- wrong document language on localized pages,
- mixed-language navigation content on English pages,
- duplicate English homepage strategy,
- `basePath`-unaware route generation,
- and verification of the resulting live HTML signals.

## Checklist

### 1. Fix locale-aware document language

**Files:**

- Modify: [src/app/layout.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/layout.tsx)
- Modify: [src/app/[locale]/layout.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/[locale]/layout.tsx)

**Change:**

- Stop hardcoding `<html lang="en">` for the whole app.
- Ensure `/zh/*` pages emit a Chinese language tag such as `zh-CN`.
- Ensure `/en/*` pages emit `en`.
- Keep the root page behavior explicit rather than inherited accidentally.

**Why:**

- This is the clearest confirmed multilingual signal defect.

**Verification:**

- Fetch live HTML for `/zh/` and confirm the `<html>` tag language is Chinese.
- Fetch live HTML for `/en/` and confirm the `<html>` tag language is English.

### 2. Fix mixed-language question navigation content

**Files:**

- Modify: [src/lib/navigation.ts](/Users/krystal/Documents/Playground/interview-atlas/src/lib/navigation.ts)
- Review usage in: [src/app/[locale]/q/[id]/page.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/[locale]/q/[id]/page.tsx)

**Change:**

- Make question context titles locale-aware instead of defaulting to Chinese.
- Ensure English question pages render English previous and next labels and titles.
- Ensure Chinese question pages render Chinese previous and next labels and titles.

**Why:**

- This is a confirmed mixed-language rendering issue on live English pages.

**Verification:**

- Check `/en/q/201/` and confirm previous and next titles are in English.
- Check a Chinese question page and confirm the same navigation area stays Chinese.

### 3. Fix `basePath`-aware locale route generation

**Files:**

- Modify: [src/lib/localization.ts](/Users/krystal/Documents/Playground/interview-atlas/src/lib/localization.ts)
- Review callers in: [src/lib/navigation.ts](/Users/krystal/Documents/Playground/interview-atlas/src/lib/navigation.ts)
- Review callers in: [src/lib/data.ts](/Users/krystal/Documents/Playground/interview-atlas/src/lib/data.ts)
- Review callers in components using localized hrefs

**Change:**

- Introduce one canonical helper for app-internal path generation that is aware of the GitHub Pages subpath.
- Eliminate helper output that assumes the site is mounted at `/` when the production deployment is under `/interview-atlas`.
- Ensure locale switch links, question links, track links, and any helper-generated hrefs are internally consistent.

**Why:**

- This is the confirmed `basePath` defect behind the inconsistent `/en/...` and `/zh/...` payload strings.

**Verification:**

- Build and inspect generated HTML or payload output.
- Confirm helper-generated links no longer emit stripped production paths.
- Re-check live HTML and look for leftover `/en/...` and `/zh/...` path signals that should have been prefixed.

### 4. Decide and enforce one homepage canonical strategy

**Files:**

- Modify: [src/app/page.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/page.tsx)
- Review: [src/app/[locale]/page.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/[locale]/page.tsx)

**Change:**

- Choose one homepage ownership model and implement it consistently.

Recommended default:

- Make `/en/` the English homepage.
- Make `/` either:
  - a neutral landing page with distinct purpose and content, or
  - a redirect/canonical handoff to `/en/`.

Avoid:

- keeping `/` and `/en/` as near-duplicate English pages with separate canonicals.

**Why:**

- The current setup sends a duplicate-homepage signal.

**Verification:**

- Confirm `/` and `/en/` no longer compete as two equivalent English homepages.
- Confirm canonical or redirect behavior reflects the chosen strategy.

### 5. Re-validate metadata and alternate signals

**Files:**

- Review: [src/app/layout.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/layout.tsx)
- Review: [src/app/page.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/page.tsx)
- Review: [src/app/[locale]/page.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/[locale]/page.tsx)
- Review: [src/app/[locale]/q/[id]/page.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/[locale]/q/[id]/page.tsx)
- Review: [src/app/[locale]/jobs/[slug]/page.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/[locale]/jobs/[slug]/page.tsx)

**Change:**

- Re-check canonical and alternate language metadata after the route-helper changes.
- Keep metadata URLs aligned with the live GitHub Pages location.
- Confirm there is no contradiction between sitemap URLs, canonical URLs, and internal links.

**Why:**

- Even though canonical tags looked correct in the live sample, they should be re-verified after route helper changes.

**Verification:**

- Fetch live HTML for representative pages and inspect canonical plus alternate tags.
- Compare those URLs against sitemap entries and actual reachable pages.

### 6. Add or update regression checks

**Files:**

- Modify or add tests under: [test](/Users/krystal/Documents/Playground/interview-atlas/test)

**Suggested coverage:**

- localized path helper includes the expected deployment path behavior,
- English question navigation does not leak Chinese titles,
- root and locale homepage strategy remains intentional,
- metadata generation does not drift away from production URLs.

**Why:**

- These issues are structural and easy to reintroduce during content or routing updates.

**Verification:**

- Run the affected test files locally.
- Run the broader project test command after targeted checks pass.

### 7. Run post-change live verification for Bing-facing signals

**Files:**

- No source changes required; this is a release validation task.

**Check pages:**

- `https://tinymodem.github.io/interview-atlas/`
- `https://tinymodem.github.io/interview-atlas/en/`
- `https://tinymodem.github.io/interview-atlas/zh/`
- one English question page
- one Chinese question page
- `robots.txt`
- `sitemap.xml`

**Validate:**

- correct `lang`,
- coherent single-language visible content per locale,
- intentional homepage canonical strategy,
- no stray stripped locale URLs where production paths should be used,
- and no regressions in canonical or alternate metadata.

### 8. Re-submit to Bing and monitor

**Files:**

- No repo file changes required.

**Action:**

- Re-run Bing URL inspection on the affected URLs.
- Request indexing again after deployment.
- Give Bing time to recrawl and reassess, since its own messaging suggests indexation decisions can lag fixes.

## Priority Order

If we do this incrementally, the recommended order is:

1. document language fix,
2. mixed-language navigation fix,
3. `basePath` route generation fix,
4. homepage canonical strategy fix,
5. metadata re-check,
6. tests,
7. live verification,
8. Bing resubmission.

## Decision Notes

- `basePath` defect should be treated as a real fix item, not just a theory. It is confirmed by code and by stripped route strings in the live payload.
- canonical tags themselves should still be re-validated after changes, but they were not proven broken in the original live sample.
- the duplicate-homepage decision should be made intentionally before implementation, because it changes how `/` should behave long-term.
