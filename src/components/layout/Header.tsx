import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLocale, localePath } from '../../hooks/useLocale';
import { cn } from '../../lib/cn';

const NAV = [
  { key: 'about', to: 'about' },
  { key: 'services', to: 'services' },
  { key: 'projects', to: 'projects' },
  { key: 'blog', to: 'blog' },
  { key: 'contact', to: 'contact' },
] as const;

export function Header() {
  const locale = useLocale();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <NavLink to={localePath(locale)} className="font-display text-lg font-semibold tracking-tight">
          {t('brand')}
        </NavLink>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.key}
              to={localePath(locale, item.to)}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3 py-1.5 text-sm transition-colors',
                  isActive ? 'text-fg' : 'text-muted-fg hover:text-fg',
                )
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
