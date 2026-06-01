import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Code2, Smartphone, Sparkles, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Button } from '../components/ui/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/Accordion';
import { Reveal } from '../components/motion/Reveal';
import { MagneticButton } from '../components/motion/MagneticButton';
import { useLocale, localePath } from '../hooks/useLocale';

interface ServiceCopy {
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  timeline: string;
  startingPrice: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const SERVICES: { key: string; Icon: LucideIcon }[] = [
  { key: 'web', Icon: Code2 },
  { key: 'mobile', Icon: Smartphone },
  { key: 'mvp', Icon: Sparkles },
  { key: 'consulting', Icon: Wrench },
];

export default function ServicesPage() {
  const { t } = useTranslation('services');
  const locale = useLocale();
  const faq = t('faq.items', { returnObjects: true }) as FaqItem[];

  return (
    <>
      <Section spacing="lg">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-display-lg text-balance">{t('hero.title')}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-muted-fg text-pretty">{t('hero.subtitle')}</p>
          </Reveal>
        </div>
      </Section>

      <Section spacing="md">
        <div className="grid gap-6 lg:grid-cols-2">
          {SERVICES.map(({ key, Icon }, i) => {
            const item = t(`items.${key}`, { returnObjects: true }) as ServiceCopy;
            return (
              <Reveal key={key} delay={i * 0.08} className="h-full">
                <article className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-wider text-muted-fg">
                        {item.timeline}
                      </div>
                      <div className="mt-1 font-mono text-sm text-accent">
                        {item.startingPrice}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-semibold">{item.title}</h2>
                    <p className="mt-1 text-sm text-muted-fg">{item.tagline}</p>
                  </div>

                  <p className="text-muted-fg text-pretty">{item.description}</p>

                  <ul className="mt-auto space-y-2 border-t border-border pt-5">
                    {item.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-fg/90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        <span className="text-pretty">{d}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section spacing="lg" className="border-y border-border bg-card/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Reveal>
              <Eyebrow>{t('faq.eyebrow')}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-display-md text-balance">{t('faq.title')}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6">
              {faq.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      <Section spacing="lg">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <h2 className="font-display text-display-md text-balance">{t('cta.title')}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-muted-fg text-pretty">{t('cta.subtitle')}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 inline-block">
                <MagneticButton>
                  <Button size="lg" asChild>
                    <Link to={localePath(locale, 'contact')}>
                      {t('cta.button')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
