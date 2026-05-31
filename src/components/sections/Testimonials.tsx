import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import { Section } from '../ui/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../motion/Reveal';

const ITEMS = ['one', 'two', 'three'] as const;

export function Testimonials() {
  const { t } = useTranslation('home');

  return (
    <Section spacing="lg" id="testimonials">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>{t('testimonials.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-display-md text-balance">
            {t('testimonials.title')}
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {ITEMS.map((key, i) => (
          <Reveal key={key} delay={i * 0.1} className="h-full">
            <figure className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-7">
              <Quote className="h-6 w-6 text-accent" aria-hidden />
              <blockquote className="text-base leading-relaxed text-fg text-pretty">
                "{t(`testimonials.items.${key}.quote`)}"
              </blockquote>
              <figcaption className="mt-auto border-t border-border pt-4">
                <div className="font-semibold">{t(`testimonials.items.${key}.name`)}</div>
                <div className="text-sm text-muted-fg">{t(`testimonials.items.${key}.role`)}</div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
