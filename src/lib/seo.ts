import { SUPPORTED_LOCALES, type Locale } from './i18n';

export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ??
  'https://tanngoc.dev';

export const SITE_NAME = 'tanngoc.dev';
export const DEFAULT_OG_IMAGE = '/og.png';

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildAlternates(pathWithoutLocale: string): { locale: Locale; href: string }[] {
  const clean = pathWithoutLocale.replace(/^\/+/, '').replace(/\/+$/, '');
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
    href: absoluteUrl(clean ? `/${locale}/${clean}` : `/${locale}`),
  }));
}
