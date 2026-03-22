import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { getAllQuestionIds, getCanonicalUrl, getJobs, getLocalizedPath, getQuestion, getText, type Locale } from '@/lib/data';
import { t } from '@/lib/i18n';

export async function generateStaticParams() {
  return getAllQuestionIds().flatMap((id) => [
    { locale: 'zh', id: String(id) },
    { locale: 'en', id: String(id) },
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; id: string }> }) {
  const { locale, id } = await params;
  const question = getQuestion(Number(id));
  if (!question) return {};

  const title = `${getText(question.title, locale)} | Interview Atlas`;
  const description = getText(question.examPoint, locale) || title;

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/${locale}/q/${id}`),
      languages: {
        'zh-CN': getCanonicalUrl(`/zh/q/${id}`),
        en: getCanonicalUrl(`/en/q/${id}`),
      },
    },
  };
}

export default async function QuestionPage({ params }: { params: Promise<{ locale: Locale; id: string }> }) {
  const { locale, id } = await params;
  const question = getQuestion(Number(id));
  if (!question) notFound();

  const jobs = getJobs();
  const job = jobs.find((item) => item.slug === question.jobSlug);
  const answerHtml = getText(question.answerHtml, locale);
  const pitfallHtml = getText(question.pitfallHtml, locale);

  return (
    <>
      <Breadcrumb
        items={[
          { label: t(locale, 'allTracks'), href: getLocalizedPath(locale) },
          ...(job
            ? [{ label: getText(job.name, locale) || job.slug, href: getLocalizedPath(locale, `/jobs/${job.slug}`) }]
            : []),
          { label: getText(question.title, locale) || id },
        ]}
      />

      <article className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-nc-green-light px-2 py-0.5 text-xs font-medium text-nc-green">{question.number}</span>
          {job && <span className="text-xs text-nc-text-muted">{getText(job.name, locale)}</span>}
        </div>

        <h1 className="text-2xl font-semibold leading-tight text-nc-text">{getText(question.title, locale)}</h1>

        <div className="mt-6 space-y-4">
          {question.examPoint && (
            <section className="rounded-2xl bg-[#f8f8f8] p-4">
              <h2 className="text-sm font-semibold text-nc-text">{t(locale, 'examPoint')}</h2>
              <p className="mt-2 text-sm leading-6 text-nc-text-light">{getText(question.examPoint, locale)}</p>
            </section>
          )}

          {question.approach && (
            <section className="rounded-2xl bg-[#f8f8f8] p-4">
              <h2 className="text-sm font-semibold text-nc-text">{t(locale, 'approach')}</h2>
              <p className="mt-2 text-sm leading-6 text-nc-text-light">{getText(question.approach, locale)}</p>
            </section>
          )}

          {answerHtml && (
            <section className="rounded-2xl bg-[#f8f8f8] p-5">
              <h2 className="text-sm font-semibold text-nc-text">{t(locale, 'answer')}</h2>
              <div
                className="prose prose-sm mt-3 max-w-none prose-headings:text-nc-text prose-p:leading-7 prose-p:text-nc-text-light"
                dangerouslySetInnerHTML={{ __html: answerHtml }}
              />
            </section>
          )}

          {pitfallHtml && (
            <section className="rounded-2xl border border-orange-200 bg-[#fff8f0] p-5">
              <h2 className="text-sm font-semibold text-orange-600">{t(locale, 'pitfall')}</h2>
              <div
                className="prose prose-sm mt-3 max-w-none prose-p:leading-7 prose-p:text-nc-text-light"
                dangerouslySetInnerHTML={{ __html: pitfallHtml }}
              />
            </section>
          )}
        </div>
      </article>
    </>
  );
}
