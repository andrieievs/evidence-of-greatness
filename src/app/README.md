# `src/app/` — routing layer (Next.js)

Only **routes, layouts, and route metadata** live here. UI and domain logic live under `src/features/` and `src/components/`.

| Path | URL |
|------|-----|
| `layout.tsx` | Root `<html>` / `<body>`, fonts, global `metadata` |
| `page.tsx` | `/` |
| `dashboard/layout.tsx` + `page.tsx` | `/dashboard` (nested layout) |
| `collect/page.tsx` | `/collect` (proud moments tool) |
| `collect/presentation/page.tsx` | `/collect/presentation` |
