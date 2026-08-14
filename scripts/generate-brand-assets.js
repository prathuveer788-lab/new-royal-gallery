// Generates the missing brand SEO assets referenced by app/layout.tsx:
//   public/og-image.jpg  (1200x630 Open Graph share card)
//   public/icon.png      (512x512 favicon / apple-touch icon)
// Run: node scripts/generate-brand-assets.js
const sharp = require("sharp");
const path = require("path");

const OBSIDIAN = "#11110F";
const IVORY = "#F4F0E7";
const BRONZE = "#8A7352";
const CHAMPAGNE = "#B8A47A";
const STONE = "#9B9589";

async function main() {
  // ── Open Graph share card ───────────────────────────────
  const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="${OBSIDIAN}"/>
    <rect x="46" y="46" width="1108" height="538" fill="none" stroke="${BRONZE}" stroke-width="1.5"/>
    <rect x="58" y="58" width="1084" height="514" fill="none" stroke="${BRONZE}" stroke-width="0.75" opacity="0.5"/>
    <text x="600" y="250" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="82" letter-spacing="10" fill="${IVORY}">THE ROYAL GALLERYS</text>
    <line x1="470" y1="290" x2="730" y2="290" stroke="${CHAMPAGNE}" stroke-width="1"/>
    <text x="600" y="345" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" letter-spacing="8" fill="${CHAMPAGNE}">HERITAGE · CULTURE · LUXURY</text>
    <text x="600" y="445" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="3" fill="${STONE}">The International Magazine</text>
  </svg>`;
  await sharp(Buffer.from(ogSvg)).jpeg({ quality: 90 }).toFile(path.join("public", "og-image.jpg"));

  // ── Favicon / apple-touch icon ──────────────────────────
  const iconSvg = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="${OBSIDIAN}"/>
    <rect x="32" y="32" width="448" height="448" fill="none" stroke="${BRONZE}" stroke-width="4"/>
    <text x="256" y="296" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="150" letter-spacing="4" fill="${IVORY}">RG</text>
    <line x1="166" y1="330" x2="346" y2="330" stroke="${CHAMPAGNE}" stroke-width="3"/>
    <text x="256" y="382" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="6" fill="${CHAMPAGNE}">HERITAGE · LUXURY</text>
  </svg>`;
  await sharp(Buffer.from(iconSvg)).png().toFile(path.join("public", "icon.png"));

  console.log("Generated public/og-image.jpg and public/icon.png");
}

main().catch((err) => {
  console.error("Failed to generate brand assets:", err.message);
  process.exit(1);
});
