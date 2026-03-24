import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const rootPageSource = readFileSync(new URL('../src/app/page.tsx', import.meta.url), 'utf8');

test('root homepage renders the english homepage shell', () => {
  assert.match(rootPageSource, /import Header from '@\/components\/Header';/);
  assert.match(rootPageSource, /import Footer from '@\/components\/Footer';/);
  assert.match(rootPageSource, /<Header locale="en" \/>/);
  assert.match(rootPageSource, /<HomepageContent locale="en" \/>/);
  assert.match(rootPageSource, /<Footer locale="en" \/>/);
});
