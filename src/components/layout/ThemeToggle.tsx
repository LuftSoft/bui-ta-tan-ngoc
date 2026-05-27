import { Monitor, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme, type ThemeMode } from '../../context/ThemeContext';
import { cn } from '../../lib/cn';

const MODES: { value: ThemeMode; Icon: typeof Sun }[] = [
  { value: 'light', Icon: Sun },
  { value: 'system', Icon: Monitor },
  { value: 'dark', Icon: Moon },
];

export function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t('theme.toggle')}
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5"
    >
      {MODES.map(({ value, Icon }) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            aria-pressed={active}
            aria-label={t(`theme.${value}`)}
            className={cn(
              'inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors',
              active ? 'bg-accent text-accent-fg' : 'text-muted-fg hover:text-fg',
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
