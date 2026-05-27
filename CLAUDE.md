# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build (output to `dist/`)
- `npm run preview` — preview the built bundle
- `npm run lint` — ESLint over the repo

There is no test runner configured.

## Required environment

`src/lib/supabase.ts` throws at import time if these are missing, so the dev server will not boot without them:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Set them in a `.env` (Vite convention) at the repo root.

## Architecture

Single-page portfolio site — React 18 + Vite + TypeScript + Tailwind, with Supabase as the only backend.

- `src/App.tsx` composes the page as a fixed vertical stack of section components (`Hero`, `About`, `Experience`, `Skills`, `Projects`, `Contact`, `Footer`) inside a `ThemeProvider`. There is no router; navigation in `Header` is anchor-scroll within the single page.
- `src/context/ThemeContext.tsx` is the light/dark toggle; Tailwind's `dark:` variants throughout the components depend on it.
- `src/lib/supabase.ts` exports a single typed `supabase` client (`createClient<Database>`). The `Database` type lives in `src/types/database.ts` and must stay in sync with the SQL schema.
- The contact form (`src/components/Contact.tsx`) writes directly to the `contacts` table via the anon key. RLS is what makes this safe — see `supabase/migrations/20250805115505_scarlet_water.sql`: anon can `INSERT` only, authenticated can `SELECT`/`UPDATE`. Any new client-side Supabase access must respect this policy shape.
- `supabase/migrations/functions/submit-contact/index.ts` is an Edge Function variant of the same submit path (not wired into the UI today). If you switch the contact form to use it, drop the direct insert in `Contact.tsx`.
- Static copy/data (project list, skills, experience entries) lives in `src/utils/const.ts` — edit content there, not in the section components.

## Conventions

- Icons come from `lucide-react`.
- Styling is Tailwind utility classes only; no CSS modules or styled-components. The global stylesheet is `src/index.css` (Tailwind directives + minimal base).
- Path imports are relative; no path aliases are configured in `tsconfig` or `vite.config.ts`.
