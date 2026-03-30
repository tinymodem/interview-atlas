import { getJob, getJobs, getQuestion } from './data.ts';
import { getLocalizedPath, getText, type Locale } from './localization.ts';
import { getQuestionPathById } from './seo.ts';

export interface SidebarQuestion {
  id: number;
  href: string;
  label: string;
  active: boolean;
}

export interface SidebarSection {
  id: number;
  title: string;
  chapterTitle: string;
  questions: SidebarQuestion[];
}

export interface SidebarJob {
  slug: string;
  title: string;
}

export interface QuestionSidebarData {
  job: SidebarJob;
  sections: SidebarSection[];
}

export interface QuestionContextData {
  current: { id: number; title: string; jobSlug: string };
  previous: { id: number; title: string; jobSlug: string } | null;
  next: { id: number; title: string; jobSlug: string } | null;
}

export interface JobStartHereData {
  chapterTitle: string;
  sectionTitle: string;
  href: string;
  question: {
    id: number;
    title: string;
    number: string;
  };
}

function getOrderedQuestions(locale: Locale) {
  const ordered = [] as Array<{ id: number; title: string; jobSlug: string }>;

  for (const job of getJobs()) {
    const detail = getJob(job.slug);
    if (!detail) continue;

    for (const chapter of detail.chapters) {
      for (const section of chapter.sections) {
        for (const question of section.questions) {
          ordered.push({
            id: question.id,
            title: getText(question.title, locale) || question.number,
            jobSlug: detail.slug,
          });
        }
      }
    }
  }

  return ordered;
}

export function getQuestionContext(questionId: number, locale: Locale): QuestionContextData | null {
  const currentQuestion = getQuestion(questionId);
  if (!currentQuestion) return null;

  const ordered = getOrderedQuestions(locale).filter((question) => question.jobSlug === currentQuestion.jobSlug);
  const index = ordered.findIndex((question) => question.id === questionId);
  if (index === -1) return null;

  return {
    current: ordered[index],
    previous: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

export function getQuestionSidebar(jobSlug: string, currentQuestionId: number, locale: Locale): QuestionSidebarData {
  const job = getJob(jobSlug);
  if (!job) {
    throw new Error(`Unknown job slug: ${jobSlug}`);
  }

  return {
    job: {
      slug: job.slug,
      title: getText(job.name, locale) || job.slug,
    },
    sections: job.chapters.flatMap((chapter) =>
      chapter.sections.map((section) => ({
        id: section.id,
        title: getText(section.title, locale) || section.number,
        chapterTitle: getText(chapter.title, locale) || chapter.number,
        questions: section.questions.map((question) => ({
          id: question.id,
          href: getLocalizedPath(locale, getQuestionPathById(question.id)),
          label: getText(question.title, locale) || question.number,
          active: question.id === currentQuestionId,
        })),
      }))
    ),
  };
}

export function getQuestionSummary(questionId: number, locale: Locale): string | null {
  const question = getQuestion(questionId);
  if (!question) return null;
  return getText(question.examPoint, locale) || getText(question.approach, locale) || null;
}

export function getJobStartHere(jobSlug: string, locale: Locale): JobStartHereData | null {
  const job = getJob(jobSlug);
  if (!job) return null;

  for (const chapter of job.chapters) {
    for (const section of chapter.sections) {
      const firstQuestion = section.questions[0];
      if (!firstQuestion) continue;

      return {
        chapterTitle: getText(chapter.title, locale) || chapter.number,
        sectionTitle: getText(section.title, locale) || section.number,
        href: getLocalizedPath(locale, getQuestionPathById(firstQuestion.id)),
        question: {
          id: firstQuestion.id,
          title: getText(firstQuestion.title, locale) || firstQuestion.number,
          number: firstQuestion.number,
        },
      };
    }
  }

  return null;
}
