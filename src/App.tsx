import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { SmoothScrollProvider } from './components/motion/SmoothScrollProvider';
import { AppRoutes } from './routes';
import './lib/i18n';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SmoothScrollProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SmoothScrollProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
