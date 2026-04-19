# Evidence of Greatness

A small Next.js app for collecting **proud moments** (wins, dates, optional photos) and viewing them in a simple presentation mode—plus a marketing-style landing page.

## Requirements

- **Node.js 18.12+** (20+ recommended for Next.js 15)
- **Yarn** is optional at the global level: this repo vendors **Yarn 4** under [`.yarn/releases/`](.yarn/releases) and wires it via [`.yarnrc`](.yarnrc) (`yarn-path`). If you have Yarn 1 globally, it will forward to Yarn 4 when you run commands inside this directory.

## Run the app

From the repository root:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

- **`/`** — Landing page  
- **`/collect`** — Dynamic form + presentation flow (“memory collection”)

### Other scripts

| Command       | Description                     |
| ------------- | ------------------------------- |
| `yarn dev`    | Development server (hot reload) |
| `yarn build`  | Production build                |
| `yarn start`  | Serve the production build (run `yarn build` first) |

## Project structure (`src/`)

This app uses the **Next.js App Router** (`src/app/` — see [`src/app/README.md`](src/app/README.md)). Screen-level UI lives in **`src/page/`** (see [`src/page/README.md`](src/page/README.md)). A stub [`src/pages/README.md`](src/pages/README.md) explains why that folder is not used for `.tsx` modules.

```
src/
├── app/
│   ├── App.tsx             # Root layout + metadata + providers (wired from `layout.tsx`)
│   ├── layout.tsx          # Next-required; imports CSS + `App.tsx`
│   ├── page.tsx            # `/` route
│   └── collect/page.tsx    # `/collect` route
├── assets/                 # Global images, fonts, SVGs (placeholders via .gitkeep)
├── components/ui/          # Shared UI primitives (Button, Card, Form, …)
├── config/                 # Site config & env-friendly constants (`site.ts`)
├── features/
│   ├── auth/               # Auth placeholder (api/, components/, hooks/, types/)
│   ├── dashboard/          # Dashboard placeholder
│   └── proud-moments/      # Collect + present flow (components, types, index)
├── hooks/                  # Shared hooks (empty until you add some)
├── layouts/                # Optional layout helpers (e.g. `main-layout.tsx`)
├── page/                   # All screen modules (landing, collect, home route)
├── pages/                  # README only — Next reserves `pages/` for legacy routing
├── services/               # Third-party SDK setup (empty for now)
├── store/                  # Global client state (empty for now)
├── utils/                  # Helpers (`cn.ts`, …)
└── styles/                 # Global CSS (`globals.css` + Tailwind `@source`)
```

### Path alias

Imports use **`@/*` → `./src/*`** (see [`tsconfig.json`](tsconfig.json)).

## For other developers

### Stack

- **Next.js 15** (App Router), **React 19**
- **Tailwind CSS v4** ([`src/styles/globals.css`](src/styles/globals.css))
- **shadcn-style UI** in [`src/components/ui/`](src/components/ui) (Radix primitives, `class-variance-authority`, Lucide)
- **React Hook Form** + **Zod** — schema under [`src/features/proud-moments/types/schema.ts`](src/features/proud-moments/types/schema.ts), public exports from [`src/features/proud-moments/index.ts`](src/features/proud-moments/index.ts)

### Yarn / lockfile

- Lockfile is **[`yarn.lock`](yarn.lock)** (Yarn Berry format).
- [`.yarnrc.yml`](.yarnrc.yml) sets `nodeLinker: node-modules` so we use a normal **`node_modules`** tree (not Plug’n’Play).
- **Commit** [`.yarn/releases/yarn-4.14.1.cjs`](.yarn/releases/yarn-4.14.1.cjs); do **not** ignore it. Local-only Yarn folders are listed in [`.gitignore`](.gitignore).
- [`package.json`](package.json) includes `dependenciesMeta.sharp.built: true` so **Sharp**’s install script runs under Yarn 4 (Next image optimization).

### Environment variables

None are required for local development right now. Add `NEXT_PUBLIC_*` keys in [`src/config/site.ts`](src/config/site.ts) (or a dedicated env module) when you wire APIs.

### Corepack (optional)

If you prefer **Corepack** instead of the vendored Yarn binary, enable it when your Node install allows writes to the global `bin` directory (or use a user-local Node via nvm/fnm/Volta). This repo works without Corepack as long as you run `yarn` from the project root so `.yarnrc` is respected.
