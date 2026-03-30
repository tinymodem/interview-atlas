import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getHomepageHotQuestions,
  getHomepageHotTracks,
  getHomepageLatestTracks,
} from '../src/lib/data.ts';

test('homepage latest tracks expose bilingual curated cards', () => {
  const latest = getHomepageLatestTracks('zh');

  assert.equal(latest.length >= 3, true);
  assert.equal(latest[0]?.title, '大模型应用开发');
  assert.equal(latest[0]?.category, 'AI / 大模型');
  assert.equal(latest[0]?.href, '/jobs/llm-engineer');
});

test('homepage hot tracks expose chinese curated entries', () => {
  const hot = getHomepageHotTracks('zh');

  assert.equal(hot.length >= 3, true);
  assert.equal(hot[0]?.title, '大模型工程师');
  assert.equal(typeof hot[0]?.summary, 'string');
});

test('homepage hot questions expose question cards with linked tracks', () => {
  const hotQuestions = getHomepageHotQuestions('zh');

  assert.equal(hotQuestions.length >= 4, true);
  assert.equal(hotQuestions[0]?.trackTitle, '大模型应用开发');
  assert.match(hotQuestions[0]?.questionTitle || '', /Transformer|RAG|评测/);
  assert.equal(hotQuestions[0]?.href.startsWith('/questions/'), true);
});
