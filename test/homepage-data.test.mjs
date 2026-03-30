import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getHomepageFeaturedTracks,
  getHomepageOverview,
  getHomepageRecommendedStarts,
} from '../src/lib/data.ts';

test('homepage overview reports current track and question totals', () => {
  const overview = getHomepageOverview();

  assert.deepEqual(overview, {
    trackCount: 2,
    questionCount: 14,
  });
});

test('homepage recommended starts exposes localized track entry cards', () => {
  const recommended = getHomepageRecommendedStarts('zh');

  assert.equal(recommended.length, 2);
  assert.deepEqual(recommended[0], {
    slug: 'llm-engineer',
    trackName: '大模型工程师',
    trackDescription: '聚焦模型原理、推理优化、RAG、Agent 和评测。',
    questionCount: 13,
    href: '/questions/transformer-core-components-interview-101',
    chapterTitle: '模型基础',
    sectionTitle: 'Transformer',
    question: {
      id: 101,
      title: 'Transformer 的核心组件有哪些？面试时应该怎么讲清楚？',
      number: '1',
    },
  });
});

test('homepage featured tracks expose chinese public routes', () => {
  const featured = getHomepageFeaturedTracks('zh');
  const trackWithoutStart = featured.find((track) => track.slug === 'ai-product-manager');

  assert.equal(trackWithoutStart?.startHere?.question.id, 301);
  assert.equal(trackWithoutStart?.href, '/jobs/ai-product-manager');
});
