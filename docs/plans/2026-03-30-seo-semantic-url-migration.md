# SEO Semantic URL Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate numeric question routes to semantic canonical URLs, add topic hub pages, and improve sitemap/metadata signals for search indexing.

**Architecture:** Keep the existing static-export Next.js architecture, add derived SEO helpers in the data layer, introduce canonical semantic question and topic routes, and convert legacy numeric question pages into compatibility redirect pages with canonical/noindex metadata. Avoid editing source content JSON beyond what is necessary for deterministic derived metadata.

**Tech Stack:** Next.js 15 static export, TypeScript, React, Node test runner, GitHub Pages deployment.

---

### Task 1: Create failing tests for semantic question URL helpers

**Files:**
- Modify: `test/routes.test.mjs`
- Modify: `test/navigation.test.mjs`
- Test: `npm test -- test/routes.test.mjs test/navigation.test.mjs`

**Step 1: Write the failing test**

Add assertions for deterministic question slug generation, semantic question path helpers, and navigation helpers no longer pointing to `/q/[id]`.

**Step 2: Run test to verify it fails**

Run: `npm test -- test/routes.test.mjs test/navigation.test.mjs`
Expected: FAIL because helpers do not exist and navigation still uses `/q/[id]`.

### Task 2: Create failing tests for legacy numeric compatibility pages

**Files:**
- Modify: `test/root-content-routes.test.mjs`
- Modify: `test/legacy-zh-routes.test.mjs`
- Test: `npm test -- test/root-content-routes.test.mjs test/legacy-zh-routes.test.mjs`

**Step 1: Write the failing test**

Add assertions that `/q/[id]` pages canonicalize to `/questions/[slug]`, remain `noindex`, and redirect to semantic question targets.

**Step 2: Run test to verify it fails**

Run: `npm test -- test/root-content-routes.test.mjs test/legacy-zh-routes.test.mjs`
Expected: FAIL because the old route still points to `/q/[id]`.

### Task 3: Create failing tests for topic hubs and sitemap entries

**Files:**
- Create: `test/seo-topics.test.mjs`
- Modify: `test/root-homepage.test.mjs`
- Test: `npm test -- test/seo-topics.test.mjs test/root-homepage.test.mjs`

**Step 1: Write the failing test**

Cover topic registry membership, homepage topic links, and sitemap references to topic routes and semantic question routes.

**Step 2: Run test to verify it fails**

Run: `npm test -- test/seo-topics.test.mjs test/root-homepage.test.mjs`
Expected: FAIL because topic helpers and homepage links are not present.

### Task 4: Implement SEO helper layer

**Files:**
- Modify: `src/lib/data.ts`
- Modify: `src/lib/navigation.ts`
- Create: `src/lib/seo.ts`
- Test: `test/routes.test.mjs`, `test/navigation.test.mjs`, `test/seo-topics.test.mjs`

**Step 1: Write minimal implementation**

Implement slug normalizer, question slug/path helpers, reverse lookup, topic definitions, and canonical URL helpers.

**Step 2: Run focused tests**

Run: `npm test -- test/routes.test.mjs test/navigation.test.mjs test/seo-topics.test.mjs`
Expected: helper-focused tests pass or move to the next failure.

### Task 5: Implement new semantic question route

**Files:**
- Create: `src/app/questions/[slug]/page.tsx`
- Reuse patterns from: `src/app/q/[id]/page.tsx`

**Step 1: Write minimal implementation**

Build the semantic question page by reusing the existing question rendering structure and resolving the question from the new slug helper.

**Step 2: Run focused tests**

Run: `npm test -- test/routes.test.mjs test/navigation.test.mjs`
Expected: tests now reference semantic question routes successfully.

### Task 6: Convert legacy `/q/[id]` pages into compatibility redirect pages

**Files:**
- Modify: `src/app/q/[id]/page.tsx`
- Test: `test/root-content-routes.test.mjs`, `test/legacy-zh-routes.test.mjs`

**Step 1: Write minimal implementation**

Change `/q/[id]` to output noindex metadata, canonicalize to the semantic URL, and render a client redirect page using `window.location.replace()`.

**Step 2: Run focused tests**

Run: `npm test -- test/root-content-routes.test.mjs test/legacy-zh-routes.test.mjs`
Expected: compatibility route tests pass.

### Task 7: Implement topic hub pages

**Files:**
- Create: `src/app/topics/[slug]/page.tsx`
- Create if helpful: `src/components/TopicHubPage.tsx`
- Modify: `src/lib/data.ts` or `src/lib/seo.ts`
- Test: `test/seo-topics.test.mjs`

**Step 1: Write minimal implementation**

Create topic pages with intro copy, semantic question links, optional track context, and metadata.

**Step 2: Run focused tests**

Run: `npm test -- test/seo-topics.test.mjs`
Expected: topic tests pass.

### Task 8: Rewire homepage and navigation to semantic URLs and topic hubs

**Files:**
- Modify: `src/components/HomepageContent.tsx`
- Modify: `src/lib/navigation.ts`
- Modify: supporting helpers in `src/lib/data.ts`
- Test: `test/homepage-content.test.mjs`, `test/root-homepage.test.mjs`, `test/navigation.test.mjs`

**Step 1: Write minimal implementation**

Update question links to semantic URLs and add visible topic hub entry links on the homepage.

**Step 2: Run focused tests**

Run: `npm test -- test/homepage-content.test.mjs test/root-homepage.test.mjs test/navigation.test.mjs`
Expected: homepage and navigation tests pass.

### Task 9: Update sitemap and metadata enhancements

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/questions/[slug]/page.tsx`
- Modify: `src/app/topics/[slug]/page.tsx`
- Test: `test/seo-topics.test.mjs`

**Step 1: Write minimal implementation**

Add semantic question URLs, topic hub URLs, `lastModified`, and JSON-LD for canonical pages where practical.

**Step 2: Run focused tests**

Run: `npm test -- test/seo-topics.test.mjs`
Expected: sitemap-focused tests pass.

### Task 10: Full verification

**Step 1: Run the full test suite**

Run: `npm test`
Expected: all tests pass.

**Step 2: Run production build**

Run: `npm run build`
Expected: static export completes successfully.

**Step 3: Commit**

```bash
git add docs/plans/2026-03-30-seo-semantic-url-migration-design.md docs/plans/2026-03-30-seo-semantic-url-migration.md test src
git commit -m "feat: migrate question URLs to semantic SEO routes"
```
