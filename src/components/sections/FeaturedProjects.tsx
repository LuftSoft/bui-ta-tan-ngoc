import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Tag } from '../ui/Tag';
import { Reveal } from '../motion/Reveal';
import { useLocale, localePath } from '../../hooks/useLocale';

const FEATURED = [
  {
    slug: 'quizzle',
    title: 'Quizzle',
    summary: 'Real-time quiz platform for classrooms — built MVP to launch in 5 weeks.',
    cover: '/assets/quizz_app.png',
    tags: ['Next.js', 'Supabase', 'Realtime'],
    year: 2025,
  },
  {
    slug: 'shopline',
    title: 'Shopline',
    summary: 'E-commerce dashboard rebuild that doubled load speed and cleaned up the data model.',
    cover: '/assets/shop_phone.png',
    tags: ['React', 'Node', 'Postgres'],
    year: 2024,
  },
];

export function FeaturedProjects() {
  const { t } = useTranslation('home');
  const locale = useLocale();

  return (
    <Section spacing="lg" id="projects">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Reveal>
            <Eyebrow>{t('projects.eyebrow')}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-display-md">{t('projects.title')}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Link
            to={localePath(locale, 'projects')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-fg transition-colors hover:text-fg"
          >
            {t('projects.viewAll')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {FEATURED.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1} className="h-full">
            <Link
              to={localePath(locale, `projects/${p.slug}`)}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-fg/20"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 text-fg backdrop-blur transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-fg">
                  <span>{p.year}</span>
                  <span aria-hidden>·</span>
                  <span>{p.tags.join(' / ')}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                <p className="text-muted-fg text-pretty">{p.summary}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-3">
                  {p.tags.map((tag) => (
                    <Tag key={tag} variant="outline">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
