# THE ROYAL GALLERYS — Image Audit

## 1. Sources & rights

Images come from three channels, all of which are safe to publish:

| Channel | License | Notes |
|---|---|---|
| `public/images/experiences/**` | Owned / downloaded via `scripts/` | Editorial set |
| Wikimedia Commons URLs | CC BY / CC BY-SA | Remote, hotlinked via `next.config.ts` remotePatterns |
| Unsplash URLs | Unsplash license | Remote |
| Root `public/images/*.jpg` | Wikimedia Commons | Local copies of Commons files |

**Rights constraint (standing):** Pinterest is discovery-only. No image may be
republished without an owned/licensed/permission-granted/public-domain source.
This is respected — every image on the site traces to one of the channels above.

## 2. Duplicate / over-reused images (🔶 needs distinct licensed replacements)

| Image | Approx. reuse count | Locations |
|---|---|---|
| `architectural-marvel-with-ornate-columns-arches.jpg` | ~15 | design-articles (5×), royalty-articles, style, heritage, ecosystem, sections.ts (Design hero) |
| `mehrangarh-fort.jpg` | ~7 | royalty-articles (2×), heritage, gallery, page.tsx (Design card) |
| `04-mor-chowk.webp` | 3 | city-palace-udaipur.ts content |
| `01-hero.webp` (City Palace) | ~5 | city-palace-udaipur.ts content |

The `city-palace-udaipur.ts` article in particular reuses `01-hero.webp` as the
stand-in for the Armoury Gallery and the Sunset Terrace, and `04-mor-chowk.webp`
for the Vintage Car Collection and the night-time closing shot — both are wrong
subjects. These are the most egregious content-mismatches inside a single article.

## 3. Wrong-content images (🔶)

| Location | Current image | Problem |
|---|---|---|
| Homepage Motoring ×2 | `indian-city-buildings-scene*` | City buildings for car stories |
| Homepage Dining | `colorful-vibrant-indian-landscape.jpg` | Landscape for "Royal Kitchens" |
| Homepage Business | `udaipur-city-view…` | Generic hotel view; acceptable but not editorial |
| `city-palace-udaipur.ts` Armoury | `01-hero.webp` (exterior) | Exterior shown for interior gallery |

## 4. Fixed this session ✅

- Homepage travel lead + secondary cards → per-article `heroImage`.
- Homepage Design "Fort Palaces" → Mehrangarh Fort (matching subject).
- Rambagh Palace Suryavanshi Suite → correct landscape image, `full-width` ratio.
- City Palace Krishna Vilas chamber → correct image, `full-width` ratio.
- `PhotoFigure.tsx` now renders at the image's natural aspect ratio (`object-fit: contain`) — nothing is ever cropped or zoomed.

## 5. SEO assets ✅

- `public/og-image.jpg` (1200×630) — generated.
- `public/icon.png` (512×512) — generated, wired into `metadata.icons`.

## 6. Known image-quality notes

- Wikimedia remote images are full-size originals; the homepage renders several at
  large `sizes` — consider pre-optimizing to local `.webp` for the hero slots.
- `blurDataURL` is a single shared neutral SVG; per-image blur hashes would improve
  perceived load, but are optional.
