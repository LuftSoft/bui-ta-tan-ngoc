import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import type { ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

/** Origin point for the circular reveal animation. */
export interface ThemeChangeOrigin {
  x: number;
  y: number;
}

interface ThemeContextValue {
  mode: ThemeMode;
  resolved: ResolvedTheme;
  setMode: (mode: ThemeMode, origin?: ThemeChangeOrigin) => void;
}

const STORAGE_KEY = 'theme';
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === 'light' || v === 'dark' || v === 'system' ? v : 'system';
}

function applyThemeToDom(resolved: ResolvedTheme): void {
  document.documentElement.classList.toggle('dark', resolved === 'dark');
  document.documentElement.style.colorScheme = resolved;
}

interface ViewTransitionDocument extends Document {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
}

function supportsViewTransitions(): boolean {
  return (
    typeof document !== 'undefined' &&
    typeof (document as ViewTransitionDocument).startViewTransition === 'function'
  );
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => readStoredMode());
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme());

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const resolved: ResolvedTheme = mode === 'system' ? systemTheme : mode;

  useEffect(() => {
    applyThemeToDom(resolved);
  }, [resolved]);

  const setMode = useCallback(
    (next: ThemeMode, origin?: ThemeChangeOrigin) => {
      const sys = getSystemTheme();
      const nextResolved: ResolvedTheme = next === 'system' ? sys : next;

      const commit = () => {
        flushSync(() => {
          setModeState(next);
          window.localStorage.setItem(STORAGE_KEY, next);
        });
        // Apply class synchronously so the view-transition snapshot captures the change.
        applyThemeToDom(nextResolved);
      };

      if (!origin || !supportsViewTransitions() || prefersReducedMotion()) {
        setModeState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
        return;
      }

      const transition = (document as ViewTransitionDocument).startViewTransition!(commit);

      void transition.ready.then(() => {
        const { x, y } = origin;
        const maxRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      });
    },
    [],
  );

  const value = useMemo(() => ({ mode, resolved, setMode }), [mode, resolved, setMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
