import type { Locale } from '@/lib/data';

type LocaleText = Record<Locale, string>;

export const uiText = {
  brandTagline: {
    zh: '面向 AI 与大模型岗位的双语面试资料站',
    en: 'A bilingual interview prep library for AI and LLM roles',
  },
  homeTitle: {
    zh: '精选岗位题库',
    en: 'Curated Interview Tracks',
  },
  homeSubtitle: {
    zh: '从模型基础到 RAG、Agent 与评测，先建立结构，再补充细节。',
    en: 'Build strong mental models first, then go deeper into RAG, agents, evaluation, and shipping details.',
  },
  allTracks: {
    zh: '全部岗位',
    en: 'All Tracks',
  },
  questionCount: {
    zh: '题',
    en: 'questions',
  },
  chapters: {
    zh: '个章节',
    en: 'chapters',
  },
  answer: {
    zh: '参考答案',
    en: 'Reference Answer',
  },
  examPoint: {
    zh: '考察要点',
    en: 'What This Tests',
  },
  approach: {
    zh: '答题思路',
    en: 'Suggested Approach',
  },
  pitfall: {
    zh: '常见踩坑点',
    en: 'Common Pitfalls',
  },
  backToTracks: {
    zh: '返回题库',
    en: 'Back to tracks',
  },
  noData: {
    zh: '暂无数据',
    en: 'No content yet',
  },
  landingEyebrow: {
    zh: 'Interview Atlas',
    en: 'Interview Atlas',
  },
  landingTitle: {
    zh: '把零散的 AI 面试资料，整理成可复习、可索引、可持续扩充的题库。',
    en: 'Turn scattered AI interview material into an indexable, reviewable, and expandable study library.',
  },
  landingBody: {
    zh: '首版提供中英双语入口、岗位题库、题目详情和参考答案静态页，适合 GitHub Pages 部署与搜索引擎收录。',
    en: 'The first release ships with bilingual entry points, track pages, question pages, and static answers optimized for GitHub Pages and search indexing.',
  },
  enterChinese: {
    zh: '进入中文站',
    en: 'Open Chinese site',
  },
  enterEnglish: {
    zh: '进入英文站',
    en: 'Open English site',
  },
  footer: {
    zh: '持续整理 AI / LLM 面试题与参考答案',
    en: 'A growing library of AI / LLM interview questions and answers',
  },
  notFoundTitle: {
    zh: '这个页面走丢了',
    en: 'This page is missing',
  },
  notFoundBody: {
    zh: '链接可能已经变更，或者该页面还没有生成。你可以先回到首页继续浏览。',
    en: 'The link may have changed, or the page has not been generated yet. Head back to the home page to keep browsing.',
  },
} satisfies Record<string, LocaleText>;

export function t(locale: Locale, key: keyof typeof uiText): string {
  return uiText[key][locale];
}
