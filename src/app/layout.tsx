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
      <body>{children}</body>
    </html>
  );
}
