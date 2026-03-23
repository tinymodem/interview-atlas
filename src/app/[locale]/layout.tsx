import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { isLocale, locales, type Locale } from '@/lib/data';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale as Locale} />
      <main className="doc-shell flex-1 py-8 md:py-10">{children}</main>
      <Footer locale={locale as Locale} />
    </div>
  );
}
