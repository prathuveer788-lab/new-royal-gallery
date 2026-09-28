# THE ROYAL GALLERYS — Comprehensive Site-wide Image Audit

**Date:** 28 September 2026  
**Total Images Audited:** 495  
**Status Summary:**
- 🔴 **REPLACE:** 150 images (resolution deficit, generic stock filename, remote hotlinks, or low quality)
- 🟡 **FIX-RENDER:** 99 images (good intrinsic image, needs pipeline/sizes/focal crop fixes)
- 🟢 **KEEP:** 199 images (verified high-res, authentic)
- 🔵 **KEPT-EDITORIAL:** 47 images (editor-supplied archives, e.g. Balmoral, Aaliya Sultana Babi)

---

## 1. Critical Replacement Targets (Known Homepage & Key Articles)

| File / Source | Slot / Page | Intrinsic Px | Ratio | Issues | Action |
|---|---|---|---|---|---|
| `style-hero-luxury-fashion.jpg` | `app/page.tsx` (hero) | 2000x3020 | 0.52 | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) | **REPLACE** |
| `01-hero.webp` | `app/archive/page.tsx` (hero) | 2400x1600 | 0.63 | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) | **REPLACE** |
| `01-hero.webp` | `app/archive/page.tsx` (hero) | 2400x1522 | 0.63 | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) | **REPLACE** |
| `varanasi-silk-weaving-traditional-loom.jpg` | `app/archive/page.tsx` (hero) | 2400x1600 | 0.63 | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) | **REPLACE** |
| `${SITE}${article.heroImage}` | `app/components/ArticlePage.tsx` (hero) | N/A | 0.00 | File not found on disk | **REPLACE** |
| `01-hero.webp` | `app/gallery/page.tsx` (hero) | 2400x1600 | 0.63 | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) | **REPLACE** |
| `01-hero.webp` | `app/gallery/page.tsx` (hero) | 2400x1522 | 0.63 | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) | **REPLACE** |
| `varanasi-silk-weaving-traditional-loom.jpg` | `app/gallery/page.tsx` (hero) | 2400x1600 | 0.63 | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) | **REPLACE** |
| `style-hero-luxury-fashion.jpg` | `app/style/page.tsx` (hero) | 2000x3020 | 0.52 | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) | **REPLACE** |
| `linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)` | `app/components/editorial/PhotoFigure.tsx` (content) | N/A | 0.00 | File not found on disk | **REPLACE** |
| `linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)` | `app/components/editorial/PhotoPlaceholder.tsx` (content) | N/A | 0.00 | File not found on disk | **REPLACE** |
| `theroyalgallerys.com${article.heroImage}` | `app/style/[slug]/page.tsx` (hero) | N/A | 0.00 | Remote URL hotlink (should be downloaded locally) | **REPLACE** |
| `img-01.webp` | `app/travel/the-balmoral/page.tsx` (content) | 640x430 | 0.46 | Resolution deficit: ratio 0.46 < 1.0 (upscaled on retina) | **REPLACE** |
| `luxury-brand-marketing-editorial.jpg` | `lib/business-articles.ts` (hero) | 2000x2470 | 0.52 | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (18) - potential blur | **REPLACE** |
| `indian-luxury-fashion-consumer.jpg` | `lib/business-articles.ts` (hero) | 854x1280 | 0.22 | Resolution deficit: ratio 0.22 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum | **REPLACE** |
| `indian-luxury-fashion-consumer.jpg` | `lib/business-articles.ts` (content-wide) | 854x1280 | 0.36 | Resolution deficit: ratio 0.36 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum | **REPLACE** |
| `artisan-textile-craft.jpg` | `lib/culture-articles.ts` (content-wide) | 1280x1280 | 0.53 | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum; Low Laplacian sharpness variance (48) - potential blur | **REPLACE** |
| `palace-heritage-fashion.jpg` | `lib/culture-articles.ts` (hero) | 1920x1393 | 0.50 | Resolution deficit: ratio 0.50 < 1.0 (upscaled on retina); Hero long edge 1920px < 2400px minimum | **REPLACE** |
| `rajasthan-palace-runway.jpg` | `lib/culture-articles.ts` (hero) | 1920x1074 | 0.50 | Resolution deficit: ratio 0.50 < 1.0 (upscaled on retina); Hero long edge 1920px < 2400px minimum | **REPLACE** |
| `traditional-mirror-work-embroidery.jpg` | `lib/culture-articles.ts` (content-wide) | 1280x853 | 0.53 | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum | **REPLACE** |
| `embroidery-craftsmanship-detail.jpg` | `lib/culture-articles.ts` (content-wide) | 1280x853 | 0.53 | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum | **REPLACE** |
| `indian-embroidery-craft-hero.jpg` | `lib/culture-articles.ts` (hero) | 2000x2667 | 0.52 | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) | **REPLACE** |
| `palace-architecture-detail.jpg` | `lib/design-articles.ts` (hero) | 1920x1440 | 0.50 | Resolution deficit: ratio 0.50 < 1.0 (upscaled on retina); Hero long edge 1920px < 2400px minimum | **REPLACE** |
| `high-jewellery-gold-luxury.jpg` | `lib/jewellery-articles.ts` (hero) | 1280x853 | 0.33 | Resolution deficit: ratio 0.33 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum | **REPLACE** |
| `fine-jewellery-detail.jpg` | `lib/jewellery-articles.ts` (content-wide) | 1280x848 | 0.53 | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum | **REPLACE** |
| `luxury-jewellery-bracelet.jpg` | `lib/jewellery-articles.ts` (content-wide) | 1280x775 | 0.53 | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum | **REPLACE** |
| `luxury-jewellery-bracelet.jpg` | `lib/jewellery-articles.ts` (hero) | 1280x775 | 0.33 | Resolution deficit: ratio 0.33 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum | **REPLACE** |
| `high-jewellery-gold-luxury.jpg` | `lib/jewellery-articles.ts` (content-wide) | 1280x853 | 0.53 | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum | **REPLACE** |
| `fine-jewellery-detail.jpg` | `lib/jewellery-articles.ts` (hero) | 1280x848 | 0.33 | Resolution deficit: ratio 0.33 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum | **REPLACE** |
| `luxury-wedding-bridal.jpg` | `lib/jewellery-articles.ts` (hero) | 853x1280 | 0.22 | Resolution deficit: ratio 0.22 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum | **REPLACE** |

---

## 2. Editor-Supplied Features (Protected per Ground Rule 4)

| File / Subject | Source Context | Dimensions | Status |
|---|---|---|---|
| `01-hero-aaliya-sultana-babi-portrait-1024w.webp` | `app/page.tsx` | 1024x1535 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero.jpg` | `app/page.tsx` | 1024x681 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero.jpg` | `app/culture/page.tsx` | 1024x681 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero-aaliya-sultana-babi-portrait-1024w.webp` | `app/royalty/page.tsx` | 1024x1535 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero.jpg` | `app/society/page.tsx` | 1024x681 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero-aaliya-sultana-babi-portrait-1024w.webp` | `app/society/page.tsx` | 1024x1535 | **KEPT-EDITORIAL** (Do not replace) |
| `og-aaliya-sultana-babi.jpg` | `app/society/aaliya-sultana-babi-dinosaur-princess-balasinor/page.tsx` | N/A | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero-aaliya-sultana-babi-portrait.jpg` | `app/society/aaliya-sultana-babi-dinosaur-princess-balasinor/page.tsx` | 683x1024 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero.jpg` | `app/society/aaliya-sultana-babi-dinosaur-princess-balasinor/page.tsx` | 1024x681 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero-aaliya-sultana-babi-portrait-1024w.webp` | `app/society/portraits-of-heritage/page.tsx` | 1024x1535 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero.jpg` | `app/society/portraits-of-heritage/page.tsx` | 1024x681 | **KEPT-EDITORIAL** (Do not replace) |
| `og-shivanjali-kumari-dungarpur.jpg` | `app/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty/page.tsx` | N/A | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero.jpg` | `app/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty/page.tsx` | 1024x681 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero-aaliya-sultana-babi-portrait-1024w.webp` | `app/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty/page.tsx` | 1024x1535 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-exterior-hero.jpg` | `app/travel/the-balmoral/page.tsx` | 2000x1500 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-facade-wide.jpg` | `app/travel/the-balmoral/page.tsx` | 2000x1582 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-clock-tower.jpg` | `app/travel/the-balmoral/page.tsx` | 1280x853 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-palm-court.jpg` | `app/travel/the-balmoral/page.tsx` | 1900x1267 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-private-dining.jpg` | `app/travel/the-balmoral/page.tsx` | 1000x666 | **KEPT-EDITORIAL** (Do not replace) |
| `02-portrait-colour.jpg` | `app/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty/components/ColourTurnSection.tsx` | 682x1024 | **KEPT-EDITORIAL** (Do not replace) |
| `03-plate-vigil.jpg` | `app/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty/components/TenDrivesSequence.tsx` | 1024x682 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-palm-court.jpg` | `app/travel/the-balmoral/components/BalmoralCarousel.tsx` | 1900x1267 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-scone-crombie.jpg` | `app/travel/the-balmoral/components/BalmoralCarousel.tsx` | 2000x1333 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-scone-crombie-bedroom.jpg` | `app/travel/the-balmoral/components/BalmoralCarousel.tsx` | 2000x1333 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-castle-view-suite.jpg` | `app/travel/the-balmoral/components/BalmoralCarousel.tsx` | 2000x1333 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-brasserie-prince.jpg` | `app/travel/the-balmoral/components/BalmoralCarousel.tsx` | 2000x1333 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-number-one.jpg` | `app/travel/the-balmoral/components/BalmoralCarousel.tsx` | 2000x1334 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-spa-pool.jpg` | `app/travel/the-balmoral/components/BalmoralCarousel.tsx` | 2000x1333 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-scotch-bar.jpg` | `app/travel/the-balmoral/components/BalmoralCarousel.tsx` | 2048x1365 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero-aaliya-sultana-babi-portrait-1024w.jpg` | `public-directory` | 1024x1535 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero-aaliya-sultana-babi-portrait-640w.jpg` | `public-directory` | 640x960 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero-aaliya-sultana-babi-portrait-640w.webp` | `public-directory` | 640x960 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero-aaliya-sultana-babi-portrait.avif` | `public-directory` | 683x1024 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero-aaliya-sultana-babi-portrait.webp` | `public-directory` | 683x1024 | **KEPT-EDITORIAL** (Do not replace) |
| `og-aaliya-sultana-babi.jpg` | `public-directory` | 1200x630 | **KEPT-EDITORIAL** (Do not replace) |
| `01-hero.webp` | `public-directory` | 1024x681 | **KEPT-EDITORIAL** (Do not replace) |
| `02-portrait-colour.webp` | `public-directory` | 682x1024 | **KEPT-EDITORIAL** (Do not replace) |
| `03-plate-vigil.webp` | `public-directory` | 1024x682 | **KEPT-EDITORIAL** (Do not replace) |
| `04-plate-arrival.jpg` | `public-directory` | 1024x682 | **KEPT-EDITORIAL** (Do not replace) |
| `04-plate-arrival.webp` | `public-directory` | 1024x682 | **KEPT-EDITORIAL** (Do not replace) |
| `06-plate-last-light.jpg` | `public-directory` | 1024x682 | **KEPT-EDITORIAL** (Do not replace) |
| `06-plate-last-light.webp` | `public-directory` | 1024x682 | **KEPT-EDITORIAL** (Do not replace) |
| `og-shivanjali-kumari-dungarpur.jpg` | `public-directory` | 1200x630 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-doorman-tartan.jpg` | `public-directory` | 1500x1125 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-irene-forte-spa.jpg` | `public-directory` | 2000x1333 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-jk-rowling-suite.jpg` | `public-directory` | 2000x1333 | **KEPT-EDITORIAL** (Do not replace) |
| `balmoral-palm-court-tea.jpg` | `public-directory` | 1750x1167 | **KEPT-EDITORIAL** (Do not replace) |

