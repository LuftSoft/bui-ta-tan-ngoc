import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { DEFAULT_LOCALE, isLocale } from './lib/i18n';

// HomePage stays eager — it's the landing page, prefetch hurts here.
// Everything else loads on demand.
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const StyleguidePage = lazy(() => import('./pages/StyleguidePage'));

function LocaleGuard({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  if (!isLocale(lang)) return <Navigate to={`/${DEFAULT_LOCALE}`} replace />;
  return <>{children}</>;
}

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" aria-hidden>
      <div className="h-1 w-24 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/3 animate-marquee bg-accent" />
      </div>
    </div>
  );
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
        <Route
          path="about"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="services"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ServicesPage />
            </Suspense>
          }
        />
        <Route
          path="projects"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProjectsPage />
            </Suspense>
          }
        />
        <Route
          path="projects/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProjectDetailPage />
            </Suspense>
          }
        />
        <Route
          path="blog"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="blog/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BlogPostPage />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ContactPage />
            </Suspense>
          }
        />
        {import.meta.env.DEV && (
          <Route
            path="_styleguide"
            element={
              <Suspense fallback={<RouteFallback />}>
                <StyleguidePage />
              </Suspense>
            }
          />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
    </Routes>
  );
}
