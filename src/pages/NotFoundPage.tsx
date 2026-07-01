import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { Container } from '../components/layout/Container';
import { useLocale, localePath } from '../hooks/useLocale';

export default function NotFoundPage() {
  const locale = useLocale();
  const { t } = useTranslation();
  return (
    <section className="py-24">
      <Seo title={t('seo.notFound.title')} description={t('seo.notFound.description')} noindex />
      <Container className="max-w-xl text-center">
        <p className="font-display text-display-xl text-accent">404</p>
        <p className="mt-4 text-muted-fg">This page does not exist.</p>
        <Link
          to={localePath(locale)}
          className="mt-8 inline-block rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted"
        >
          Go home
        </Link>
      </Container>
    </section>
  );
}
