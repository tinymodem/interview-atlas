import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tinymodem.github.io/interview-atlas'),
  title: 'Interview Atlas',
  description: 'A multilingual AI and LLM interview prep site built for GitHub Pages and search indexing.',
  verification: {
    google: 'rb_fPq29dsj5PkrRODAUrz9liBldllmvXjjNnogLGBE',
    other: {
      'msvalidate.01': '2D30F8D3D76790FE2E2D4BA11F54CD7F',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
