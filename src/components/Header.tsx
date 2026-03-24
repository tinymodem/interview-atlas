'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { t } from '@/lib/i18n';
import { getLocaleSwitchPath, getLocalizedPath, type Locale } from '@/lib/localization';

export default function Header({ locale }: { locale: Locale }) {
  const otherLocale: Locale = locale === 'zh' ? 'en' : 'zh';
  const pathname = usePathname() || getLocalizedPath(locale);
  const languageHref = getLocaleSwitchPath(otherLocale, pathname);
  const languageLabel = locale === 'zh' ? '中文' : 'English';

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[rgba(248,245,238,0.88)] backdrop-blur-xl">
      <div className="doc-shell flex min-h-[76px] items-center justify-between gap-6 py-4">
        <div className="flex min-w-0 items-center gap-4">
          <Link href={getLocalizedPath(locale)} className="flex min-w-0 items-center gap-4">
            <Image src="/logo.svg" alt="Interview Atlas" width={48} height={48} className="shrink-0" />
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
          <Link
            href={languageHref}
            aria-label={locale === 'zh' ? '切换语言' : 'Change language'}
            className="inline-flex h-8 min-w-[4rem] max-w-full items-center gap-2 overflow-hidden rounded-md border border-transparent px-2.5 py-1 text-xs font-medium text-[color:var(--text-muted)] transition duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)] hover:bg-[color:var(--surface)] hover:text-[color:var(--text)]"
          >
            <span className="truncate">{languageLabel}</span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="shrink-0">
              <path d="M16.134 6.16a.5.5 0 1 1 .732.68l-6.5 7-.077.068a.5.5 0 0 1-.655-.068l-6.5-7-.062-.08a.5.5 0 0 1 .718-.667l.076.067L10 12.767z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
