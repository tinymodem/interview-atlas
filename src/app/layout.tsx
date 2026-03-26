import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tinymodem.github.io/interview-atlas'),
  title: '面试资料铺 | Interview Atlas',
  description: '系统整理 AI、大模型、RAG、Agent 与推理部署相关面试题，帮助你更快进入状态。',
  verification: {
    google: 'rb_fPq29dsj5PkrRODAUrz9liBldllmvXjjNnogLGBE',
    other: {
      'msvalidate.01': '2D30F8D3D76790FE2E2D4BA11F54CD7F',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
