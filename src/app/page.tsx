import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/data';
import { uiText } from '@/lib/i18n';

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
    <main className="mx-auto flex min-h-screen w-full max-w-[min(1200px,90%)] items-center py-16">
      <section className="grid gap-10 rounded-[32px] bg-white p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] md:grid-cols-[1.25fr_0.75fr] md:p-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nc-green">
            {uiText.landingEyebrow.en}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-nc-text md:text-5xl">
            {uiText.landingTitle.en}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-nc-text-light">
            {uiText.landingBody.en}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-nc-text-light">
            {uiText.landingBody.zh}
          </p>
        </div>

        <div className="grid gap-4 self-center">
          <Link href="/zh" className="rounded-3xl bg-nc-green px-6 py-5 text-white transition-transform hover:-translate-y-0.5">
            <div className="text-sm uppercase tracking-[0.2em] text-white/70">Chinese</div>
            <div className="mt-2 text-2xl font-semibold">{uiText.enterChinese.zh}</div>
          </Link>
          <Link href="/en" className="rounded-3xl border border-black/10 bg-[#f8fbfa] px-6 py-5 transition-transform hover:-translate-y-0.5">
            <div className="text-sm uppercase tracking-[0.2em] text-nc-text-muted">English</div>
            <div className="mt-2 text-2xl font-semibold text-nc-text">{uiText.enterEnglish.en}</div>
          </Link>
        </div>
      </section>
    </main>
  );
}
