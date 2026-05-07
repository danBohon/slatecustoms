# SLATE. — Prebuilt PC Business Site

## What this is
A marketing and catalog site for my prebuilt gaming PC business based in
the Waukegan, IL area. Customers see the builds I have available now,
browse previously sold builds as a portfolio, learn who I am, and contact
me to buy a current build or commission a custom one.

The site is intentionally small and ships fast. It will grow as the
business grows.

## Who it's for
Local gaming PC buyers in Lake County and surrounding areas. Primary
focus is budget-to-mid-tier gamers in the $500–$1500 range. Local pickup
available in Lake County, IL — shipping available for buyers outside the
area. Enthusiast-tier buyers ($2000+) are welcome but only through
commissioned builds, not pre-stocked inventory.

## Pages

### 1. Home (single long scrolling page, does most of the work)
Section order top to bottom:

- **Hero**: SLATE. wordmark, one-line value proposition, location and
  shipping callout, single CTA to the contact form. Keep it minimal —
  three lines of copy and one button maximum.
- **Current Builds**: 2–4 builds available right now. Each build is
  rendered as a self-contained card with photo, headline, price, key
  specs, target use case, and a per-build contact CTA. Full specs and
  additional photos open inline via expand/collapse or a modal — no
  separate detail page. Pre-fill the contact form's subject when the
  CTA is triggered from a specific build (e.g., "Interested in: $800
  Ryzen Build").
- **Previous Builds**: A tighter gallery of completed and sold builds.
  Each entry shows a photo, the price sold at, and a one-line caption.
  A "see specs" expand reveals the full spec list and a short note about
  the customer use case. Acts as portfolio and trust signal.
- **Contact form**: Embedded at the bottom of the page. Same component
  as the About page. Intro copy covers both current builds and custom
  commissions: "Interested in a current build or want to talk about a
  custom commission? Fill out the form and I'll get back to you within
  24 hours." Accepts an optional pre-filled subject from build card CTAs.

### 2. About
Short, focused page that gives the site a second indexable URL with
strong local-business signal:

- Who I am, my background, why I do this
- **Why buy from me**: What makes these builds different, my approach,
  my standards
- Service area: Waukegan, Gurnee, Libertyville, Lake Forest, North
  Chicago, Lake County broadly — plus shipping available nationwide
- Phone, email, response time expectation
- The same contact form component embedded here
- Hours / availability if relevant
- This is also where the `LocalBusiness` JSON-LD schema lives

## Things deliberately NOT in v1
These get added if and when there's a real reason to. Do not pre-build
them.

- Separate per-build detail pages (cards with expand/modal cover this)
- Separate Builds catalog page (the home page section is enough until
  there are 6+ current builds)
- Custom Commissions section — deferred to v2 when there is real content
  to put there (pricing tiers, turnaround time, past examples, process
  details). For now, one line in the contact form intro handles it.
- Filtering or sorting on builds (not needed under ~8 items)
- Shopping cart, checkout, payment processing
- Customer accounts, reviews system, build configurator
- CMS — content stays in MDX in the repo
- Analytics, cookie banners, tracking pixels

## Tech
- **Next.js 16.x** (latest stable) with App Router
- TypeScript throughout — all files use .ts or .tsx, no plain .js
- React Server Components by default; client components only where needed
  (contact form, expand/collapse on build cards, theme toggle, image
  gallery if any)
- Tailwind CSS v4 for styling
- Build data as MDX files under `/content/current-builds/` and
  `/content/previous-builds/` with frontmatter for all metadata
- Image optimization via `next/image`
- Deployed to Vercel
- No database — MDX in the repo is the source of truth

### Important: verify current Next.js docs before generating code
Next.js iterates fast. Before scaffolding or implementing any non-trivial
Next.js feature (caching, metadata, server actions, image handling,
sitemaps, etc.), check the current official documentation at
https://nextjs.org/docs and use the patterns shown there. Do not rely on
training-data memory for Next.js APIs — prefer current docs every time.
Do not generate Next.js code from memory without verifying against
current docs — this is the most common source of bugs.

## Brand

### Name and logo
- Brand name: **SLATE.** — displayed in Geist Sans 800 weight, all caps
  with a period, white (`#ffffff`) in dark mode, near-black (`#0a0a0a`)
  in light mode
- Descriptor: "custom pcs" in a lighter weight below the wordmark where
  space allows — not part of the name, just a descriptor
- Logomark: the letter **S** in Geist Sans 800, inside a tight square
  with a 1px solid `#a855f7` border. Used as favicon and anywhere a
  compact mark is needed.
- Note: SLATE. is the current working name — do not over-engineer logo
  components around it. Keep everything easy to swap later.

### Aesthetic
Neo-brutalist minimalism with a dark tech / esports feel. The reference
points are the CS2 Printstream skin and the Logitech G Pro X Superlight
design language — stark, high-contrast, geometric, almost clinical.
Color is used as punctuation, not decoration. Every element should feel
intentional and serious. No gradients, no shadows, no rounded corners
unless specifically called for.

### Color palette
All colors defined as CSS variables in `globals.css` and registered in
the Tailwind v4 theme. Never hardcode hex values in components — always
use the variable names.

Dark mode (default):

| Variable                  | Hex       | Usage                                          |
|---------------------------|-----------|------------------------------------------------|
| `--color-bg`              | `#0a0a0a` | Page background                                |
| `--color-surface`         | `#111111` | Cards, modals, elevated surfaces               |
| `--color-surface-2`       | `#1a1a1a` | Nested surfaces, subtle layering               |
| `--color-text-primary`    | `#ffffff` | Headlines, primary body text                   |
| `--color-text-secondary`  | `#a1a1aa` | Subtext, captions, metadata                    |
| `--color-border`          | `#27272a` | Dividers, card borders, input borders          |
| `--color-accent`          | `#a855f7` | Accent — use sparingly (see rules below)       |
| `--color-accent-hover`    | `#c084fc` | Accent hover and glow states                   |

Light mode (overrides only — accent colors stay the same):

| Variable                  | Hex       | Usage                                          |
|---------------------------|-----------|------------------------------------------------|
| `--color-bg`              | `#ffffff` | Page background                                |
| `--color-surface`         | `#f4f4f5` | Cards, modals, elevated surfaces               |
| `--color-surface-2`       | `#e4e4e7` | Nested surfaces, subtle layering               |
| `--color-text-primary`    | `#0a0a0a` | Headlines, primary body text                   |
| `--color-text-secondary`  | `#52525b` | Subtext, captions, metadata                    |
| `--color-border`          | `#d4d4d8` | Dividers, card borders, input borders          |

### Theme implementation
- **Default**: system preference via `prefers-color-scheme` media query
- **Override**: manual toggle button in the nav; user's choice persisted
  to `localStorage` under the key `slate-theme`
- **Implementation pattern**:
  - On page load, a small inline script in `<head>` reads `localStorage`
    before React hydrates to avoid flash of wrong theme (FOFT). If no
    stored value, fall back to `prefers-color-scheme`.
  - Set `data-theme="dark"` or `data-theme="light"` on the `<html>`
    element.
  - CSS variables are scoped to `[data-theme="dark"]` and
    `[data-theme="light"]` in `globals.css` — not to a `.dark` class.
  - The `<ThemeToggle />` component is a client component. It reads the
    current theme from the `<html>` attribute, toggles it, and writes
    the new value to `localStorage`.
  - Do not use any third-party theme library — implement this natively.

### Accent color rules — strictly enforced
The purple accent (`#a855f7`) stays the same in both light and dark mode
— it has enough contrast on both backgrounds. Permitted uses only:

- The "S" logomark border
- Price display on build cards
- CTA button border and hover state (outlined, not filled)
- One thin horizontal rule or line element per major page section,
  used sparingly
- Active/focus ring on form inputs

Do NOT use the accent color for: backgrounds, large fills, text blocks,
decorative patterns, or any element not listed above. If in doubt, use
`--color-text-primary` or `--color-border`.

### Typography
- **Geist Sans** for all UI text — headings, body, labels, navigation
  - Headings: weight 700–800
  - Body: weight 400
  - UI labels / metadata: weight 500
- **Geist Mono** for all technical spec data — CPU, GPU, RAM, storage,
  motherboard specs. Mono for specs feels precise and technical.
- No italics — Geist does not have an italic variant. Use weight contrast
  for emphasis instead.
- Both fonts are already the default in `create-next-app` 16.x and are
  loaded via `next/font/google` with zero external requests.

## SEO (primary focus on every page)
This site competes for local search traffic. SEO is not an afterthought —
every page must be built with it in mind. With only two pages, both need
to be excellent.

**Per-page requirements:**
- Unique, keyword-aware `<title>` (e.g., "Prebuilt Gaming PCs in
  Lake County, IL — Budget to Mid-Tier Builds | SLATE.")
- Unique meta description, 140–160 characters, written for click-through
- Open Graph and Twitter card metadata for social sharing previews
- Canonical URL set correctly
- Semantic HTML — proper heading hierarchy (one H1 per page, logical
  H2/H3 for sections)
- Descriptive alt text on every image, written naturally, not stuffed
- Internal linking between Home and About where natural

**Site-wide requirements:**
- `sitemap.ts` auto-generated at build time, reading MDX content dirs
- `robots.ts` configured to allow all, pointing to sitemap
- `NEXT_PUBLIC_SITE_URL` env var used for all absolute URLs
- Structured data (JSON-LD):
  - `Product` schema for every current build on the home page
  - `LocalBusiness` schema on home and about pages (name, address,
    geo coordinates, phone, hours, service area: Lake County, IL)
- Lighthouse performance score target: 95+ on every page
- Core Web Vitals: all green (LCP, INP, CLS)
- Local keywords integrated naturally: Waukegan, Lake County, North
  Chicago suburbs, Gurnee, Libertyville, Lake Forest

Implement metadata using the current Next.js Metadata API — check docs
before implementing.

## Conventions
- TypeScript throughout — all files .ts or .tsx, no plain .js
- Type component props explicitly; avoid `any`
- Define a type or interface for every MDX frontmatter schema
  (`CurrentBuild`, `PreviousBuild`, etc.) in `/types/builds.ts`
- Server components by default; only mark `"use client"` when actually
  needed (contact form, expand/collapse, theme toggle, anything stateful)
- Tailwind utility classes inline; extract to a component when a pattern
  repeats more than twice
- Never hardcode hex color values — always use CSS variable names
- Geist Mono for all spec data rendering, Geist Sans for everything else
- File naming: kebab-case for files, PascalCase for component exports
- Build MDX files use frontmatter for all metadata (price, specs, tier,
  use case, photos, status, sold date for previous builds)
- One reusable `<ContactForm />` client component used on both pages;
  accepts an optional `subject` prop for pre-filling from build CTAs
- Commit after every working feature with a descriptive message
- Update this CLAUDE.md when project conventions change or expand

## Do not
- Use the accent color outside of the permitted uses listed above
- Add gradients, drop shadows, or heavy border-radius without approval
- Add analytics, cookie banners, or third-party tracking without asking
- Add a shopping cart or payment processing — contact-to-buy for now
- Create separate detail pages for builds — use inline expand/modal
- Suggest a CMS platform — MDX in the repo is the chosen approach
- Add unnecessary client components that hurt performance and SEO
- Use any third-party theme library — implement theme natively
- Use any external JS library, UI kit, or component library without
  approval first
- Auto-generate marketing copy or build descriptions — I'll write the
  voice; AI can suggest but I approve the final wording
- Use stock photos in place of real build photos in production
- Pre-build pages or features that don't exist yet
- Hardcode hex color values in components
- Generate Next.js code from memory without checking current docs

## Voice and content style
- Conversational, honest, no marketing fluff
- Be upfront about tradeoffs in builds (e.g., "great 1080p performance
  but you'll want to upgrade the GPU if you move to 1440p")
- Avoid superlatives like "the best" or "unbeatable" — let specs and
  photos do the talking
- Local and personal — this is a local builder, not a faceless retailer
