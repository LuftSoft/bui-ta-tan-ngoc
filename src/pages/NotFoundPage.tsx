import { Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { useLocale, localePath } from '../hooks/useLocale';

export default function NotFoundPage() {
  const locale = useLocale();
  return (
    <section className="py-24">
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
