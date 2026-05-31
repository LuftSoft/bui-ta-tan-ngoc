import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Tag } from '../ui/Tag';
import { Reveal } from '../motion/Reveal';
import { useLocale, localePath } from '../../hooks/useLocale';
import { listProjects } from '../../lib/mdx';

export function FeaturedProjects() {
  const { t } = useTranslation('home');
  const locale = useLocale();
  const featured = useMemo(
    () => listProjects(locale).filter((p) => p.frontmatter.featured).slice(0, 2),
    [locale],
  );

  if (featured.length === 0) return null;

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
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1} className="h-full">
            <Link
              to={localePath(locale, `projects/${p.slug}`)}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-fg/20"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={p.frontmatter.cover}
                  alt={p.frontmatter.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 text-fg backdrop-blur transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-fg">
                  <span>{p.frontmatter.year}</span>
                  <span aria-hidden>·</span>
                  <span>{p.frontmatter.tags.join(' / ')}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold">{p.frontmatter.title}</h3>
                <p className="text-muted-fg text-pretty">{p.frontmatter.excerpt}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-3">
                  {p.frontmatter.tags.map((tag) => (
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
