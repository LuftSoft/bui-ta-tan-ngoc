import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '../locales/en/common.json';
import enHome from '../locales/en/home.json';
import enProjects from '../locales/en/projects.json';
import enAbout from '../locales/en/about.json';
import enServices from '../locales/en/services.json';
import viCommon from '../locales/vi/common.json';
import viHome from '../locales/vi/home.json';
import viProjects from '../locales/vi/projects.json';
import viAbout from '../locales/vi/about.json';
import viServices from '../locales/vi/services.json';

export const SUPPORTED_LOCALES = ['en', 'vi'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      home: enHome,
      projects: enProjects,
      about: enAbout,
      services: enServices,
    },
    vi: {
      common: viCommon,
      home: viHome,
      projects: viProjects,
      about: viAbout,
      services: viServices,
    },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  defaultNS: 'common',
  ns: ['common', 'home', 'projects', 'about', 'services'],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
