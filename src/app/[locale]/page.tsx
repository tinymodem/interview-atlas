import Link from 'next/link';
import {
  getCanonicalUrl,
  getHomepageFeaturedTracks,
  getHomepageOverview,
  getHomepageRecommendedStarts,
  getSiteCopy,
  getText,
  type HomepageFeaturedTrack,
  type HomepageRecommendedStart,
  type Locale,
} from '@/lib/data';
import { t } from '@/lib/i18n';

const learningPath = [
  { step: '01', title: 'pathStep1', body: 'pathStep1Body' },
  { step: '02', title: 'pathStep2', body: 'pathStep2Body' },
  { step: '03', title: 'pathStep3', body: 'pathStep3Body' },
] as const;

const overviewCards = [
  {
    label: 'statsTracksLabel',
    value: 'trackCount',
    body: 'overviewCardTrackBody',
  },
  {
    label: 'statsQuestionsLabel',
    value: 'questionCount',
    body: 'overviewCardQuestionBody',
  },
  {
    label: 'statsBilingualLabel',
    value: 'statsBilingualValue',
    body: 'overviewCardBilingualBody',
  },
  {
    label: 'statsIndexableLabel',
    value: 'statsIndexableValue',
    body: 'overviewCardIndexableBody',
  },
] as const;

const proofKeys = ['landingValue1Title', 'landingValue2Title', 'landingValue3Title'] as const;
const proofBodyKeys = ['landingValue1Body', 'landingValue2Body', 'landingValue3Body'] as const;

function RecommendedStartCard({
  locale,
  item,
}: {
  locale: Locale;
  item: HomepageRecommendedStart;
}) {
  return (
    <article className="homepage-recommendation surface-panel p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{item.trackName}</p>
          <h3 className="mt-3 text-2xl font-semibold text-[color:var(--text)]">{item.chapterTitle}</h3>
          <p className="mt-2 text-sm font-medium text-[color:var(--text-light)]">{item.sectionTitle}</p>
        </div>
        <div className="rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-strong)]">
          {item.questionCount} {t(locale, 'questionCount')}
        </div>
      </div>

      {item.trackDescription && (
        <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{item.trackDescription}</p>
      )}

      <div className="mt-5 rounded-[22px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'recommendedQuestion')}</p>
        <p className="mt-2 text-sm font-medium text-[color:var(--text)]">#{item.question.number}</p>
        <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{item.question.title}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={item.href} className="rounded-full bg-[color:var(--brand-strong)] px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5">
          {t(locale, 'browseQuestions')}
        </Link>
        <Link href={`#tracks`} className="rounded-full border border-[color:var(--border-strong)] px-4 py-2.5 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]">
          {t(locale, 'exploreTrack')}
        </Link>
      </div>
    </article>
  );
}

