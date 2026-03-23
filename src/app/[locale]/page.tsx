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
import { getJobStartHere } from '@/lib/navigation';

function JobCard({ locale, job }: { locale: Locale; job: JobSummary }) {
  const startHere = getJobStartHere(job.slug, locale);

  return (
    <article className="surface-card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'trackSnapshot')}</p>
          <h3 className="mt-3 text-2xl font-semibold text-[color:var(--text)]">{getText(job.name, locale)}</h3>
        </div>
        <div className="rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-strong)]">
          {job.questionCount} {t(locale, 'questionCount')}
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-[color:var(--text-light)]">{getText(job.description, locale)}</p>

      {startHere && (
        <div className="mt-6 rounded-[22px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'startHere')}</p>
          <p className="mt-2 text-sm font-medium text-[color:var(--text)]">{startHere.chapterTitle} / {startHere.sectionTitle}</p>
          <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{startHere.question.title}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={getLocalizedPath(locale, `/jobs/${job.slug}`)} className="rounded-full bg-[color:var(--brand-strong)] px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5">
          {t(locale, 'exploreTrack')}
        </Link>
        {startHere && (
          <Link href={startHere.href} className="rounded-full border border-[color:var(--border-strong)] px-4 py-2.5 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]">
            {t(locale, 'browseQuestions')}
          </Link>
        )}
      </div>
    </article>
  );
}

const learningPath = [
  { step: '01', title: 'pathStep1', body: 'pathStep1Body' },
  { step: '02', title: 'pathStep2', body: 'pathStep2Body' },
  { step: '03', title: 'pathStep3', body: 'pathStep3Body' },
] as const;

const featureKeys = ['featureBilingual', 'featureStatic', 'featureCurated'] as const;

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
      <section className="surface-card overflow-hidden px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
          <div>
            <p className="eyebrow">Interview Atlas</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-[color:var(--text)] md:text-5xl">
              {getText(site.brand, locale)}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--text-light)]">{getText(site.subtitle, locale)}</p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-muted)]">{t(locale, 'homeSubtitle')}</p>
          </div>

          <div className="surface-panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'startHere')}</p>
            <h2 className="mt-3 text-2xl font-semibold text-[color:var(--text)]">{t(locale, 'learningPath')}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{t(locale, 'learningPathBody')}</p>
            <div className="mt-5 space-y-3">
              {learningPath.map((item) => (
                <div key={item.step} className="flex gap-4 rounded-[18px] bg-[color:var(--surface-subtle)] px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{item.step}</span>
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--text)]">{t(locale, item.title)}</p>
                    <p className="mt-1 text-sm leading-6 text-[color:var(--text-muted)]">{t(locale, item.body)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="grid gap-4 md:grid-cols-3">
        {featureKeys.map((key) => (
          <article key={key} className="surface-panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">Interview Atlas</p>
            <h2 className="mt-3 text-xl font-semibold text-[color:var(--text)]">{t(locale, key)}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{t(locale, 'tracksIntro')}</p>
          </article>
        ))}
      </section>

      <section id="tracks">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{t(locale, 'allTracks')}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--text)]">{t(locale, 'homeTitle')}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--text-muted)]">{t(locale, 'startHereBody')}</p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.slug} locale={locale} job={job} />
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="surface-panel mt-6 p-20 text-center text-sm text-[color:var(--text-muted)]">{t(locale, 'noData')}</div>
        )}
      </section>
    </div>
  );
}
