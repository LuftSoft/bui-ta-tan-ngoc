import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLocale } from '../../hooks/useLocale';

export function RootLayout() {
  useLocale();
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
