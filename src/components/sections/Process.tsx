import { useTranslation } from 'react-i18next';
import { Section } from '../ui/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../motion/Reveal';

const STEPS = ['discover', 'design', 'build', 'launch'] as const;

export function Process() {
  const { t } = useTranslation('home');

  return (
    <Section spacing="lg" className="bg-muted/40" id="process">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>{t('process.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-display-md text-balance">{t('process.title')}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-muted-fg text-pretty">{t('process.subtitle')}</p>
        </Reveal>
      </div>

      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((key, i) => (
          <Reveal key={key} delay={i * 0.08} as="li" className="bg-card">
            <div className="flex h-full flex-col gap-4 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <span className="h-px flex-1 bg-border" aria-hidden />
              </div>
              <h3 className="font-display text-xl font-semibold">
                {t(`process.steps.${key}.title`)}
              </h3>
              <p className="text-sm text-muted-fg text-pretty">
                {t(`process.steps.${key}.description`)}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
