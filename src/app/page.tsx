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
  return <HomepageContent locale="en" />;
}
