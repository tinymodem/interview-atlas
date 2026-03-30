import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCanonicalUrl, getQuestion, getText } from '@/lib/data';
import { getQuestionPathById, getTopicBySlug, getTopicPath } from '@/lib/seo';

export async function generateStaticParams() {
  return ['transformer', 'rag', 'agent', 'inference', 'evaluation', 'ai-product-manager', 'llm-engineer'].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};

  return {
    title: `${topic.title} | Interview Atlas`,
    description: topic.description,
    alternates: {
      canonical: getCanonicalUrl(getTopicPath(topic.slug)),
    },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  return (
    <main className="doc-shell py-8 md:py-10">
      <section className="surface-card px-6 py-8 md:px-10">
        <p className="eyebrow">Topic Hub</p>
        <h1 className="mt-4 text-4xl font-semibold text-[color:var(--text)]">{topic.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-light)]">{topic.description}</p>
      </section>

      <section className="mt-8 surface-card px-6 py-8 md:px-10">
        <h2 className="text-2xl font-semibold text-[color:var(--text)]">相关题目</h2>
        <div className="mt-6 space-y-3">
          {topic.questionIds.map((questionId) => {
            const question = getQuestion(questionId);
            if (!question) return null;

            return (
              <Link
                key={questionId}
                href={getQuestionPathById(questionId)}
                className="block rounded-[18px] bg-[color:var(--surface-subtle)] px-4 py-4 text-sm leading-7 text-[color:var(--text)] transition hover:text-[color:var(--brand-strong)]"
              >
                {getText(question.title, 'zh')}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
