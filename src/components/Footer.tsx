import { type Locale } from '@/lib/data';
import { t } from '@/lib/i18n';

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-black/5 py-8 text-center text-xs text-nc-text-muted">
      <div>© {new Date().getFullYear()} Interview Atlas · 面试资料铺</div>
      <div className="mt-1">{t(locale, 'footer')}</div>
    </footer>
  );
}
