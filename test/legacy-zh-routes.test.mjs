import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLegacyZhRedirectPath } from '../src/lib/legacy-zh.ts';

const redirectComponentSource = readFileSync(new URL('../src/components/LegacyZhRedirect.tsx', import.meta.url), 'utf8');
const zhHomeSource = readFileSync(new URL('../src/app/zh/page.tsx', import.meta.url), 'utf8');
const zhJobSource = readFileSync(new URL('../src/app/zh/jobs/[slug]/page.tsx', import.meta.url), 'utf8');
const zhQuestionSource = readFileSync(new URL('../src/app/zh/q/[id]/page.tsx', import.meta.url), 'utf8');

test('legacy zh redirect component replaces the browser location after hydration', () => {
  assert.match(redirectComponentSource, /window\.location\.replace/);
  assert.match(redirectComponentSource, /getLegacyZhRedirectPath/);
});

test('legacy zh homepage is a noindex compatibility page for root homepage', () => {
  assert.match(zhHomeSource, /canonical: getCanonicalUrl\('\/'\)/);
  assert.match(zhHomeSource, /index: false/);
  assert.match(zhHomeSource, /LegacyZhRedirect target="\/"/);
});

test('legacy zh job routes point to root job routes and stay out of the index', () => {
  assert.match(zhJobSource, /canonical: getCanonicalUrl\(`\/jobs\/\$\{job\?\.slug \|\| slug\}`\)/);
  assert.match(zhJobSource, /index: false/);
  assert.match(zhJobSource, /LegacyZhRedirect target=\{`\/jobs\/\$\{slug\}`\}/);
});

test('legacy zh question routes point to root question routes and stay out of the index', () => {
  assert.match(zhQuestionSource, /canonical: getCanonicalUrl\(getQuestionPathById\(Number\(id\)\)\)/);
  assert.match(zhQuestionSource, /index: false/);
  assert.match(zhQuestionSource, /LegacyZhRedirect target=\{getQuestionPathById\(Number\(id\)\)\}/);
});

test('legacy zh redirect preserves the GitHub Pages basePath when stripping /zh', () => {
  assert.equal(getLegacyZhRedirectPath('/interview-atlas/zh/', '/'), '/interview-atlas/');
  assert.equal(
    getLegacyZhRedirectPath('/interview-atlas/zh/jobs/llm-engineer/', '/jobs/llm-engineer'),
    '/interview-atlas/jobs/llm-engineer/'
  );
});
