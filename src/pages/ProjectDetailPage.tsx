import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Container } from '../components/layout/Container';
import { Tag } from '../components/ui/Tag';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/motion/Reveal';
import { MDXProvider } from '../components/mdx/MDXProvider';
import { useLocale, localePath } from '../hooks/useLocale';
import { getProject, getAdjacent } from '../lib/mdx';
import NotFoundPage from './NotFoundPage';

export default function ProjectDetailPage() {
  const locale = useLocale();
  const { t } = useTranslation('projects');
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!slug) return <NotFoundPage />;
  const entry = getProject(locale, slug);
  if (!entry) return <NotFoundPage />;

  const { frontmatter, Component } = entry;
  const { prev, next } = getAdjacent(locale, slug);

  return (
    <article>
      <Seo
        title={frontmatter.title}
        description={frontmatter.excerpt}
        image={frontmatter.cover}
        type="article"
        publishedAt={frontmatter.publishedAt}
        tags={frontmatter.tags}
      />
      <header className="border-b border-border bg-card/30">
        <Container className="max-w-5xl py-16 sm:py-24">
          <Reveal>
            <Link
              to={localePath(locale, 'projects')}
              className="inline-flex items-center gap-1.5 text-sm text-muted-fg transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('detail.back')}
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-display-lg text-balance">{frontmatter.title}</h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-muted-fg text-pretty">{frontmatter.excerpt}</p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <Tag key={tag} variant="accent">
                  {tag}
                </Tag>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
              <Meta label={t('detail.role')} value={frontmatter.role} />
              <Meta label={t('detail.year')} value={String(frontmatter.year)} />
              {frontmatter.client && <Meta label={t('detail.client')} value={frontmatter.client} />}
              <Meta label={t('detail.stack')} value={frontmatter.stack.join(' · ')} />
            </dl>
          </Reveal>

          {(frontmatter.liveUrl || frontmatter.repoUrl) && (
            <Reveal delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">
                {frontmatter.liveUrl && (
                  <Button size="md" asChild>
                    <a href={frontmatter.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {t('detail.liveSite')}
                    </a>
                  </Button>
                )}
                {frontmatter.repoUrl && (
                  <Button size="md" variant="outline" asChild>
                    <a href={frontmatter.repoUrl} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" />
                      {t('detail.sourceCode')}
                    </a>
                  </Button>
                )}
              </div>
            </Reveal>
          )}
        </Container>
      </header>

      <Container className="max-w-5xl py-10">
        <Reveal>
          <img
            src={frontmatter.cover}
            alt={frontmatter.title}
            className="aspect-[16/9] w-full rounded-2xl border border-border object-cover"
            loading="lazy"
          />
        </Reveal>
      </Container>

      <Container className="max-w-3xl py-12 sm:py-20">
        <MDXProvider>
          <Component />
        </MDXProvider>
      </Container>

      {(prev || next) && (
        <Container className="max-w-5xl pb-20">
          <div className="grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
            {prev ? (
              <NavCard
                to={localePath(locale, `projects/${prev.slug}`)}
                label={t('detail.prev')}
                title={prev.frontmatter.title}
                direction="prev"
              />
            ) : (
              <span />
            )}
            {next && (
              <NavCard
                to={localePath(locale, `projects/${next.slug}`)}
                label={t('detail.next')}
                title={next.frontmatter.title}
                direction="next"
              />
            )}
          </div>
        </Container>
      )}
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-fg">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-fg">{value}</dd>
    </div>
  );
}

function NavCard({
  to,
  label,
  title,
  direction,
}: {
  to: string;
  label: string;
  title: string;
  direction: 'prev' | 'next';
}) {
  const isPrev = direction === 'prev';
  return (
    <Link
      to={to}
      className={`group flex flex-col gap-1 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-fg/20 ${
        isPrev ? 'text-left' : 'text-right sm:items-end'
      }`}
    >
      <span
        className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-fg ${
          isPrev ? '' : 'flex-row-reverse'
        }`}
      >
        {isPrev ? <ArrowLeft className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
        {label}
      </span>
      <span className="font-display text-xl font-semibold transition-colors group-hover:text-accent">
        {title}
      </span>
    </Link>
  );
}
