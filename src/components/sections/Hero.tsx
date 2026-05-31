import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Section } from '../ui/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Button } from '../ui/Button';
import { TextSplit } from '../motion/TextSplit';
import { Reveal } from '../motion/Reveal';
import { MagneticButton } from '../motion/MagneticButton';
import { useLocale, localePath } from '../../hooks/useLocale';

export function Hero() {
  const { t } = useTranslation('home');
  const locale = useLocale();

  return (
    <Section spacing="xl" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(var(--color-border))_1px,_transparent_0)] [background-size:32px_32px] opacity-40" />
      </div>

      <div className="relative max-w-5xl">
        <Reveal>
          <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
        </Reveal>

        <h1 className="mt-6 font-display text-display-xl text-balance">
          <TextSplit text={t('hero.title')} />
        </h1>

        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl text-lg text-muted-fg text-pretty sm:text-xl">
            {t('hero.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Button size="lg" asChild>
                <Link to={localePath(locale, 'contact')}>
                  {t('hero.primaryCta')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
            <Button size="lg" variant="outline" asChild>
              <Link to={localePath(locale, 'projects')}>{t('hero.secondaryCta')}</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mt-10 inline-flex items-center gap-2 text-sm text-muted-fg">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            {t('hero.availability')}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
