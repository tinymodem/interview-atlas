import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ChapterTree from '@/components/ChapterTree';
import { getCanonicalUrl, getJob, getJobs, getLocalizedPath, getText } from '@/lib/data';
import { t } from '@/lib/i18n';
import { getJobStartHere } from '@/lib/navigation';

const locale = 'zh';

export async function generateStaticParams() {
  return getJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(decodeURIComponent(slug));
  if (!job) return {};

  const title = `${getText(job.name, locale)} | Interview Atlas`;
  const description = getText(job.description, locale) || title;

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/jobs/${job.slug}`),
    },
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(decodeURIComponent(slug));
  if (!job) notFound();

  const startHere = getJobStartHere(job.slug, locale);
  const sectionCount = job.chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: t(locale, 'allTracks'), href: getLocalizedPath(locale) },
          { label: getText(job.name, locale) || job.slug },
        ]}
      />

      <section className="surface-card px-6 py-8 md:px-8 md:py-10">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <div>
            <p className="eyebrow">{t(locale, 'roleGuide')}</p>
            <h1 className="mt-4 text-4xl font-semibold text-[color:var(--text)]">{getText(job.name, locale)}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-light)]">{getText(job.description, locale)}</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--text-muted)]">{t(locale, 'roleGuideBody')}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
            <article className="surface-panel p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'questionsIncluded')}</p>
              <p className="mt-3 text-3xl font-semibold text-[color:var(--text)]">{job.questionCount}</p>
            </article>
            <article className="surface-panel p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'chapters')}</p>
              <p className="mt-3 text-3xl font-semibold text-[color:var(--text)]">{job.chapters.length}</p>
            </article>
            <article className="surface-panel p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'sectionsIncluded')}</p>
              <p className="mt-3 text-3xl font-semibold text-[color:var(--text)]">{sectionCount}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-4">
          {startHere && (
            <article className="surface-card p-6">
              <p className="eyebrow">{t(locale, 'startHere')}</p>
              <h2 className="mt-3 text-2xl font-semibold text-[color:var(--text)]">{startHere.chapterTitle}</h2>
              <p className="mt-2 text-sm font-medium text-[color:var(--text-light)]">{startHere.sectionTitle}</p>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{startHere.question.title}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={startHere.href} className="rounded-full bg-[color:var(--brand-strong)] px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5">
                  {t(locale, 'browseQuestions')}
                </Link>
                <Link href={getLocalizedPath(locale)} className="rounded-full border border-[color:var(--border)] px-4 py-2.5 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]">
                  {t(locale, 'allTracks')}
                </Link>
              </div>
            </article>
          )}

          <article className="surface-panel p-6">
            <p className="eyebrow">{t(locale, 'chapterDirectory')}</p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{t(locale, 'chapterDirectoryBody')}</p>
          </article>
        </aside>

        <section>
          <div className="mb-4">
            <p className="eyebrow">{t(locale, 'chapterDirectory')}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--text)]">{t(locale, 'browseTrackQuestions')}</h2>
          </div>
          <ChapterTree chapters={job.chapters} locale={locale} />
        </section>
      </section>
    </div>
  );
}
