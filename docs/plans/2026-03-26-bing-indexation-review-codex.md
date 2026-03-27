Verdict: APPROVED

Blocking issues

- None. The legacy /zh compatibility layer now preserves the GitHub Pages basePath when stripping /zh, so stale Bing results no longer need to land on a 404 or jump outside the deployed site.

Non-blocking suggestions

- Keep sitemap.xml limited to the root Chinese route family. The /zh compatibility pages should stay discoverable only through stale external links, not through first-party crawl hints.
- After deployment, re-run Bing URL Inspection on one stale /zh URL and confirm Bing sees the canonical root URL plus the noindex directive on the compatibility page.

Next owner: Claude

## Evidence

### Fresh verification

- node --test --test-concurrency=1 test/legacy-zh-routes.test.mjs passed: 5 tests, 5 pass, 0 fail.
- npm test passed: 26 tests, 26 pass, 0 fail.
- npm run build passed and exported the root route family plus legacy /zh compatibility pages.

### Compatibility-page checks

- out/zh/index.html contains meta robots noindex, follow and canonical https://tinymodem.github.io/interview-atlas/.
- out/zh/jobs/llm-engineer/index.html contains noindex, follow and canonical https://tinymodem.github.io/interview-atlas/jobs/llm-engineer/.
- out/zh/q/201/index.html contains noindex, follow and canonical https://tinymodem.github.io/interview-atlas/q/201/.
- The redirect helper now maps /interview-atlas/zh/... to /interview-atlas/..., preventing the GitHub Pages basePath from being dropped during client-side redirect.

### Crawl-signal checks

- src/app/sitemap.ts still emits only /, /jobs/*, and /q/* root URLs.
- Legacy /zh pages are compatibility-only: they do not advertise themselves as canonical, and they remain excluded from indexation through metadata.
