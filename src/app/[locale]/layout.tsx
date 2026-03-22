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
    <div className="min-h-screen flex flex-col">
      <Header locale={locale as Locale} />
      <main className="mx-auto flex-1 w-full max-w-[min(1200px,90%)] py-6">{children}</main>
      <Footer locale={locale as Locale} />
    </div>
  );
}
