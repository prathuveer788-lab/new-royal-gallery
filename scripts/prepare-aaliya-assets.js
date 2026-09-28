const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcPath = 'C:/Users/PC/.gemini/antigravity/brain/3d2f6417-cf5c-4155-937e-6b2941eec449/.user_uploaded/media_1790575298668.jpg';
const destDir = path.join(__dirname, '..', 'public', 'images', 'aaliya-sultana-babi');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const destHeroJpg = path.join(destDir, '01-hero-aaliya-sultana-babi-portrait.jpg');
fs.copyFileSync(srcPath, destHeroJpg);
console.log('Hero JPG copied to', destHeroJpg);

async function processImages() {
  const image = sharp(destHeroJpg);
  const meta = await image.metadata();
  console.log('Original dimensions:', meta.width, 'x', meta.height);

  // WebP
  await sharp(destHeroJpg)
    .webp({ quality: 88 })
    .toFile(path.join(destDir, '01-hero-aaliya-sultana-babi-portrait.webp'));
  console.log('WebP created');

  // AVIF
  await sharp(destHeroJpg)
    .avif({ quality: 82 })
    .toFile(path.join(destDir, '01-hero-aaliya-sultana-babi-portrait.avif'));
  console.log('AVIF created');

  // Width 640
  await sharp(destHeroJpg)
    .resize({ width: 640 })
    .jpeg({ quality: 85 })
    .toFile(path.join(destDir, '01-hero-aaliya-sultana-babi-portrait-640w.jpg'));

  await sharp(destHeroJpg)
    .resize({ width: 640 })
    .webp({ quality: 85 })
    .toFile(path.join(destDir, '01-hero-aaliya-sultana-babi-portrait-640w.webp'));
  console.log('640w created');

  // Width 1024
  await sharp(destHeroJpg)
    .resize({ width: 1024 })
    .jpeg({ quality: 88 })
    .toFile(path.join(destDir, '01-hero-aaliya-sultana-babi-portrait-1024w.jpg'));

  await sharp(destHeroJpg)
    .resize({ width: 1024 })
    .webp({ quality: 88 })
    .toFile(path.join(destDir, '01-hero-aaliya-sultana-babi-portrait-1024w.webp'));
  console.log('1024w created');

  // 1200x630 OpenGraph / Twitter card image
  const ogCanvasWidth = 1200;
  const ogCanvasHeight = 630;
  
  // Crop hero for left side 480x630, focusing on upper portion with face and gilded chair
  const heroResized = await sharp(destHeroJpg)
    .resize({ width: 480, height: 630, fit: 'cover', position: sharp.position.north })
    .toBuffer();

  const svgOverlay = Buffer.from(`
    <svg width="720" height="630" viewBox="0 0 720 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="630" fill="#22344A"/>
      <rect x="25" y="25" width="670" height="580" fill="none" stroke="#D4673A" stroke-width="1" opacity="0.35"/>
      
      <!-- Rubric -->
      <text x="60" y="85" font-family="Cinzel, Cormorant Garamond, serif" font-size="13" font-weight="600" fill="#D4673A" letter-spacing="4">PORTRAITS OF HERITAGE</text>
      <text x="60" y="110" font-family="Cinzel, Cormorant Garamond, serif" font-size="11" fill="#B8A47A" letter-spacing="3">HERITAGE EDITION 2026 · VOL. XII</text>
      
      <!-- Divider rule -->
      <line x1="60" y1="135" x2="260" y2="135" stroke="#D4673A" stroke-width="2" />
      <text x="60" y="160" font-family="sans-serif" font-size="10" fill="#EFE3D2" letter-spacing="2">BALASINOR, GUJARAT · 65 MILLION YEARS</text>
      
      <!-- Headline -->
      <text x="60" y="225" font-family="Playfair Display, Georgia, serif" font-weight="bold" font-size="38" fill="#F3E7D3">The Woman Who</text>
      <text x="60" y="275" font-family="Playfair Display, Georgia, serif" font-weight="bold" font-size="38" fill="#F3E7D3">Walks With <tspan fill="#D4673A" font-style="italic">Giants.</tspan></text>
      
      <!-- Subject -->
      <text x="60" y="340" font-family="Playfair Display, Georgia, serif" font-style="italic" font-size="28" fill="#F3E7D3">Aaliya Sultana Babi</text>
      <text x="60" y="375" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-size="18" fill="#EFE3D2" opacity="0.9">The Dinosaur Princess of Balasinor</text>
      
      <!-- Meta details -->
      <line x1="60" y1="420" x2="660" y2="420" stroke="#2F4560" stroke-width="1" />
      <text x="60" y="460" font-family="sans-serif" font-size="12" fill="#EFE3D2">WORDS BY KRISHANPRIYA RAJAWAT</text>
      <text x="60" y="485" font-family="sans-serif" font-size="11" fill="#9B9589">RAIYOLI · GUJARAT · INDIA</text>
      
      <!-- Publication Brand -->
      <text x="60" y="555" font-family="Cormorant Garamond, Georgia, serif" font-size="20" font-weight="normal" fill="#F3E7D3" letter-spacing="4">THE ROYAL GALLERYS</text>
      <text x="60" y="580" font-family="sans-serif" font-size="9" fill="#B8A47A" letter-spacing="3">HERITAGE · CULTURE · LUXURY</text>
    </svg>
  `);

  await sharp({
    create: {
      width: ogCanvasWidth,
      height: ogCanvasHeight,
      channels: 3,
      background: '#22344A'
    }
  })
  .composite([
    { input: heroResized, left: 0, top: 0 },
    { input: svgOverlay, left: 480, top: 0 }
  ])
  .jpeg({ quality: 90 })
  .toFile(path.join(destDir, 'og-aaliya-sultana-babi.jpg'));

  console.log('OG image created successfully');
}

processImages().catch(err => console.error(err));
