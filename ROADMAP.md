# Portfolio Rebuild Roadmap

Concept: freelance fullstack portfolio inspired by [codedgar.com](https://codedgar.com/) — dark theme, amber accent, strong display typography, micro-interactions.

## Locked decisions

| Item | Value |
|---|---|
| Brand | `tanngoc.dev` |
| Routing | Multi-page, React Router v6 with locale prefix `/:lang/...` |
| Default locale | `en` (`/` → `/en`); supported: `en`, `vi` |
| Content | MDX for projects and blog posts |
| Theme | light / dark / system, accent `#facc15` (amber-400) |
| i18n | react-i18next, namespaces in `src/locales/{en,vi}/*.json` |
| Deploy | Netlify (`netlify.toml` at root, SPA redirect) |

## Tech stack

- **Core**: Vite + React 18 + TypeScript + Tailwind CSS
- **Routing**: react-router-dom v6
- **i18n**: i18next + react-i18next + i18next-browser-languagedetector
- **Animation**: framer-motion (+ Lenis planned for smooth scroll)
- **Content**: @mdx-js/rollup, @mdx-js/react, remark-frontmatter, remark-mdx-frontmatter, rehype-slug, rehype-autolink-headings
- **Forms**: react-hook-form + zod + @hookform/resolvers
- **SEO**: react-helmet-async
- **Utils**: clsx + tailwind-merge (`cn` helper)
- **Icons**: lucide-react
- **Backend**: Supabase (existing) — `contacts` table + Edge Function `submit-contact`
- **Fonts**: Clash Display (display), Inter (body), JetBrains Mono (code) via Fontshare + Google Fonts

## Sitemap

```
/                       → redirects to /en
/:lang                  Home
/:lang/about            About — story, timeline, deep skills
/:lang/services         Services + packages/pricing
/:lang/projects         Project case studies grid (filter by tag)
/:lang/projects/:slug   Case study detail (MDX)
/:lang/blog             Blog list
/:lang/blog/:slug       Blog post (MDX)
/:lang/contact          Inquiry form (zod + Supabase)
```

## Folder structure (target)

```
src/
  app/                  layouts, providers (if grows)
  components/
    layout/             Header, Footer, RootLayout, Container, ThemeToggle, LanguageSwitcher
    ui/                 Button, Card, Tag, Marquee (shadcn-style primitives, copy-in)
    sections/           Hero, Services, FeaturedProjects, Process, Testimonials, CTA
    motion/             Reveal, MagneticButton, TextSplit
  content/
    projects/{en,vi}/*.mdx
    posts/{en,vi}/*.mdx
  context/              ThemeContext
  hooks/                useLocale, useReducedMotion, ...
  lib/                  i18n, supabase, cn, mdx, seo
  locales/{en,vi}/      common.json, home.json, ... (i18n strings)
  pages/                HomePage, AboutPage, ServicesPage, ProjectsPage, ProjectDetailPage, BlogPage, BlogPostPage, ContactPage, NotFoundPage
  routes.tsx
  styles/ (if needed)
```

## MDX frontmatter schema

```yaml
---
title: "Project name"
slug: "project-slug"
excerpt: "1–2 sentence summary"
cover: "/projects/xxx/cover.webp"
tags: ["fullstack", "nextjs"]
client: "Client name"
year: 2025
role: "Fullstack Developer"
stack: ["React", "Node", "Postgres"]
liveUrl: "https://..."
repoUrl: "https://..."
featured: true
publishedAt: "2025-03-15"
---
```

For blog posts: drop `client`, `role`, `stack`, `liveUrl`, `repoUrl`; keep the rest plus `readingTime`.

---

## Phases

### ✅ Phase 0 — Foundation (DONE)

- Install deps: router, i18n, framer-motion, MDX toolchain, hook-form + zod, helmet-async, clsx/tailwind-merge
- `tailwind.config.js`: theme tokens (bg/fg/muted/border/card/accent), `darkMode: 'class'`, font families, display sizes, container
- `src/index.css`: Fontshare Clash Display + Inter + JetBrains Mono; CSS vars for light & dark
- `vite.config.ts`: MDX plugin (frontmatter, slug, autolink)
- `src/context/ThemeContext.tsx`: light/dark/system + live system listener
- `src/lib/i18n.ts`: react-i18next with `en` + `vi`, namespaces (`common`, `home`)
- `src/hooks/useLocale.ts`: URL `:lang` ↔ i18next bridge + `localePath` helper
- `src/routes.tsx`: `/`→`/en`, `/:lang/{...}` with placeholder pages
- Layout: `Header` (nav + `LanguageSwitcher` + `ThemeToggle`), `Footer`, `RootLayout`
- `src/pages/HomePage.tsx`: hero placeholder with i18n
- `index.html`: brand meta + pre-hydration anti-flash script
- `netlify.toml`: SPA redirect

### ✅ Phase 1 — Design system + motion primitives (DONE)

**Goal**: reusable building blocks before any real page.

- `components/ui/`:
  - `Button` (variants: primary/accent, secondary, ghost; sizes; icon slot; asChild via Slot pattern)
  - `Card`, `Tag`, `Section`, `Eyebrow`, `Marquee`
- `components/motion/`:
  - `Reveal` — fade + translate on intersection (respect `prefers-reduced-motion`)
  - `TextSplit` — per-word/char reveal for headings
  - `MagneticButton` — pointer-follow micro-interaction
- Smooth scroll via Lenis (`@studio-freight/lenis`), wired in `App.tsx`, disabled when `prefers-reduced-motion`
- Document tokens in `ROADMAP.md` "Design tokens" section (below) as the source of truth

**Deliverable**: a `/en/_styleguide` route (gated to dev) showcasing primitives — delete before prod or leave behind env flag.

### ✅ Phase 2 — Home page (DONE)

**Sections (top→bottom)**:
1. Hero — large display heading, eyebrow, dual CTA, optional animated background grain/orbit
2. Trust strip — marquee of client logos / tools
3. Services — 3–4 cards (Web app, Mobile, Consulting, Optimization)
4. Featured projects — 2–3 case study cards with hover preview
5. Process — 4 steps (Discovery → Design → Build → Launch)
6. Testimonials — quote grid or carousel
7. Final CTA — full-bleed accent block

i18n: full `home` namespace in both `en`/`vi`. Content lives in JSON (no MDX needed here).

### ✅ Phase 3 — Projects (DONE)

- `src/content/projects/{en,vi}/*.mdx` with frontmatter schema above
- `lib/mdx.ts`: glob import `import.meta.glob('../content/projects/*/*.mdx', { eager: true })`, group by slug + locale, expose helpers `listProjects(locale)`, `getProject(locale, slug)`
- `pages/ProjectsPage.tsx`: filter by tag, sort by `publishedAt`/`featured`
- `pages/ProjectDetailPage.tsx`: hero (cover, tags, meta), MDX body with custom components (`<Callout>`, `<Image>`, `<Code>`), next/prev nav
- Image strategy: store under `public/projects/<slug>/`, serve WebP, `loading="lazy"`

### ✅ Phase 4 — About + Services (DONE)

- **About**: hero portrait/illustration, story prose, timeline (`<dl>` semantic), skills grouped (Frontend/Backend/Cloud), values
- **Services**: per-service card detail (deliverables, timeline, starting price), FAQ accordion, CTA

Content in i18n JSON; reuse Phase 1 primitives.

### ✅ Phase 5 — Blog + Contact (DONE)

**Blog**:
- Same MDX pipeline as projects, separate `src/content/posts/{en,vi}/*.mdx`
- List page with reading time, tag filter
- Detail page with TOC (from rehype-slug headings), share buttons

**Contact**:
- Extend `contacts` Supabase table (new migration): add `budget_range`, `timeline`, `project_type`
- Form: react-hook-form + zod, submit via Edge Function `submit-contact` (already scaffolded — wire it up, remove direct client insert)
- Add hCaptcha or basic rate-limit (Edge Function IP throttle)
- Success state with calendar link (Cal.com / Calendly)

### ✅ Phase 6 — SEO + polish + ship (DONE)

- `react-helmet-async` per page (title, description, canonical, OG, alternate `hreflang` for `en` ↔ `vi`)
- `sitemap.xml` generator script (`scripts/build-sitemap.ts`) running in `postbuild`
- `robots.txt`, `manifest.webmanifest`, favicons
- OG image: static `/og.png` to start; later dynamic via Netlify Function
- Performance: route-level lazy loading (`React.lazy` + Suspense), image dims, font-display swap, audit Lighthouse ≥ 95 across categories
- Accessibility pass: keyboard nav, focus rings, ARIA on toggles, color contrast WCAG AA, `prefers-reduced-motion`
- Analytics: Netlify Analytics or Plausible
- Deploy: connect GitHub repo to Netlify, env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`), custom domain `tanngoc.dev`

## Design tokens (reference)

CSS variables in `src/index.css`. Edit these to retheme — `tailwind.config.js` colors reference them.

| Token | Light | Dark |
|---|---|---|
| `--color-bg` | `250 250 250` | `10 10 10` |
| `--color-fg` | `10 10 10` | `250 250 250` |
| `--color-muted` | `244 244 245` | `24 24 27` |
| `--color-muted-fg` | `113 113 122` | `161 161 170` |
| `--color-border` | `228 228 231` | `39 39 42` |
| `--color-card` | `255 255 255` | `17 17 19` |
| `--color-accent` | `250 204 21` | `250 204 21` |
| `--color-accent-fg` | `24 24 27` | `24 24 27` |

Fonts: `font-display` = Clash Display, `font-sans` = Inter, `font-mono` = JetBrains Mono.

Display sizes: `text-display-xl` / `text-display-lg` / `text-display-md` (fluid via `clamp`).

## Cleanup debt

- Legacy single-page components in `src/components/` (About, Contact, Experience, Footer, Header, Hero, Projects, Skills) are orphaned — delete when Phase 2 lands and content has been ported.
- `src/utils/const.ts` static data — migrate into i18n JSON / MDX frontmatter.

## Notes for future Claude sessions

- Read this file + `CLAUDE.md` first.
- Before any UI work, read `~/agent-skills/skills/frontend-design/SKILL.md`, `react-best-practices/SKILL.md`, `web-design-guidelines/SKILL.md` (referenced in `~/.claude/CLAUDE.md`).
- Don't copy codedgar 1:1 — take *concept* (dark + amber, display type, micro-interactions), keep our own identity.
- Every new visible string goes into both `en` and `vi` JSON. Every new MDX file needs both locale variants (fallback to `en` if missing).
- Every new route registers under `/:lang/...` in `src/routes.tsx`.
