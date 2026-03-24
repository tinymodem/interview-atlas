import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const homepageSource = readFileSync(new URL('../src/components/HomepageContent.tsx', import.meta.url), 'utf8');

test('homepage module sections omit descriptive subcopy', () => {
  assert.doesNotMatch(homepageSource, /latestTracksBody/);
  assert.doesNotMatch(homepageSource, /hotTracksBody/);
  assert.doesNotMatch(homepageSource, /hotQuestionsBody/);
  assert.doesNotMatch(homepageSource, /platformValueBody/);
});