---

## 3. Full Audit Table

| Page / File | Slot | Intrinsic | Required (2x) | Ratio | Sharpness | Status | Issues |
|---|---|---|---|---|---|---|---|
| `jaipur-city-palace-grand-facade.jpg`<br>_(app/page.tsx)_ | hero | 3200x1600 | 3840px | 0.83 | 169 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina) |
| `style-hero-luxury-fashion.jpg`<br>_(app/page.tsx)_ | hero | 2000x3020 | 3840px | 0.52 | 149 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `01-hero-aaliya-sultana-babi-portrait-1024w.webp`<br>_(app/page.tsx)_ | hero | 1024x1535 | 3840px | 0.27 | 67 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1535px < 2400px minimum |
| `01-hero.jpg`<br>_(app/page.tsx)_ | hero | 1024x681 | 3840px | 0.27 | 800 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1024px < 2400px minimum |
| `rajasthani-royal-thali-banquet.jpg`<br>_(app/page.tsx)_ | content | 2400x1600 | 1400px | 1.71 | 30 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (30) - potential blur |
| `udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg`<br>_(app/page.tsx)_ | content | 7000x4672 | 1400px | 5.00 | 35 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (35) - potential blur |
| `hallway-arches-with-dramatic-light-shadows.jpg`<br>_(app/page.tsx)_ | content | 3072x4096 | 1400px | 2.19 | 33 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (33) - potential blur |
| `jaipur-city-palace-grand-facade.jpg`<br>_(app/archive/page.tsx)_ | hero | 3200x1600 | 3840px | 0.83 | 169 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina) |
| `badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg`<br>_(app/archive/page.tsx)_ | content | 7000x4672 | 1400px | 5.00 | 37 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (37) - potential blur |
| `udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg`<br>_(app/archive/page.tsx)_ | content | 7000x4672 | 1400px | 5.00 | 35 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (35) - potential blur |
| `mehrangarh-fort.jpg`<br>_(app/archive/page.tsx)_ | content | 4512x3000 | 1400px | 3.22 | 162 | 🟢 KEEP | None |
| `01-hero.webp`<br>_(app/archive/page.tsx)_ | hero | 2400x1600 | 3840px | 0.63 | 743 | 🔴 REPLACE | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) |
| `hallway-arches-with-dramatic-light-shadows.jpg`<br>_(app/archive/page.tsx)_ | hero | 3072x4096 | 3840px | 0.80 | 33 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.80 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (33) - potential blur |
| `hawa-mahal-palace-jaipur-india.jpg`<br>_(app/archive/page.tsx)_ | content | 5000x3319 | 1400px | 3.57 | 32 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (32) - potential blur |
| `architectural-marvel-with-ornate-columns-arches.jpg`<br>_(app/archive/page.tsx)_ | content | 3072x4096 | 1400px | 2.19 | 44 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (44) - potential blur |
| `01-hero.webp`<br>_(app/archive/page.tsx)_ | hero | 2400x1522 | 3840px | 0.63 | 239 | 🔴 REPLACE | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) |
| `varanasi-silk-weaving-traditional-loom.jpg`<br>_(app/archive/page.tsx)_ | hero | 2400x1600 | 3840px | 0.63 | 537 | 🔴 REPLACE | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) |
| `maharaja-rolls-royce-vintage-collection.jpg`<br>_(app/archive/page.tsx)_ | content | 2400x2003 | 1400px | 1.71 | 136 | 🟢 KEEP | None |
| `rajasthani-royal-thali-banquet.jpg`<br>_(app/archive/page.tsx)_ | content | 2400x1600 | 1400px | 1.71 | 30 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (30) - potential blur |
| `${SITE}${article.heroImage}`<br>_(app/components/ArticlePage.tsx)_ | hero | N/A | 3840px | 0.00 | N/A | 🔴 REPLACE | File not found on disk |
| `rajasthani-royal-thali-banquet.jpg`<br>_(app/dining/page.tsx)_ | content | 2400x1600 | 1400px | 1.71 | 30 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (30) - potential blur |
| `01-hero.jpg`<br>_(app/culture/page.tsx)_ | hero | 1024x681 | 3840px | 0.27 | 800 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1024px < 2400px minimum |
| `hallway-arches-with-dramatic-light-shadows.jpg`<br>_(app/futures/page.tsx)_ | content | 3072x4096 | 1400px | 2.19 | 33 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (33) - potential blur |
| `jaipur-city-palace-grand-facade.jpg`<br>_(app/gallery/page.tsx)_ | hero | 3200x1600 | 3840px | 0.83 | 169 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina) |
| `mehrangarh-fort.jpg`<br>_(app/gallery/page.tsx)_ | hero | 4512x3000 | 3840px | 1.18 | 162 | 🟢 KEEP | None |
| `hawa-mahal-palace-jaipur-india.jpg`<br>_(app/gallery/page.tsx)_ | content | 5000x3319 | 1400px | 3.57 | 32 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (32) - potential blur |
| `badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg`<br>_(app/gallery/page.tsx)_ | content | 7000x4672 | 1400px | 5.00 | 37 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (37) - potential blur |
| `udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg`<br>_(app/gallery/page.tsx)_ | content | 7000x4672 | 1400px | 5.00 | 35 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (35) - potential blur |
| `architectural-marvel-with-ornate-columns-arches.jpg`<br>_(app/gallery/page.tsx)_ | content | 3072x4096 | 1400px | 2.19 | 44 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (44) - potential blur |
| `hallway-arches-with-dramatic-light-shadows.jpg`<br>_(app/gallery/page.tsx)_ | content | 3072x4096 | 1400px | 2.19 | 33 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (33) - potential blur |
| `01-hero.webp`<br>_(app/gallery/page.tsx)_ | hero | 2400x1600 | 3840px | 0.63 | 743 | 🔴 REPLACE | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) |
| `01-hero.webp`<br>_(app/gallery/page.tsx)_ | hero | 2400x1522 | 3840px | 0.63 | 239 | 🔴 REPLACE | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) |
| `varanasi-silk-weaving-traditional-loom.jpg`<br>_(app/gallery/page.tsx)_ | hero | 2400x1600 | 3840px | 0.63 | 537 | 🔴 REPLACE | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) |
| `maharaja-rolls-royce-vintage-collection.jpg`<br>_(app/gallery/page.tsx)_ | content | 2400x2003 | 1400px | 1.71 | 136 | 🟢 KEEP | None |
| `rajasthani-royal-thali-banquet.jpg`<br>_(app/gallery/page.tsx)_ | content | 2400x1600 | 1400px | 1.71 | 30 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (30) - potential blur |
| `hallway-arches-with-dramatic-light-shadows.jpg`<br>_(app/gallery/page.tsx)_ | content | 3072x4096 | 1400px | 2.19 | 33 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (33) - potential blur |
| `badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg`<br>_(app/heritage/page.tsx)_ | content | 7000x4672 | 1400px | 5.00 | 37 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (37) - potential blur |
| `mehrangarh-fort.jpg`<br>_(app/heritage/page.tsx)_ | content | 4512x3000 | 1400px | 3.22 | 162 | 🟢 KEEP | None |
| `architectural-marvel-with-ornate-columns-arches.jpg`<br>_(app/heritage/page.tsx)_ | content | 3072x4096 | 1400px | 2.19 | 44 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (44) - potential blur |
| `indian-city-buildings-scene.jpg`<br>_(app/heritage-ai/page.tsx)_ | content | 3584x5376 | 1400px | 2.56 | 2005 | 🟢 KEEP | None |
| `maharaja-rolls-royce-vintage-collection.jpg`<br>_(app/motoring/page.tsx)_ | content | 2400x2003 | 1400px | 1.71 | 136 | 🟢 KEEP | None |
| `beautiful-shot-lodhi-garden-delhi-india-cloudy-sky.jpg`<br>_(app/people/page.tsx)_ | content | 5760x3840 | 1400px | 4.11 | 350 | 🟢 KEEP | None |
| `01-hero-aaliya-sultana-babi-portrait-1024w.webp`<br>_(app/royalty/page.tsx)_ | hero | 1024x1535 | 3840px | 0.27 | 67 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1535px < 2400px minimum |
| `udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg`<br>_(app/society/page.tsx)_ | content | 7000x4672 | 1400px | 5.00 | 35 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (35) - potential blur |
| `01-hero.jpg`<br>_(app/society/page.tsx)_ | hero | 1024x681 | 3840px | 0.27 | 800 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1024px < 2400px minimum |
| `01-hero-aaliya-sultana-babi-portrait-1024w.webp`<br>_(app/society/page.tsx)_ | hero | 1024x1535 | 3840px | 0.27 | 67 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1535px < 2400px minimum |
| `style-hero-luxury-fashion.jpg`<br>_(app/style/page.tsx)_ | hero | 2000x3020 | 3840px | 0.52 | 149 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `luxury-fashion-editorial.jpg`<br>_(app/style/page.tsx)_ | content | 2000x2500 | 1400px | 1.43 | 515 | 🟢 KEEP | None |
| `colorful-vibrant-indian-landscape.jpg`<br>_(app/travel/page.tsx)_ | content | 4789x7000 | 1400px | 3.42 | 36 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (36) - potential blur |
| `linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)`<br>_(app/components/editorial/PhotoFigure.tsx)_ | content | N/A | 1400px | 0.00 | N/A | 🔴 REPLACE | File not found on disk |
| `linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)`<br>_(app/components/editorial/PhotoPlaceholder.tsx)_ | content | N/A | 1400px | 0.00 | N/A | 🔴 REPLACE | File not found on disk |
| `og-aaliya-sultana-babi.jpg`<br>_(app/society/aaliya-sultana-babi-dinosaur-princess-balasinor/page.tsx)_ | hero | N/A | 3840px | 0.00 | N/A | 🔵 KEPT-EDITORIAL | Remote URL hotlink (should be downloaded locally) |
| `01-hero-aaliya-sultana-babi-portrait.jpg`<br>_(app/society/aaliya-sultana-babi-dinosaur-princess-balasinor/page.tsx)_ | hero | 683x1024 | 3840px | 0.18 | 286 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.18 < 1.0 (upscaled on retina); Hero long edge 1024px < 2400px minimum |
| `01-hero.jpg`<br>_(app/society/aaliya-sultana-babi-dinosaur-princess-balasinor/page.tsx)_ | hero | 1024x681 | 3840px | 0.27 | 800 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1024px < 2400px minimum |
| `01-hero-aaliya-sultana-babi-portrait-1024w.webp`<br>_(app/society/portraits-of-heritage/page.tsx)_ | hero | 1024x1535 | 3840px | 0.27 | 67 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1535px < 2400px minimum |
| `01-hero.jpg`<br>_(app/society/portraits-of-heritage/page.tsx)_ | hero | 1024x681 | 3840px | 0.27 | 800 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1024px < 2400px minimum |
| `hallway-arches-with-dramatic-light-shadows.jpg`<br>_(app/society/portraits-of-heritage/page.tsx)_ | content | 3072x4096 | 1400px | 2.19 | 33 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (33) - potential blur |
| `badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg`<br>_(app/society/portraits-of-heritage/page.tsx)_ | content | 7000x4672 | 1400px | 5.00 | 37 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (37) - potential blur |
| `udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg`<br>_(app/society/portraits-of-heritage/page.tsx)_ | content | 7000x4672 | 1400px | 5.00 | 35 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (35) - potential blur |
| `og-shivanjali-kumari-dungarpur.jpg`<br>_(app/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty/page.tsx)_ | hero | N/A | 3840px | 0.00 | N/A | 🔵 KEPT-EDITORIAL | Remote URL hotlink (should be downloaded locally) |
| `01-hero.jpg`<br>_(app/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty/page.tsx)_ | hero | 1024x681 | 3840px | 0.27 | 800 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1024px < 2400px minimum |
| `01-hero-aaliya-sultana-babi-portrait-1024w.webp`<br>_(app/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty/page.tsx)_ | hero | 1024x1535 | 3840px | 0.27 | 67 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1535px < 2400px minimum |
| `theroyalgallerys.com${article.heroImage}`<br>_(app/style/[slug]/page.tsx)_ | hero | N/A | 3840px | 0.00 | N/A | 🔴 REPLACE | Remote URL hotlink (should be downloaded locally) |
| `balmoral-exterior-hero.jpg`<br>_(app/travel/the-balmoral/page.tsx)_ | hero | 2000x1500 | 3840px | 0.52 | 321 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `balmoral-facade-wide.jpg`<br>_(app/travel/the-balmoral/page.tsx)_ | content | 2000x1582 | 1400px | 1.43 | 302 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-clock-tower.jpg`<br>_(app/travel/the-balmoral/page.tsx)_ | content | 1280x853 | 1400px | 0.91 | 29 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.91 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (29) - potential blur |
| `balmoral-palm-court.jpg`<br>_(app/travel/the-balmoral/page.tsx)_ | content | 1900x1267 | 1400px | 1.36 | 434 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-private-dining.jpg`<br>_(app/travel/the-balmoral/page.tsx)_ | content | 1000x666 | 1400px | 0.71 | 404 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.71 < 1.0 (upscaled on retina) |
| `img-01.webp`<br>_(app/travel/the-balmoral/page.tsx)_ | content | 2000x3018 | 1400px | 1.43 | 134 | 🟢 KEEP | None |
| `img-01.webp`<br>_(app/travel/the-balmoral/page.tsx)_ | content | 640x430 | 1400px | 0.46 | 1244 | 🔴 REPLACE | Resolution deficit: ratio 0.46 < 1.0 (upscaled on retina) |
| `img-01.webp`<br>_(app/travel/the-balmoral/page.tsx)_ | content | 2000x1500 | 1400px | 1.43 | 82 | 🟢 KEEP | None |
| `02-portrait-colour.jpg`<br>_(app/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty/components/ColourTurnSection.tsx)_ | content | 682x1024 | 1400px | 0.49 | 89 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.49 < 1.0 (upscaled on retina) |
| `03-plate-vigil.jpg`<br>_(app/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty/components/TenDrivesSequence.tsx)_ | content | 1024x682 | 1400px | 0.73 | 1009 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `balmoral-palm-court.jpg`<br>_(app/travel/the-balmoral/components/BalmoralCarousel.tsx)_ | content | 1900x1267 | 1400px | 1.36 | 434 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-scone-crombie.jpg`<br>_(app/travel/the-balmoral/components/BalmoralCarousel.tsx)_ | content | 2000x1333 | 1400px | 1.43 | 691 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-scone-crombie-bedroom.jpg`<br>_(app/travel/the-balmoral/components/BalmoralCarousel.tsx)_ | content | 2000x1333 | 1400px | 1.43 | 260 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-castle-view-suite.jpg`<br>_(app/travel/the-balmoral/components/BalmoralCarousel.tsx)_ | content | 2000x1333 | 1400px | 1.43 | 208 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-brasserie-prince.jpg`<br>_(app/travel/the-balmoral/components/BalmoralCarousel.tsx)_ | content | 2000x1333 | 1400px | 1.43 | 209 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-number-one.jpg`<br>_(app/travel/the-balmoral/components/BalmoralCarousel.tsx)_ | content | 2000x1334 | 1400px | 1.43 | 208 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-spa-pool.jpg`<br>_(app/travel/the-balmoral/components/BalmoralCarousel.tsx)_ | content | 2000x1333 | 1400px | 1.43 | 313 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-scotch-bar.jpg`<br>_(app/travel/the-balmoral/components/BalmoralCarousel.tsx)_ | content | 2048x1365 | 1400px | 1.46 | 251 | 🔵 KEPT-EDITORIAL | None |
| `indian-city-buildings-scene.jpg`<br>_(lib/business-articles.ts)_ | hero | 3584x5376 | 3840px | 0.93 | 2005 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.93 < 1.0 (upscaled on retina) |
| `udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg`<br>_(lib/business-articles.ts)_ | content-wide | 7000x4672 | 2400px | 2.92 | 35 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (35) - potential blur |
| `luxury-brand-marketing-editorial.jpg`<br>_(lib/business-articles.ts)_ | hero | 2000x2470 | 3840px | 0.52 | 18 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (18) - potential blur |
| `fashion-campaign-visual.jpg`<br>_(lib/business-articles.ts)_ | content-wide | 2000x2998 | 2400px | 0.83 | 16 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (16) - potential blur |
| `indian-luxury-fashion-consumer.jpg`<br>_(lib/business-articles.ts)_ | hero | 854x1280 | 3840px | 0.22 | 976 | 🔴 REPLACE | Resolution deficit: ratio 0.22 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum |
| `luxury-consumer-editorial-break.jpg`<br>_(lib/business-articles.ts)_ | content-wide | 2000x1335 | 2400px | 0.83 | 158 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina) |
| `luxury-brand-marketing-editorial.jpg`<br>_(lib/business-articles.ts)_ | content-wide | 2000x2470 | 2400px | 0.83 | 18 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (18) - potential blur |
| `indian-luxury-fashion-consumer.jpg`<br>_(lib/business-articles.ts)_ | content-wide | 854x1280 | 2400px | 0.36 | 976 | 🔴 REPLACE | Resolution deficit: ratio 0.36 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg`<br>_(lib/business-articles.ts)_ | hero | 7000x4672 | 3840px | 1.82 | 35 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (35) - potential blur |
| `hawa-mahal-palace-jaipur-india.jpg`<br>_(lib/culture-articles.ts)_ | hero | 5000x3319 | 3840px | 1.30 | 32 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (32) - potential blur |
| `artisan-textile-craft.jpg`<br>_(lib/culture-articles.ts)_ | content-wide | 1280x1280 | 2400px | 0.53 | 48 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum; Low Laplacian sharpness variance (48) - potential blur |
| `palace-heritage-fashion.jpg`<br>_(lib/culture-articles.ts)_ | hero | 1920x1393 | 3840px | 0.50 | 579 | 🔴 REPLACE | Resolution deficit: ratio 0.50 < 1.0 (upscaled on retina); Hero long edge 1920px < 2400px minimum |
| `hawa-mahal-palace-jaipur-india.jpg`<br>_(lib/culture-articles.ts)_ | content-wide | 5000x3319 | 2400px | 2.08 | 32 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (32) - potential blur |
| `rajasthan-palace-runway.jpg`<br>_(lib/culture-articles.ts)_ | hero | 1920x1074 | 3840px | 0.50 | 2339 | 🔴 REPLACE | Resolution deficit: ratio 0.50 < 1.0 (upscaled on retina); Hero long edge 1920px < 2400px minimum |
| `traditional-mirror-work-embroidery.jpg`<br>_(lib/culture-articles.ts)_ | content-wide | 1280x853 | 2400px | 0.53 | 3706 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `embroidery-craftsmanship-detail.jpg`<br>_(lib/culture-articles.ts)_ | content-wide | 1280x853 | 2400px | 0.53 | 176 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `colorful-vibrant-indian-landscape.jpg`<br>_(lib/culture-articles.ts)_ | hero | 4789x7000 | 3840px | 1.25 | 36 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (36) - potential blur |
| `artisan-textile-market-break.jpg`<br>_(lib/culture-articles.ts)_ | content-wide | 2000x1333 | 2400px | 0.83 | 160 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina) |
| `indian-embroidery-craft-hero.jpg`<br>_(lib/culture-articles.ts)_ | hero | 2000x2667 | 3840px | 0.52 | 1029 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `architectural-marvel-with-ornate-columns-arches.jpg`<br>_(lib/design-articles.ts)_ | hero | 3072x4096 | 3840px | 0.80 | 44 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.80 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (44) - potential blur |
| `hallway-arches-with-dramatic-light-shadows.jpg`<br>_(lib/design-articles.ts)_ | content-wide | 3072x4096 | 2400px | 1.28 | 33 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (33) - potential blur |
| `hallway-arches-with-dramatic-light-shadows.jpg`<br>_(lib/design-articles.ts)_ | hero | 3072x4096 | 3840px | 0.80 | 33 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.80 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (33) - potential blur |
| `architectural-marvel-with-ornate-columns-arches.jpg`<br>_(lib/design-articles.ts)_ | content-wide | 3072x4096 | 2400px | 1.28 | 44 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (44) - potential blur |
| `badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg`<br>_(lib/design-articles.ts)_ | content-wide | 7000x4672 | 2400px | 2.92 | 37 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (37) - potential blur |
| `badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg`<br>_(lib/design-articles.ts)_ | hero | 7000x4672 | 3840px | 1.82 | 37 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (37) - potential blur |
| `palace-architecture-detail.jpg`<br>_(lib/design-articles.ts)_ | hero | 1920x1440 | 3840px | 0.50 | 1174 | 🔴 REPLACE | Resolution deficit: ratio 0.50 < 1.0 (upscaled on retina); Hero long edge 1920px < 2400px minimum |
| `beautiful-shot-lodhi-garden-delhi-india-cloudy-sky.jpg`<br>_(lib/design-articles.ts)_ | hero | 5760x3840 | 3840px | 1.50 | 350 | 🟢 KEEP | None |
| `high-jewellery-gold-luxury.jpg`<br>_(lib/jewellery-articles.ts)_ | hero | 1280x853 | 3840px | 0.33 | 272 | 🔴 REPLACE | Resolution deficit: ratio 0.33 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum |
| `fine-jewellery-detail.jpg`<br>_(lib/jewellery-articles.ts)_ | content-wide | 1280x848 | 2400px | 0.53 | 274 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `luxury-jewellery-bracelet.jpg`<br>_(lib/jewellery-articles.ts)_ | content-wide | 1280x775 | 2400px | 0.53 | 405 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `luxury-jewellery-bracelet.jpg`<br>_(lib/jewellery-articles.ts)_ | hero | 1280x775 | 3840px | 0.33 | 405 | 🔴 REPLACE | Resolution deficit: ratio 0.33 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum |
| `high-jewellery-gold-luxury.jpg`<br>_(lib/jewellery-articles.ts)_ | content-wide | 1280x853 | 2400px | 0.53 | 272 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `fine-jewellery-detail.jpg`<br>_(lib/jewellery-articles.ts)_ | hero | 1280x848 | 3840px | 0.33 | 274 | 🔴 REPLACE | Resolution deficit: ratio 0.33 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum |
| `luxury-wedding-bridal.jpg`<br>_(lib/jewellery-articles.ts)_ | hero | 853x1280 | 3840px | 0.22 | 1151 | 🔴 REPLACE | Resolution deficit: ratio 0.22 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum |
| `badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg`<br>_(lib/royalty-articles.ts)_ | hero | 7000x4672 | 3840px | 1.82 | 37 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (37) - potential blur |
| `mehrangarh-fort.jpg`<br>_(lib/royalty-articles.ts)_ | content-wide | 4512x3000 | 2400px | 1.88 | 162 | 🟢 KEEP | None |
| `vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg`<br>_(lib/royalty-articles.ts)_ | content-wide | 5514x3939 | 2400px | 2.30 | 486 | 🔴 REPLACE | Vecteezy stock filename |
| `rajasthan-palace-heritage.jpg`<br>_(lib/royalty-articles.ts)_ | hero | 1920x1311 | 3840px | 0.50 | 2601 | 🔴 REPLACE | Resolution deficit: ratio 0.50 < 1.0 (upscaled on retina); Hero long edge 1920px < 2400px minimum |
| `embroidery-craftsmanship-detail.jpg`<br>_(lib/royalty-articles.ts)_ | content-wide | 1280x853 | 2400px | 0.53 | 176 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `hawa-mahal-palace-jaipur-india.jpg`<br>_(lib/royalty-articles.ts)_ | content-wide | 5000x3319 | 2400px | 2.08 | 32 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (32) - potential blur |
| `palace-architecture-detail.jpg`<br>_(lib/royalty-articles.ts)_ | hero | 1920x1440 | 3840px | 0.50 | 1174 | 🔴 REPLACE | Resolution deficit: ratio 0.50 < 1.0 (upscaled on retina); Hero long edge 1920px < 2400px minimum |
| `royal-couture-editorial.jpg`<br>_(lib/royalty-articles.ts)_ | hero | 2000x1333 | 3840px | 0.52 | 44 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum; Low Laplacian sharpness variance (44) - potential blur |
| `palace-heritage-fashion.jpg`<br>_(lib/royalty-articles.ts)_ | content-wide | 1920x1393 | 2400px | 0.80 | 579 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.80 < 1.0 (upscaled on retina) |
| `rajasthan-palace-runway.jpg`<br>_(lib/royalty-articles.ts)_ | content-wide | 1920x1074 | 2400px | 0.80 | 2339 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.80 < 1.0 (upscaled on retina) |
| `vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg`<br>_(lib/royalty-articles.ts)_ | hero | 5514x3939 | 3840px | 1.44 | 486 | 🔴 REPLACE | Vecteezy stock filename |
| `badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg`<br>_(lib/royalty-articles.ts)_ | content-wide | 7000x4672 | 2400px | 2.92 | 37 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (37) - potential blur |
| `rajasthan-palace-heritage.jpg`<br>_(lib/royalty-articles.ts)_ | content-wide | 1920x1311 | 2400px | 0.80 | 2601 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.80 < 1.0 (upscaled on retina) |
| `luxury-fashion-editorial.jpg`<br>_(lib/style-articles.ts)_ | hero | 2000x2500 | 3840px | 0.52 | 515 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `indian-luxury-fashion-consumer.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 854x1280 | 2400px | 0.36 | 976 | 🔴 REPLACE | Resolution deficit: ratio 0.36 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `luxury-consumer-editorial-break.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 2000x1335 | 2400px | 0.83 | 158 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina) |
| `indian-couture-runway.jpg`<br>_(lib/style-articles.ts)_ | hero | 2000x3000 | 3840px | 0.52 | 35 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (35) - potential blur |
| `couture-fabric-detail.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 1280x1121 | 2400px | 0.53 | 222 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `rajasthan-palace-heritage.jpg`<br>_(lib/style-articles.ts)_ | hero | 1920x1311 | 3840px | 0.50 | 2601 | 🔴 REPLACE | Resolution deficit: ratio 0.50 < 1.0 (upscaled on retina); Hero long edge 1920px < 2400px minimum |
| `palace-architecture-detail.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 1920x1440 | 2400px | 0.80 | 1174 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.80 < 1.0 (upscaled on retina) |
| `indian-fashion-runway-hero.jpg`<br>_(lib/style-articles.ts)_ | hero | 2000x3000 | 3840px | 0.52 | 293 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `fashion-runway-editorial-break.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 2000x1333 | 2400px | 0.83 | 256 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina) |
| `indian-embroidery-craft-hero.jpg`<br>_(lib/style-articles.ts)_ | hero | 2000x2667 | 3840px | 0.52 | 1029 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `artisan-textile-market-break.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 2000x1333 | 2400px | 0.83 | 160 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina) |
| `embroidery-craftsmanship-detail.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 1280x853 | 2400px | 0.53 | 176 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `indian-bridal-couture-hero.jpg`<br>_(lib/style-articles.ts)_ | hero | 2000x2999 | 3840px | 0.52 | 111 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `bridal-lehenga-couture-break.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 2000x1333 | 2400px | 0.83 | 371 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina) |
| `high-jewellery-gold-luxury.jpg`<br>_(lib/style-articles.ts)_ | hero | 1280x853 | 3840px | 0.33 | 272 | 🔴 REPLACE | Resolution deficit: ratio 0.33 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum |
| `fine-jewellery-detail.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 1280x848 | 2400px | 0.53 | 274 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `luxury-brand-marketing-editorial.jpg`<br>_(lib/style-articles.ts)_ | hero | 2000x2470 | 3840px | 0.52 | 18 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (18) - potential blur |
| `fashion-campaign-visual.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 2000x2998 | 2400px | 0.83 | 16 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (16) - potential blur |
| `rajasthan-palace-runway.jpg`<br>_(lib/style-articles.ts)_ | hero | 1920x1074 | 3840px | 0.50 | 2339 | 🔴 REPLACE | Resolution deficit: ratio 0.50 < 1.0 (upscaled on retina); Hero long edge 1920px < 2400px minimum |
| `palace-heritage-fashion.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 1920x1393 | 2400px | 0.80 | 579 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.80 < 1.0 (upscaled on retina) |
| `future-luxury-fashion-2026.jpg`<br>_(lib/style-articles.ts)_ | hero | 2000x3020 | 3840px | 0.52 | 149 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `modern-luxury-couture-future.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 2000x3000 | 2400px | 0.83 | 35 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (35) - potential blur |
| `digital-luxury-fashion-break.jpg`<br>_(lib/style-articles.ts)_ | content-wide | 2000x3000 | 2400px | 0.83 | 208 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina) |
| `01-hero.webp`<br>_(lib/travel-articles.ts)_ | hero | 2400x1600 | 3840px | 0.63 | 743 | 🔴 REPLACE | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) |
| `suryavanshi-suite-bedroom.png`<br>_(lib/travel-articles.ts)_ | hero | 1672x941 | 3840px | 0.44 | 627 | 🔴 REPLACE | Resolution deficit: ratio 0.44 < 1.0 (upscaled on retina); Hero long edge 1672px < 2400px minimum |
| `01-hero.webp`<br>_(lib/travel-articles.ts)_ | hero | 2400x1522 | 3840px | 0.63 | 239 | 🔴 REPLACE | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) |
| `city-palace-hero.jpg`<br>_(lib/travel-articles.ts)_ | hero | 574x348 | 3840px | 0.15 | 574 | 🔴 REPLACE | Resolution deficit: ratio 0.15 < 1.0 (upscaled on retina); Hero long edge 574px < 2400px minimum |
| `04-mor-chowk.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1500 | 3840px | 0.52 | 419 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `01-durbar-hall.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1333 | 3840px | 0.52 | 61 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `01-hero.webp`<br>_(lib/travel-articles.ts)_ | hero | 2048x1358 | 3840px | 0.53 | 124 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Hero long edge 2048px < 2400px minimum |
| `01-courtyard.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1333 | 3840px | 0.52 | 285 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `01-mehrangarh-fort.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1333 | 3840px | 0.52 | 240 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1500 | 3840px | 0.52 | 16 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum; Low Laplacian sharpness variance (16) - potential blur |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x771 | 3840px | 0.52 | 507 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 1006x500 | 3840px | 0.26 | 612 | 🔴 REPLACE | Resolution deficit: ratio 0.26 < 1.0 (upscaled on retina); Hero long edge 1006px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1500 | 3840px | 0.52 | 325 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `01-hero.webp`<br>_(lib/travel-articles.ts)_ | hero | 2400x1678 | 3840px | 0.63 | 343 | 🔴 REPLACE | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) |
| `01-hero.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x807 | 3840px | 0.52 | 1017 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `01-hero.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1500 | 3840px | 0.52 | 112 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `01-hero.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1333 | 3840px | 0.52 | 1044 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1500 | 3840px | 0.52 | 169 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `01-hero.webp`<br>_(lib/travel-articles.ts)_ | hero | 2400x1800 | 3840px | 0.63 | 220 | 🔴 REPLACE | Resolution deficit: ratio 0.63 < 1.0 (upscaled on retina) |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 1141x856 | 3840px | 0.30 | 533 | 🔴 REPLACE | Resolution deficit: ratio 0.30 < 1.0 (upscaled on retina); Hero long edge 1141px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1333 | 3840px | 0.52 | 57 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum; Low Laplacian sharpness variance (57) - potential blur |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 527x351 | 3840px | 0.14 | 167 | 🔴 REPLACE | Resolution deficit: ratio 0.14 < 1.0 (upscaled on retina); Hero long edge 527px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x892 | 3840px | 0.52 | 1224 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 1024x322 | 3840px | 0.27 | 528 | 🔴 REPLACE | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1024px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 800x600 | 3840px | 0.21 | 479 | 🔴 REPLACE | Resolution deficit: ratio 0.21 < 1.0 (upscaled on retina); Hero long edge 800px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 1600x1200 | 3840px | 0.42 | 860 | 🔴 REPLACE | Resolution deficit: ratio 0.42 < 1.0 (upscaled on retina); Hero long edge 1600px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1048 | 3840px | 0.52 | 163 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 572x876 | 3840px | 0.15 | 273 | 🔴 REPLACE | Resolution deficit: ratio 0.15 < 1.0 (upscaled on retina); Hero long edge 876px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1329 | 3840px | 0.52 | 557 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x661 | 3840px | 0.52 | 426 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1500 | 3840px | 0.52 | 27 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum; Low Laplacian sharpness variance (27) - potential blur |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x3000 | 3840px | 0.52 | 42 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (42) - potential blur |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 1200x900 | 3840px | 0.31 | 228 | 🔴 REPLACE | Resolution deficit: ratio 0.31 < 1.0 (upscaled on retina); Hero long edge 1200px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 1024x828 | 3840px | 0.27 | 113 | 🔴 REPLACE | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1024px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1334 | 3840px | 0.52 | 357 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x3018 | 3840px | 0.52 | 134 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 640x430 | 3840px | 0.17 | 1244 | 🔴 REPLACE | Resolution deficit: ratio 0.17 < 1.0 (upscaled on retina); Hero long edge 640px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1001 | 3840px | 0.52 | 213 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1909 | 3840px | 0.52 | 727 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x4952 | 3840px | 0.52 | 813 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x957 | 3840px | 0.52 | 5784 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 1170x1563 | 3840px | 0.30 | 68 | 🔴 REPLACE | Resolution deficit: ratio 0.30 < 1.0 (upscaled on retina); Hero long edge 1563px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 640x480 | 3840px | 0.17 | 614 | 🔴 REPLACE | Resolution deficit: ratio 0.17 < 1.0 (upscaled on retina); Hero long edge 640px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 1203x891 | 3840px | 0.31 | 194 | 🔴 REPLACE | Resolution deficit: ratio 0.31 < 1.0 (upscaled on retina); Hero long edge 1203px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 1229x851 | 3840px | 0.32 | 182 | 🔴 REPLACE | Resolution deficit: ratio 0.32 < 1.0 (upscaled on retina); Hero long edge 1229px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1032 | 3840px | 0.52 | 1065 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x499 | 3840px | 0.52 | 391 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x652 | 3840px | 0.52 | 431 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1189 | 3840px | 0.52 | 1031 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `img-01.webp`<br>_(lib/travel-articles.ts)_ | hero | 2000x1500 | 3840px | 0.52 | 290 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Hero long edge 2000px < 2400px minimum |
| `indian-bridal-couture-hero.jpg`<br>_(lib/travel-articles.ts)_ | hero | 2000x2999 | 3840px | 0.52 | 111 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `watch-hero.jpeg`<br>_(lib/watches-articles.ts)_ | hero | 2048x1376 | 3840px | 0.53 | 68 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Hero long edge 2048px < 2400px minimum |
| `watch-inside.jpeg`<br>_(lib/watches-articles.ts)_ | content-wide | 1434x1097 | 2400px | 0.60 | 444 | 🔴 REPLACE | Resolution deficit: ratio 0.60 < 1.0 (upscaled on retina); Wide image long edge 1434px < 1600px minimum |
| `watch-outside.jpeg`<br>_(lib/watches-articles.ts)_ | hero | 1024x683 | 3840px | 0.27 | 89 | 🔴 REPLACE | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina); Hero long edge 1024px < 2400px minimum |
| `watch-inside.jpeg`<br>_(lib/watches-articles.ts)_ | hero | 1434x1097 | 3840px | 0.37 | 444 | 🔴 REPLACE | Resolution deficit: ratio 0.37 < 1.0 (upscaled on retina); Hero long edge 1434px < 2400px minimum |
| `watch-outside.jpeg`<br>_(lib/watches-articles.ts)_ | content-wide | 1024x683 | 2400px | 0.43 | 89 | 🔴 REPLACE | Resolution deficit: ratio 0.43 < 1.0 (upscaled on retina); Wide image long edge 1024px < 1600px minimum |
| `watch-hero.jpeg`<br>_(lib/watches-articles.ts)_ | content-wide | 2048x1376 | 2400px | 0.85 | 68 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.85 < 1.0 (upscaled on retina) |
| `indian-bridal-couture-hero.jpg`<br>_(lib/weddings-articles.ts)_ | hero | 2000x2999 | 3840px | 0.52 | 111 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `indian-bridal-couture-wedding.jpg`<br>_(lib/weddings-articles.ts)_ | content-wide | 1280x853 | 2400px | 0.53 | 545 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `luxury-wedding-bridal.jpg`<br>_(lib/weddings-articles.ts)_ | content-wide | 853x1280 | 2400px | 0.36 | 1151 | 🔴 REPLACE | Resolution deficit: ratio 0.36 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `indian-bridal-couture-wedding.jpg`<br>_(lib/weddings-articles.ts)_ | hero | 1280x853 | 3840px | 0.33 | 545 | 🔴 REPLACE | Resolution deficit: ratio 0.33 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum |
| `bridal-lehenga-couture-break.jpg`<br>_(lib/weddings-articles.ts)_ | content-wide | 2000x1333 | 2400px | 0.83 | 371 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina) |
| `indian-wedding-fashion.jpg`<br>_(lib/weddings-articles.ts)_ | hero | 1280x853 | 3840px | 0.33 | 352 | 🔴 REPLACE | Resolution deficit: ratio 0.33 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum |
| `couture-fabric-detail.jpg`<br>_(lib/weddings-articles.ts)_ | content-wide | 1280x1121 | 2400px | 0.53 | 222 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Wide image long edge 1280px < 1600px minimum |
| `rajasthan-palace-runway.jpg`<br>_(lib/weddings-articles.ts)_ | hero | 1920x1074 | 3840px | 0.50 | 2339 | 🔴 REPLACE | Resolution deficit: ratio 0.50 < 1.0 (upscaled on retina); Hero long edge 1920px < 2400px minimum |
| `fashion-runway-palace-inspired.jpg`<br>_(lib/weddings-articles.ts)_ | content-wide | 2000x1333 | 2400px | 0.83 | 44 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (44) - potential blur |
| `indian-couture-runway.jpg`<br>_(lib/weddings-articles.ts)_ | hero | 2000x3000 | 3840px | 0.52 | 35 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (35) - potential blur |
| `fashion-couture-editorial.jpg`<br>_(lib/weddings-articles.ts)_ | content-wide | 2000x1333 | 2400px | 0.83 | 37 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.83 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (37) - potential blur |
| `badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg`<br>_(lib/editorial/sections.ts)_ | hero | 7000x4672 | 3840px | 1.82 | 37 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (37) - potential blur |
| `high-jewellery-gold-luxury.jpg`<br>_(lib/editorial/sections.ts)_ | hero | 1280x853 | 3840px | 0.33 | 272 | 🔴 REPLACE | Resolution deficit: ratio 0.33 < 1.0 (upscaled on retina); Hero long edge 1280px < 2400px minimum |
| `watch-hero.jpeg`<br>_(lib/editorial/sections.ts)_ | hero | 2048x1376 | 3840px | 0.53 | 68 | 🔴 REPLACE | Resolution deficit: ratio 0.53 < 1.0 (upscaled on retina); Hero long edge 2048px < 2400px minimum |
| `indian-bridal-couture-hero.jpg`<br>_(lib/editorial/sections.ts)_ | hero | 2000x2999 | 3840px | 0.52 | 111 | 🔴 REPLACE | Resolution deficit: ratio 0.52 < 1.0 (upscaled on retina) |
| `architectural-marvel-with-ornate-columns-arches.jpg`<br>_(lib/editorial/sections.ts)_ | hero | 3072x4096 | 3840px | 0.80 | 44 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.80 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (44) - potential blur |
| `hawa-mahal-palace-jaipur-india.jpg`<br>_(lib/editorial/sections.ts)_ | hero | 5000x3319 | 3840px | 1.30 | 32 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (32) - potential blur |
| `indian-city-buildings-scene.jpg`<br>_(lib/editorial/sections.ts)_ | hero | 3584x5376 | 3840px | 0.93 | 2005 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.93 < 1.0 (upscaled on retina) |
| `ChatGPT Image Aug 14, 2026, 10_41_39 AM.png`<br>_(public-directory)_ | unreferenced-or-static | 1672x941 | 1400px | 1.19 | 354 | 🔴 REPLACE | AI generated filename |
| `colorful-vibrant-indian-landscape(1).jpg`<br>_(public-directory)_ | unreferenced-or-static | 7000x4789 | 1400px | 5.00 | 132 | 🔴 REPLACE | Duplicate download suffix (1) |
| `images (5).jpg`<br>_(public-directory)_ | unreferenced-or-static | 574x348 | 1400px | 0.41 | 574 | 🔴 REPLACE | Browser thumbnail download name; Resolution deficit: ratio 0.41 < 1.0 (upscaled on retina) |
| `indian-city-buildings-scene(1).jpg`<br>_(public-directory)_ | unreferenced-or-static | 5376x3584 | 1400px | 3.84 | 2684 | 🔴 REPLACE | Duplicate download suffix (1) |
| `sama-ali.jpeg`<br>_(public-directory)_ | unreferenced-or-static | 866x956 | 1400px | 0.62 | 193 | 🔴 REPLACE | Resolution deficit: ratio 0.62 < 1.0 (upscaled on retina) |
| `udaipur-city-view-from-hotel-balcony-rajasthan-india(1).jpg`<br>_(public-directory)_ | unreferenced-or-static | 7000x4672 | 1400px | 5.00 | 93 | 🔴 REPLACE | Duplicate download suffix (1) |
| `01-hero-aaliya-sultana-babi-portrait-1024w.jpg`<br>_(public-directory)_ | unreferenced-or-static | 1024x1535 | 1400px | 0.73 | 66 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `01-hero-aaliya-sultana-babi-portrait-640w.jpg`<br>_(public-directory)_ | unreferenced-or-static | 640x960 | 1400px | 0.46 | 267 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.46 < 1.0 (upscaled on retina) |
| `01-hero-aaliya-sultana-babi-portrait-640w.webp`<br>_(public-directory)_ | unreferenced-or-static | 640x960 | 1400px | 0.46 | 260 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.46 < 1.0 (upscaled on retina) |
| `01-hero-aaliya-sultana-babi-portrait.avif`<br>_(public-directory)_ | unreferenced-or-static | 683x1024 | 1400px | 0.49 | 269 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.49 < 1.0 (upscaled on retina) |
| `01-hero-aaliya-sultana-babi-portrait.webp`<br>_(public-directory)_ | unreferenced-or-static | 683x1024 | 1400px | 0.49 | 284 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.49 < 1.0 (upscaled on retina) |
| `og-aaliya-sultana-babi.jpg`<br>_(public-directory)_ | unreferenced-or-static | 1200x630 | 1400px | 0.86 | 372 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.86 < 1.0 (upscaled on retina) |
| `varanasi-silk-weaving-traditional-loom.webp`<br>_(public-directory)_ | unreferenced-or-static | 2400x1600 | 1400px | 1.71 | 566 | 🟢 KEEP | None |
| `rajasthani-royal-thali-banquet.webp`<br>_(public-directory)_ | unreferenced-or-static | 2400x1600 | 1400px | 1.71 | 35 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (35) - potential blur |
| `jaipur-city-palace-grand-facade.webp`<br>_(public-directory)_ | unreferenced-or-static | 3200x1600 | 1400px | 2.29 | 189 | 🟢 KEEP | None |
| `land-rover-defender-safari-expedition.jpg`<br>_(public-directory)_ | unreferenced-or-static | 2400x1624 | 1400px | 1.71 | 95 | 🟢 KEEP | None |
| `land-rover-defender-safari-expedition.webp`<br>_(public-directory)_ | unreferenced-or-static | 2400x1624 | 1400px | 1.71 | 110 | 🟢 KEEP | None |
| `maharaja-rolls-royce-vintage-collection.webp`<br>_(public-directory)_ | unreferenced-or-static | 2400x2003 | 1400px | 1.71 | 151 | 🟢 KEEP | None |
| `colorful-vibrant-indian-landscape(1).jpg`<br>_(public-directory)_ | unreferenced-or-static | 7000x4789 | 1400px | 5.00 | 132 | 🔴 REPLACE | Duplicate download suffix (1) |
| `images (5).jpg`<br>_(public-directory)_ | unreferenced-or-static | 574x348 | 1400px | 0.41 | 574 | 🔴 REPLACE | Browser thumbnail download name; Resolution deficit: ratio 0.41 < 1.0 (upscaled on retina) |
| `indian-city-buildings-scene(1).jpg`<br>_(public-directory)_ | unreferenced-or-static | 5376x3584 | 1400px | 3.84 | 2684 | 🔴 REPLACE | Duplicate download suffix (1) |
| `udaipur-city-view-from-hotel-balcony-rajasthan-india(1).jpg`<br>_(public-directory)_ | unreferenced-or-static | 7000x4672 | 1400px | 5.00 | 93 | 🔴 REPLACE | Duplicate download suffix (1) |
| `vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg`<br>_(public-directory)_ | unreferenced-or-static | 5514x3939 | 1400px | 3.94 | 486 | 🔴 REPLACE | Vecteezy stock filename |
| `02-dome.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2817 | 1400px | 1.43 | 393 | 🟢 KEEP | None |
| `03-durbar-hall.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1542 | 1400px | 1.43 | 113 | 🟢 KEEP | None |
| `04-norblin-murals.webp`<br>_(public-directory)_ | unreferenced-or-static | 1022x1500 | 1400px | 0.73 | 483 | 🔴 REPLACE | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `05-arrival.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x722 | 1400px | 1.43 | 322 | 🟢 KEEP | None |
| `06-pool.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1277 | 1400px | 1.43 | 220 | 🟢 KEEP | None |
| `09-sunset-terrace.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1201 | 1400px | 1.43 | 9 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (9) - potential blur |
| `10-aerial-sunset.webp`<br>_(public-directory)_ | unreferenced-or-static | 1920x1080 | 1400px | 1.37 | 61 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 358 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 263 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 164 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 318 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 1358x2048 | 1400px | 0.97 | 13 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.97 < 1.0 (upscaled on retina); Low Laplacian sharpness variance (13) - potential blur |
| `img-07.webp`<br>_(public-directory)_ | unreferenced-or-static | 1358x2048 | 1400px | 0.97 | 197 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.97 < 1.0 (upscaled on retina) |
| `01-hero.webp`<br>_(public-directory)_ | unreferenced-or-static | 1943x1410 | 1400px | 1.39 | 303 | 🟢 KEEP | None |
| `04-mor-chowk.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 419 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2988 | 1400px | 1.43 | 246 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2988 | 1400px | 1.43 | 24 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (24) - potential blur |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x3083 | 1400px | 1.43 | 755 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 1536x2048 | 1400px | 1.10 | 225 | 🟢 KEEP | None |
| `krishna-vilas-chamber.png`<br>_(public-directory)_ | unreferenced-or-static | 1672x941 | 1400px | 1.19 | 354 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1335 | 1400px | 1.43 | 121 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 712x590 | 1400px | 0.51 | 309 | 🔴 REPLACE | Resolution deficit: ratio 0.51 < 1.0 (upscaled on retina) |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x723 | 1400px | 1.43 | 101 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 204 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x579 | 1400px | 1.43 | 371 | 🟢 KEEP | None |
| `img-07.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1125 | 1400px | 1.43 | 463 | 🟢 KEEP | None |
| `img-08.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 61 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 712x590 | 1400px | 0.51 | 309 | 🔴 REPLACE | Resolution deficit: ratio 0.51 < 1.0 (upscaled on retina) |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 419 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x3000 | 1400px | 1.43 | 277 | 🟢 KEEP | None |
| `01-hero.jpg`<br>_(public-directory)_ | unreferenced-or-static | 2048x1358 | 1400px | 1.46 | 124 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1326 | 1400px | 1.43 | 127 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1326 | 1400px | 1.43 | 253 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1326 | 1400px | 1.43 | 25 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (25) - potential blur |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 61 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 135 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 276 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 160 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 285 | 🟢 KEEP | None |
| `07-blue-city.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 311 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 77 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1189 | 1400px | 1.43 | 127 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 94 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 122 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 60 | 🟢 KEEP | None |
| `img-07.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 215 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 238 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 712x431 | 1400px | 0.51 | 287 | 🔴 REPLACE | Resolution deficit: ratio 0.51 < 1.0 (upscaled on retina) |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x957 | 1400px | 1.43 | 605 | 🟢 KEEP | None |
| `img-07.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1058 | 1400px | 1.43 | 511 | 🟢 KEEP | None |
| `img-08.webp`<br>_(public-directory)_ | unreferenced-or-static | 1802x2508 | 1400px | 1.29 | 107 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1277 | 1400px | 1.43 | 220 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1488 | 1400px | 1.43 | 87 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x3087 | 1400px | 1.43 | 31 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (31) - potential blur |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 397 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2667 | 1400px | 1.43 | 347 | 🟢 KEEP | None |
| `01-hero.jpg`<br>_(public-directory)_ | unreferenced-or-static | 2400x1678 | 1400px | 1.71 | 307 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 13 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (13) - potential blur |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1399 | 1400px | 1.43 | 444 | 🟢 KEEP | None |
| `09-blue-hour.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 118 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1518 | 1400px | 1.43 | 238 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1335 | 1400px | 1.43 | 318 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 467 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 410 | 🟢 KEEP | None |
| `img-07.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 244 | 🟢 KEEP | None |
| `03-courtyard.webp`<br>_(public-directory)_ | unreferenced-or-static | 950x713 | 1400px | 0.68 | 2025 | 🔴 REPLACE | Resolution deficit: ratio 0.68 < 1.0 (upscaled on retina) |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 950x535 | 1400px | 0.68 | 506 | 🔴 REPLACE | Resolution deficit: ratio 0.68 < 1.0 (upscaled on retina) |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 950x713 | 1400px | 0.68 | 2025 | 🔴 REPLACE | Resolution deficit: ratio 0.68 < 1.0 (upscaled on retina) |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1324 | 1400px | 1.43 | 728 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 976 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 1280x960 | 1400px | 0.91 | 106 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.91 < 1.0 (upscaled on retina) |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1347 | 1400px | 1.43 | 191 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 383x240 | 1400px | 0.27 | 1058 | 🔴 REPLACE | Resolution deficit: ratio 0.27 < 1.0 (upscaled on retina) |
| `01-hero.jpg`<br>_(public-directory)_ | unreferenced-or-static | 2400x1800 | 1400px | 1.71 | 200 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 1004x1464 | 1400px | 0.72 | 83 | 🔴 REPLACE | Resolution deficit: ratio 0.72 < 1.0 (upscaled on retina) |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 1668x1042 | 1400px | 1.19 | 107 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x3000 | 1400px | 1.43 | 9 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (9) - potential blur |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 427 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 506 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1414 | 1400px | 1.43 | 57 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (57) - potential blur |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 1171x2000 | 1400px | 0.84 | 174 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.84 < 1.0 (upscaled on retina) |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1309 | 1400px | 1.43 | 590 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1417 | 1400px | 1.43 | 44 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (44) - potential blur |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 900 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1127 | 1400px | 1.43 | 1595 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1334 | 1400px | 1.43 | 444 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 131 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 199 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 280x361 | 1400px | 0.20 | 2718 | 🔴 REPLACE | Resolution deficit: ratio 0.20 < 1.0 (upscaled on retina) |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 1920x1080 | 1400px | 1.37 | 273 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1499 | 1400px | 1.43 | 501 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1332 | 1400px | 1.43 | 131 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 433 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 1536x2048 | 1400px | 1.10 | 533 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1435 | 1400px | 1.43 | 557 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 114 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 30 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (30) - potential blur |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 24 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (24) - potential blur |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 27 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (27) - potential blur |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x3000 | 1400px | 1.43 | 643 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1727 | 1400px | 1.43 | 11 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (11) - potential blur |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1654 | 1400px | 1.43 | 608 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1349 | 1400px | 1.43 | 239 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1269 | 1400px | 1.43 | 4 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (4) - potential blur |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 444 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 799x520 | 1400px | 0.57 | 453 | 🔴 REPLACE | Resolution deficit: ratio 0.57 < 1.0 (upscaled on retina) |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1328 | 1400px | 1.43 | 205 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 67 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 89 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 317 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x887 | 1400px | 1.43 | 260 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1012 | 1400px | 1.43 | 470 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 640x480 | 1400px | 0.46 | 537 | 🔴 REPLACE | Resolution deficit: ratio 0.46 < 1.0 (upscaled on retina) |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 480x640 | 1400px | 0.34 | 673 | 🔴 REPLACE | Resolution deficit: ratio 0.34 < 1.0 (upscaled on retina) |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 1072x1624 | 1400px | 0.77 | 387 | 🔴 REPLACE | Resolution deficit: ratio 0.77 < 1.0 (upscaled on retina) |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x311 | 1400px | 1.43 | 230 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x793 | 1400px | 1.43 | 468 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 1900x1871 | 1400px | 1.36 | 1336 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 799 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 870 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 645x400 | 1400px | 0.46 | 191 | 🔴 REPLACE | Resolution deficit: ratio 0.46 < 1.0 (upscaled on retina) |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1186 | 1400px | 1.43 | 40 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (40) - potential blur |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1320 | 1400px | 1.43 | 204 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 132 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1508 | 1400px | 1.43 | 400 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1504 | 1400px | 1.43 | 70 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x3107 | 1400px | 1.43 | 72 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1357 | 1400px | 1.43 | 569 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 1914x2878 | 1400px | 1.37 | 92 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1534 | 1400px | 1.43 | 244 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 1021x627 | 1400px | 0.73 | 1281 | 🔴 REPLACE | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2992 | 1400px | 1.43 | 33 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (33) - potential blur |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1406 | 1400px | 1.43 | 57 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (57) - potential blur |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 114 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1331 | 1400px | 1.43 | 942 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1182 | 1400px | 1.43 | 448 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1418 | 1400px | 1.43 | 37 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (37) - potential blur |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 1024x769 | 1400px | 0.73 | 942 | 🔴 REPLACE | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 1024x760 | 1400px | 0.73 | 642 | 🔴 REPLACE | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1270 | 1400px | 1.43 | 776 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x668 | 1400px | 1.43 | 163 | 🟢 KEEP | None |
| `img-07.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x810 | 1400px | 1.43 | 107 | 🟢 KEEP | None |
| `img-08.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 76 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 1280x960 | 1400px | 0.91 | 386 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.91 < 1.0 (upscaled on retina) |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 1280x960 | 1400px | 0.91 | 347 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.91 < 1.0 (upscaled on retina) |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1043 | 1400px | 1.43 | 313 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2000 | 1400px | 1.43 | 223 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2996 | 1400px | 1.43 | 238 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x683 | 1400px | 1.43 | 442 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 444 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1334 | 1400px | 1.43 | 461 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 143 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1331 | 1400px | 1.43 | 349 | 🟢 KEEP | None |
| `img-07.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1268 | 1400px | 1.43 | 1119 | 🟢 KEEP | None |
| `img-08.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x3000 | 1400px | 1.43 | 457 | 🟢 KEEP | None |
| `img-09.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x963 | 1400px | 1.43 | 196 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 353 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 320 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 205 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 378 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1358 | 1400px | 1.43 | 196 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x428 | 1400px | 1.43 | 256 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1335 | 1400px | 1.43 | 417 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2000 | 1400px | 1.43 | 275 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 1006 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1515 | 1400px | 1.43 | 1332 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1163 | 1400px | 1.43 | 832 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2837 | 1400px | 1.43 | 172 | 🟢 KEEP | None |
| `img-07.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1335 | 1400px | 1.43 | 1243 | 🟢 KEEP | None |
| `img-08.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 808 | 🟢 KEEP | None |
| `img-09.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1329 | 1400px | 1.43 | 185 | 🟢 KEEP | None |
| `img-10.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1334 | 1400px | 1.43 | 291 | 🟢 KEEP | None |
| `img-11.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2703 | 1400px | 1.43 | 50 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (50) - potential blur |
| `img-12.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1359 | 1400px | 1.43 | 148 | 🟢 KEEP | None |
| `img-13.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1409 | 1400px | 1.43 | 116 | 🟢 KEEP | None |
| `img-14.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x3000 | 1400px | 1.43 | 81 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 1280x857 | 1400px | 0.91 | 797 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.91 < 1.0 (upscaled on retina) |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 1558x1179 | 1400px | 1.11 | 1607 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 1280x948 | 1400px | 0.91 | 481 | 🟡 FIX-RENDER | Resolution deficit: ratio 0.91 < 1.0 (upscaled on retina) |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 235 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1329 | 1400px | 1.43 | 1150 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1330 | 1400px | 1.43 | 145 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 640x480 | 1400px | 0.46 | 473 | 🔴 REPLACE | Resolution deficit: ratio 0.46 < 1.0 (upscaled on retina) |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2000 | 1400px | 1.43 | 135 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x754 | 1400px | 1.43 | 640 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 162 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 1996x2620 | 1400px | 1.43 | 245 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1339 | 1400px | 1.43 | 140 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1325 | 1400px | 1.43 | 522 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1432 | 1400px | 1.43 | 168 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1662 | 1400px | 1.43 | 75 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1474 | 1400px | 1.43 | 754 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1334 | 1400px | 1.43 | 239 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2667 | 1400px | 1.43 | 448 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1105 | 1400px | 1.43 | 399 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1150 | 1400px | 1.43 | 509 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x911 | 1400px | 1.43 | 346 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 971 | 🟢 KEEP | None |
| `img-06.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 691 | 🟢 KEEP | None |
| `img-07.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1339 | 1400px | 1.43 | 6 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (6) - potential blur |
| `img-08.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1266 | 1400px | 1.43 | 382 | 🟢 KEEP | None |
| `img-09.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1000 | 1400px | 1.43 | 319 | 🟢 KEEP | None |
| `img-10.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 415 | 🟢 KEEP | None |
| `img-11.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 70 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x2918 | 1400px | 1.43 | 95 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x3000 | 1400px | 1.43 | 584 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 833 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 775 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x740 | 1400px | 1.43 | 795 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1335 | 1400px | 1.43 | 327 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1122 | 1400px | 1.43 | 416 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1125 | 1400px | 1.43 | 504 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 346x190 | 1400px | 0.25 | 460 | 🔴 REPLACE | Resolution deficit: ratio 0.25 < 1.0 (upscaled on retina) |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1437 | 1400px | 1.43 | 250 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1303 | 1400px | 1.43 | 472 | 🟢 KEEP | None |
| `img-01.webp`<br>_(public-directory)_ | unreferenced-or-static | 1920x1080 | 1400px | 1.37 | 61 | 🟢 KEEP | None |
| `img-02.webp`<br>_(public-directory)_ | unreferenced-or-static | 2400x1522 | 1400px | 1.71 | 239 | 🟢 KEEP | None |
| `img-03.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1500 | 1400px | 1.43 | 263 | 🟢 KEEP | None |
| `img-04.webp`<br>_(public-directory)_ | unreferenced-or-static | 2000x1542 | 1400px | 1.43 | 113 | 🟢 KEEP | None |
| `img-05.webp`<br>_(public-directory)_ | unreferenced-or-static | 712x590 | 1400px | 0.51 | 309 | 🔴 REPLACE | Resolution deficit: ratio 0.51 < 1.0 (upscaled on retina) |
| `01-hero.webp`<br>_(public-directory)_ | unreferenced-or-static | 1024x681 | 1400px | 0.73 | 772 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `02-portrait-colour.webp`<br>_(public-directory)_ | unreferenced-or-static | 682x1024 | 1400px | 0.49 | 89 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.49 < 1.0 (upscaled on retina) |
| `03-plate-vigil.webp`<br>_(public-directory)_ | unreferenced-or-static | 1024x682 | 1400px | 0.73 | 995 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `04-plate-arrival.jpg`<br>_(public-directory)_ | unreferenced-or-static | 1024x682 | 1400px | 0.73 | 764 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `04-plate-arrival.webp`<br>_(public-directory)_ | unreferenced-or-static | 1024x682 | 1400px | 0.73 | 754 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `06-plate-last-light.jpg`<br>_(public-directory)_ | unreferenced-or-static | 1024x682 | 1400px | 0.73 | 780 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `06-plate-last-light.webp`<br>_(public-directory)_ | unreferenced-or-static | 1024x682 | 1400px | 0.73 | 775 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.73 < 1.0 (upscaled on retina) |
| `og-shivanjali-kumari-dungarpur.jpg`<br>_(public-directory)_ | unreferenced-or-static | 1200x630 | 1400px | 0.86 | 444 | 🔵 KEPT-EDITORIAL | Resolution deficit: ratio 0.86 < 1.0 (upscaled on retina) |
| `fashion-trends-runway-2026.jpg`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 256 | 🟢 KEEP | None |
| `luxury-fashion-trends-editorial.jpg`<br>_(public-directory)_ | unreferenced-or-static | 2000x3000 | 1400px | 1.43 | 21 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (21) - potential blur |
| `style-hero-couture-runway.jpg`<br>_(public-directory)_ | unreferenced-or-static | 2000x3000 | 1400px | 1.43 | 21 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (21) - potential blur |
| `01-hero.jpg`<br>_(public-directory)_ | unreferenced-or-static | 6000x4000 | 1400px | 4.29 | 190 | 🟢 KEEP | None |
| `02-dome.jpg`<br>_(public-directory)_ | unreferenced-or-static | 3816x5375 | 1400px | 2.73 | 93 | 🟢 KEEP | None |
| `01-hero.jpg`<br>_(public-directory)_ | unreferenced-or-static | 1943x1410 | 1400px | 1.39 | 294 | 🟢 KEEP | None |
| `04-mor-chowk.jpg`<br>_(public-directory)_ | unreferenced-or-static | 3072x2304 | 1400px | 2.19 | 173 | 🟢 KEEP | None |
| `01-hero.jpg`<br>_(public-directory)_ | unreferenced-or-static | 4914x3117 | 1400px | 3.51 | 64 | 🟢 KEEP | None |
| `04-mor-chowk.jpg`<br>_(public-directory)_ | unreferenced-or-static | 3072x2304 | 1400px | 2.19 | 173 | 🟢 KEEP | None |
| `01-hero.jpg`<br>_(public-directory)_ | unreferenced-or-static | 800x393 | 1400px | 0.57 | 1308 | 🔴 REPLACE | Resolution deficit: ratio 0.57 < 1.0 (upscaled on retina) |
| `01-durbar-hall.jpg`<br>_(public-directory)_ | unreferenced-or-static | 4272x2848 | 1400px | 3.05 | 15 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (15) - potential blur |
| `01-courtyard.jpg`<br>_(public-directory)_ | unreferenced-or-static | 5616x3744 | 1400px | 4.01 | 96 | 🟢 KEEP | None |
| `01-mehrangarh-fort.jpg`<br>_(public-directory)_ | unreferenced-or-static | 5400x3600 | 1400px | 3.86 | 20 | 🟡 FIX-RENDER | Low Laplacian sharpness variance (20) - potential blur |
| `07-blue-city.jpg`<br>_(public-directory)_ | unreferenced-or-static | 3072x2048 | 1400px | 2.19 | 137 | 🟢 KEEP | None |
| `balmoral-doorman-tartan.jpg`<br>_(public-directory)_ | unreferenced-or-static | 1500x1125 | 1400px | 1.07 | 177 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-irene-forte-spa.jpg`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 218 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-jk-rowling-suite.jpg`<br>_(public-directory)_ | unreferenced-or-static | 2000x1333 | 1400px | 1.43 | 189 | 🔵 KEPT-EDITORIAL | None |
| `balmoral-palm-court-tea.jpg`<br>_(public-directory)_ | unreferenced-or-static | 1750x1167 | 1400px | 1.25 | 247 | 🔵 KEPT-EDITORIAL | None |
