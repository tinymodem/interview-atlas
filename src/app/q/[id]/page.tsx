import LegacyQuestionRedirect from '@/components/LegacyQuestionRedirect';
import { getAllQuestionIds, getCanonicalUrl } from '@/lib/data';
import { getQuestionPathById } from '@/lib/seo';

const locale = 'zh';

export async function generateStaticParams() {
  return getAllQuestionIds().map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const target = getQuestionPathById(Number(id));

  return {
    title: '面试资料铺 | Interview Atlas',
    description: '系统整理 AI、大模型、RAG、Agent 与推理部署相关面试题，帮助你更快进入状态。',
    alternates: {
      canonical: getCanonicalUrl(target),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LegacyQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LegacyQuestionRedirect target={getQuestionPathById(Number(id))} />;
}
