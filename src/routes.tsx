import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import HomePage from './pages/HomePage';
import PlaceholderPage from './pages/PlaceholderPage';
import NotFoundPage from './pages/NotFoundPage';
import { DEFAULT_LOCALE, isLocale } from './lib/i18n';

function LocaleGuard({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  if (!isLocale(lang)) return <Navigate to={`/${DEFAULT_LOCALE}`} replace />;
  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
      <Route
        path="/:lang"
        element={
          <LocaleGuard>
            <RootLayout />
          </LocaleGuard>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="about" element={<PlaceholderPage titleKey="nav.about" />} />
        <Route path="services" element={<PlaceholderPage titleKey="nav.services" />} />
        <Route path="projects" element={<PlaceholderPage titleKey="nav.projects" />} />
        <Route path="projects/:slug" element={<PlaceholderPage titleKey="nav.projects" />} />
        <Route path="blog" element={<PlaceholderPage titleKey="nav.blog" />} />
        <Route path="blog/:slug" element={<PlaceholderPage titleKey="nav.blog" />} />
        <Route path="contact" element={<PlaceholderPage titleKey="nav.contact" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
    </Routes>
  );
}
