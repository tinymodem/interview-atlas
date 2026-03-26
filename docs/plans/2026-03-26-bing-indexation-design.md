# Bing Indexation Chinese-Only Simplification Design

## Summary

This design records the approved remediation strategy for the Bing indexation warning after reviewing the site, the exported HTML, and the Bing Webmaster Guidelines page referenced in the warning.

The chosen strategy is to simplify the public site from bilingual routing to a single Chinese surface first, so Bing sees one language, one homepage, and one canonical URL family.

## Problem Statement

The earlier bilingual setup created several conflicting indexation signals:

- Chinese pages could inherit the wrong document language.
- English routes and Chinese routes duplicated or fragmented homepage ownership.
- Locale-aware helpers produced extra route variants that were unnecessary for the immediate launch goal.
- Bing's warning is more consistent with weak signal quality than with a crawl block.

## Approved Direction

The public site should become Chinese-only for now.

- / is the only homepage.
- /jobs/[slug] is the only public job route family.
- /q/[id] is the only public question route family.
- /en/* is removed.
- /zh/* is removed.
- The document language should be zh-CN.
- Canonical URLs and sitemap URLs should reference only the root Chinese route family.

## Why This Direction

This strategy intentionally trades multilingual scope for stronger indexation clarity.

Benefits:

- removes duplicate homepage ambiguity,
- removes locale routing complexity,
- removes mixed-language rendering risk,
- removes /zh duplication for Chinese content,
- gives Bing one coherent language and canonical structure to evaluate.

## Required Implementation Outcomes

1. Delete locale route files under src/app/[locale]/.
2. Add root public routes for jobs and questions.
3. Make the root homepage Chinese and remove the language switcher.
4. Restrict supported locales in the data layer to zh.
5. Make route helpers emit root public paths instead of locale-prefixed paths.
6. Emit sitemap entries only for /, /jobs/[slug]/, and /q/[id]/.
7. Ensure exported HTML uses lang="zh-CN" and self-canonical root Chinese URLs.
8. Add regression coverage so /zh/* and /en/* do not reappear accidentally.

## Verification Expectations

Required checks before close-out:

- npm test
- npm run build
- inspect out/ for no /zh or /en artifacts
- inspect representative HTML for lang="zh-CN", canonical URLs, and absence of alternate hreflang links
- compare actual outcome against the fix checklist and note which old bilingual tasks are superseded by the new strategy
