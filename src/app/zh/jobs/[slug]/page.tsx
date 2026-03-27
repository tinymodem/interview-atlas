import { permanentRedirect } from 'next/navigation';
import { getJobs } from '@/lib/data';

export async function generateStaticParams() {
  return getJobs().map((job) => ({ slug: job.slug }));
}

export default async function LegacyZhJobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/jobs/${encodeURIComponent(slug)}`);
}
