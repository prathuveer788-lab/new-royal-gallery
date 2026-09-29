const fs = require('fs');
const path = require('path');

const libFiles = fs.readdirSync('lib')
  .filter(f => f.endsWith('-articles.ts') || f.endsWith('articles.ts'))
  .map(f => path.join('lib', f));

console.log('Scanning lib article files:', libFiles);

const sectionImages = {};
const allImagesGlobal = {};

for (const file of libFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const sectionName = path.basename(file).replace('-articles.ts', '').replace('.ts', '');
  sectionImages[sectionName] = [];

  // Match objects with image / heroImage / img
  const imgRegex = /(?:image|heroImage|img|coverImage)\s*:\s*["']([^"']+)["']/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const url = match[1];
    sectionImages[sectionName].push(url);
    if (!allImagesGlobal[url]) {
      allImagesGlobal[url] = [];
    }
    allImagesGlobal[url].push({ section: sectionName, file });
  }
}

console.log('\n--- SECTION-BY-SECTION IMAGE ANALYSIS ---');
for (const [sec, imgs] of Object.entries(sectionImages)) {
  const counts = {};
  for (const img of imgs) {
    counts[img] = (counts[img] || 0) + 1;
  }
  const duplicates = Object.entries(counts).filter(([_, c]) => c > 1);
  console.log(`\nSection [${sec}]: total images = ${imgs.length}, unique = ${Object.keys(counts).length}`);
  if (duplicates.length > 0) {
    console.log(`  ⚠️ DUPLICATES INSIDE SECTION [${sec}]:`);
    for (const [url, count] of duplicates) {
      console.log(`    - (${count}x) ${url}`);
    }
  } else {
    console.log(`  ✓ No duplicate images inside section [${sec}]`);
  }
}

console.log('\n--- GLOBAL CROSS-SECTION DUPLICATES ---');
let crossCount = 0;
for (const [url, locations] of Object.entries(allImagesGlobal)) {
  if (locations.length > 1) {
    crossCount++;
    console.log(`- (${locations.length}x) ${url}`);
    console.log(`    used in: ${locations.map(l => l.section).join(', ')}`);
  }
}
console.log(`Total duplicate image URLs globally: ${crossCount}`);
