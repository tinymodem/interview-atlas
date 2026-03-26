import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('root chinese question route exists', () => {
  const path = new URL('../src/app/q/[id]/page.tsx', import.meta.url);
  assert.equal(existsSync(path), true);

  const source = readFileSync(path, 'utf8');
  assert.match(source, /const locale = 'zh';/);
  assert.doesNotMatch(source, /locale: 'en'/);
});

test('root chinese job route exists', () => {
  const path = new URL('../src/app/jobs/\[slug\]/page.tsx', import.meta.url);
  assert.equal(existsSync(path), true);

  const source = readFileSync(path, 'utf8');
  assert.match(source, /const locale = 'zh';/);
  assert.doesNotMatch(source, /locale: 'en'/);
});
