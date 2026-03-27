import LegacyZhRedirect from '@/components/LegacyZhRedirect';
import { getAllQuestionIds, getCanonicalUrl } from '@/lib/data';

export async function generateStaticParams() {
  return getAllQuestionIds().map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return {
    title: '面试资料铺 | Interview Atlas',
    description: '系统整理 AI、大模型、RAG、Agent 与推理部署相关面试题，帮助你更快进入状态。',
    alternates: {
      canonical: getCanonicalUrl(`/q/${id}`),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LegacyZhQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LegacyZhRedirect target={`/q/${id}`} />;
}
