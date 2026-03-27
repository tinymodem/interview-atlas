import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const zhHomeSource = readFileSync(new URL('../src/app/zh/page.tsx', import.meta.url), 'utf8');
const zhJobSource = readFileSync(new URL('../src/app/zh/jobs/[slug]/page.tsx', import.meta.url), 'utf8');
const zhQuestionSource = readFileSync(new URL('../src/app/zh/q/[id]/page.tsx', import.meta.url), 'utf8');

test('legacy zh homepage permanently redirects to root homepage', () => {
  assert.match(zhHomeSource, /permanentRedirect\('\/'\)/);
});

test('legacy zh job routes permanently redirect to root job routes', () => {
  assert.match(zhJobSource, /permanentRedirect\(`\/jobs\/\$\{encodeURIComponent\(slug\)\}`\)/);
  assert.match(zhJobSource, /generateStaticParams/);
});

test('legacy zh question routes permanently redirect to root question routes', () => {
  assert.match(zhQuestionSource, /permanentRedirect\(`\/q\/\$\{encodeURIComponent\(id\)\}`\)/);
  assert.match(zhQuestionSource, /generateStaticParams/);
});
