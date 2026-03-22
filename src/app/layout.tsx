import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tinymodem.github.io/interview-atlas'),
  title: 'Interview Atlas',
  description: 'A bilingual AI and LLM interview prep site built for GitHub Pages and search indexing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f7f8f9] text-[#333] antialiased">{children}</body>
    </html>
  );
}
