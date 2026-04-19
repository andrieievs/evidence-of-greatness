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

Open [http://localhost:3000](http://localhost:3000).

| Path | Description |
|------|-------------|
| **`/`** | Landing page |
| **`/collect`** | Proud moments form + presentation |
| **`/dashboard`** | Dashboard shell (placeholder overview) |
| **`/auth/login`**, **`/auth/signup`** | Auth placeholders |

### Other scripts

| Command       | Description                     |
| ------------- | ------------------------------- |
| `yarn dev`    | Development server (hot reload) |
| `yarn build`  | Production build                |
| `yarn start`  | Serve the production build (run `yarn build` first) |

## Project structure (`src/`)

SPA-style organization: **routing** in `app/`, **shared UI** in `components/`, **domain** in `features/`, **helpers** in `lib/`, `utils/`, `types/`.

```
src/
├── app/                         # ROUTING LAYER (Next.js)
│   ├── layout.tsx               # Global <html> / <body>, fonts, metadata
│   ├── page.tsx                 # /
│   ├── auth/
│   │   ├── login/page.tsx       # /auth/login
│   │   └── signup/page.tsx      # /auth/signup
│   ├── dashboard/
│   │   ├── layout.tsx           # Dashboard sidebar
│   │   └── page.tsx             # /dashboard
│   └── collect/page.tsx         # /collect
├── components/ui/               # Shared primitives (shadcn-style)
├── config/                      # Site constants (`site.ts`)
├── features/
│   ├── auth/                    # components/, hooks/, services/
│   ├── dashboard/               # components/, types/
│   ├── landing/                 # Marketing landing
│   └── proud-moments/           # Collect + present flow
├── hooks/                       # Global shared hooks
├── lib/                         # Shared clients (e.g. `http.ts`)
├── types/                       # Global TypeScript types
├── utils/                       # Pure helpers (`cn.ts`)
└── styles/                      # Tailwind + `globals.css`
```

See [`src/app/README.md`](src/app/README.md) for how route groups map to URLs.

Imports use **`@/*` → `./src/*`** ([`tsconfig.json`](tsconfig.json)).

## For other developers

### Stack

- **Next.js 15** (App Router), **React 19**
- **Tailwind CSS v4** ([`src/styles/globals.css`](src/styles/globals.css))
- **shadcn-style UI** in [`src/components/ui/`](src/components/ui)
- **React Hook Form** + **Zod** — [`src/features/proud-moments/types/schema.ts`](src/features/proud-moments/types/schema.ts)

### Yarn / lockfile

- **[`yarn.lock`](yarn.lock)** (Yarn Berry), [`.yarnrc.yml`](.yarnrc.yml) with `nodeLinker: node-modules`
- Commit [`.yarn/releases/yarn-4.14.1.cjs`](.yarn/releases/yarn-4.14.1.cjs); [`package.json`](package.json) `dependenciesMeta.sharp.built: true`

### Environment variables

None required locally. Use `NEXT_PUBLIC_*` in [`src/config/site.ts`](src/config/site.ts) or `src/lib/http.ts` when you add APIs.
