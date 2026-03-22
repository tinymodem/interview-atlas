import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

function runBuildData(tempDir) {
  const sourcePath = join(process.cwd(), 'test', 'fixtures', 'build-data-source.json');
  const outDir = join(tempDir, 'generated');
  const result = spawnSync('node', ['scripts/build-data.mjs'], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      INTERVIEW_SOURCE_PATH: sourcePath,
      INTERVIEW_OUT_DIR: outDir,
    },
    encoding: 'utf8',
  });

  return { result, outDir };
}

test('build-data generates bilingual job and question payloads', () => {
  const tempDir = mkdtempSync(join(tmpdir(), 'interview-atlas-build-'));

  try {
    const { result, outDir } = runBuildData(tempDir);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const jobs = JSON.parse(readFileSync(join(outDir, 'jobs.json'), 'utf8'));
    assert.equal(jobs.length, 1);
    assert.deepEqual(jobs[0].name, {
      zh: '大模型工程师',
      en: 'LLM Engineer',
    });

    const question = JSON.parse(readFileSync(join(outDir, 'questions', '101.json'), 'utf8'));
    assert.equal(question.title.en, 'Explain the core components of a Transformer.');
    assert.match(question.answerHtml.zh, /<h2>中文答案<\/h2>/);
    assert.match(question.answerHtml.en, /<h2>English Answer<\/h2>/);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test('build-data falls back to Chinese copy when English text is missing', () => {
  const tempDir = mkdtempSync(join(tmpdir(), 'interview-atlas-build-'));

  try {
    const { result, outDir } = runBuildData(tempDir);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const question = JSON.parse(readFileSync(join(outDir, 'questions', '101.json'), 'utf8'));
    assert.equal(
      question.examPoint.en,
      '考察你是否理解 attention、残差连接和前馈网络。'
    );

    const pitfall = question.pitfallHtml;
    assert.equal(
      pitfall.en,
      '<p>只说 self-attention，不提位置编码和训练稳定性。</p>\n'
    );
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});
