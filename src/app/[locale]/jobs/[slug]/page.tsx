import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ChapterTree from '@/components/ChapterTree';
import { getCanonicalUrl, getJob, getJobs, getLocalizedPath, getText, type Locale } from '@/lib/data';
import { t } from '@/lib/i18n';

export async function generateStaticParams() {
  return getJobs().flatMap((job) => [
    { locale: 'zh', slug: job.slug },
    { locale: 'en', slug: job.slug },
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const job = getJob(decodeURIComponent(slug));
  if (!job) return {};

  const title = `${getText(job.name, locale)} | Interview Atlas`;
  const description = getText(job.description, locale) || title;

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/${locale}/jobs/${job.slug}`),
      languages: {
        'zh-CN': getCanonicalUrl(`/zh/jobs/${job.slug}`),
        en: getCanonicalUrl(`/en/jobs/${job.slug}`),
      },
    },
  };
}

export default async function JobPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const job = getJob(decodeURIComponent(slug));
  if (!job) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { label: t(locale, 'allTracks'), href: getLocalizedPath(locale) },
          { label: getText(job.name, locale) || job.slug },
        ]}
      />

      <div className="mb-4 rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-nc-text">{getText(job.name, locale)}</h1>
        <p className="mt-2 text-sm text-nc-text-light">{getText(job.description, locale)}</p>
        <p className="mt-3 text-sm text-nc-text-muted">
          {job.questionCount} {t(locale, 'questionCount')} · {job.chapters.length} {t(locale, 'chapters')}
        </p>
      </div>

      <ChapterTree chapters={job.chapters} locale={locale} />
    </>
  );
}
