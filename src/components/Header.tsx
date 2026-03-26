'use client';

import Link from 'next/link';
import { t } from '@/lib/i18n';
import { getLocalizedPath, type Locale } from '@/lib/localization';

function Logo() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <rect width="48" height="48" rx="14" fill="#2756a3" />
      <path d="M24 8 L28 20 L40 24 L28 28 L24 40 L20 28 L8 24 L20 20 Z" fill="#c8ddf8" stroke="#fff" strokeWidth="1" />
      <circle cx="24" cy="24" r="4" fill="#2756a3" stroke="#c8ddf8" strokeWidth="1.5" />
    </svg>
  );
}

export default function Header({ locale }: { locale: Locale }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[rgba(248,245,238,0.88)] backdrop-blur-xl">
      <div className="doc-shell flex min-h-[76px] items-center justify-between gap-6 py-4">
        <div className="flex min-w-0 items-center gap-4">
          <Link href={getLocalizedPath(locale)} className="flex min-w-0 items-center gap-4">
            <Logo />
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
      </div>
    </header>
  );
}
