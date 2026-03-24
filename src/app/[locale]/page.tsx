import HomepageContent from '@/components/HomepageContent';
import {
  getCanonicalUrl,
  getSiteCopy,
  getText,
  type Locale,
} from '@/lib/data';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const site = getSiteCopy();
  const title = `${getText(site.brand, locale)} | Interview Atlas`;
  const description = getText(site.description, locale) || 'Interview Atlas';

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/${locale}`),
      languages: {
        'zh-CN': getCanonicalUrl('/zh'),
        en: getCanonicalUrl('/en'),
      },
    },
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return <HomepageContent locale={locale} />;
}
