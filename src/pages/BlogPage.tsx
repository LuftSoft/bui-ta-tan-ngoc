import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Section } from '../components/ui/Section';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Tag } from '../components/ui/Tag';
import { Reveal } from '../components/motion/Reveal';
import { useLocale, localePath } from '../hooks/useLocale';
import { listPosts, listAllPostTags } from '../lib/mdx';
import { cn } from '../lib/cn';

export default function BlogPage() {
  const locale = useLocale();
  const { t, i18n } = useTranslation('blog');
  const { t: tc } = useTranslation();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const posts = useMemo(() => listPosts(locale), [locale]);
  const tags = useMemo(() => listAllPostTags(locale), [locale]);

  const filtered = activeTag
    ? posts.filter((p) => p.frontmatter.tags.includes(activeTag))
    : posts;

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language === 'vi' ? 'vi-VN' : 'en-US', {
        dateStyle: 'long',
      }),
    [i18n.language],
  );

  return (
    <>
      <Seo title={tc('seo.blog.title')} description={tc('seo.blog.description')} />
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
            <FilterChip key={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)}>
              {tag}
            </FilterChip>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-fg">{t('empty')}</p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05} as="li">
                <Link
                  to={localePath(locale, `blog/${p.slug}`)}
                  className="group flex flex-col gap-3 py-8 sm:flex-row sm:items-start sm:gap-10"
                >
                  <div className="shrink-0 font-mono text-sm text-muted-fg sm:w-40 sm:pt-1">
                    {dateFormatter.format(new Date(p.frontmatter.publishedAt))}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-semibold transition-colors group-hover:text-accent sm:text-3xl">
                      {p.frontmatter.title}
                    </h2>
                    <p className="mt-2 text-muted-fg text-pretty">{p.frontmatter.excerpt}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-fg">
                        <Clock className="h-3.5 w-3.5" />
                        {t('minRead', { count: p.frontmatter.readingTime ?? 1 })}
                      </span>
                      {p.frontmatter.tags.map((tag) => (
                        <Tag key={tag} variant="outline">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-fg transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:mt-2" />
                </Link>
              </Reveal>
            ))}
          </ul>
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
