import Link from 'next/link';
import {
  getHomepageHotQuestions,
  getHomepageHotTracks,
  getHomepageLatestTracks,
  getHomepageOverview,
  type HomepageQuestionCard,
  type HomepageTrackCard,
  type Locale,
} from '@/lib/data';
import { t } from '@/lib/i18n';
import { getTopics, getTopicPath } from '@/lib/seo';

const learningPath = [
  { step: '01', title: 'pathStep1', body: 'pathStep1Body' },
  { step: '02', title: 'pathStep2', body: 'pathStep2Body' },
  { step: '03', title: 'pathStep3', body: 'pathStep3Body' },
] as const;

function TrackShelf({
  title,
  tracks,
  cta,
}: {
  title: string;
  tracks: HomepageTrackCard[];
  cta: string;
}) {
  return (
    <section className="surface-panel p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--text)]">{title}</h2>
        </div>
      </div>

      <div className="space-y-4">
        {tracks.map((track, index) => (
          <article key={`${track.title}-${index}`} className="homepage-list-card flex flex-col gap-3 rounded-[24px] p-5">
            <div>
              <h3 className="text-lg font-semibold text-[color:var(--text)]">{track.title}</h3>
              <p className="mt-1 text-sm text-[color:var(--text-muted)]">{track.category}</p>
            </div>

            <p className="text-sm leading-7 text-[color:var(--text-light)]">{track.summary}</p>

            <div>
              <Link href={track.href} className="text-sm font-semibold text-[color:var(--brand-strong)] underline decoration-[rgba(127,69,31,0.25)] underline-offset-4">
                {cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HotQuestionList({
  locale,
  items,
}: {
  locale: Locale;
  items: HomepageQuestionCard[];
}) {
  return (
    <section id="hot" className="surface-card px-6 py-8 md:px-10">
      <div className="max-w-3xl">
        <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] md:text-4xl">{t(locale, 'hotQuestions')}</h2>
      </div>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <article key={item.id} className="homepage-question-row flex flex-col gap-3 rounded-[24px] p-5 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--text-muted)]">
                <span className="font-semibold text-[color:var(--brand-strong)]">{item.trackTitle}</span>
                <span>{item.category}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-8 text-[color:var(--text)]">{item.questionTitle}</h3>
            </div>

            <div className="shrink-0">
              <Link href={item.href} className="rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)] px-4 py-2.5 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]">
                {t(locale, 'openQuestion')}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function HomepageContent({ locale }: { locale: Locale }) {
  const overview = getHomepageOverview();
  const latestTracks = getHomepageLatestTracks(locale);
  const hotTracks = getHomepageHotTracks(locale);
  const hotQuestions = getHomepageHotQuestions(locale);
  const topics = getTopics(locale).slice(0, 4);

  return (
    <div className="space-y-8">
      <section className="homepage-hero surface-card overflow-hidden px-6 py-8 md:px-10 md:py-12">
        <div className="max-w-5xl">
          <p className="eyebrow">{t(locale, 'homeHeroKicker')}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl xl:text-[4rem]">
            {t(locale, 'homeTitle')}
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-9 text-white/90">{t(locale, 'homeHeroLead')}</p>
          <p className="mt-3 max-w-3xl text-base leading-8 text-white/75">{t(locale, 'homeSubtitle')}</p>
        </div>
      </section>

      <section id="tracks" className="grid gap-6 xl:grid-cols-2 xl:items-start">
        <TrackShelf
          title={t(locale, 'latestTracks')}
          tracks={latestTracks}
          cta={t(locale, 'openTopic')}
        />
        <TrackShelf
          title={t(locale, 'hotTracks')}
          tracks={hotTracks}
          cta={t(locale, 'openTopic')}
        />
      </section>

      <section className="surface-panel p-6">
        <div className="mb-5">
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--text)]">搜索专题</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={getTopicPath(topic.slug)}
              className="homepage-list-card block rounded-[24px] p-5"
            >
              <h3 className="text-lg font-semibold text-[color:var(--text)]">{topic.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-light)]">{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <HotQuestionList locale={locale} items={hotQuestions} />

      <section id="method" className="surface-card px-6 py-8 md:px-10">
        <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr] xl:items-start">
          <div>
            <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] md:text-4xl">{t(locale, 'platformValueTitle')}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <article className="homepage-stat-card rounded-[20px] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'statsTracksLabel')}</p>
                <p className="mt-3 text-3xl font-semibold text-[color:var(--text)]">{overview.trackCount}</p>
              </article>
              <article className="homepage-stat-card rounded-[20px] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'statsQuestionsLabel')}</p>
                <p className="mt-3 text-3xl font-semibold text-[color:var(--text)]">{overview.questionCount}</p>
              </article>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {learningPath.map((item) => (
              <article key={item.step} className="homepage-list-card rounded-[24px] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand)]">{item.step}</p>
                <h3 className="mt-4 text-xl font-semibold text-[color:var(--text)]">{t(locale, item.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-light)]">{t(locale, item.body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
