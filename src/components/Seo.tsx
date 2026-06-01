import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../lib/i18n';
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, absoluteUrl, buildAlternates } from '../lib/seo';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  /** Article publish date (ISO string) */
  publishedAt?: string;
  /** Optional extra keywords/tags */
  tags?: string[];
  /** Override canonical URL (defaults to current location) */
  canonical?: string;
  /** Hide from search engines */
  noindex?: boolean;
}

export function Seo({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  publishedAt,
  tags,
  canonical,
  noindex,
}: SeoProps) {
  const locale = useLocale();
  const location = useLocation();

  const pathWithoutLocale = location.pathname.replace(new RegExp(`^/${locale}`), '');
  const canonicalUrl = canonical ?? absoluteUrl(`/${locale}${pathWithoutLocale}`);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  const ogImage = absoluteUrl(image);
  const alternates = buildAlternates(pathWithoutLocale);

  return (
    <Helmet>
      <html lang={locale} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {alternates.map((alt) => (
        <link key={alt.locale} rel="alternate" hrefLang={alt.locale} href={alt.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/${DEFAULT_LOCALE}${pathWithoutLocale}`} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={locale === 'vi' ? 'vi_VN' : 'en_US'} />
      {SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => (
        <meta key={l} property="og:locale:alternate" content={l === 'vi' ? 'vi_VN' : 'en_US'} />
      ))}
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {tags?.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
