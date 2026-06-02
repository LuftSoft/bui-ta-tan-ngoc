import type { ComponentType } from 'react';
import { DEFAULT_LOCALE, type Locale } from './i18n';

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  cover: string;
  tags: string[];
  client?: string;
  year: number;
  role: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  publishedAt: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  cover?: string;
  tags: string[];
  publishedAt: string;
  readingTime?: number;
}

interface MdxModule<TFrontmatter> {
  frontmatter: TFrontmatter;
  default: ComponentType;
}

export interface ContentEntry<TFrontmatter> {
  locale: Locale;
  slug: string;
  frontmatter: TFrontmatter;
  Component: ComponentType;
}

export type ProjectEntry = ContentEntry<ProjectFrontmatter>;
export type PostEntry = ContentEntry<PostFrontmatter>;

function buildEntries<T>(
  modules: Record<string, MdxModule<T>>,
  pathRegex: RegExp,
): ContentEntry<T>[] {
  return Object.entries(modules).map(([path, mod]) => {
    const match = path.match(pathRegex);
    if (!match) throw new Error(`Unexpected content path: ${path}`);
    const [, locale, slug] = match;
    return {
      locale: locale as Locale,
      slug,
      frontmatter: { ...mod.frontmatter, slug },
      Component: mod.default,
    };
  });
}

function sortByDateDesc<T extends { frontmatter: { publishedAt: string } }>(items: T[]): T[] {
  return items.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime(),
  );
}

function pickByLocale<T extends ContentEntry<{ slug: string }>>(
  entries: T[],
  locale: Locale,
): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const e of entries) {
    if (e.locale === locale && !seen.has(e.slug)) {
      seen.add(e.slug);
      result.push(e);
    }
  }
  for (const e of entries) {
    if (e.locale === DEFAULT_LOCALE && !seen.has(e.slug)) {
      seen.add(e.slug);
      result.push(e);
    }
  }
  return result;
}

// ---------- Projects ----------

const projectModules = import.meta.glob<MdxModule<ProjectFrontmatter>>(
  '../content/projects/*/*.mdx',
  { eager: true },
);

const projects = buildEntries(projectModules, /projects\/(en|vi)\/([^/]+)\.mdx$/);

export function listProjects(locale: Locale): ProjectEntry[] {
  return pickByLocale(projects, locale).sort((a, b) => {
    const af = a.frontmatter.featured ? 1 : 0;
    const bf = b.frontmatter.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    return (
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
    );
  });
}

export function getProject(locale: Locale, slug: string): ProjectEntry | undefined {
  return (
    projects.find((p) => p.slug === slug && p.locale === locale) ??
    projects.find((p) => p.slug === slug && p.locale === DEFAULT_LOCALE)
  );
}

export function listAllTags(locale: Locale): string[] {
  const set = new Set<string>();
  for (const p of listProjects(locale)) for (const tag of p.frontmatter.tags) set.add(tag);
  return Array.from(set).sort();
}

export function getAdjacent(
  locale: Locale,
  slug: string,
): { prev?: ProjectEntry; next?: ProjectEntry } {
  const all = listProjects(locale);
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return { prev: all[idx - 1], next: all[idx + 1] };
}

// ---------- Posts ----------

const postModules = import.meta.glob<MdxModule<PostFrontmatter>>('../content/posts/*/*.mdx', {
  eager: true,
});

const posts: PostEntry[] = buildEntries(postModules, /posts\/(en|vi)\/([^/]+)\.mdx$/);

export function listPosts(locale: Locale): PostEntry[] {
  return sortByDateDesc(pickByLocale(posts, locale));
}

export function getPost(locale: Locale, slug: string): PostEntry | undefined {
  return (
    posts.find((p) => p.slug === slug && p.locale === locale) ??
    posts.find((p) => p.slug === slug && p.locale === DEFAULT_LOCALE)
  );
}

export function listAllPostTags(locale: Locale): string[] {
  const set = new Set<string>();
  for (const p of listPosts(locale)) for (const tag of p.frontmatter.tags) set.add(tag);
  return Array.from(set).sort();
}

export function getAdjacentPost(
  locale: Locale,
  slug: string,
): { prev?: PostEntry; next?: PostEntry } {
  const all = listPosts(locale);
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return { prev: all[idx - 1], next: all[idx + 1] };
}
