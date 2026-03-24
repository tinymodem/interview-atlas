import test from 'node:test';
import assert from 'node:assert/strict';
import { getLocalizedPath, getLocaleSwitchPath } from '../src/lib/localization.ts';
import {
  getJobStartHere,
  getQuestionContext,
  getQuestionSidebar,
} from '../src/lib/navigation.ts';

test('language switch keeps the same content path when switching locales', () => {
  assert.equal(getLocaleSwitchPath('en', '/zh/q/101'), '/en/q/101');
  assert.equal(getLocaleSwitchPath('zh', '/en/jobs/llm-engineer'), '/zh/jobs/llm-engineer');
  assert.equal(getLocaleSwitchPath('en', '/zh'), '/en');
  assert.equal(getLocaleSwitchPath('zh', '/'), '/zh');
});

test('question context exposes previous and next questions inside the same job', () => {
  const context = getQuestionContext(102);
  assert.equal(context?.current.id, 102);
  assert.equal(context?.previous?.id, 101);
  assert.equal(context?.next?.id, 103);
});

test('question context does not cross into other jobs', () => {
  const context = getQuestionContext(301);
  assert.equal(context?.current.id, 301);
  assert.equal(context?.previous, null);
  assert.equal(context?.next, null);
});

test('question sidebar expands the current job and marks the active question', () => {
  const sidebar = getQuestionSidebar('llm-engineer', 201, 'en');
  assert.equal(sidebar.job.slug, 'llm-engineer');
  assert.equal(sidebar.sections.length > 0, true);
  assert.equal(
    sidebar.sections.some((section) =>
      section.questions.some(
        (question) => question.active && question.href === getLocalizedPath('en', '/q/201')
      )
    ),
    true
  );
});

test('job start helper exposes the recommended first question and labels', () => {
  const startHere = getJobStartHere('llm-engineer', 'zh');
  assert.equal(startHere?.question.id, 101);
  assert.equal(startHere?.chapterTitle, '模型基础');
  assert.equal(startHere?.sectionTitle, 'Transformer');
  assert.equal(startHere?.href, getLocalizedPath('zh', '/q/101'));
});
