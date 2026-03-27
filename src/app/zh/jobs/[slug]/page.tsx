import LegacyZhRedirect from '@/components/LegacyZhRedirect';
import { getCanonicalUrl, getJob, getJobs } from '@/lib/data';

export async function generateStaticParams() {
  return getJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(decodeURIComponent(slug));

  return {
    title: '面试资料铺 | Interview Atlas',
    description: '系统整理 AI、大模型、RAG、Agent 与推理部署相关面试题，帮助你更快进入状态。',
    alternates: {
      canonical: getCanonicalUrl(`/jobs/${job?.slug || slug}`),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LegacyZhJobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LegacyZhRedirect target={`/jobs/${slug}`} />;
}
