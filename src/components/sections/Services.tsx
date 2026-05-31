import { useTranslation } from 'react-i18next';
import { Code2, Smartphone, Sparkles, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from '../ui/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Card, CardTitle, CardDescription } from '../ui/Card';
import { Reveal } from '../motion/Reveal';

const ITEMS: { key: string; Icon: LucideIcon }[] = [
  { key: 'web', Icon: Code2 },
  { key: 'mobile', Icon: Smartphone },
  { key: 'mvp', Icon: Sparkles },
  { key: 'consulting', Icon: Wrench },
];

export function Services() {
  const { t } = useTranslation('home');

  return (
    <Section spacing="lg" id="services">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{t('services.eyebrow')}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-display-md text-balance">
              {t('services.title')}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <p className="max-w-sm text-muted-fg text-pretty">{t('services.subtitle')}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => (
          <Reveal key={item.key} delay={i * 0.08} className="h-full">
            <Card className="flex h-full flex-col">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <item.Icon className="h-5 w-5" />
              </div>
              <CardTitle>{t(`services.items.${item.key}.title`)}</CardTitle>
              <CardDescription>{t(`services.items.${item.key}.description`)}</CardDescription>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
