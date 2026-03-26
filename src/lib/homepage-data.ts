import type { LocalizedText } from './data.ts';

export interface HomepageTrackCardSource {
  slug: string;
  title: LocalizedText;
  category: LocalizedText;
  summary: LocalizedText;
}

export interface HomepageQuestionCardSource {
  id: string;
  trackTitle: LocalizedText;
  category: LocalizedText;
  questionTitle: LocalizedText;
  href: string;
}

export const homepageContent = {
  latestTracks: [
    {
      slug: 'llm-engineer',
      title: { zh: '大模型应用开发', en: 'LLM Application Development' },
      category: { zh: 'AI / 大模型', en: 'AI / LLM' },
      summary: {
        zh: '覆盖模型基础、推理优化、RAG、Agent 与评测等高频面试方向。',
        en: 'Covers model basics, inference, RAG, agents, and evaluation for common interview loops.',
      },
    },
    {
      slug: 'ai-product-manager',
      title: { zh: 'AI 产品经理', en: 'AI Product Manager' },
      category: { zh: '产品与管理', en: 'Product and Strategy' },
      summary: {
        zh: '围绕需求定义、效果评测、上线风险与用户体验组织题目。',
        en: 'Organized around problem framing, evaluation, launch risk, and user experience.',
      },
    },
    {
      slug: 'llm-engineer',
      title: { zh: 'RAG / Agent 工程', en: 'RAG / Agent Engineering' },
      category: { zh: '工程实践', en: 'Engineering Practice' },
      summary: {
        zh: '聚焦检索、排序、工具调用、规划和工作流拆解等工程表达。',
        en: 'Focused on retrieval, reranking, tool use, planning, and workflow reasoning.',
      },
    },
  ] satisfies HomepageTrackCardSource[],
  hotTracks: [
    {
      slug: 'llm-engineer',
      title: { zh: '大模型工程师', en: 'LLM Engineer' },
      category: { zh: '热门方向', en: 'Popular Track' },
      summary: {
        zh: '适合准备模型原理、推理性能、RAG 和 Agent 面试的候选人。',
        en: 'Best for candidates preparing model systems, inference, RAG, and agent interviews.',
      },
    },
    {
      slug: 'ai-product-manager',
      title: { zh: 'AI 产品经理', en: 'AI Product Manager' },
      category: { zh: '热门方向', en: 'Popular Track' },
      summary: {
        zh: '适合准备需求拆解、评测方法和业务落地表达的岗位。',
        en: 'Best for roles focused on problem framing, evaluation, and product launch decisions.',
      },
    },
    {
      slug: 'llm-engineer',
      title: { zh: '推理与部署', en: 'Inference and Deployment' },
      category: { zh: '工程热门', en: 'Engineering Focus' },
      summary: {
        zh: '集中展示延迟、吞吐、缓存、部署与线上稳定性相关题目。',
        en: 'Highlights latency, throughput, caching, deployment, and runtime stability topics.',
      },
    },
  ] satisfies HomepageTrackCardSource[],
  hotQuestions: [
    {
      id: 'hot-1',
      trackTitle: { zh: '大模型应用开发', en: 'LLM Application Development' },
      category: { zh: '模型基础', en: 'Model Foundations' },
      questionTitle: {
        zh: 'Transformer 的核心组件有哪些？面试时应该怎么讲清楚？',
        en: 'What are the core components of a Transformer, and how should you explain them clearly?',
      },
      href: '/q/101',
    },
    {
      id: 'hot-2',
      trackTitle: { zh: '大模型应用开发', en: 'LLM Application Development' },
      category: { zh: 'RAG', en: 'RAG' },
      questionTitle: {
        zh: 'RAG 项目中召回和排序分别解决什么问题？',
        en: 'What problems do retrieval and reranking solve in a RAG pipeline?',
      },
      href: '/q/201',
    },
    {
      id: 'hot-3',
      trackTitle: { zh: 'AI 产品经理', en: 'AI Product Manager' },
      category: { zh: '评测', en: 'Evaluation' },
      questionTitle: {
        zh: '设计 AI 产品评测体系时，为什么不能只看准确率？',
        en: 'Why is accuracy alone not enough when designing an AI product evaluation framework?',
      },
      href: '/q/301',
    },
    {
      id: 'hot-4',
      trackTitle: { zh: '推理与部署', en: 'Inference and Deployment' },
      category: { zh: '系统设计', en: 'Systems Design' },
      questionTitle: {
        zh: '上线前如何评估延迟、吞吐与成本之间的平衡？',
        en: 'How do you evaluate the trade-off between latency, throughput, and cost before launch?',
      },
      href: '/jobs/llm-engineer',
    },
  ] satisfies HomepageQuestionCardSource[],
};
