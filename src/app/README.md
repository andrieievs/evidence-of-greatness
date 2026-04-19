# `src/app/` — routing layer (Next.js)

Only **routes, layouts, and route metadata** live here. UI and domain logic live under `src/features/` and `src/components/`.

| Path | URL |
|------|-----|
| `layout.tsx` | Root `<html>` / `<body>`, fonts, global `metadata` |
| `page.tsx` | `/` |
| `auth/login/page.tsx` | `/auth/login` |
| `auth/signup/page.tsx` | `/auth/signup` |
| `dashboard/layout.tsx` + `page.tsx` | `/dashboard` (nested layout) |
| `collect/page.tsx` | `/collect` (proud moments tool) |

The **`auth`** segment is a normal URL prefix (not a route group), so login and signup live under **`/auth/...`**.
