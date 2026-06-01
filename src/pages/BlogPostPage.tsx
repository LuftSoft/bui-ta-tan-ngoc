import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check, Clock, Copy, Link as LinkIcon } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Tag } from '../components/ui/Tag';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/motion/Reveal';
import { MDXProvider } from '../components/mdx/MDXProvider';
import { useLocale, localePath } from '../hooks/useLocale';
import { getPost, getAdjacentPost } from '../lib/mdx';
import NotFoundPage from './NotFoundPage';

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export default function BlogPostPage() {
  const locale = useLocale();
  const { t, i18n } = useTranslation('blog');
  const { slug } = useParams<{ slug: string }>();
  const articleRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  // Build TOC from rendered headings (rehype-slug added the ids)
  useEffect(() => {
    if (!articleRef.current) return;
    const headings = articleRef.current.querySelectorAll<HTMLHeadingElement>('h2[id], h3[id]');
    setToc(
      Array.from(headings).map((h) => ({
        id: h.id,
        text: h.textContent ?? '',
        level: h.tagName === 'H2' ? 2 : 3,
      })),
    );
  }, [slug, locale]);

  // Active heading tracking via IntersectionObserver
  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language === 'vi' ? 'vi-VN' : 'en-US', { dateStyle: 'long' }),
    [i18n.language],
  );

  if (!slug) return <NotFoundPage />;
  const entry = getPost(locale, slug);
  if (!entry) return <NotFoundPage />;

  const { frontmatter, Component } = entry;
  const { prev, next } = getAdjacentPost(locale, slug);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <article>
      <header className="border-b border-border bg-card/30">
        <Container className="max-w-3xl py-16 sm:py-24">
          <Reveal>
            <Link
              to={localePath(locale, 'blog')}
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
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-fg">
              <time dateTime={frontmatter.publishedAt} className="font-mono">
                {dateFormatter.format(new Date(frontmatter.publishedAt))}
              </time>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {t('minRead', { count: frontmatter.readingTime ?? 1 })}
              </span>
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <Tag key={tag} variant="outline">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </header>

      <Container className="max-w-6xl py-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
          <div ref={articleRef} className="min-w-0 lg:max-w-3xl">
            <MDXProvider>
              <Component />
            </MDXProvider>

            <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-border pt-8">
              <span className="text-xs uppercase tracking-wider text-muted-fg">
                {t('detail.shareLabel')}
              </span>
              <Button variant="outline" size="sm" onClick={copyLink}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-accent" />
                    {t('detail.linkCopied')}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {t('detail.copyLink')}
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href,
                  )}&text=${encodeURIComponent(frontmatter.title)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon className="h-4 w-4" />
                  Twitter
                </a>
              </Button>
            </div>
          </div>

          {toc.length > 0 && (
            <aside className="order-first lg:order-last lg:sticky lg:top-24 lg:self-start">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-fg">
                {t('detail.toc')}
              </p>
              <nav>
                <ul className="space-y-2 border-l border-border">
                  {toc.map((item) => {
                    const active = activeId === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`-ml-px block border-l py-1 text-sm transition-colors ${
                            item.level === 3 ? 'pl-7' : 'pl-4'
                          } ${
                            active
                              ? 'border-accent text-fg'
                              : 'border-transparent text-muted-fg hover:text-fg'
                          }`}
                        >
                          {item.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          )}
        </div>
      </Container>

      {(prev || next) && (
        <Container className="max-w-5xl pb-20">
          <div className="grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
            {prev ? (
              <NavCard
                to={localePath(locale, `blog/${prev.slug}`)}
                label={t('detail.prev')}
                title={prev.frontmatter.title}
                direction="prev"
              />
            ) : (
              <span />
            )}
            {next && (
              <NavCard
                to={localePath(locale, `blog/${next.slug}`)}
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
