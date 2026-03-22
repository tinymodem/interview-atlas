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

export function getLocaleLabel(locale: Locale): string {
  return locale === 'zh' ? '中文' : 'English';
}
