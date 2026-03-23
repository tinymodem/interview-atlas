import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
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

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getCanonicalUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
