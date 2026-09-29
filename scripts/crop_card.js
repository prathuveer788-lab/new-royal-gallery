const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcPath = 'C:/Users/PC/.gemini/antigravity/brain/4b294b02-3bfc-4949-a9e2-557d1cda474d/.user_uploaded/media_1790685410873.jpg';
const outDir = path.join(__dirname, '../public/images/membership');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function processImage() {
  const meta = await sharp(srcPath).metadata();
  console.log('Original dimensions:', meta.width, 'x', meta.height);

  // Copy full image
  fs.copyFileSync(srcPath, path.join(outDir, 'membership-cards-full.jpg'));
  console.log('Copied full image');

  // Let's crop the left card (front card)
  // Looking at the 1000x620 or roughly 2:1 aspect ratio:
  // Left card is approximately from left: ~2% to 49%, top: ~25% to 75%
  // Let's get precise bounding box by extracting the left card
  // Left card width ~ 47% of total width, height ~ 45% of total height
  // Let's extract front card
  const frontCrop = {
    left: Math.round(meta.width * 0.022),
    top: Math.round(meta.height * 0.258),
    width: Math.round(meta.width * 0.468),
    height: Math.round(meta.height * 0.450),
  };

  await sharp(srcPath)
    .extract(frontCrop)
    .toFile(path.join(outDir, 'card-front-base.png'));

  console.log('Cropped front card:', frontCrop);

  // Also crop the back card
  const backCrop = {
    left: Math.round(meta.width * 0.509),
    top: Math.round(meta.height * 0.258),
    width: Math.round(meta.width * 0.468),
    height: Math.round(meta.height * 0.450),
  };

  await sharp(srcPath)
    .extract(backCrop)
    .toFile(path.join(outDir, 'card-back-base.png'));

  console.log('Cropped back card:', backCrop);
}

processImage().catch(console.error);
