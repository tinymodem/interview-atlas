# Bing Indexation Chinese-Only Simplification Design

## Summary

This design records the approved remediation strategy for the Bing indexation warning after reviewing the site, the exported HTML, and the Bing Webmaster Guidelines page referenced in the warning.

The chosen strategy is to simplify the public site from bilingual routing to a single Chinese surface first, so Bing sees one language, one homepage, and one canonical URL family. Because Bing still surfaced stale /zh results after that simplification, the current design adds a narrow compatibility layer for legacy /zh URLs without restoring /zh as an official public route family.

## Problem Statement

The earlier bilingual setup created several conflicting indexation signals:

- Chinese pages could inherit the wrong document language.
- English routes and Chinese routes duplicated or fragmented homepage ownership.
- Locale-aware helpers produced extra route variants that were unnecessary for the immediate launch goal.
- Bing's warning is more consistent with weak signal quality than with a crawl block.
- Even after the Chinese-only cleanup, stale Bing results could still point users at old /zh URLs, creating visible 404s.

## Approved Direction

The public site should remain Chinese-only.

- / is the only official homepage.
- /jobs/[slug] is the only official public job route family.
- /q/[id] is the only official public question route family.
- /en/* is removed.
- /zh/* is not restored as an official route family, but legacy /zh compatibility pages may exist to absorb stale Bing results.
- The document language should be zh-CN.
- Canonical URLs and sitemap URLs should reference only the root Chinese route family.
- Any legacy /zh compatibility page must be noindex,follow, canonicalize to the matching root route, and redirect users to the root route after hydration.

## Why This Direction

This strategy keeps indexation signals concentrated while avoiding user-facing breakage from stale search results.

Benefits:

- removes duplicate homepage ambiguity,
- removes locale routing complexity from the canonical site,
- preserves one coherent root URL family for Bing,
- keeps stale /zh links from hard-404ing,
- avoids reintroducing /zh as a competing canonical surface.

## Required Implementation Outcomes

1. Keep the public route family rooted at /, /jobs/[slug], and /q/[id].
2. Keep /en/* removed from the shipped site.
3. Add legacy /zh compatibility pages only for paths that previously existed and may still appear in Bing.
4. Mark every legacy /zh compatibility page with robots noindex,follow.
5. Point each legacy /zh page canonical to the matching root Chinese route.
6. Redirect each legacy /zh page to the matching root route after hydration.
7. Preserve the GitHub Pages basePath when stripping /zh so deployed redirects stay inside /interview-atlas/.
8. Keep sitemap entries limited to /, /jobs/[slug]/, and /q/[id]/.
9. Add regression coverage so /en/* does not reappear and /zh/* remains compatibility-only rather than becoming a canonical public route family.

## Verification Expectations

Required checks before close-out:

- npm test
- npm run build
- inspect out/ so /en artifacts are absent and /zh artifacts, if present, are compatibility pages only
- inspect representative HTML for lang="zh-CN", canonical URLs, noindex on legacy /zh pages, and absence of alternate hreflang links
- verify the legacy /zh redirect logic preserves the GitHub Pages basePath when deployed under /interview-atlas/
- compare actual outcome against the fix checklist and note which old bilingual tasks are superseded by the new strategy
