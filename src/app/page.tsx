import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/data';
import { uiText } from '@/lib/i18n';

const pathCards = [
  {
    step: '01',
    title: uiText.pathStep1,
    body: uiText.pathStep1Body,
  },
  {
    step: '02',
    title: uiText.pathStep2,
    body: uiText.pathStep2Body,
  },
  {
    step: '03',
    title: uiText.pathStep3,
    body: uiText.pathStep3Body,
  },
];

const proofPoints = [
  {
    title: uiText.landingValue1Title,
    body: uiText.landingValue1Body,
  },
  {
    title: uiText.landingValue2Title,
    body: uiText.landingValue2Body,
  },
  {
    title: uiText.landingValue3Title,
    body: uiText.landingValue3Body,
  },
];

export const metadata = {
  title: 'Interview Atlas | 面试资料铺',
  description: 'Bilingual AI and LLM interview materials, optimized for GitHub Pages and search indexing.',
  alternates: {
    canonical: getCanonicalUrl('/'),
    languages: {
      'zh-CN': getCanonicalUrl('/zh'),
      en: getCanonicalUrl('/en'),
    },
  },
};

export default function LandingPage() {
  return (
    <main className="doc-shell py-10 md:py-14">
      <section className="surface-card overflow-hidden px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow">{uiText.landingEyebrow.en}</p>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
              {uiText.landingKicker.en}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-[color:var(--text)] md:text-6xl">
              {uiText.landingTitle.en}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--text-light)]">
              {uiText.landingBody.en}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-muted)]">
              {uiText.landingBody.zh}
            </p>
          </div>

          <div className="grid gap-4">
            <Link href="/zh" className="rounded-[28px] border border-[color:var(--border-strong)] bg-[color:var(--brand-strong)] px-6 py-6 text-white shadow-[var(--shadow-card)] transition hover:-translate-y-1">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">Chinese</p>
              <p className="mt-3 text-2xl font-semibold">{uiText.enterChinese.zh}</p>
              <p className="mt-2 text-sm leading-7 text-white/80">以中文路径进入完整文档站，适合系统复习与快速回顾。</p>
            </Link>
            <Link href="/en" className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-1">
              <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--text-muted)]">English</p>
              <p className="mt-3 text-2xl font-semibold text-[color:var(--text)]">{uiText.enterEnglish.en}</p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">Open the same knowledge map in English, with route parity and bilingual fallbacks.</p>
            </Link>
          </div>
        </div>
      </section>

      <section id="method" className="mt-8 grid gap-5 lg:grid-cols-3">
        {pathCards.map((card) => (
          <article key={card.step} className="surface-panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand)]">{card.step}</p>
            <h2 className="mt-4 text-2xl font-semibold text-[color:var(--text)]">{card.title.en}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-light)]">{card.body.en}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 surface-card px-6 py-8 md:px-10">
        <div className="max-w-3xl">
          <p className="eyebrow">Why This Format</p>
          <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] md:text-4xl">A study site that reads like documentation, not a dashboard.</h2>
          <p className="mt-4 text-base leading-8 text-[color:var(--text-light)]">
            Interview prep gets easier when the material has shape. Interview Atlas uses stable routes, structured sections,
            and readable answer pages so you can move from quick review to deep study without changing tools.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {proofPoints.map((point) => (
            <article key={point.title.en} className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-5">
              <h3 className="text-lg font-semibold text-[color:var(--text)]">{point.title.en}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{point.body.en}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
