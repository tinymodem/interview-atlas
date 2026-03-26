# Bing Indexation Investigation

## Scope

This note documents the investigation into the Bing Webmaster Tools message shown for the deployed site:

> The inspected URL is known to Bing but has some issues which are preventing indexation.

The goal of this note is to capture:

- what Bing is likely signaling,
- what was verified on the live site,
- which issues are most likely contributing to non-indexation,
- and what to validate after fixes.

This is an investigation memo, not an implementation plan.

## Inputs Reviewed

### Bing guidance

The investigation included a direct read of the Bing Webmaster Guidelines page linked from the error message:

- <https://www.bing.com/webmasters/help/webmasters-guidelines-30fba23a>

The raw HTML for the guidelines page is heavily app-driven, but the page source still exposes several relevant guidance themes through embedded strings in the initial payload. The most relevant signals surfaced in that page source were:

- Bing explicitly talks about improving `content quality` and `signal quality` for better index coverage.
- Bing distinguishes between URLs that are crawlable and URLs that are actually eligible for indexing.
- Bing guidance repeatedly ties indexing outcomes to whether Bing can fetch the content and whether the page adheres to Bing webmaster guidelines.
- Bing tooling copy also suggests that sitemap submission and crawlability help discovery, but they do not guarantee indexing.

Working interpretation for this incident: the warning is more consistent with a quality, duplication, or signal-consistency issue than with a basic robots or fetch failure.

### Live pages re-read during investigation

The following live pages were read directly during this investigation:

- <https://tinymodem.github.io/interview-atlas/>
- <https://tinymodem.github.io/interview-atlas/zh/>
- <https://tinymodem.github.io/interview-atlas/en/q/201/>
- <https://tinymodem.github.io/interview-atlas/robots.txt>
- <https://tinymodem.github.io/interview-atlas/sitemap.xml>

### Source files reviewed

- [src/app/layout.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/layout.tsx)
- [src/app/page.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/page.tsx)
- [src/app/[locale]/page.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/[locale]/page.tsx)
- [src/lib/localization.ts](/Users/krystal/Documents/Playground/interview-atlas/src/lib/localization.ts)
- [src/lib/navigation.ts](/Users/krystal/Documents/Playground/interview-atlas/src/lib/navigation.ts)
- [next.config.ts](/Users/krystal/Documents/Playground/interview-atlas/next.config.ts)
- [README.md](/Users/krystal/Documents/Playground/interview-atlas/README.md)

## What Was Verified

### Discovery and crawl basics appear healthy

The following basics do not appear to be the primary problem:

- `robots.txt` is reachable and allows all crawling.
- `sitemap.xml` is reachable and lists canonical-looking URLs under the GitHub Pages path prefix.
- inspected URLs such as `/`, `/en/`, and `/en/q/201/` return `200`.
- inspected pages include self-referential canonicals under `https://tinymodem.github.io/interview-atlas/...`.
- no `noindex` tag was found on the pages reviewed.

This matters because the Bing warning is likely not saying “I cannot find or fetch this page.” It is more likely saying “I know this URL, but the page has issues that reduce confidence for indexing.”

### The site is deployed as a GitHub Pages subpath site

The repo is designed for GitHub Pages deployment under `/interview-atlas`, not at the domain root.

That is explicit in [next.config.ts](/Users/krystal/Documents/Playground/interview-atlas/next.config.ts), where `basePath` becomes `/interview-atlas` in the GitHub Pages environment.

## Evidence and Findings

### 1. Chinese pages declare the wrong document language

The root layout hardcodes `lang="en"` for all pages.

Source:

