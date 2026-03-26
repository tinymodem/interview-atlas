import Link from 'next/link';
import { uiText } from '@/lib/i18n';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[min(760px,90%)] items-center justify-center py-16">
      <section className="rounded-[32px] bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nc-green">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-nc-text">{uiText.notFoundTitle.zh}</h1>
        <p className="mt-4 text-base leading-7 text-nc-text-light">{uiText.notFoundBody.zh}</p>
        <div className="mt-8 flex justify-center">
          <Link href="/" className="rounded-full bg-nc-green px-5 py-2.5 text-sm font-medium text-white">
            返回首页
          </Link>
        </div>
      </section>
    </main>
  );
}
