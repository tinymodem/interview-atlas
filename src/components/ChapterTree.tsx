'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Chapter, Locale } from '@/lib/data';
import { t } from '@/lib/i18n';
import { getLocalizedPath, getText } from '@/lib/localization';

function ChapterSection({ chapter, locale }: { chapter: Chapter; locale: Locale }) {
  const [open, setOpen] = useState(true);
  const totalQuestions = chapter.sections.reduce((sum, section) => sum + section.questions.length, 0);

  return (
    <section className="surface-panel overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[color:var(--surface-subtle)]"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">{chapter.number}</p>
          <h3 className="mt-2 text-lg font-semibold text-[color:var(--text)]">{getText(chapter.title, locale)}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-strong)]">
            {totalQuestions} {t(locale, 'questionCount')}
          </span>
          <span className={`text-sm text-[color:var(--text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}>⌄</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-[color:var(--border)] px-4 py-4">
          <div className="space-y-4">
            {chapter.sections.map((section) => (
              <div key={section.id} className="rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)]">{section.number}</p>
                    <p className="mt-1 text-sm font-semibold text-[color:var(--text)]">{getText(section.title, locale)}</p>
                  </div>
                  <span className="text-xs text-[color:var(--text-muted)]">
                    {section.questions.length} {t(locale, 'questionCount')}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {section.questions.map((question) => (
                    <Link
                      key={question.id}
                      href={getLocalizedPath(locale, `/q/${question.id}`)}
                      className="group flex items-start gap-3 rounded-[16px] bg-[color:var(--surface)] px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                    >
                      <span className="mt-0.5 rounded-full bg-[color:var(--surface-subtle)] px-2 py-1 text-xs font-semibold text-[color:var(--brand-strong)]">
                        {question.number}
                      </span>
                      <span className="flex-1 text-sm leading-7 text-[color:var(--text)] transition group-hover:text-[color:var(--brand-strong)]">
                        {getText(question.title, locale)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function ChapterTree({ chapters, locale }: { chapters: Chapter[]; locale: Locale }) {
  return (
    <div className="space-y-4">
      {chapters.map((chapter) => (
        <ChapterSection key={chapter.id} chapter={chapter} locale={locale} />
      ))}
    </div>
  );
}
