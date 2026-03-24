# Homepage CMS365 Style Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the homepage so it follows a CMS365-style content-platform structure while keeping Interview Atlas's language switcher and bilingual routes.

**Architecture:** Add homepage-only bilingual display data in `src/data/homepage.ts`, expose read-only helpers from the data layer, and rebuild `/`, `/zh`, and `/en` around hero, latest tracks, hot tracks, hot questions, and a lighter study-method section.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, node:test

---

### Task 1: Add homepage content data coverage

**Files:**
- Create: `src/data/homepage.ts`
- Create: `test/homepage-content.test.mjs`
- Modify: `src/lib/data.ts`

**Step 1: Write the failing test**

Add tests for homepage latest tracks, hot tracks, and hot questions helpers.

**Step 2: Run test to verify it fails**

Run: `node --test test/homepage-content.test.mjs`
Expected: FAIL because homepage content helpers do not exist yet.

**Step 3: Write minimal implementation**

Add homepage-only bilingual data and read-only helper functions in `src/lib/data.ts`.

**Step 4: Run test to verify it passes**

Run: `node --test test/homepage-content.test.mjs`
Expected: PASS.

### Task 2: Replace homepage copy with platform-style content

**Files:**
- Modify: `src/lib/i18n.ts`

**Step 1: Write minimal implementation**

Add copy keys for platform-style hero, section headings, list metadata, and lighter study-method messaging.

**Step 2: Verify usage compiles later in page implementation**

Run: `npm test`
Expected: Existing tests stay green.

### Task 3: Rebuild localized homepage structure

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`

**Step 1: Write minimal implementation**

Restructure the localized homepage into a CMS365-style layout with hero, latest tracks, hot tracks, hot questions, and a lighter method section while preserving the current top-right language switcher.

**Step 2: Run verification**

Run: `npm test`
Expected: PASS.

### Task 4: Align root landing page with the new homepage rhythm

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Write minimal implementation**

Make `/` feel like the same platform homepage family while still serving as the language entry page.

**Step 2: Run verification**

Run: `npm test`
Expected: PASS.

### Task 5: Add CMS365-style homepage styling

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Write minimal implementation**

Add section, card, and list styles that create a clearer platform-homepage rhythm without removing the current brand base.

**Step 2: Run build verification**

Run: `npm run build`
Expected: PASS.
