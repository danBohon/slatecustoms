# Prebuilt PC Business Site

## What this is
A marketing and catalog site for my prebuilt gaming PC business based in
the Waukegan, IL area. Customers see the builds I have available now,
browse previously sold builds as a portfolio, learn who I am, and contact
me to buy a current build or commission a custom one.

The site is intentionally small and ships fast. It will grow as the
business grows.

## Who it's for
Local gaming PC buyers in Lake County, the North Chicago suburbs, and
surrounding areas. Primary focus is budget-to-mid-tier gamers in the
$500–$1500 range. Enthusiast-tier buyers ($2000+) are welcome but only
through commissioned builds, not pre-stocked inventory.

## Pages

### 1. Home (single long scrolling page, does most of the work)
Section order top to bottom:

- **Hero**: Name/brand, one-line value proposition, location callout
  (Waukegan, IL — serving Lake County and the North Chicago suburbs),
  a brief mention that custom enthusiast-tier builds are available on
  commission, and a primary CTA to the contact form.
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
- **Custom Commissions** (section, not a page): Short pitch for custom
  enthusiast-tier builds with a CTA scrolling to the contact form. No
  detailed process page yet — that gets added if commissions become a
  meaningful share of the business.
- **Why buy from me**: Short, personal section. What makes these builds
  different, my approach, my standards.
- **Contact form**: Embedded at the bottom of the page. Same form
  component as the About page.

### 2. About
Short, focused page that gives the site a second indexable URL with
strong local-business signal:

- Who I am, my background, why I do this
- Service area: Waukegan, Gurnee, Libertyville, Lake Forest, North
  Chicago, Lake County broadly
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
- Separate Custom Commissions page (the home page section is enough)
- Filtering or sorting on builds (not needed under ~8 items)
- Dark/light mode toggle (dark only for v1)
- Shopping cart, checkout, payment processing
- Customer accounts, reviews system, build configurator
- CMS — content stays in MDX in the repo
- Analytics, cookie banners, tracking pixels

## Tech
- **Next.js 16.x** (latest stable) with App Router
- React Server Components by default; client components only where needed
  (contact form, expand/collapse on build cards, image gallery if any)
- Tailwind CSS for styling
- Build data as MDX files under `/content/current-builds/` and
  `/content/previous-builds/` with frontmatter for all metadata
- Image optimization via `next/image`
- Deployed to Vercel
- No database — MDX in the repo is the source of truth

### Important: verify current Next.js docs before generating code
Next.js iterates fast. Major and minor versions ship roughly every
few months and the App Router, caching model, and metadata APIs have
changed meaningfully across recent versions. Before scaffolding the
project or adding any non-trivial Next.js feature (caching, metadata,
server actions, image handling, sitemaps, etc.), check the current
official documentation at https://nextjs.org/docs and use the patterns
shown there. Do not rely on training-data memory for Next.js APIs —
prefer current docs every time.

When scaffolding, use `create-next-app` (Next.js 16 ships an
agent-ready version that produces an `AGENTS.md` and forwards browser
logs to the terminal for easier AI-assisted debugging — both useful here).

## Design and UI
- Modern, sleek aesthetic — polished tech-product feel, not a generic
  small-business template
- Dark mode only at launch — fits the gaming-PC aesthetic and is one
  less thing to design and test
- Strong typography hierarchy; generous whitespace; no clutter
- Subtle motion on hover and scroll, never gratuitous
- Mobile-first responsive design — most local buyers will browse on phones
- Build cards should feel like product cards on a premium ecommerce site
- High-quality build photos are the visual centerpiece — design around them
- Accent color and any brand decisions: ask me before committing

## SEO (primary focus on every page)
This site competes for local search traffic. SEO is not an afterthought —
every page must be built with it in mind. With only two pages, both need
to be excellent.

**Per-page requirements:**
- Unique, keyword-aware `<title>` (e.g., "Prebuilt Gaming PCs in
  Waukegan, IL — Budget to Mid-Tier Builds")
- Unique meta description, 140–160 characters, written for click-through
- Open Graph and Twitter card metadata for social sharing previews
- Canonical URL set correctly
- Semantic HTML — proper heading hierarchy (one H1 per page, logical
  H2/H3 for sections, especially important on the long home page)
- Descriptive alt text on every image, written naturally, not stuffed
- Internal linking between Home and About where natural

**Site-wide requirements:**
- `sitemap.xml` auto-generated at build time
- `robots.txt` configured properly
- Structured data (JSON-LD):
  - `Product` schema for every current build on the home page
  - `LocalBusiness` schema on home and about pages (name, address, geo
    coordinates, phone, hours, service area)
- Lighthouse performance score target: 95+ on every page
- Core Web Vitals: all green (LCP, INP, CLS)
- Local keywords integrated naturally: Waukegan, Lake County, North
  Chicago suburbs, Gurnee, Libertyville, Lake Forest

Note: implement metadata using the current Next.js Metadata API patterns
shown in the official docs at the time of building.

## Conventions
- Keep components small, single-purpose, and readable
- Server components by default; only mark "use client" when actually
  needed (contact form, expand/collapse, anything stateful)
- Tailwind utility classes inline; extract to a component when a pattern
  repeats more than twice
- File naming: kebab-case for files, PascalCase for component exports
- Build MDX files use frontmatter for all metadata (price, specs, tier,
  use case, photos, status, sold date for previous builds)
- One reusable contact form component used in both home and about pages
- Commit after every working feature with a descriptive message
- Update this CLAUDE.md when project conventions change or expand
- TypeScript throughout — all files use .ts or .tsx, no plain .js
- Type component props explicitly; avoid `any`
- Define a type or interface for every MDX frontmatter schema
  (e.g., CurrentBuild, PreviousBuild) in a central /types folder

## Do not
- Add analytics, cookie banners, or third-party tracking without asking
- Add a shopping cart or payment processing — contact-to-buy for now
- Create separate detail pages for builds — use inline expand/modal
- Suggest a CMS platform — MDX in the repo is the chosen approach
- Add unnecessary client components that hurt performance and SEO
- Use any external JS library, UI kit, or component library without
  approval first
- Auto-generate marketing copy or build descriptions — I'll write the
  voice; AI can suggest but I approve the final wording
- Use stock photos in place of real build photos in production
- Pre-build pages for features or services that don't exist yet
- Generate Next.js code from memory without verifying it against the
  current docs — this is the most common source of bugs

## Voice and content style
- Conversational, honest, no marketing fluff
- Be upfront about tradeoffs in builds (e.g., "great 1080p performance
  but you'll want to upgrade the GPU if you move to 1440p")
- Avoid superlatives like "the best" or "unbeatable" — let specs and
  photos do the talking
- Local and personal — this is a local builder, not a faceless retailer
