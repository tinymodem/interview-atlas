import { permanentRedirect } from 'next/navigation';
import { getAllQuestionIds } from '@/lib/data';

export async function generateStaticParams() {
  return getAllQuestionIds().map((id) => ({ id: String(id) }));
}

export default async function LegacyZhQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  permanentRedirect(`/q/${encodeURIComponent(id)}`);
}
