import LegacyZhRedirect from '@/components/LegacyZhRedirect';
import { getCanonicalUrl } from '@/lib/data';

export const metadata = {
  title: '面试资料铺 | Interview Atlas',
  description: '系统整理 AI、大模型、RAG、Agent 与推理部署相关面试题，帮助你更快进入状态。',
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegacyZhHomePage() {
  return <LegacyZhRedirect target="/" />;
}
