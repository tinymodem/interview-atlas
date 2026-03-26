import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomepageContent from '@/components/HomepageContent';
import { getCanonicalUrl } from '@/lib/data';

export const metadata = {
  title: '面试资料铺 | Interview Atlas',
  description: '系统整理 AI、大模型、RAG、Agent 与推理部署相关面试题，帮助你更快进入状态。',
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header locale="zh" />
      <main className="doc-shell flex-1 py-8 md:py-10">
        <HomepageContent locale="zh" />
      </main>
      <Footer locale="zh" />
    </div>
  );
}
