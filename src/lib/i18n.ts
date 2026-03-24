import type { Locale } from '@/lib/data';

type LocaleText = Record<Locale, string>;

export const uiText = {
  brandTagline: {
    zh: '面向 AI 与大模型岗位的面试资料站',
    en: 'Interview prep notes and question sets for AI and LLM roles',
  },
  primaryNavHome: {
    zh: '首页',
    en: 'Home',
  },
  primaryNavTracks: {
    zh: '专题目录',
    en: 'Tracks',
  },
  primaryNavHot: {
    zh: '热门题目',
    en: 'Hot Questions',
  },
  primaryNavStart: {
    zh: '推荐起点',
    en: 'Start Here',
  },
  primaryNavMethod: {
    zh: '学习方式',
    en: 'Method',
  },
  homeTitle: {
    zh: 'AI / 大模型面试题库与复习入口',
    en: 'AI / LLM Interview Question Bank and Study Entry',
  },
  homeSubtitle: {
    zh: '帮助你更快进入 AI / 大模型面试状态，先找到值得看的专题，再进入高频题目。',
    en: 'Get interview-ready faster for AI and LLM roles by finding the right tracks and high-signal questions first.',
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
    zh: '把零散的 AI 面试资料，整理成一张能马上开始浏览的复习地图。',
    en: 'Turn scattered AI interview material into a study atlas you can open and use immediately.',
  },
  landingBody: {
    zh: '围绕模型基础、RAG、Agents、评测与工程实践组织专题、题目和推荐起点，让你更快进入面试状态。',
    en: 'Interview Atlas organizes model basics, RAG, agents, evaluation, and engineering practice into tracks, questions, and recommended entry points so you can get interview-ready faster.',
  },
  landingKicker: {
    zh: '公开可传播的面试知识地图',
    en: 'A public, document-style interview atlas',
  },
  landingValue1Title: {
    zh: '先给入口，再给框架',
    en: 'Start with entry points, not guesswork',
  },
  landingValue1Body: {
    zh: '先看到推荐专题和起点问题，再顺着学习路径系统复习，不用在零散资料里自己拼图。',
    en: 'See recommended tracks and starting questions first, then move through a structured learning path instead of stitching together scattered notes.',
  },
  landingValue2Title: {
    zh: '适合系统复习',
    en: 'Built for structured review',
  },
  landingValue2Body: {
    zh: '每道题都用文档化结构整理考察点、答题框架和参考答案，适合考前冲刺，也适合长期积累。',
    en: 'Each question is structured around what it tests, an answer framework, and a reference answer so it works for both quick review and long-term study.',
  },
  landingValue3Title: {
    zh: '便于查找与引用',
    en: 'Easy to share and revisit',
  },
  landingValue3Body: {
    zh: '保持静态导出和文档化组织，让复习内容更容易传播、引用和持续整理。',
    en: 'A static, document-style structure keeps the material easy to share, revisit, and keep organized.',
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
    zh: '按岗位与专题整理，适合从陌生到熟悉地系统复习。',
    en: 'Organized by role and topic so you can move from unfamiliar to fluent.',
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
  homeEyebrow: {
    zh: 'AI / LLM 面试资料站',
    en: 'AI / LLM Interview Atlas',
  },
  homeHeroBody: {
    zh: '围绕模型基础、RAG、Agent、评测与工程实践整理专题与题目入口，让你先知道看什么，再决定怎么系统复习。',
    en: 'Explore tracks and question entry points across model basics, RAG, agents, evaluation, and engineering so you know what to review before deciding how deep to study.',
  },
  homeHeroKicker: {
    zh: '专业面试题库网站',
    en: 'Interview Question Platform',
  },
  homeHeroLead: {
    zh: '让每一次复习都更接近真实面试。',
    en: 'Make every review session feel closer to the real interview.',
  },
  homepageOverview: {
    zh: '内容概览',
    en: 'Overview',
  },
  homepageOverviewBody: {
    zh: '先看整体规模和阅读方式，再进入适合你的专题和起点问题。',
    en: 'Understand the scope and reading model first, then jump into the track and starter question that fits you best.',
  },
  statsTracksLabel: {
    zh: '专题方向',
    en: 'Tracks',
  },
  statsQuestionsLabel: {
    zh: '收录题目',
    en: 'Questions',
  },
  statsBilingualLabel: {
    zh: '双语阅读',
    en: 'Bilingual Reading',
  },
  statsBilingualValue: {
    zh: '中英双语',
    en: 'ZH / EN',
  },
  statsIndexableLabel: {
    zh: '内容形态',
    en: 'Content Format',
  },
  statsIndexableValue: {
    zh: '静态可索引',
    en: 'Static and indexable',
  },
  startNow: {
    zh: '开始浏览专题',
    en: 'Browse Tracks',
  },
  latestTracks: {
    zh: '最新专题',
    en: 'Latest Tracks',
  },
  hotTracks: {
    zh: '热门专题',
    en: 'Popular Tracks',
  },
  hotQuestions: {
    zh: '热门题目',
    en: 'Hot Questions',
  },
  latestTracksBody: {
    zh: '优先查看最近整理和补充过的方向，快速进入当前值得复习的内容。',
    en: 'Start with recently curated tracks to enter the content that is most worth reviewing now.',
  },
  hotTracksBody: {
    zh: '从访问和复习价值更高的专题开始，更快找到适合你的准备方向。',
    en: 'Start with higher-signal tracks to quickly find the direction that fits your preparation best.',
  },
  hotQuestionsBody: {
    zh: '直接看高频题目，先建立面试表达，再回到专题里系统展开。',
    en: 'Jump into high-signal questions first, then return to the full track when you want more structure.',
  },
  openTopic: {
    zh: '进入专题',
    en: 'Open Track',
  },
  openQuestion: {
    zh: '查看题目',
    en: 'Open Question',
  },
  trackCategory: {
    zh: '方向分类',
    en: 'Category',
  },
  hotTrackTag: {
    zh: '热门',
    en: 'Popular',
  },
  latestTrackTag: {
    zh: '最新',
    en: 'Latest',
  },
  platformValueTitle: {
    zh: '不只是给题，也给复习顺序',
    en: 'More than prompts, it gives you a review order',
  },
  platformValueBody: {
    zh: '首页先帮你找到值得进入的专题和高频题目，再用学习路径把零散知识连起来。',
    en: 'The homepage helps you find the right tracks and high-signal questions first, then uses a study path to connect the scattered knowledge.',
  },
  seeRecommendedStarts: {
    zh: '查看推荐起点',
    en: 'See Recommended Starts',
  },
  recommendedStartsTitle: {
    zh: '推荐起点',
    en: 'Recommended Starts',
  },
  recommendedStartsBody: {
    zh: '如果你还没决定从哪里开始，先从每条方向最能建立整体感的第一题进入。',
    en: 'If you are not sure where to begin, start with the first question in each track that builds the clearest mental model.',
  },
  featuredTracksBody: {
    zh: '直接进入你要准备的岗位方向，按专题继续展开。',
    en: 'Jump straight into the role track you are preparing for and expand from there.',
  },
  homepageProofTitle: {
    zh: '为什么这样更适合准备面试',
    en: 'Why this works better for interview prep',
  },
  homepageProofBody: {
    zh: '强的面试回答不只是记住概念，而是能把概念、取舍与工程落地连成一条线。首页会先帮你找到入口，再进入结构化复习。',
    en: 'Strong interview answers connect concepts, trade-offs, and implementation judgment. The homepage should help you find the right entry point first, then move into structured review.',
  },
  landingStatsBody: {
    zh: '用当前已整理的专题和题目，快速进入适合自己的复习入口。',
    en: 'Use the current tracks and question set to get into the right study path quickly.',
  },
  pickLanguagePrompt: {
    zh: '选择你要进入的语言站点，并保留同样的学习结构。',
    en: 'Choose the language you want to study in while keeping the same learning structure.',
  },
  recommendedQuestion: {
    zh: '推荐问题',
    en: 'Recommended Question',
  },
  overviewCardTrackBody: {
    zh: '按岗位和专题组织，适合快速判断从哪里开始。',
    en: 'Organized by role and topic so you can quickly decide where to begin.',
  },
  overviewCardQuestionBody: {
    zh: '每道题都围绕面试表达组织，而不是单纯堆题。',
    en: 'Each question is organized around interview explanations, not just a raw prompt list.',
  },
  overviewCardBilingualBody: {
    zh: '同一套内容结构，方便按自己的阅读习惯进入复习。',
    en: 'The same content structure makes it easy to review in the reading flow that suits you.',
  },
  overviewCardIndexableBody: {
    zh: '保持静态导出和文档化结构，方便引用、部署和搜索收录。',
    en: 'Keep the static, document-style structure for citation, deployment, and search indexing.',
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
} satisfies Record<string, LocaleText>;

export function t(locale: Locale, key: keyof typeof uiText): string {
  return uiText[key][locale];
}
