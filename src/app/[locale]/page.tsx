import Link from 'next/link';
import {
  getCanonicalUrl,
  getJobs,
  getLocalizedPath,
  getSiteCopy,
  getText,
  type JobSummary,
  type Locale,
} from '@/lib/data';
import { t } from '@/lib/i18n';

function JobCard({ locale, job }: { locale: Locale; job: JobSummary }) {
  return (
    <Link
      href={getLocalizedPath(locale, `/jobs/${job.slug}`)}
      className="block rounded-3xl border border-transparent bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-nc-green/20 hover:shadow-md"
    >
      <div className="mb-2 text-base font-semibold text-nc-text">{getText(job.name, locale)}</div>
      <div className="text-sm text-nc-text-muted">{getText(job.description, locale)}</div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full w-full rounded-full bg-nc-green/70" />
      </div>
      <div className="mt-2 text-xs text-nc-text-muted">
        {job.questionCount} {t(locale, 'questionCount')}
      </div>
    </Link>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const site = getSiteCopy();
  const title = `${getText(site.brand, locale)} | Interview Atlas`;
  const description = getText(site.description, locale) || 'Interview Atlas';

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/${locale}`),
      languages: {
        'zh-CN': getCanonicalUrl('/zh'),
        en: getCanonicalUrl('/en'),
      },
    },
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const jobs = getJobs();
  const site = getSiteCopy();

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-white p-8 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nc-green">Interview Atlas</p>
        <h1 className="mt-3 text-3xl font-semibold text-nc-text md:text-4xl">{getText(site.brand, locale)}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-nc-text-light">{getText(site.subtitle, locale)}</p>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-nc-text-muted">{t(locale, 'homeSubtitle')}</p>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-nc-text">{t(locale, 'homeTitle')}</h2>
          <p className="mt-1 text-sm text-nc-text-muted">{t(locale, 'allTracks')}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.slug} locale={locale} job={job} />
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="rounded-3xl bg-white p-20 text-center text-sm text-nc-text-muted">{t(locale, 'noData')}</div>
        )}
      </section>
    </div>
  );
}
