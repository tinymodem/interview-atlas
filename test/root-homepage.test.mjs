import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const rootPageSource = readFileSync(new URL('../src/app/page.tsx', import.meta.url), 'utf8');

test('root homepage renders the chinese homepage shell', () => {
  assert.match(rootPageSource, /import Header from '@\/components\/Header';/);
  assert.match(rootPageSource, /import Footer from '@\/components\/Footer';/);
  assert.match(rootPageSource, /<Header locale="zh" \/>/);
  assert.match(rootPageSource, /<HomepageContent locale="zh" \/>/);
  assert.match(rootPageSource, /<Footer locale="zh" \/>/);
});

test('root homepage sources topic hub navigation', () => {
  const homepageContentSource = readFileSync(new URL('../src/components/HomepageContent.tsx', import.meta.url), 'utf8');

  assert.match(homepageContentSource, /topics/);
});
