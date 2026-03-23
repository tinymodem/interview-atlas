export type Locale = 'zh' | 'en';

export interface LocalizedText {
  zh: string;
  en: string;
}

export function getText(copy: LocalizedText | null, locale: Locale): string | null {
  if (!copy) {
    return null;
  }

  return copy[locale] || copy.zh || copy.en || null;
}

export function getLocalizedPath(locale: Locale, path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized === '/' ? '' : normalized}`;
}

export function getLocaleSwitchPath(targetLocale: Locale, currentPath: string): string {
  if (!currentPath || currentPath === '/') {
    return getLocalizedPath(targetLocale);
  }

  const segments = currentPath.split('/').filter(Boolean);
  if (segments.length === 0) {
    return getLocalizedPath(targetLocale);
  }

  if (segments[0] === 'zh' || segments[0] === 'en') {
    segments[0] = targetLocale;
    return `/${segments.join('/')}`;
  }

  return getLocalizedPath(targetLocale, currentPath);
}

export function getLocaleLabel(locale: Locale): string {
  return locale === 'zh' ? '中文' : 'English';
}
