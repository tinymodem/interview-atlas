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
        <div className="flex items-center justify-between gap-4 border-b border-[color:var(--border)] pb-6">
          <div className="min-w-0">
            <p className="eyebrow">Interview Atlas</p>
            <p className="mt-2 text-sm text-[color:var(--text-muted)]">A documentation-style interview prep library for AI and LLM roles.</p>
          </div>

          <Link
            href="/zh"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium text-[color:var(--text)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]"
          >
            <span>中文</span>
            <span className="text-[color:var(--text-muted)]">/</span>
            <span className="text-[color:var(--text-muted)]">Switch language</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)] lg:items-start">
          <div>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
              Public knowledge map for AI interviews
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.02] text-[color:var(--text)] md:text-6xl xl:text-[4.75rem]">
              Interview prep, organized like product documentation.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--text-light)] md:text-[1.15rem]">
              Interview Atlas turns scattered questions on LLM systems, RAG, agents, evaluation, and shipping into a structured study surface you can actually revisit.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-muted)]">
              Start in English by default, switch to Chinese from the top-right corner whenever you want the mirrored route and content context.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/en"
                className="rounded-full bg-[color:var(--brand-strong)] px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
              >
                Open the atlas
              </Link>
              <a
                href="#method"
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-3 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]"
              >
                See the learning path
              </a>
            </div>
          </div>

          <aside className="surface-panel p-6 lg:mt-8">
            <p className="eyebrow">What You Get</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[20px] bg-[color:var(--surface-subtle)] p-4">
                <p className="text-sm font-semibold text-[color:var(--text)]">Structured reading flow</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">Browse by track, chapter, section, and question without losing the overall map.</p>
              </div>
              <div className="rounded-[20px] bg-[color:var(--surface-subtle)] p-4">
                <p className="text-sm font-semibold text-[color:var(--text)]">Reusable answer pages</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">Every question is laid out like a compact doc page with framing, answer body, and pitfalls.</p>
              </div>
              <div className="rounded-[20px] bg-[color:var(--surface-subtle)] p-4">
                <p className="text-sm font-semibold text-[color:var(--text)]">Bilingual route parity</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">Switch languages without being thrown back to the top of the site.</p>
              </div>
            </div>
          </aside>
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
