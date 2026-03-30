# SEO Semantic URL Migration Design

## Objective

Migrate `Interview Atlas` from numeric question URLs to semantic search-oriented URLs, add topic hub pages, and strengthen crawl/indexation signals without abandoning the existing static-export GitHub Pages deployment model.

## Current Constraints

- The site is built with Next.js static export and deployed under the GitHub Pages subpath `https://tinymodem.github.io/interview-atlas`.
- Static export means we cannot rely on runtime server redirects for legacy question routes.
- Existing public information architecture is small and shallow: homepage, job pages, and numeric question pages.
- Existing content quality is acceptable, but URL semantics and search-entry coverage are weak.

## Problem Statement

The current site exposes meaningful content but weak search signals:

- question URLs are opaque (`/q/101/`),
- there are no topic query-entry pages,
- sitemap output is small and lacks freshness metadata,
- internal linking emphasizes browsing more than search intent.

This likely contributes to poor index coverage and weak Bing/Google traffic.

## Goals

- Make semantic question URLs the primary canonical pages.
- Preserve legacy numeric URLs as compatibility entry points while removing them from the index.
- Add automatically generated topic hub pages that act as search-entry pages.
- Strengthen sitemap and page metadata to help crawlers prioritize canonical content.
- Keep the migration compatible with static export.

## Non-Goals

- No CMS or authoring workflow changes.
- No content rewrite of all answers.
- No dynamic server behavior or edge middleware.
- No manual creation of dozens of topic pages in this iteration.

## URL Strategy

### Canonical Question URLs

Introduce a new route family:

- `/questions/[slug]/`

Each slug should be stable, readable, and derived from the question title plus a stable identifier suffix to avoid collisions. Recommended format:

- `<normalized-keywords>-<id>`

Example:

- `/questions/transformer-core-components-interview-101/`

### Legacy Numeric URLs

Keep `/q/[id]/` as compatibility pages with these properties:

- `robots.index = false`
- canonical points to the new semantic question URL
- page triggers client-side `window.location.replace()` to the new URL

### Topic Hub URLs

Introduce a new route family:

- `/topics/[slug]/`

Initial hubs will be derived automatically from existing question/job taxonomy and curated heuristics.

Initial set:

- `transformer`
- `rag`
- `agent`
- `inference`
- `evaluation`
- `ai-product-manager`
- `llm-engineer`

## Data Model Changes

Add derived SEO helpers rather than rewriting source JSON:

- question slug generation
- reverse lookup from slug to question id
- topic hub definitions and membership
- canonical URL helpers for new route families
- freshness metadata for sitemap entries

## Metadata Strategy

### Question Pages

For `/questions/[slug]/`:

- semantic title using the question title
- description from `examPoint` or `approach`
- canonical to the new semantic URL
- JSON-LD structured data with headline, description, and breadcrumb context

For `/q/[id]/`:

- canonical to the semantic URL
- `robots.index = false`
- minimal compatibility metadata only

### Topic Hubs

Each `/topics/[slug]/` page should have:

- search-oriented title, e.g. `RAG 面试题 | Interview Atlas`
- short query-aligned description
- canonical to the hub URL
- JSON-LD `CollectionPage` / `ItemList`

## Sitemap Strategy

Update sitemap generation to include:

- homepage
- job pages
- semantic question pages
- topic hub pages
- `lastModified` for every entry

Do not include numeric legacy question URLs in the sitemap.

## Internal Linking Strategy

Shift the site toward search-entry architecture:

- homepage links to topic hubs and job pages
- job pages link to semantic question URLs and relevant hubs
- question pages link to semantic next/previous questions and related hubs
- topic hubs link deeply into semantic question pages

## Testing Strategy

Add tests before implementation for:

- slug generation and reverse lookup
- question route helpers using semantic URLs
- legacy numeric route metadata and redirect targets
- topic hub generation and membership
- sitemap inclusion of semantic URLs and topic hubs

## Rollout Notes

- Existing indexed numeric URLs may remain visible for some time, but canonical/noindex should gradually consolidate signals onto semantic URLs.
- Because deployment is static export, this migration optimizes for crawler guidance rather than true HTTP 301 behavior.
