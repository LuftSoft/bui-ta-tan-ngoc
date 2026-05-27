import { useTranslation } from 'react-i18next';
import { Container } from './Container';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-10 text-sm text-muted-fg">
      <Container className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p>
          © {year} {t('brand')}. {t('footer.rights')}
        </p>
        <p>{t('footer.builtWith')}</p>
      </Container>
    </footer>
  );
}
