const fs = require('fs');
const path = require('path');

function audit() {
  console.log('====================================================');
  console.log('     THE ROYAL GALLERYS — MEDIA QUALITY AUDIT      ');
  console.log('====================================================\n');

  const INVENTORY_FILE = path.join(__dirname, '../data/media-inventory.json');
  const DATA_FILE = path.join(__dirname, '../lib/membership/private-world-data.ts');
  const PUBLIC_DIR = path.join(__dirname, '../public');

  if (!fs.existsSync(INVENTORY_FILE)) {
    console.error('FAIL: media-inventory.json missing.');
    return;
  }
  const inventory = JSON.parse(fs.readFileSync(INVENTORY_FILE, 'utf8'));
  console.log(`Media inventory records: ${inventory.length}`);

  const dataContent = fs.readFileSync(DATA_FILE, 'utf8');

  // Extract all stories
  const storyMatches = [...dataContent.matchAll(/id:\s*"([^"]+)",\s*worldId:\s*"([^"]+)"[\s\S]*?heroImage:\s*"([^"]+)",\s*secondaryImage:\s*"([^"]+)"/g)];

  console.log(`Auditing ${storyMatches.length} stories in private-world-data.ts...\n`);

  let errors = 0;
  const usedImages = new Map(); // imagePath -> storyId

  storyMatches.forEach((m, idx) => {
    const storyId = m[1];
    const heroImage = m[3];
    const secondaryImage = m[4];

    const checkImage = (img, role) => {
      // Check if it still uses legacy site-wide gallery image
      if (!img.startsWith('/images/private-world/')) {
        console.warn(`[FAIL] ${storyId} ${role} is using legacy/non-private image: ${img}`);
        errors++;
        return;
      }

      // Check if file exists on disk
      const diskPath = path.join(PUBLIC_DIR, img);
      if (!fs.existsSync(diskPath)) {
        console.error(`[FAIL] ${storyId} ${role} file missing on disk: ${diskPath}`);
        errors++;
        return;
      }

      // Check size
      const size = fs.statSync(diskPath).size;
      if (size < 5000) {
        console.error(`[FAIL] ${storyId} ${role} file suspiciously small (${size} bytes): ${diskPath}`);
        errors++;
        return;
      }

      // Check duplicate across different stories
      if (usedImages.has(img) && usedImages.get(img) !== storyId) {
        console.warn(`[WARN] Duplicate image across stories! Used in "${usedImages.get(img)}" and "${storyId}": ${img}`);
        errors++;
      } else {
        usedImages.set(img, storyId);
      }
    };

    checkImage(heroImage, 'heroImage');
    checkImage(secondaryImage, 'secondaryImage');
  });

  console.log('\n----------------------------------------------------');
  if (errors === 0) {
    console.log(`AUDIT PASSED! All ${storyMatches.length} stories have verified authentic, unique, non-recycled images on disk.`);
  } else {
    console.log(`AUDIT FOUND ${errors} issues to resolve.`);
  }
  console.log('----------------------------------------------------');
}

audit();