- [src/app/layout.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/layout.tsx#L16)

Observed live behavior:

- `/zh/` renders Chinese content,
- but the HTML element is still `<html lang="en">`.

Why this likely matters:

- Bing guidance emphasizes signal quality.
- Language declaration is a fundamental page-level signal.
- A Chinese page labeled as English weakens Bing’s ability to interpret the page correctly.
- This issue is especially relevant on a bilingual site where language consistency is part of the core structure.

Assessment: high-confidence contributor.

### 2. English pages contain visible Chinese UI text

The question navigation context stores titles with a hard preference for Chinese:

- [src/lib/navigation.ts](/Users/krystal/Documents/Playground/interview-atlas/src/lib/navigation.ts#L45)

Specifically, `getOrderedQuestions()` stores `question.title.zh || question.title.en` instead of choosing by the current locale.

Observed live behavior on the English question page:

- `/en/q/201/` is otherwise an English page,
- but the `Previous` and `Next` link titles render in Chinese.

Why this likely matters:

- It creates a mixed-language page experience.
- It weakens the coherence of the page’s language and topical signals.
- Combined with the wrong `lang` attribute on other pages, this suggests to Bing that the site’s multilingual implementation is inconsistent.

Assessment: high-confidence contributor.

### 3. Internal URL generation does not match the deployed base path

The localization helper generates locale paths as `/${locale}/...` without including the GitHub Pages subpath prefix.

Source:

- [src/lib/localization.ts](/Users/krystal/Documents/Playground/interview-atlas/src/lib/localization.ts#L16)

At the same time, deployment is configured with `basePath: '/interview-atlas'` in GitHub Pages mode.

Observed live behavior:

- visible anchor tags in the final HTML are often corrected to `/interview-atlas/en/...`,
- but the page payload still contains embedded route data and link strings like `/en/q/201`, `/en`, and `/zh`.

Why this likely matters:

- It creates inconsistent internal URL signals inside the exported page.
- Search engines can process more than just the visible anchor list when interpreting site structure.
- On a subpath-hosted static site, path consistency is especially important.
- Even if Bing does not treat every embedded payload string as a link, this mismatch is still a sign that the published structure and the app’s own generated paths disagree.

Assessment: medium-to-high confidence contributor.

### 4. The site exposes two highly duplicative English homepages

The root homepage renders English content directly:

- [src/app/page.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/page.tsx#L18)

The locale homepage for `en` also renders English content:

- [src/app/[locale]/page.tsx](/Users/krystal/Documents/Playground/interview-atlas/src/app/[locale]/page.tsx#L28)

Observed live behavior:

- `/interview-atlas/` is effectively an English homepage,
- `/interview-atlas/en/` is also an English homepage,
- and both pages point to different self-canonical URLs.

Why this likely matters:

- This creates duplicate or near-duplicate entry pages.
- Bing’s guideline framing around signal quality and content quality is consistent with suppressing duplicate pages when there is no strong reason to index both.
- A duplicate root page can also make language targeting less clear, because `/` behaves like an English page rather than a neutral landing page or a redirect.

Assessment: high-confidence contributor, especially for homepage indexation.

### 5. The issue is probably not raw content absence, but content and signal consistency

The site does contain meaningful visible content on the pages inspected. This does not look like a pure empty-page or JS-only rendering failure.

However, Bing’s own wording on the guidelines page points toward a broader concept of “content quality” and “signal quality.” In this case, the stronger explanation is not that the pages are blank, but that the site sends several conflicting structural signals at once:

- language mismatch,
- duplicate English entry pages,
- mixed-language page fragments,
- and inconsistent subpath URLs.

## Ranked Root Cause Hypotheses

### Hypothesis 1

The strongest root cause is multilingual signal inconsistency.

Supporting evidence:

- Chinese pages ship with `lang="en"`.
- English pages can display Chinese navigation text.
- The site architecture is explicitly bilingual, so these errors are not edge cases; they affect core site interpretation.

### Hypothesis 2

The second strongest root cause is duplicate-homepage ambiguity between `/` and `/en/`.

Supporting evidence:

- both pages are English-facing,
- both are indexable,
- both use distinct canonicals,
- neither clearly acts as the single preferred English entry page.

### Hypothesis 3

The third likely contributor is internal URL signal inconsistency caused by `basePath`-unaware localized path generation.

Supporting evidence:

- code-generated localized paths omit `/interview-atlas`,
- live payload data still exposes those unprefixed paths,
- deployment depends on `/interview-atlas` being part of every internal route.

## What Is Probably Not The Primary Cause

The following items were investigated and do not currently look like the main blocker:

- `robots.txt` blocking Bing.
- missing sitemap.
- missing canonical tags.
- explicit `noindex`.
- the inspected URLs returning `404` or `5xx`.

These may still matter operationally in other contexts, but they do not match the current evidence.

## Recommended Validation After Fixes

After the site is updated, validate in this order:

1. Re-fetch live HTML for `/zh/` and confirm `<html lang="zh-CN">` or another correct Chinese language tag.
2. Re-fetch an English question page and confirm all visible surrounding UI text is English, including previous and next navigation labels and titles.
3. Re-fetch live HTML and embedded payload strings to confirm internal app-generated paths consistently include `/interview-atlas/...` where required.
4. Decide on a single English homepage strategy for `/` versus `/en/`, then verify the live behavior matches that strategy consistently through canonicalization or redirect behavior.
5. Re-submit the affected URL in Bing Webmaster Tools and wait several days before drawing conclusions, since Bing’s own tooling language suggests index coverage can lag after fixes.

## Current Bottom Line

The investigation does not support a simple “Bing cannot crawl the page” explanation.

The stronger explanation is that Bing can discover and fetch the site, but the site currently sends weak or conflicting indexation signals through:

- incorrect document language on Chinese pages,
- mixed-language content on English pages,
- duplicate English homepage surfaces,
- and inconsistent subpath URL generation on a GitHub Pages deployment.

That cluster lines up much better with Bing’s guideline framing around content quality and signal quality than with a basic crawl allowance problem.

## Claude Independent Review

An independent pass was also requested from the local Claude CLI using the same evidence set.

### Claude raw conclusion, summarized faithfully

Claude’s response agreed that the problem is not basic crawl access. It also agreed that the most likely issue cluster is structural signal inconsistency rather than a missing sitemap, a blocked robots rule, or a missing canonical.

Claude ranked the likely causes as follows:

1. broken canonical and hreflang hrefs due to missing `basePath`,
2. `/zh/` pages rendered with `lang="en"`,
3. English pages containing Chinese-language prev and next titles,
4. embedded payload URLs still referencing stripped `/en/...` and `/zh/...` paths,
5. duplicate English homepages at `/` and `/en/`.

Claude also explicitly said the following are probably not the primary issue:

- reachable and well-formed `robots.txt`,
- reachable sitemap,
- missing `noindex`,
- and normal `200` responses.

### Where Claude and this investigation agree

There is strong agreement on the overall diagnosis:

- Bing can likely discover and fetch the pages.
- The likely problem is not permission to crawl, but confidence in whether the pages should be indexed.
- multilingual signal inconsistency is a major problem,
- duplicate homepage signals are likely harmful,
- and base-path inconsistencies likely weaken internal URL trust.

Claude’s response is therefore directionally aligned with the main conclusion of this note.

### Where Claude overreached beyond the verified evidence

Claude elevated one issue more aggressively than the evidence currently supports.

Specifically, Claude treated broken canonical and hreflang hrefs as the top issue. That would be a severe problem if true, but the live HTML inspected during this investigation showed self-referential canonical tags under the correct `https://tinymodem.github.io/interview-atlas/...` paths on the pages checked.

For that reason, the stronger evidence-supported statement is narrower:

- the site definitely has `basePath` inconsistency in helper-generated locale paths,
- the live payload definitely still exposes stripped `/en/...` and `/zh/...` path strings,
- but the canonical tags observed on the inspected live pages were not broken.

So Claude is useful here as a second opinion on direction, but not as proof that canonical tags themselves are currently wrong on every inspected page.

### Comparison summary

The best combined read is:

- both analyses agree the issue is primarily signal quality and consistency,
- both analyses agree the multilingual implementation is sending conflicting signals,
- both analyses agree duplicate English homepage surfaces are likely hurting indexation,
- both analyses agree the GitHub Pages subpath setup is part of the risk surface,
- but this investigation gives higher weight to verified live-page issues than to Claude’s inferred canonical failure theory.

In practical terms, Claude’s answer increases confidence in the overall diagnosis, while the manual investigation remains the stronger source for the exact ranking because it distinguishes between what was observed directly and what was inferred indirectly.
