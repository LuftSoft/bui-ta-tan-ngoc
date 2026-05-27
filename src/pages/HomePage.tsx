import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { useLocale, localePath } from '../hooks/useLocale';

export default function HomePage() {
  const locale = useLocale();
  const { t } = useTranslation('home');
  const { t: tc } = useTranslation('common');

  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-5xl">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-wider text-muted-fg">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t('hero.eyebrow')}
        </p>
        <h1 className="font-display text-display-xl text-balance">
          {t('hero.title')}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-fg text-pretty">{t('hero.subtitle')}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to={localePath(locale, 'contact')}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
          >
            {t('hero.primaryCta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to={localePath(locale, 'projects')}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-fg transition-colors hover:bg-muted"
          >
            {t('hero.secondaryCta')}
          </Link>
        </div>
        <p className="mt-16 text-xs uppercase tracking-widest text-muted-fg">
          {tc('nav.home')} · phase 0 scaffold
        </p>
      </Container>
    </section>
  );
}
