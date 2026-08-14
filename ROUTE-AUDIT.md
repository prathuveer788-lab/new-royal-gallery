# THE ROYAL GALLERYS — Route Audit

## 1. Route map

### Static pages (`app/**/page.tsx`)
`/` (homepage), `/style`, `/jewellery`, `/watches`, `/weddings`, `/travel`,
`/royalty`, `/design`, `/culture`, `/society`, `/motoring`, `/dining`,
`/business`, `/futures`, `/archive`, `/gallery`, `/heritage`, `/heritage-ai`
(→ redirected to `/futures`), `/ecosystem`, `/global-vision`, `/impact`,
`/membership`, `/journal`, `/advertise`, `/people`.

### Dynamic editorial routes (SSG, `generateStaticParams`)
- `/travel/[slug]` — 56+ articles
- `/style/[slug]`, `/jewellery/[slug]`, `/watches/[slug]`, `/weddings/[slug]`,
  `/royalty/[slug]`, `/design/[slug]`, `/business/[slug]`, `/culture/[slug]`

### Programmatic routes
- `/robots.txt`, `/sitemap.xml` (both generated)

### Redirects (`next.config.ts`)
- `/heritage` → `/culture`
- `/heritage-ai` → `/futures`
- `/gallery` → `/archive`

## 2. SEO metadata coverage

- **Global:** `app/layout.tsx` sets title, description, OG, Twitter, robots,
  canonical, and (now) `icons`. `metadataBase` = `https://theroyalgallerys.com`.
- **Sections:** every entry in `lib/editorial/sections.ts` carries `seoTitle`,
  `seoDescription`, `ogTitle`, `ogDescription`.
- **Articles:** `lib/travel-articles.ts`, `lib/design-articles.ts`,
  `lib/royalty-articles.ts`, `lib/style-articles.ts`, etc. each carry per-article
  SEO/OG fields.

## 3. Stub pages (🔶 need content)

`society`, `dining`, `motoring`, `people` are linked from the homepage and footer
but render placeholder "coming soon" shells. `journal` and `advertise` are thin.

## 4. Navigation / discovery

- `Navigation` exposes the section registry.
- Footer (`app/layout.tsx`) lists all sections + Institute + Connect.
- Homepage carries an "The Edit" strip and section cards.
- No on-site search index — discovery relies on section feeds and cross-links.

## 5. Notes

- `app/sitemap.ts` imports `allArticles`, `allStyleArticles`,
  `getAllEditorialArticles` — consistent with the routes actually generated.
- `app/robots.ts` points at `https://theroyalgallerys.com/sitemap.xml`.
