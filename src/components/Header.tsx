'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { t } from '@/lib/i18n';
import { getLocaleSwitchPath, getLocalizedPath, type Locale } from '@/lib/localization';

export default function Header({ locale }: { locale: Locale }) {
  const otherLocale: Locale = locale === 'zh' ? 'en' : 'zh';
  const pathname = usePathname() || getLocalizedPath(locale);
  const languageHref = getLocaleSwitchPath(otherLocale, pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[rgba(248,245,238,0.88)] backdrop-blur-xl">
      <div className="doc-shell flex min-h-[76px] items-center justify-between gap-6 py-4">
        <div className="flex min-w-0 items-center gap-4">
          <Link href={getLocalizedPath(locale)} className="flex min-w-0 items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-sm font-semibold tracking-[0.18em] text-[color:var(--brand-strong)] shadow-[var(--shadow-card)]">
              IA
            </span>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-[color:var(--text)]">Interview Atlas</p>
              <p className="truncate text-sm text-[color:var(--text-muted)]">{t(locale, 'brandTagline')}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-1 text-sm shadow-[var(--shadow-soft)] md:flex">
            <Link href={getLocalizedPath(locale)} className="rounded-full px-4 py-2 font-medium text-[color:var(--text)] transition hover:bg-[color:var(--surface-subtle)]">
              {t(locale, 'primaryNavHome')}
            </Link>
            <a href="#tracks" className="rounded-full px-4 py-2 font-medium text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--text)]">
              {t(locale, 'primaryNavTracks')}
            </a>
            <a href="#hot" className="rounded-full px-4 py-2 font-medium text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--text)]">
              {t(locale, 'primaryNavHot')}
            </a>
            <a href="#method" className="rounded-full px-4 py-2 font-medium text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--text)]">
              {t(locale, 'primaryNavMethod')}
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{t(locale, 'switchLanguage')}</p>
            <p className="text-xs text-[color:var(--text-muted)]">{t(locale, 'languagePreserved')}</p>
          </div>
          <Link
            href={languageHref}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium text-[color:var(--text)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[color:var(--brand)] hover:text-[color:var(--brand-strong)]"
          >
            <span>{otherLocale === 'zh' ? '中文' : 'English'}</span>
            <span className="text-[color:var(--text-muted)]">/</span>
            <span className="text-[color:var(--text-muted)]">{t(locale, 'switchLanguage')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
