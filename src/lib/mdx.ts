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

export interface ProjectModule {
  frontmatter: ProjectFrontmatter;
  default: ComponentType;
}

export interface ProjectEntry {
  locale: Locale;
  slug: string;
  frontmatter: ProjectFrontmatter;
  Component: ComponentType;
}

const projectModules = import.meta.glob<ProjectModule>(
  '../content/projects/*/*.mdx',
  { eager: true },
);

const projects: ProjectEntry[] = Object.entries(projectModules).map(([path, mod]) => {
  const match = path.match(/projects\/(en|vi)\/([^/]+)\.mdx$/);
  if (!match) {
    throw new Error(`Unexpected project path: ${path}`);
  }
  const [, locale, slug] = match;
  return {
    locale: locale as Locale,
    slug,
    frontmatter: { ...mod.frontmatter, slug },
    Component: mod.default,
  };
});

function pickLocale(slug: string, locale: Locale): ProjectEntry | undefined {
  return (
    projects.find((p) => p.slug === slug && p.locale === locale) ??
    projects.find((p) => p.slug === slug && p.locale === DEFAULT_LOCALE)
  );
}

export function listProjects(locale: Locale): ProjectEntry[] {
  const seen = new Set<string>();
  const result: ProjectEntry[] = [];
  // First pass: requested locale
  for (const p of projects) {
    if (p.locale === locale && !seen.has(p.slug)) {
      seen.add(p.slug);
      result.push(p);
    }
  }
  // Fallback: default locale for missing slugs
  for (const p of projects) {
    if (p.locale === DEFAULT_LOCALE && !seen.has(p.slug)) {
      seen.add(p.slug);
      result.push(p);
    }
  }
  return result.sort((a, b) => {
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
  return pickLocale(slug, locale);
}

export function listAllTags(locale: Locale): string[] {
  const set = new Set<string>();
  for (const p of listProjects(locale)) {
    for (const tag of p.frontmatter.tags) set.add(tag);
  }
  return Array.from(set).sort();
}

export function getAdjacent(
  locale: Locale,
  slug: string,
): { prev?: ProjectEntry; next?: ProjectEntry } {
  const all = listProjects(locale);
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}
