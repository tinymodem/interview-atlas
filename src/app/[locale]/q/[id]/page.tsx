import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import {
  getAllQuestionIds,
  getCanonicalUrl,
  getLocalizedPath,
  getQuestion,
  getText,
  type Locale,
} from '@/lib/data';
import { t } from '@/lib/i18n';
import { getQuestionContext, getQuestionSidebar, getQuestionSummary } from '@/lib/navigation';

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

  const sidebar = getQuestionSidebar(question.jobSlug, question.id, locale);
  const context = getQuestionContext(question.id);
  const answerHtml = getText(question.answerHtml, locale);
  const pitfallHtml = getText(question.pitfallHtml, locale);
  const summary = getQuestionSummary(question.id, locale) || t(locale, 'summaryFallback');

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: t(locale, 'allTracks'), href: getLocalizedPath(locale) },
          { label: sidebar.job.title, href: getLocalizedPath(locale, `/jobs/${sidebar.job.slug}`) },
          { label: getText(question.title, locale) || id },
        ]}
      />

      <div className="doc-grid items-start">
        <aside className="surface-card sticky top-24 hidden p-5 xl:block">
          <p className="eyebrow">{t(locale, 'inThisTrack')}</p>
          <h2 className="mt-3 text-xl font-semibold text-[color:var(--text)]">{sidebar.job.title}</h2>
          <div className="mt-5 space-y-5">
            {sidebar.sections.map((section) => (
              <section key={section.id}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)]">{section.chapterTitle}</p>
                <h3 className="mt-1 text-sm font-semibold text-[color:var(--text)]">{section.title}</h3>
                <div className="mt-3 space-y-2">
                  {section.questions.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`block rounded-[16px] px-3 py-2 text-sm leading-6 transition ${
                        item.active
                          ? 'bg-[color:var(--brand-strong)] text-white shadow-[var(--shadow-card)]'
                          : 'bg-[color:var(--surface-subtle)] text-[color:var(--text-light)] hover:text-[color:var(--brand-strong)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </aside>

        <article className="surface-card min-w-0 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-strong)]">
              {question.number}
            </span>
            <span className="text-sm text-[color:var(--text-muted)]">{sidebar.job.title}</span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold leading-tight text-[color:var(--text)] md:text-4xl">
            {getText(question.title, locale)}
          </h1>

          <section className="mt-6 rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'docSummary')}</p>
            <p className="mt-3 text-base leading-8 text-[color:var(--text-light)]">{summary}</p>
          </section>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {question.examPoint && (
              <section id="exam-point" className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'examPoint')}</p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-light)]">{getText(question.examPoint, locale)}</p>
              </section>
            )}

            {question.approach && (
              <section id="approach" className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'approach')}</p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-light)]">{getText(question.approach, locale)}</p>
              </section>
            )}
          </div>

          {answerHtml && (
            <section id="answer" className="mt-6 rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'answerBody')}</p>
              <div className="doc-prose mt-5" dangerouslySetInnerHTML={{ __html: answerHtml }} />
            </section>
          )}

          {pitfallHtml && (
            <section id="pitfall" className="mt-6 rounded-[28px] border border-[color:rgba(180,83,9,0.18)] bg-[color:var(--warning-soft)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--warning-text)]">{t(locale, 'pitfall')}</p>
              <div className="doc-prose mt-4" dangerouslySetInnerHTML={{ __html: pitfallHtml }} />
            </section>
          )}
        </article>

        <aside className="doc-aside space-y-4">
          <section className="surface-card p-5">
            <p className="eyebrow">{t(locale, 'onThisPage')}</p>
            <div className="mt-4 space-y-2">
              <a href="#exam-point" className="block rounded-[16px] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm text-[color:var(--text-light)] transition hover:text-[color:var(--brand-strong)]">{t(locale, 'examPoint')}</a>
              <a href="#approach" className="block rounded-[16px] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm text-[color:var(--text-light)] transition hover:text-[color:var(--brand-strong)]">{t(locale, 'approach')}</a>
              <a href="#answer" className="block rounded-[16px] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm text-[color:var(--text-light)] transition hover:text-[color:var(--brand-strong)]">{t(locale, 'answer')}</a>
              {pitfallHtml && (
                <a href="#pitfall" className="block rounded-[16px] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm text-[color:var(--text-light)] transition hover:text-[color:var(--brand-strong)]">{t(locale, 'pitfall')}</a>
              )}
            </div>
          </section>

          <section className="surface-panel p-5">
            <p className="eyebrow">{t(locale, 'readingTips')}</p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{t(locale, 'readingTipsBody')}</p>
          </section>

          {(context?.previous || context?.next) && (
            <section className="surface-card p-5">
              <p className="eyebrow">{t(locale, 'readingMode')}</p>
              <div className="mt-4 space-y-3">
                {context.previous && (
                  <Link href={getLocalizedPath(locale, `/q/${context.previous.id}`)} className="block rounded-[18px] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm transition hover:text-[color:var(--brand-strong)]">
                    <span className="block text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)]">{t(locale, 'previousQuestion')}</span>
                    <span className="mt-2 block leading-6 text-[color:var(--text)]">{context.previous.title}</span>
                  </Link>
                )}
                {context.next && (
                  <Link href={getLocalizedPath(locale, `/q/${context.next.id}`)} className="block rounded-[18px] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm transition hover:text-[color:var(--brand-strong)]">
                    <span className="block text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)]">{t(locale, 'nextQuestion')}</span>
                    <span className="mt-2 block leading-6 text-[color:var(--text)]">{context.next.title}</span>
                  </Link>
                )}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
