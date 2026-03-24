import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { getLocalizedPath, getText } from './localization.ts';
export { getLocaleLabel, getLocalizedPath, getText } from './localization.ts';

export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];

const MODULE_DIR = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(MODULE_DIR, '..', 'data');
const SITE_URL = 'https://tinymodem.github.io/interview-atlas';

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface SiteCopy {
  brand: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
}

export interface JobSummary {
  slug: string;
  name: LocalizedText;
  description: LocalizedText | null;
  questionCount: number;
}

export interface QuestionSummary {
  id: number;
  number: string;
  title: LocalizedText;
}

export interface Section {
  id: number;
  number: string;
  title: LocalizedText;
  questions: QuestionSummary[];
}

export interface Chapter {
  id: number;
  number: string;
  title: LocalizedText;
  sections: Section[];
}

export interface JobDetail extends JobSummary {
  chapters: Chapter[];
}

export interface QuestionDetail {
  id: number;
  number: string;
  title: LocalizedText;
  examPoint: LocalizedText | null;
  approach: LocalizedText | null;
  answerHtml: LocalizedText | null;
  pitfallHtml: LocalizedText | null;
  jobSlug: string;
}

export interface HomepageOverview {
  trackCount: number;
  questionCount: number;
}

export interface HomepageRecommendedStart {
  slug: string;
  trackName: string;
  trackDescription: string | null;
  questionCount: number;
  href: string;
  chapterTitle: string;
  sectionTitle: string;
  question: {
    id: number;
    title: string;
    number: string;
  };
}

export interface HomepageFeaturedTrack {
  slug: string;
  name: string;
  description: string | null;
  questionCount: number;
  href: string;
  startHere: HomepageRecommendedStart | null;
}

function readJSON<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function getSiteCopy(): SiteCopy {
  return readJSON<SiteCopy>(join(DATA_DIR, 'site.json'));
}

export function getJobs(): JobSummary[] {
  return readJSON<JobSummary[]>(join(DATA_DIR, 'jobs.json'));
}

export function getJob(slug: string): JobDetail | null {
  try {
    return readJSON<JobDetail>(join(DATA_DIR, 'jobs', `${slug}.json`));
  } catch {
    return null;
  }
}

export function getQuestion(id: number): QuestionDetail | null {
  try {
    return readJSON<QuestionDetail>(join(DATA_DIR, 'questions', `${id}.json`));
  } catch {
    return null;
  }
}

export function getAllQuestionIds(): number[] {
  try {
    return readJSON<number[]>(join(DATA_DIR, 'question-ids.json'));
  } catch {
    return [];
  }
}

export function getHomepageOverview(): HomepageOverview {
  return {
    trackCount: getJobs().length,
    questionCount: getAllQuestionIds().length,
  };
}

export function getHomepageRecommendedStarts(locale: Locale): HomepageRecommendedStart[] {
  return getJobs()
    .map((job) => {
      const detail = getJob(job.slug);
      if (!detail) return null;

      for (const chapter of detail.chapters) {
        for (const section of chapter.sections) {
          const firstQuestion = section.questions[0];
          if (!firstQuestion) continue;

          return {
            slug: detail.slug,
            trackName: getText(detail.name, locale) || detail.slug,
            trackDescription: getText(detail.description, locale),
            questionCount: detail.questionCount,
            href: getLocalizedPath(locale, `/q/${firstQuestion.id}`),
            chapterTitle: getText(chapter.title, locale) || chapter.number,
            sectionTitle: getText(section.title, locale) || section.number,
            question: {
              id: firstQuestion.id,
              title: getText(firstQuestion.title, locale) || firstQuestion.number,
              number: firstQuestion.number,
            },
          };
        }
      }

      return null;
    })
    .filter((item): item is HomepageRecommendedStart => item !== null);
}

export function getHomepageFeaturedTracks(locale: Locale): HomepageFeaturedTrack[] {
  const starts = new Map(getHomepageRecommendedStarts(locale).map((item) => [item.slug, item]));

  return getJobs().map((job) => ({
    slug: job.slug,
    name: getText(job.name, locale) || job.slug,
    description: getText(job.description, locale),
    questionCount: job.questionCount,
    href: getLocalizedPath(locale, `/jobs/${job.slug}`),
    startHere: starts.get(job.slug) || null,
  }));
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getCanonicalUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
