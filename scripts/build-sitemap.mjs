#!/usr/bin/env node
/**
 * Generates dist/sitemap.xml after `vite build`.
 * - Static pages: home, about, services, projects, blog, contact
 * - Dynamic pages: every MDX slug under src/content/projects and src/content/posts
 * - Each URL gets one entry per supported locale + hreflang alternates
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://tanngoc.dev').replace(/\/$/, '');
const LOCALES = ['en', 'vi'];
const STATIC_PATHS = ['', 'about', 'services', 'projects', 'blog', 'contact'];

async function listMdxSlugs(dir) {
  const en = join(ROOT, 'src/content', dir, 'en');
  if (!existsSync(en)) return [];
  const files = await readdir(en);
  return files.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
}

async function readFrontmatterDate(dir, slug) {
  const file = join(ROOT, 'src/content', dir, 'en', `${slug}.mdx`);
  const raw = await readFile(file, 'utf8');
  const match = raw.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/);
  if (!match) return undefined;
  const dateMatch = match[1].match(/^publishedAt:\s*["']?([\d-]+)/m);
  return dateMatch?.[1];
}

function buildEntries() {
  const entries = STATIC_PATHS.map((path) => ({ path }));
  return entries;
}

function urlFor(locale, path) {
  return path ? `${SITE_URL}/${locale}/${path}` : `${SITE_URL}/${locale}`;
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlBlock({ path, lastmod }) {
  return LOCALES.map((loc) => {
    const url = urlFor(loc, path);
    const alternates = LOCALES.map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${l}" href="${escapeXml(urlFor(l, path))}" />`,
    ).join('\n');
    return [
      '  <url>',
      `    <loc>${escapeXml(url)}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      alternates,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(urlFor('en', path))}" />`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n');
  }).join('\n');
}

async function main() {
  const projectSlugs = await listMdxSlugs('projects');
  const postSlugs = await listMdxSlugs('posts');

  const entries = buildEntries();
  for (const slug of projectSlugs) {
    entries.push({
      path: `projects/${slug}`,
      lastmod: await readFrontmatterDate('projects', slug),
    });
  }
  for (const slug of postSlugs) {
    entries.push({
      path: `blog/${slug}`,
      lastmod: await readFrontmatterDate('posts', slug),
    });
  }

  const body = entries.map(urlBlock).join('\n');
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${body}\n` +
    `</urlset>\n`;

  const outDir = join(ROOT, 'dist');
  await writeFile(join(outDir, 'sitemap.xml'), xml, 'utf8');

  const robots =
    `User-agent: *\n` +
    `Allow: /\n` +
    `\n` +
    `Sitemap: ${SITE_URL}/sitemap.xml\n`;
  await writeFile(join(outDir, 'robots.txt'), robots, 'utf8');

  console.log(`✓ sitemap.xml (${entries.length} urls × ${LOCALES.length} locales)`);
  console.log(`✓ robots.txt`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
