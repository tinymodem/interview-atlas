import { getAllQuestionIds, getJob, getJobs, getQuestion, getText, type Locale } from './data.ts';

export interface TopicDefinition {
  slug: string;
  title: string;
  description: string;
  questionIds: number[];
  jobSlugs: string[];
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function getEnglishQuestionTitle(questionId: number): string {
  const question = getQuestion(questionId);
  if (!question) {
    throw new Error(`Unknown question id: ${questionId}`);
  }

  return getText(question.title, 'en') || getText(question.title, 'zh') || String(questionId);
}

function getQuestionSlugBase(questionId: number): string {
  const english = getEnglishQuestionTitle(questionId);

  const overrides = new Map<number, string>([
    [101, 'transformer-core-components-interview'],
  ]);

  return overrides.get(questionId) || slugify(english);
}

export function getQuestionSlug(questionId: number): string {
  return `${getQuestionSlugBase(questionId)}-${questionId}`;
}

export function getQuestionPathById(questionId: number): string {
  return `/questions/${getQuestionSlug(questionId)}`;
}

export function getQuestionBySlug(slug: string) {
  const match = slug.match(/-(\d+)$/);
  if (!match) return null;

  const id = Number(match[1]);
  const question = getQuestion(id);
  if (!question) return null;

  return getQuestionSlug(id) === slug ? question : null;
}

export function getQuestionLegacyPath(questionId: number): string {
  return `/q/${questionId}`;
}

function collectQuestionIdsForJob(jobSlug: string): number[] {
  const job = getJob(jobSlug);
  if (!job) return [];

  return job.chapters.flatMap((chapter) =>
    chapter.sections.flatMap((section) => section.questions.map((question) => question.id))
  );
}

export function getTopics(_locale: Locale = 'zh'): TopicDefinition[] {
  const llmEngineerQuestionIds = collectQuestionIdsForJob('llm-engineer');
  const aiPmQuestionIds = collectQuestionIdsForJob('ai-product-manager');

  return [
    {
      slug: 'transformer',
      title: 'Transformer 面试题',
      description: '聚合 Transformer、位置编码、注意力机制和训练稳定性相关题目。',
      questionIds: [101, 103, 104, 105],
      jobSlugs: ['llm-engineer'],
    },
    {
      slug: 'rag',
      title: 'RAG 面试题',
      description: '覆盖召回、排序、chunking 与线上排查等 RAG 高频问题。',
      questionIds: [201, 202, 203],
      jobSlugs: ['llm-engineer'],
    },
    {
      slug: 'agent',
      title: 'Agent 面试题',
      description: '覆盖工具调用、任务拆解、状态管理与 Agent 评测。',
      questionIds: [204, 205, 206],
      jobSlugs: ['llm-engineer'],
    },
    {
      slug: 'inference',
      title: '大模型推理优化面试题',
      description: '覆盖 KV Cache、延迟、吞吐和线上推理瓶颈分析。',
      questionIds: [102, 106, 107],
      jobSlugs: ['llm-engineer'],
    },
    {
      slug: 'evaluation',
      title: 'AI 评测面试题',
      description: '聚合 AI 产品和 Agent 评测相关高频题目。',
      questionIds: [206, 301],
      jobSlugs: ['llm-engineer', 'ai-product-manager'],
    },
    {
      slug: 'ai-product-manager',
      title: 'AI 产品经理面试题',
      description: '围绕需求定义、评测方法、上线风险与用户体验展开。',
      questionIds: aiPmQuestionIds,
      jobSlugs: ['ai-product-manager'],
    },
    {
      slug: 'llm-engineer',
      title: '大模型工程师面试题',
      description: '覆盖模型原理、推理优化、RAG、Agent 和评测的系统题库。',
      questionIds: llmEngineerQuestionIds,
      jobSlugs: ['llm-engineer'],
    },
  ];
}

export function getTopicBySlug(slug: string, locale: Locale = 'zh'): TopicDefinition | null {
  return getTopics(locale).find((topic) => topic.slug === slug) || null;
}

export function getTopicPath(slug: string): string {
  return `/topics/${slug}`;
}

export function getTopicLastModified(slug: string): Date {
  const topic = getTopicBySlug(slug);
  const questionIds = topic?.questionIds || getAllQuestionIds();
  const day = Math.max(...questionIds.map((id) => Number(String(id).slice(-2)) || 1));
  return new Date(`2026-03-${String(Math.min(day, 30)).padStart(2, '0')}T00:00:00.000Z`);
}

export function getQuestionLastModified(questionId: number): Date {
  const day = Math.max(1, Math.min(30, Number(String(questionId).slice(-2)) || 1));
  return new Date(`2026-03-${String(day).padStart(2, '0')}T00:00:00.000Z`);
}

export function getRelatedTopicsForQuestion(questionId: number, locale: Locale = 'zh'): TopicDefinition[] {
  return getTopics(locale).filter((topic) => topic.questionIds.includes(questionId));
}

export function getAllTopicSlugs(locale: Locale = 'zh'): string[] {
  return getTopics(locale).map((topic) => topic.slug);
}

export function getTopicJobs(slug: string) {
  const topic = getTopicBySlug(slug);
  if (!topic) return [];

  return getJobs().filter((job) => topic.jobSlugs.includes(job.slug));
}
