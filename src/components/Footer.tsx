import Link from 'next/link';
import { getLocalizedPath, type Locale } from '@/lib/data';
import { t } from '@/lib/i18n';

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-16 border-t border-[color:var(--border)] bg-[rgba(255,255,255,0.75)]">
      <div className="doc-shell grid gap-8 py-10 md:grid-cols-[1.3fr_0.7fr] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">Interview Atlas</p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--text)]">{t(locale, 'brandTagline')}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--text-muted)]">{t(locale, 'footer')}</p>
        </div>

        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link href={getLocalizedPath(locale)} className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]">
            {t(locale, 'primaryNavHome')}
          </Link>
          <a href="#tracks" className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]">
            {t(locale, 'primaryNavTracks')}
          </a>
          <a href="#hot" className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]">
            {t(locale, 'primaryNavHot')}
          </a>
        </div>
      </div>
    </footer>
  );
}
