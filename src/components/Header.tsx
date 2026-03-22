import Link from 'next/link';
import { getLocaleLabel, getLocalizedPath, getSiteCopy, type Locale } from '@/lib/data';
import { t } from '@/lib/i18n';

export default function Header({ locale }: { locale: Locale }) {
  const site = getSiteCopy();
  const otherLocale: Locale = locale === 'zh' ? 'en' : 'zh';

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[min(1200px,90%)] items-center justify-between gap-4">
        <Link href={getLocalizedPath(locale)} className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-nc-green-light text-sm font-semibold text-nc-green">
            IA
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-nc-text">Interview Atlas</div>
            <div className="truncate text-xs text-nc-text-muted">{site.brand.zh}</div>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link href={getLocalizedPath(locale)} className="font-medium text-nc-green">
            {t(locale, 'allTracks')}
          </Link>
          <Link
            href={getLocalizedPath(otherLocale)}
            className="rounded-full border border-black/10 px-3 py-1.5 text-nc-text-muted transition-colors hover:border-nc-green/20 hover:text-nc-green"
          >
            {getLocaleLabel(otherLocale)}
          </Link>
        </nav>
      </div>
    </header>
  );
}
