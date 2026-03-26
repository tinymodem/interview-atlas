import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const headerSource = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
const i18nSource = readFileSync(new URL('../src/lib/i18n.ts', import.meta.url), 'utf8');

test('header removes the language switch entry for the chinese-only site', () => {
  assert.doesNotMatch(headerSource, /languagePreserved/);
  assert.doesNotMatch(headerSource, /switchLanguage/);
  assert.doesNotMatch(headerSource, /languageLabel/);
  assert.doesNotMatch(headerSource, /切换语言/);
  assert.doesNotMatch(headerSource, /Change language/);
});

test('brand tagline copy avoids multilingual positioning', () => {
  assert.doesNotMatch(i18nSource, /multilingual interview prep library/i);
});
