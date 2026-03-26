export type Locale = 'zh';

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
  return normalized === '/' ? '/' : normalized;
}

export function getLocaleLabel(_locale: Locale): string {
  return '中文';
}
