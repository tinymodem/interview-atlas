import type { Locale } from '@/lib/data';

type LocaleText = Record<Locale, string>;

export const uiText = {
  brandTagline: {
    zh: '面向 AI 与大模型岗位的多语言面试资料站',
    en: 'A multilingual interview prep library for AI and LLM roles',
  },
  primaryNavHome: {
    zh: '首页',
    en: 'Home',
  },
  primaryNavTracks: {
    zh: '专题目录',
    en: 'Tracks',
  },
  primaryNavMethod: {
    zh: '学习方式',
    en: 'Method',
  },
  homeTitle: {
    zh: '从基础到工程的题库与笔记',
    en: 'Interview notes from foundations to production systems',
  },
  homeSubtitle: {
    zh: '先建立结构，再记忆细节。把 AI / LLM 面试题整理成可以持续复习的学习路径。',
    en: 'Build mental models first, then memorize the details. Interview Atlas organizes AI and LLM questions into a reusable study path.',
  },
  allTracks: {
    zh: '全部方向',
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
    zh: '答题框架',
    en: 'Answer Framework',
  },
  pitfall: {
    zh: '常见误区',
    en: 'Common Pitfalls',
  },
  noData: {
    zh: '内容还在整理中',
    en: 'Content is still being organized',
  },
  landingEyebrow: {
    zh: 'Interview Atlas',
    en: 'Interview Atlas',
  },
  landingTitle: {
    zh: '把零散的 AI 面试资料，整理成一座能持续扩充的知识地图。',
    en: 'Turn scattered AI interview material into a study atlas you can keep expanding.',
  },
  landingBody: {
    zh: '用文档化结构整理模型基础、RAG、Agents、评测与工程实践，方便复习、引用和搜索引擎收录。',
    en: 'Interview Atlas uses a document-first structure for model basics, RAG, agents, evaluation, and engineering practice—built for review, citation, and search indexing.',
  },
  landingKicker: {
    zh: '公开可传播的面试知识地图',
    en: 'A public, document-style interview atlas',
  },
  landingValue1Title: {
    zh: '按学习路径组织',
    en: 'Organized as a study path',
  },
  landingValue1Body: {
    zh: '不是随机刷题，而是沿着模型基础、检索增强、Agent 与评测逐步推进。',
    en: 'Move from model foundations to retrieval, agents, evaluation, and shipping instead of hopping between random questions.',
  },
  landingValue2Title: {
    zh: '适合复习和引用',
    en: 'Built for review and citation',
  },
  landingValue2Body: {
    zh: '每个问题都整理成可连续阅读的文档块，适合考前回顾，也适合长期补充。',
    en: 'Each question is arranged as a readable document so it works for quick review now and continuous expansion later.',
  },
  landingValue3Title: {
    zh: '静态可索引',
    en: 'Static and searchable',
  },
  landingValue3Body: {
    zh: '保持静态导出与多语言路由，让内容容易部署、引用和被搜索引擎收录。',
    en: 'The site keeps static export and multilingual routes so it stays easy to deploy, cite, and index.',
  },
  enterChinese: {
    zh: '进入中文站',
    en: 'Open Chinese Site',
  },
  enterEnglish: {
    zh: '进入英文站',
    en: 'Open English Site',
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
  tracksIntro: {
    zh: '按角色与专题整理，适合从陌生到熟悉地系统复习。',
    en: 'Organized by role and topic so you can study from unfamiliar to fluent.',
  },
  learningPath: {
    zh: '学习路径',
    en: 'Learning Path',
  },
  learningPathBody: {
    zh: '先建立对模型机制的整体理解，再进入检索、Agent 与评测落地。',
    en: 'Build the model-level mental picture first, then move into retrieval, agents, and evaluation in production contexts.',
  },
  pathStep1: {
    zh: '模型基础',
    en: 'Model Foundations',
  },
  pathStep1Body: {
    zh: '掌握 Transformer、推理链路、训练稳定性与系统瓶颈。',
    en: 'Learn Transformers, inference flow, training stability, and systems bottlenecks.',
  },
  pathStep2: {
    zh: '检索与 Agents',
    en: 'Retrieval and Agents',
  },
  pathStep2Body: {
    zh: '理解召回、排序、工具调用、规划与上下文管理。',
    en: 'Understand retrieval, reranking, tool use, planning, and context management.',
  },
  pathStep3: {
    zh: '评测与上线',
    en: 'Evaluation and Shipping',
  },
  pathStep3Body: {
    zh: '把离线指标、线上反馈、风险控制和发布流程连成闭环。',
    en: 'Tie offline metrics, online feedback, risk control, and rollout strategy into one loop.',
  },
  featureBilingual: {
    zh: '多语言阅读',
    en: 'Multilingual by default',
  },
  featureStatic: {
    zh: '静态可索引',
    en: 'Static and indexable',
  },
  featureCurated: {
    zh: '持续整理更新',
    en: 'Continuously curated',
  },
  startHere: {
    zh: '推荐从这里开始',
    en: 'Recommended Starting Points',
  },
  startHereBody: {
    zh: '如果你刚进入这条方向，先从最能建立整体感的问题开始。',
    en: 'If you are new to this track, start with the question that gives you the clearest first mental model.',
  },
  browseQuestions: {
    zh: '浏览题库',
    en: 'Browse Questions',
  },
  browseTrackQuestions: {
    zh: '查看目录',
    en: 'Browse Directory',
  },
  exploreTrack: {
    zh: '查看专题',
    en: 'Open Track',
  },
  docSummary: {
    zh: '快速摘要',
    en: 'Quick Summary',
  },
  onThisPage: {
    zh: '本页内容',
    en: 'On This Page',
  },
  previousQuestion: {
    zh: '上一题',
    en: 'Previous',
  },
  nextQuestion: {
    zh: '下一题',
    en: 'Next',
  },
  switchLanguage: {
    zh: '切换语言',
    en: 'Switch Language',
  },
  sectionNavigation: {
    zh: '章节导航',
    en: 'Section Navigation',
  },
  roleGuide: {
    zh: '方向导读',
    en: 'Track Guide',
  },
  roleGuideBody: {
    zh: '建议先从模型基础入门，再进入检索增强与 Agent 设计，最后回到评测和工程落地。',
    en: 'Start from core model understanding, then move into retrieval and agent design, and finish with evaluation and shipping concerns.',
  },
  chapterDirectory: {
    zh: '章节目录',
    en: 'Chapter Directory',
  },
  chapterDirectoryBody: {
    zh: '按章节和小节浏览问题，适合系统复习时按顺序推进。',
    en: 'Browse by chapter and section when you want a structured review session.',
  },
  trackSnapshot: {
    zh: '专题概览',
    en: 'Track Snapshot',
  },
  questionsIncluded: {
    zh: '已收录问题',
    en: 'Questions Included',
  },
  sectionsIncluded: {
    zh: '细分小节',
    en: 'Sections',
  },
  readingMode: {
    zh: '阅读模式',
    en: 'Reading Mode',
  },
  answerBody: {
    zh: '展开回答',
    en: 'Expanded Answer',
  },
  summaryFallback: {
    zh: '先抓住这道题的核心判断，再用答题框架展开细节。',
    en: 'Anchor on the core judgment first, then use the answer framework to unfold the details.',
  },
  inThisTrack: {
    zh: '本专题目录',
    en: 'In This Track',
  },
  trackOverview: {
    zh: '专题总览',
    en: 'Track Overview',
  },
  readingTips: {
    zh: '阅读提示',
    en: 'Reading Tips',
  },
  readingTipsBody: {
    zh: '先读考察要点与摘要，再进入参考答案，最后用误区检查自己的表达是否完整。',
    en: 'Read the summary and what-this-tests block first, move through the answer body, and finish by checking the pitfalls against your own explanation.',
  },
  languagePreserved: {
    zh: '切换语言会保留当前页面',
    en: 'Language switching keeps this page context',
  },
} satisfies Record<string, LocaleText>;

export function t(locale: Locale, key: keyof typeof uiText): string {
  return uiText[key][locale];
}
