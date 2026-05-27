import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LOCALES, type Locale } from '../../lib/i18n';
import { useLocale } from '../../hooks/useLocale';
import { cn } from '../../lib/cn';

export function LanguageSwitcher() {
  const current = useLocale();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const switchTo = (next: Locale) => {
    if (next === current) return;
    const rest = location.pathname.replace(new RegExp(`^/${current}`), '');
    navigate(`/${next}${rest || ''}${location.search}${location.hash}`);
  };

  return (
    <div
      role="group"
      aria-label={t('language.switch')}
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5 text-xs font-medium uppercase"
    >
      {SUPPORTED_LOCALES.map((loc) => {
        const active = loc === current;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-pressed={active}
            className={cn(
              'h-7 rounded-full px-2.5 transition-colors',
              active ? 'bg-accent text-accent-fg' : 'text-muted-fg hover:text-fg',
            )}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
