import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE_PATH = process.env.INTERVIEW_SOURCE_PATH || join(ROOT, 'content', 'interview-atlas-source.json');
const OUT = process.env.INTERVIEW_OUT_DIR || join(ROOT, 'src', 'data');

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writeJSON(path, data) {
  ensureDir(dirname(path));
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

function readJSON(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function localizedCopy(value) {
  if (value == null) {
    return null;
  }

  if (typeof value === 'string') {
    return { zh: value, en: value };
  }

  const zh = value.zh || value.en || '';
  const en = value.en || value.zh || '';
  return { zh, en };
}

async function localizedMarkdownHtml(value) {
  const copy = localizedCopy(value);
  if (!copy) {
    return null;
  }

  return {
    zh: await marked(copy.zh || ''),
    en: await marked(copy.en || ''),
  };
}

async function build() {
  const source = readJSON(SOURCE_PATH);

  rmSync(OUT, { recursive: true, force: true });
  ensureDir(OUT);

  const jobsSummary = [];
  const questionIds = [];

  for (const job of source.jobs) {
    let questionCount = 0;

    const chapters = [];
    for (const chapter of job.chapters) {
      const sections = [];
      for (const section of chapter.sections) {
        const questions = [];
        for (const question of section.questions) {
          questionCount += 1;
          questionIds.push(question.id);

          questions.push({
            id: question.id,
            number: question.number,
            title: localizedCopy(question.title),
          });

          writeJSON(join(OUT, 'questions', `${question.id}.json`), {
            id: question.id,
            number: question.number,
            title: localizedCopy(question.title),
            examPoint: localizedCopy(question.examPoint),
            approach: localizedCopy(question.approach),
            answerHtml: await localizedMarkdownHtml(question.answer),
            pitfallHtml: await localizedMarkdownHtml(question.pitfall),
            jobSlug: job.slug,
          });
        }

        sections.push({
          id: section.id,
          number: section.number,
          title: localizedCopy(section.title),
          questions,
        });
      }

      chapters.push({
        id: chapter.id,
        number: chapter.number,
        title: localizedCopy(chapter.title),
        sections,
      });
    }

    const detail = {
      slug: job.slug,
      name: localizedCopy(job.name),
      description: localizedCopy(job.description),
      questionCount,
      chapters,
    };

    writeJSON(join(OUT, 'jobs', `${job.slug}.json`), detail);
    jobsSummary.push({
      slug: job.slug,
      name: localizedCopy(job.name),
      description: localizedCopy(job.description),
      questionCount,
    });
  }

  writeJSON(join(OUT, 'site.json'), {
    brand: localizedCopy(source.site.brand),
    subtitle: localizedCopy(source.site.subtitle),
    description: localizedCopy(source.site.description),
  });
  writeJSON(join(OUT, 'jobs.json'), jobsSummary);
  writeJSON(join(OUT, 'question-ids.json'), questionIds);

  console.log(`Built data for ${jobsSummary.length} jobs and ${questionIds.length} questions from ${SOURCE_PATH}`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
