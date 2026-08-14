# THE ROYAL GALLERYS — Final Changelog

## Session scope
Full audit + high-impact fixes toward the "world-class international luxury
editorial magazine" brief. See [AUDIT.md](AUDIT.md) for the complete findings.

## Changes

### Homepage — correct & de-duplicated imagery
- **Travel lead feature** now reads `featuredTravel[0]?.heroImage` instead of a
  hardcoded Mehrangarh Fort image (so Umaid Bhawan shows its own palace).
- **Secondary travel cards** now read `article.heroImage` instead of all three
  sharing `architectural-marvel-with-ornate-columns-arches.jpg`.
- **Design → "The Fort Palaces of Rajasthan"** now shows Mehrangarh Fort rather
  than generic columns/arches.
- Files: `app/page.tsx`

### Brand consistency
- "The Royal Gallery" → "The Royal Gallerys" (2×) in `app/components/PartnershipCTA.tsx`.

### Editorial image rendering (no more zoom/crop)
- `app/components/editorial/PhotoFigure.tsx` renders figures at each image's
  natural aspect ratio with `object-fit: contain`; fallback ratios only during
  load. Margins tightened so leftover space after a picture collapses.

### Article image corrections
- `lib/travel-articles.ts` — Rambagh Palace and City Palace Udaipur `heroImage`
  + `heroCaption` updated to the correct local images.
- `lib/content/rambagh-palace-jaipur.ts` — Suryavanshi Suite image set to
  `full-width` (landscape) so it is no longer cropped.
- `lib/content/city-palace-udaipur.ts` — Krishna Vilas chamber image set to
  `full-width`.

### SEO / brand furniture
- Generated `public/og-image.jpg` (1200×630 share card) — previously missing but
  referenced by `app/layout.tsx`.
- Generated `public/icon.png` (512×512) and wired `metadata.icons` in
  `app/layout.tsx`.
- Added `scripts/generate-brand-assets.js` to regenerate both.

### Housekeeping
- Removed 8 dead tracked files: `extracted_0…5.js/.jsx`, `extracted_jsx.txt`,
  `extracted_template.html`.

## Verification
- `npx tsc --noEmit` — clean.
- `npm run build` — successful (all static + SSG routes prerendered).
- `npm run lint` — unchanged from baseline: 36 pre-existing errors confined to
  `scripts/*.js` (CommonJS `require()`), not part of the app.

## Deferred (see AUDIT.md §3)
Over-reused/wrong-content images (needs licensed replacements), the Formspree
placeholder, and stub pages (`society`/`dining`/`motoring`/`people`).
