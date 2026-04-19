# `src/page/` — all screen-level pages

Next.js reserves **`src/pages/`** (plural) for the legacy [Pages Router](https://nextjs.org/docs/pages). Putting `.tsx` modules there would make Next treat them as real routes and break the build when they only export named components.

This folder is named **`page`** (singular) so you still have a single place for “all pages” (landing, collect shell, route helpers) **without** colliding with the framework.

| File | Role |
|------|------|
| `landing-page.tsx` | Marketing landing |
| `collect-page.tsx` | Collect flow shell |
| `home-route.tsx` | `/` metadata + default export wired from `src/app/page.tsx` |

URLs are defined only under **`src/app/`**.
