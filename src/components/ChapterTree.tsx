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
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-nc-green" />
          <span className="text-sm font-semibold text-nc-text">{getText(chapter.title, locale)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-nc-green-light px-2 py-0.5 text-xs text-nc-green">
            {totalQuestions} {t(locale, 'questionCount')}
          </span>
          <svg
            className={`h-3.5 w-3.5 text-nc-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {open && (
        <div>
          {chapter.sections.map((section) => (
            <div key={section.id}>
              <div className="border-t border-gray-100 bg-[#f8f8f8] px-5 py-2">
                <span className="text-xs font-medium text-nc-text-light">{getText(section.title, locale)}</span>
              </div>

              {section.questions.map((question, index) => (
                <Link
                  key={question.id}
                  href={getLocalizedPath(locale, `/q/${question.id}`)}
                  className="group flex items-center border-t border-gray-100 px-5 py-3 transition-colors hover:bg-nc-green-light/30"
                >
                  <span className="w-8 shrink-0 text-xs text-nc-text-muted">{index + 1}</span>
                  <span className="flex-1 text-sm text-nc-text transition-colors group-hover:text-nc-green">
                    {getText(question.title, locale)}
                  </span>
                  <svg className="ml-2 h-3.5 w-3.5 shrink-0 text-gray-300 transition-colors group-hover:text-nc-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ChapterTree({ chapters, locale }: { chapters: Chapter[]; locale: Locale }) {
  return (
    <div className="space-y-3">
      {chapters.map((chapter) => (
        <ChapterSection key={chapter.id} chapter={chapter} locale={locale} />
      ))}
    </div>
  );
}
