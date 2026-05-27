import { useTranslation } from 'react-i18next';
import { Container } from '../components/layout/Container';

export default function PlaceholderPage({ titleKey }: { titleKey: string }) {
  const { t } = useTranslation();
  return (
    <section className="py-24">
      <Container className="max-w-3xl">
        <h1 className="font-display text-display-md">{t(titleKey)}</h1>
        <p className="mt-4 text-muted-fg">Coming soon in the next phase.</p>
      </Container>
    </section>
  );
}
