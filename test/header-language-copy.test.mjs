import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const headerSource = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
const i18nSource = readFileSync(new URL('../src/lib/i18n.ts', import.meta.url), 'utf8');

test('header language entry avoids functional switch-language copy', () => {
  assert.doesNotMatch(headerSource, /languagePreserved/);
  assert.doesNotMatch(headerSource, /switchLanguage/);
  assert.equal(headerSource.includes("const languageLabel = locale === 'zh' ? '中文' : 'English';"), true);
  assert.equal(headerSource.includes("aria-label={locale === 'zh' ? '切换语言' : 'Change language'}"), true);
});

test('brand tagline copy avoids multilingual positioning', () => {
  assert.doesNotMatch(i18nSource, /multilingual interview prep library/i);
});
