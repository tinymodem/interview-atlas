import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomepageContent from '@/components/HomepageContent';
import { getCanonicalUrl } from '@/lib/data';

export const metadata = {
  title: 'Interview Atlas | 面试资料铺',
  description: 'Multilingual AI and LLM interview materials for model foundations, RAG, agents, evaluation, and shipping.',
  alternates: {
    canonical: getCanonicalUrl('/'),
    languages: {
      'zh-CN': getCanonicalUrl('/zh'),
      en: getCanonicalUrl('/en'),
    },
  },
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header locale="en" />
      <main className="doc-shell flex-1 py-8 md:py-10">
        <HomepageContent locale="en" />
      </main>
      <Footer locale="en" />
    </div>
  );
}
