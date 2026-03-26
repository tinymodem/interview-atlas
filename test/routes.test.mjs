import test from 'node:test';
import assert from 'node:assert/strict';
import { getLocalizedPath, getText } from '../src/lib/localization.ts';

test('localized paths resolve to the chinese-only public routes', () => {
  assert.equal(getLocalizedPath('zh'), '/');
  assert.equal(getLocalizedPath('zh', '/jobs/llm-engineer'), '/jobs/llm-engineer');
  assert.equal(getLocalizedPath('zh', '/q/101'), '/q/101');
});

test('public route helper no longer emits english locale entry paths', () => {
  assert.equal(getLocalizedPath('zh').startsWith('/en'), false);
  assert.equal(getLocalizedPath('zh', '/jobs/llm-engineer').startsWith('/zh/'), false);
  assert.equal(getLocalizedPath('zh', '/jobs/llm-engineer').startsWith('/en/'), false);
});

test('localized text falls back to chinese when english is empty', () => {
  assert.equal(getText({ zh: '中文内容', en: '' }, 'en'), '中文内容');
});
