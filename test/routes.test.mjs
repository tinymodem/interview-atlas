import test from 'node:test';
import assert from 'node:assert/strict';
import { getLocalizedPath, getText } from '../src/lib/localization.ts';

test('localized paths are prefixed with locale segments', () => {
  assert.equal(getLocalizedPath('zh'), '/zh');
  assert.equal(getLocalizedPath('en', '/jobs/llm-engineer'), '/en/jobs/llm-engineer');
});

test('locale guard accepts only supported locales', () => {
  assert.equal(['/zh', '/en'].includes(getLocalizedPath('zh')), true);
  assert.equal(['/zh', '/en'].includes(getLocalizedPath('en')), true);
  assert.equal(['/zh', '/en'].includes('/fr'), false);
});

test('localized text falls back to chinese when english is empty', () => {
  assert.equal(getText({ zh: '中文内容', en: '' }, 'en'), '中文内容');
});
