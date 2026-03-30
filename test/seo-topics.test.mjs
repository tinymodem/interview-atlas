import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getTopicBySlug, getTopics } from '../src/lib/seo.ts';

test('seo topic registry exposes initial topic hubs', () => {
  const topics = getTopics();
  const slugs = topics.map((topic) => topic.slug);

  assert.deepEqual(
    slugs,
    ['transformer', 'rag', 'agent', 'inference', 'evaluation', 'ai-product-manager', 'llm-engineer']
  );
});

test('transformer topic includes the transformer foundation question', () => {
  const topic = getTopicBySlug('transformer');

  assert.equal(topic?.questionIds.includes(101), true);
});

test('sitemap source includes topic and semantic question URLs', () => {
  const sitemapSource = readFileSync(new URL('../src/app/sitemap.ts', import.meta.url), 'utf8');

  assert.match(sitemapSource, /getTopics/);
  assert.match(sitemapSource, /getQuestionPathById/);
  assert.match(sitemapSource, /lastModified/);
});
