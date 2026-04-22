# Robert Editing

The portfolio & showcase site for Robert — a document editor working in 47 countries. Before/after transformations, a filterable archive, and a quiet white-and-blue studio aesthetic.

> **Before I touch it, it's a draft. After I touch it, it's the version people remember.**

## Stack

- **Next.js 14** (App Router) · **TypeScript** · **Tailwind CSS**
- **Framer Motion** for micro-interactions
- **Fraunces** (display), **Inter** (UI), **JetBrains Mono** (code/diffs)
- 12 seeded fictional case studies across 10+ document types and 12 countries

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (Next config) |
| `pnpm typecheck` | `tsc --noEmit` |

## Structure

```
src/
├── app/                 # Routes (App Router)
│   ├── page.tsx         # Landing
│   ├── work/page.tsx    # Filterable archive
│   ├── work/[slug]/     # Case detail
│   ├── about/
│   ├── services/
│   └── contact/
├── components/
│   ├── brand/           # Logo
│   ├── layout/          # Header, Footer
│   ├── slider/          # BeforeAfter interactive slider
│   ├── panel/           # FilterConsole side panel
│   ├── card/            # DocumentCard
│   └── diff/            # AnimatedDiff (word-level)
└── lib/
    ├── cases.ts         # Seed case studies (add more here)
    ├── types.ts         # Domain types + taxonomies
    └── utils.ts         # cn(), flag helper, formatters
```

## Add a new case

Append a new object to `src/lib/cases.ts`:

```ts
{
  slug: "city-doc-thing",
  title: "...",
  client: "...",
  country: "NL",
  countryName: "Netherlands",
  language: "en",
  languageName: "English",
  documentType: "business-report",
  industry: "finance",
  editingLevel: "copy-edit",
  wordCountBefore: 10_000,
  wordCountAfter: 6_400,
  readabilityBefore: 38,
  readabilityAfter: 64,
  turnaroundHours: 72,
  date: "2025-06-01",
  excerptBefore: "...",
  excerptAfter: "...",
  editorsNote: "...",
  tags: ["..."],
  rating: 5,
}
```

That's it — the landing, archive, and filter console pick it up automatically.

## Design tokens

| Token | Hex | Usage |
|---|---|---|
| `canvas` | `#FFFFFF` | Page bg |
| `snow` | `#F6F9FC` | Section alternates |
| `ink` | `#0A1F44` | Primary text |
| `robert` | `#1E6BFF` | CTA, links, accents |
| `robert-soft` | `#DCE8FF` | Hover halos |
| `edit` | `#E03131` | "Before" strikethroughs only |

Respecting `prefers-reduced-motion` is baked into `globals.css`.
