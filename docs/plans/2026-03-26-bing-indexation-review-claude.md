# Claude Review — Bing Indexation Chinese-Only Simplification

**Date:** 2026-03-26
**Reviewer:** Claude (Opus 4.6)
**Scope:** Full code and exported output review of the Chinese-only route simplification for Bing indexation.

---

## Verdict: APPROVED

The change accomplishes the stated goal. The exported site is clean: one language, one homepage, one canonical route family, no locale-prefixed public routes, no hreflang/alternate links, and correct sitemap and robots.txt output. The remaining issues below are non-blocking for merge and deployment.

---

## Blocking issues

None.

---

## Non-blocking suggestions

### 1. Old `[locale]` source directory still exists on disk (deleted in git, not yet committed)

`src/app/[locale]/` still contains subdirectories on disk. Git status shows the four files inside as `deleted:` (unstaged). These are correctly absent from the build output, but the directory tree lingers on the working copy. This is fine for the build but should be cleaned up in the commit that lands this change — stage the deletions so they are part of the commit history.

Evidence: `git status -- 'src/app/[locale]/'` shows four unstaged deletions.

### 2. Dual `Locale` type definitions are inconsistent

- `src/lib/localization.ts:1` defines `Locale = 'zh' | 'en'`
- `src/lib/data.ts:9` defines `Locale = (typeof locales)[number]` which resolves to `'zh'` only

Components importing `Locale` from `localization.ts` (Header, Footer, navigation.ts) still accept `'en'` at the type level, while those importing from `data.ts` do not. This inconsistency is benign today because nothing passes `'en'`, but it undermines the guarantee that English routes cannot resurface. Consider making `localization.ts` re-export `Locale` from `data.ts` or restricting it to `'zh'`.

### 3. Test calls `getQuestionContext()` without the required `locale` argument

`test/navigation.test.mjs:26` and `:33` call `getQuestionContext(102)` and `getQuestionContext(301)` with one argument, but the function signature is `getQuestionContext(questionId: number, locale: Locale)`. JavaScript does not enforce arity, and `getText()` falls back gracefully when `locale` is `undefined`, so the test passes. Fix by passing `'zh'` explicitly:

```js
const context = getQuestionContext(102, 'zh');
```

### 4. Dead i18n copy for removed bilingual features

`src/lib/i18n.ts` still contains keys that reference removed functionality: `enterChinese`, `enterEnglish`, `pickLanguagePrompt`, `featureBilingual`, `statsBilingualLabel`, `statsBilingualValue`, `overviewCardBilingualBody`. None of these are used in any rendered component. They add noise but are harmless. Consider removing them in a follow-up.

### 5. Canonical URL trailing-slash handling is implicit

`getCanonicalUrl()` in `src/lib/data.ts:236` does not append a trailing slash, yet the exported HTML shows canonicals with trailing slashes (e.g., `.../q/201/`). This works because Next.js's `trailingSlash: true` config automatically appends the slash at build time. The behavior is correct but the implicit coupling is fragile — if `trailingSlash` were ever toggled off, canonicals and sitemap URLs would diverge. Acceptable for now; document the dependency if the config changes.

### 6. `LocalizedText` interface still requires `en` field

`src/lib/data.ts:16` and `src/lib/localization.ts:3` both define `LocalizedText` with required `zh` and `en` fields. All data files still carry English translations. This is fine (the data acts as a content reservoir), but it means new data entries still require writing English copy that will never be displayed. Consider making `en` optional (`en?: string`) when convenient.

---

## Exported output verification (independently confirmed)

| Check | Result |
|---|---|
| `out/` top-level dirs | `404/`, `_next/`, `jobs/`, `q/` — no `zh/`, no `en/` |
| `out/index.html` lang | `<html lang="zh-CN">` |
| Homepage canonical | `https://tinymodem.github.io/interview-atlas/` |
| `out/q/201/index.html` canonical | `https://tinymodem.github.io/interview-atlas/q/201/` |
| `out/jobs/llm-engineer/index.html` canonical | `https://tinymodem.github.io/interview-atlas/jobs/llm-engineer/` |
| hreflang / alternate links in HTML | None found in any exported page |
| Sitemap entries | Only `/`, `/jobs/*`, `/q/*` — all root Chinese URLs with trailing slashes |
| robots.txt | `Allow: /` with correct sitemap URL |
| `/zh/` or `/en/` in exported HTML content | None (grep returns no matches) |
| Bing site verification meta tag | Present: `2D30F8D3D76790FE2E2D4BA11F54CD7F` |

---

## Source code verification summary

| File | Finding |
|---|---|
| `src/app/layout.tsx` | `lang="zh-CN"`, correct metadataBase, Bing verification tag present |
| `src/app/page.tsx` | Chinese-only, canonical via `getCanonicalUrl('/')`, no locale param in URL |
| `src/app/jobs/[slug]/page.tsx` | `const locale = 'zh'`, canonical correct, generateStaticParams from `getJobs()` |
| `src/app/q/[id]/page.tsx` | `const locale = 'zh'`, canonical correct, generateStaticParams from `getAllQuestionIds()` |
| `src/app/sitemap.ts` | Only emits `/`, `/jobs/*/`, `/q/*/` — no locale prefixes |
| `src/lib/data.ts` | `locales = ['zh']`, all path helpers produce root paths |
| `src/lib/localization.ts` | `getLocalizedPath` ignores locale and returns root paths |
| `src/lib/navigation.ts` | All hrefs go through `getLocalizedPath` → root paths |
| `src/components/Header.tsx` | No language switcher, links via `getLocalizedPath` |
| `next.config.ts` | `output: 'export'`, `trailingSlash: true`, no i18n config |
| Tests (22 pass) | Cover root route existence, Chinese-only enforcement, path helper correctness, navigation context |

---

## Next owner: Claude

Ready to stage the `[locale]` deletions, commit, and deploy whenever the user gives the go-ahead.
