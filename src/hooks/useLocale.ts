import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LOCALE, isLocale, type Locale } from '../lib/i18n';

export function useLocale(): Locale {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale;
  }, [locale, i18n]);

  return locale;
}

export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}
