const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, '..', 'lib', 'membership', 'private-world-catalog.ts'), 'utf8');

// Match each item block
const itemBlocks = fileContent.split(/\{\s*id:\s*["']/);

let contaminations = 0;

for (let i = 1; i < itemBlocks.length; i++) {
  const block = itemBlocks[i];
  const idMatch = block.match(/^([^"']+)/);
  const id = idMatch ? idMatch[1] : 'unknown';
  const catMatch = block.match(/category:\s*["']([^"']+)/);
  const category = catMatch ? catMatch[1] : 'unknown';

  const galleryMatch = block.match(/gallery:\s*\[([\s\S]*?)\]/);
  if (!galleryMatch) continue;

  const galleryImages = (galleryMatch[1].match(/["']([^"']+)["']/g) || []).map(s => s.replace(/["']/g, ''));

  for (const img of galleryImages) {
    if (category === 'firearms') {
      if (img.includes('/watches/') || img.includes('/automobiles/') || img.includes('/jewellery/') || img.includes('boulle') || img.includes('sevres') || img.includes('carpet')) {
        console.error(`CROSS CONTAMINATION in firearm ${id}: ${img}`);
        contaminations++;
      }
    }
    if (category === 'automobiles') {
      if (img.includes('/firearms/') || img.includes('/watches/') || img.includes('/jewellery/')) {
        console.error(`CROSS CONTAMINATION in automobile ${id}: ${img}`);
        contaminations++;
      }
    }
    if (category === 'watches') {
      if (img.includes('/firearms/') || img.includes('/automobiles/')) {
        console.error(`CROSS CONTAMINATION in watch ${id}: ${img}`);
        contaminations++;
      }
    }
  }
}

if (contaminations === 0) {
  console.log("✓ ZERO CROSS-CATEGORY CONTAMINATION! Every product gallery is 100% pure!");
} else {
  console.log(`✕ Found ${contaminations} cross-contaminations!`);
}
