# Homepage Refresh V1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refresh the Interview Atlas homepage so visitors understand the content scope and recommended starting points faster.

**Architecture:** Keep the existing static, bilingual Next.js architecture and reuse current JSON data. Add server-side homepage aggregation helpers, update homepage copy, and restructure the landing pages around overview, recommended starts, track browsing, and learning path modules.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, node:test

---

### Task 1: Add homepage aggregation coverage

**Files:**
- Create: `test/homepage-data.test.mjs`
- Modify: `src/lib/data.ts`

**Step 1: Write the failing test**

```javascript
test('homepage overview reports current track and question totals', () => {
  const overview = getHomepageOverview();
  assert.deepEqual(overview, { trackCount: 2, questionCount: 4 });
});
```

**Step 2: Run test to verify it fails**

Run: `node --test test/homepage-data.test.mjs`
Expected: FAIL because homepage helpers do not exist yet.

**Step 3: Write minimal implementation**

Add read-only helpers in `src/lib/data.ts` for homepage overview, featured tracks, and recommended starts.

**Step 4: Run test to verify it passes**

Run: `node --test test/homepage-data.test.mjs`
Expected: PASS.

### Task 2: Update homepage copy and layout

**Files:**
- Modify: `src/lib/i18n.ts`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Write the failing test**

Use the homepage data test from Task 1 as the behavior lock and manually inspect JSX after copy changes.

**Step 2: Write minimal implementation**

Add homepage-specific copy keys, restructure the localized homepage around hero, overview, recommended starts, tracks, learning path, and proof sections, then align `/` with the same value proposition.

**Step 3: Run verification**

Run: `npm test`
Expected: Homepage data tests pass and existing tests remain green after related fixes.

### Task 3: Add homepage styling and verify the full site build

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/Header.tsx`

**Step 1: Write minimal implementation**

Add reusable homepage stat and recommendation card styles, and align header anchor links with the new homepage sections.

**Step 2: Run verification**

Run: `npm run build`
Expected: Build succeeds with the refreshed homepage layout.
