# Natural Heroes — NeuroScript Hiring Test

A pixel-accurate product detail page for a fictional essential-oils brand, built
from the provided Figma design and powered by a headless CMS so every word,
image and number on the page can be edited without a redeploy.

See [`docs/Hiring Test - NeuroScript.pdf`](docs/Hiring%20Test%20-%20NeuroScript.pdf) for the brief.

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) | React Server Components + tag-based revalidation |
| Language | **TypeScript** | Surfaces schema mismatches at build time |
| Styling | **Tailwind v4** (`@theme` tokens) | Figma tokens map 1:1 to CSS variables |
| CMS | **Sanity** (embedded Studio) | Edits live at `/studio`; one URL, one deploy |
| Hosting | **Vercel** | Webhook → `revalidateTag()` → live in < 1s |

The "editable without redeploy" requirement is satisfied end-to-end:

```
Editor publishes in /studio
        │
        ▼
Sanity webhook → POST /api/revalidate (signed)
        │
        ▼
revalidateTag("product")  ← Next.js cache busts
        │
        ▼
Next request returns fresh HTML (no rebuild, no redeploy)
```

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                 # PDP home route — composes all sections
│   ├── layout.tsx               # Root shell, fonts, metadata
│   ├── globals.css              # Tailwind v4 @theme tokens
│   ├── api/revalidate/route.ts  # Signed Sanity → Next webhook
│   └── studio/[[...tool]]/      # Embedded Sanity Studio at /studio
├── components/
│   ├── layout/                  # SiteHeader, SiteFooter, Breadcrumbs
│   ├── sections/                # ProductHero, WhySection, Composition,
│   │                            #   Usage, Process, Botanical, Faq
│   └── ui/                      # Container, Button, Badge, icons, etc.
├── sanity/
│   ├── env.ts                   # Env var reader
│   ├── schemas/                 # product, siteSettings
│   └── lib/                     # client, fetch, image, queries
└── lib/
    ├── types.ts                 # Shared TS types
    ├── utils.ts                 # cn(), formatPrice()
    └── preview-data.ts          # Local fallback before Sanity is wired up
```

Each PDP section is a self-contained component that takes a typed slice of the
product document. Adding a new Figma section means adding one schema field, one
component, and one line in `page.tsx`.

### Design tokens

All colors, fonts and spacing come from Figma Dev Mode. They live in one place
— `src/app/globals.css` `@theme` block — and every component reads them via
Tailwind utilities (`bg-cream`, `text-forest`, `font-serif`, etc.). To rebrand
or re-skin, edit the tokens, not the components.

### Responsive design

Mobile spec (390 width frame) and desktop spec (1440 width frame) ship together.
The breakpoint is Tailwind's `lg` (1024px). Mobile uses single-column stacks
and smaller type; desktop uses multi-column grids. Interactive sections —
the usage carousel, process timeline, image gallery — adapt their interactions
to the input modality (touch swipes on mobile, hover on desktop).

---

## Local development

```bash
cp .env.local.example .env.local
# fill in NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_REVALIDATE_SECRET

npm install
npm run dev
```

Open <http://localhost:3000>. Open <http://localhost:3000/studio> to edit
content. If you haven't connected a Sanity project yet, the home page falls
back to preview data so the design pass can proceed without the CMS.

---

## How content updates reach production

1. Editor opens `/studio`, edits a field (e.g. raises a composition percentage
   from 55% to 60%), and hits **Publish**.
2. Sanity fires the configured webhook at `/api/revalidate`. The route verifies
   the HMAC signature using `SANITY_REVALIDATE_SECRET`.
3. The route calls `revalidateTag()` for either `product` or `settings`,
   matching the document type that changed.
4. Next.js serves fresh HTML on the next request. No rebuild. No redeploy.

Webhook is configured at **Sanity Manage → API → Webhooks**:

- **URL**: `https://<your-vercel-url>/api/revalidate`
- **Dataset**: `production`
- **Trigger on**: Create, Update, Delete
- **HTTP method**: POST
- **Secret**: same value as `SANITY_REVALIDATE_SECRET` in Vercel env

---

## Submission deliverables

- Live URL: *added after deploy*
- GitHub: *this repo*
- Loom: *added after recording*
- Short notes: see "How content updates reach production" above
