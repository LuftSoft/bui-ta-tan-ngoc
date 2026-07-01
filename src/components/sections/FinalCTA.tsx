import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Mail } from 'lucide-react';
import { Section } from '../ui/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/Reveal';
import { MagneticButton } from '../motion/MagneticButton';
import { useLocale, localePath } from '../../hooks/useLocale';

export function FinalCTA() {
  const { t } = useTranslation('home');
  const locale = useLocale();

  return (
    <Section spacing="lg">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 sm:px-16 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="relative max-w-3xl">
          <Reveal>
            <Eyebrow>{t('cta.eyebrow')}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-display-lg text-balance">{t('cta.title')}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-muted-fg text-pretty">{t('cta.subtitle')}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <Button size="lg" asChild>
                  <Link to={localePath(locale, 'contact')}>
                    {t('cta.primary')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
              <Button size="lg" variant="ghost" asChild>
                <a href={`mailto:${t('cta.secondary')}`}>
                  <Mail className="h-4 w-4" />
                  {t('cta.secondary')}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
