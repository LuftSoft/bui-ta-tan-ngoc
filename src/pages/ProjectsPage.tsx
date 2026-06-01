import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Section } from '../components/ui/Section';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Tag } from '../components/ui/Tag';
import { Reveal } from '../components/motion/Reveal';
import { useLocale, localePath } from '../hooks/useLocale';
import { listProjects, listAllTags } from '../lib/mdx';
import { cn } from '../lib/cn';

export default function ProjectsPage() {
  const locale = useLocale();
  const { t } = useTranslation('projects');
  const { t: tc } = useTranslation();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const projects = useMemo(() => listProjects(locale), [locale]);
  const tags = useMemo(() => listAllTags(locale), [locale]);

  const filtered = activeTag
    ? projects.filter((p) => p.frontmatter.tags.includes(activeTag))
    : projects;

  return (
    <>
      <Seo title={tc('seo.projects.title')} description={tc('seo.projects.description')} />
      <Section spacing="lg">
        <Reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display text-display-lg text-balance">{t('title')}</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg text-muted-fg text-pretty">{t('subtitle')}</p>
        </Reveal>
      </Section>

      <Section spacing="md">
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs uppercase tracking-wider text-muted-fg">
            {t('filter.label')}:
          </span>
          <FilterChip active={activeTag === null} onClick={() => setActiveTag(null)}>
            {t('filter.all')}
          </FilterChip>
          {tags.map((tag) => (
            <FilterChip
              key={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </FilterChip>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-fg">{t('empty')}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} className="h-full">
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
                      {p.frontmatter.client && (
                        <>
                          <span aria-hidden>·</span>
                          <span>{p.frontmatter.client}</span>
                        </>
                      )}
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
        )}
      </Section>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        active
          ? 'border-accent bg-accent text-accent-fg'
          : 'border-border bg-card text-muted-fg hover:text-fg',
      )}
    >
      {children}
    </button>
  );
}