function TrackCard({ locale, track }: { locale: Locale; track: HomepageFeaturedTrack }) {
  return (
    <article className="surface-card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'trackSnapshot')}</p>
          <h3 className="mt-3 text-2xl font-semibold text-[color:var(--text)]">{track.name}</h3>
        </div>
        <div className="rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-strong)]">
          {track.questionCount} {t(locale, 'questionCount')}
        </div>
      </div>

      {track.description && (
        <p className="mt-4 text-sm leading-7 text-[color:var(--text-light)]">{track.description}</p>
      )}

      {track.startHere && (
        <div className="mt-6 rounded-[22px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'startHere')}</p>
          <p className="mt-2 text-sm font-medium text-[color:var(--text)]">
            {track.startHere.chapterTitle} / {track.startHere.sectionTitle}
          </p>
          <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{track.startHere.question.title}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={track.href} className="rounded-full bg-[color:var(--brand-strong)] px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5">
          {t(locale, 'exploreTrack')}
        </Link>
        {track.startHere && (
          <Link href={track.startHere.href} className="rounded-full border border-[color:var(--border-strong)] px-4 py-2.5 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]">
            {t(locale, 'browseQuestions')}
          </Link>
        )}
      </div>
    </article>
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
  const site = getSiteCopy();
  const overview = getHomepageOverview();
  const recommendedStarts = getHomepageRecommendedStarts(locale);
  const tracks = getHomepageFeaturedTracks(locale);

  return (
    <div className="space-y-8">
      <section className="surface-card overflow-hidden px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <div>
            <p className="eyebrow">{t(locale, 'homeEyebrow')}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-[color:var(--text)] md:text-5xl xl:text-[3.85rem]">
              {t(locale, 'homeTitle')}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-light)]">
              {getText(site.subtitle, locale)}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-muted)]">
              {t(locale, 'homeHeroBody')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#tracks" className="rounded-full bg-[color:var(--brand-strong)] px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5">
                {t(locale, 'startNow')}
              </a>
              <a href="#start-here" className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-3 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]">
                {t(locale, 'seeRecommendedStarts')}
              </a>
            </div>
          </div>

          <aside className="surface-panel p-6">
            <p className="eyebrow">{t(locale, 'homepageOverview')}</p>
            <h2 className="mt-3 text-2xl font-semibold text-[color:var(--text)]">{getText(site.brand, locale)}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{t(locale, 'homepageOverviewBody')}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {overviewCards.map((card) => {
                const value =
                  card.value === 'trackCount'
                    ? String(overview.trackCount)
                    : card.value === 'questionCount'
                      ? String(overview.questionCount)
                      : t(locale, card.value);

                return (
                  <article key={card.label} className="homepage-stat-card rounded-[20px] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, card.label)}</p>
                    <p className="mt-3 text-3xl font-semibold text-[color:var(--text)]">{value}</p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{t(locale, card.body)}</p>
                  </article>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section id="start-here" className="surface-card px-6 py-8 md:px-10">
        <div className="max-w-3xl">
          <p className="eyebrow">{t(locale, 'recommendedStartsTitle')}</p>
          <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] md:text-4xl">{t(locale, 'startHere')}</h2>
          <p className="mt-4 text-base leading-8 text-[color:var(--text-light)]">{t(locale, 'recommendedStartsBody')}</p>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {recommendedStarts.map((item) => (
            <RecommendedStartCard key={item.slug} locale={locale} item={item} />
          ))}
        </div>
      </section>

      <section id="tracks">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{t(locale, 'allTracks')}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--text)]">{t(locale, 'homeTitle')}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--text-muted)]">{t(locale, 'featuredTracksBody')}</p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {tracks.map((track) => (
            <TrackCard key={track.slug} locale={locale} track={track} />
          ))}
        </div>

        {tracks.length === 0 && (
          <div className="surface-panel mt-6 p-20 text-center text-sm text-[color:var(--text-muted)]">{t(locale, 'noData')}</div>
        )}
      </section>

      <section id="method" className="surface-card px-6 py-8 md:px-10">
        <div className="max-w-3xl">
          <p className="eyebrow">{t(locale, 'learningPath')}</p>
          <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] md:text-4xl">{t(locale, 'learningPath')}</h2>
          <p className="mt-4 text-base leading-8 text-[color:var(--text-light)]">{t(locale, 'learningPathBody')}</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {learningPath.map((item) => (
            <article key={item.step} className="surface-panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand)]">{item.step}</p>
              <h3 className="mt-4 text-2xl font-semibold text-[color:var(--text)]">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-light)]">{t(locale, item.body)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card px-6 py-8 md:px-10">
        <div className="max-w-3xl">
          <p className="eyebrow">Interview Atlas</p>
          <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] md:text-4xl">{t(locale, 'homepageProofTitle')}</h2>
          <p className="mt-4 text-base leading-8 text-[color:var(--text-light)]">{t(locale, 'homepageProofBody')}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {proofKeys.map((titleKey, index) => (
            <article key={titleKey} className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-5">
              <h3 className="text-lg font-semibold text-[color:var(--text)]">{t(locale, titleKey)}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{t(locale, proofBodyKeys[index])}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
