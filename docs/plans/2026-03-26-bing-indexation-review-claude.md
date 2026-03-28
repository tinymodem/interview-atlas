Verdict: APPROVED

Blocking issues

- None.

Non-blocking suggestions

- The `getLegacyZhRedirectPath` helper only matches `/zh/` (with trailing slash). If a bare `/interview-atlas/zh` pathname ever reaches the component (no trailing slash), the function falls back to `target` instead of stripping the basePath-aware prefix. In practice this is mitigated by `trailingSlash: true` in next.config.ts, which ensures Next.js normalizes all paths to include a trailing slash before the page renders. No fix needed now, but worth a comment if the trailing-slash config ever changes.
- After deployment, re-run Bing URL Inspection on a stale /zh URL to confirm Bing sees the noindex directive and the canonical pointing to the root route.
- The test suite validates source patterns via regex against file contents rather than rendering HTML. A build-time smoke test that inspects the actual `out/zh/` HTML for `<meta name="robots" content="noindex, follow">` and the correct `<link rel="canonical">` would catch regressions that source-level regex cannot (e.g., metadata merging bugs in Next.js).

Next owner: Claude

## Evidence

### Design requirement checklist

| # | Requirement | Status | Detail |
|---|---|---|---|
| 1 | Root route family: `/`, `/jobs/[slug]`, `/q/[id]` | Pass | `src/app/page.tsx`, `src/app/jobs/[slug]/page.tsx`, `src/app/q/[id]/page.tsx` all exist and serve as the canonical pages. |
| 2 | `/en/*` removed | Pass | `Glob('src/app/en/**/*')` returns no files. |
| 3 | Legacy `/zh` compatibility pages for previously-existing paths | Pass | Three pages: `src/app/zh/page.tsx`, `src/app/zh/jobs/[slug]/page.tsx`, `src/app/zh/q/[id]/page.tsx`. |
| 4 | robots `noindex, follow` on every `/zh` page | Pass | All three zh pages set `robots: { index: false, follow: true }` in metadata. |
| 5 | Canonical on each `/zh` page points to root route | Pass | `zh/page.tsx` → `getCanonicalUrl('/')`, `zh/jobs/[slug]` → `getCanonicalUrl('/jobs/${slug}')`, `zh/q/[id]` → `getCanonicalUrl('/q/${id}')`. `getCanonicalUrl` prepends `https://tinymodem.github.io/interview-atlas`. |
| 6 | Client-side redirect after hydration | Pass | All three zh pages render `<LegacyZhRedirect>`, which calls `window.location.replace()` inside `useEffect`. |
| 7 | basePath preserved during redirect | Pass | `getLegacyZhRedirectPath('/interview-atlas/zh/', '/')` → `'/interview-atlas/'`; `getLegacyZhRedirectPath('/interview-atlas/zh/jobs/llm-engineer/', ...)` → `'/interview-atlas/jobs/llm-engineer/'`. Test #5 confirms. |
| 8 | Sitemap limited to root routes | Pass | `src/app/sitemap.ts` emits only `/`, `/jobs/{slug}/`, `/q/{id}/` under the base URL. No `/zh` or `/en` entries. |
| 9 | Regression coverage | Pass | 5 dedicated tests in `test/legacy-zh-routes.test.mjs` plus existing route tests confirm `/en` is absent and `/zh` is compatibility-only. |

### Test results

- `node --test --test-concurrency=1 test/legacy-zh-routes.test.mjs`: 5 tests, 5 pass, 0 fail.
- `npm test`: 27 tests, 27 pass, 0 fail.

### Additional checks

- `lang="zh-CN"` set on `<html>` in `src/app/layout.tsx:18`.
- No `hreflang` or alternate-language links found anywhere in `src/`.
- No `/en` route files exist.
- `metadataBase` in layout matches `SITE_URL` in data.ts (`https://tinymodem.github.io/interview-atlas`).
- `trailingSlash: true` and conditional `basePath` in `next.config.ts` are consistent with the redirect logic.
