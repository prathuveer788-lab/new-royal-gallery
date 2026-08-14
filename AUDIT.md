# THE ROYAL GALLERYS — Site Audit

A complete audit of theroyalgallerys.com, produced against the 50-point brief to
transform it into a world-class international luxury editorial magazine.

**Status legend:** ✅ fixed · 🔶 deferred (needs an asset/decision I cannot invent) · ℹ️ note

---

## 1. Executive summary

The site has a strong editorial foundation — a unified section registry, ~120
prerendered article routes, a coherent serif/sans type system, and genuinely good
long-form editorial copy. Its weaknesses are **consistency** (duplicate and
wrong-content images), **brand integrity** (mixed naming), and **furniture that is
missing or stubbed** (SEO share card, favicon, a working partner form, several
"coming soon" pages).

This session fixed the highest-impact, highest-confidence issues and left a precise
list of what remains, each mapped to the specific asset or decision required to
resolve it.

---

## 2. What was broken and is now fixed

### 2.1 Homepage — wrong & duplicate images ✅
- The **lead travel feature** showed a hardcoded Mehrangarh Fort image for the
  Umaid Bhawan story. Now uses `featuredTravel[0]?.heroImage`.
- All three **secondary travel cards** showed the *same* image
  (`architectural-marvel-with-ornate-columns-arches.jpg`). Now each uses
  `article.heroImage` — the correct, unique palace photograph.
- The **Design → "Fort Palaces of Rajasthan"** card showed generic columns/arches;
  now shows Mehrangarh Fort — the subject the card is actually about.

### 2.2 Brand naming ✅
- `PartnershipCTA.tsx` had two instances of the singular "The Royal Gallery"
  (the brand is "The Royal Gallerys"). Both corrected.

### 2.3 Missing SEO / brand furniture ✅
- `public/og-image.jpg` (referenced by `app/layout.tsx` but absent) — generated
  as a branded 1200×630 share card.
- Favicon/apple-touch icon — generated `public/icon.png` and wired into
  `metadata.icons`.
- Generator kept at `scripts/generate-brand-assets.js` for reproducibility.

### 2.4 Dead tracked files ✅
- Removed 8 junk artifacts (`extracted_0…5.js/.jsx`, `extracted_jsx.txt`,
  `extracted_template.html`) — browser-scrape byproducts, unreferenced anywhere.

---

## 3. What remains (deferred, with the exact blocker)

### 🔶 Over-reused images across articles
`architectural-marvel-with-ornate-columns-arches.jpg` is reused ~15× across
`lib/design-articles.ts` (4× in one article alone), `lib/royalty-articles.ts`,
`app/style`, `app/heritage`, `app/ecosystem`. `mehrangarh-fort.jpg` is reused ~7×.
**Blocker:** needs licensed/distinct replacements — cannot be invented.

### 🔶 Wrong-content homepage images (no licensed source on hand)
- **Motoring** cards use `indian-city-buildings-scene*.jpg` (city buildings) for
  "The Maharaja's Garage" and "Defender / G-Wagon".
- **Dining** uses `colorful-vibrant-indian-landscape.jpg` (a landscape).
**Blocker:** needs car and food imagery with rights.

### 🔶 Partnership form is non-functional
`PartnershipCTA.tsx` posts to `https://formspree.io/f/YOUR_FORM_ID` (placeholder).
The UI degrades gracefully (shows the `hey.theroyalgallerys@gmail.com` fallback),
but no enquiry is delivered.
**Blocker:** the real Formspree ID (or a chosen email-handling endpoint).

### 🔶 Stub pages
`society`, `dining`, `motoring`, `people` render "coming soon" shells despite being
linked from the homepage and footer. Each needs editorial content + imagery.

### 🔶 Accessibility / performance passes
No obvious `alt` omissions found, but the homepage uses many large unoptimized
remote images. A full Lighthouse pass + `next/image` size tuning is recommended.

---

## 4. Verification

- `npx tsc --noEmit` — clean (no type errors).
- `npm run build` — successful; all static + SSG routes prerendered.
- `npm run lint` — 36 pre-existing errors, all in `scripts/*.js` (CommonJS
  `require()` vs the TS ESLint rule). Not part of the Next.js app or build.

*Full image detail in [IMAGE-AUDIT.md](IMAGE-AUDIT.md) · full route map in
[ROUTE-AUDIT.md](ROUTE-AUDIT.md) · change log in [FINAL-CHANGELOG.md](FINAL-CHANGELOG.md).*
