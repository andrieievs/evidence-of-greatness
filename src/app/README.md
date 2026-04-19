# `src/app/` — Next.js App Router

Next.js **only** recognizes certain filenames here (`layout.tsx`, `page.tsx`, …). You cannot replace `layout.tsx` with `App.tsx` as the framework entry; see [Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts).

- **`App.tsx`** — Root `<html>` / `<body>`, fonts, **`metadata`**, and `AppProviders` (add global providers here).
- **`layout.tsx`** — Imports global CSS, then wires the default export + `metadata` from `./App` (required wrapper Next looks for).
- **`page.tsx`**, **`collect/page.tsx`** — Route segments for `/` and `/collect` (each needs its own `page.tsx`).

Everything else lives under `src/page/`, `src/features/`, `src/layouts/` (non-root), etc.
