const fs = require('fs');
const path = require('path');

const libFiles = fs.readdirSync('lib')
  .filter(f => f.endsWith('-articles.ts') || f.endsWith('articles.ts'))
  .map(f => path.join('lib', f));

const results = [];

for (const file of libFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const sectionName = path.basename(file).replace('-articles.ts', '').replace('.ts', '');
  
  // Find all article blocks
  const slugMatches = [...content.matchAll(/slug\s*:\s*["']([^"']+)["']/g)];
  for (const sMatch of slugMatches) {
    const slug = sMatch[1];
    // Find the slice for this article until next slug or end
    const startIdx = sMatch.index;
    const nextMatch = content.slice(startIdx + 10).search(/slug\s*:\s*["']/);
    const endIdx = nextMatch !== -1 ? startIdx + 10 + nextMatch : content.length;
    const articleBlock = content.slice(startIdx, endIdx);

    const heroMatch = articleBlock.match(/heroImage\s*:\s*["']([^"']*)["']/);
    const heroImage = heroMatch ? heroMatch[1] : null;

    const breakMatches = [...articleBlock.matchAll(/image\s*:\s*["']([^"']+)["']/g)]
      .map(m => m[1])
      .filter(img => !img.includes('.ts') && !img.includes('.js'));

    results.push({
      section: sectionName,
      slug,
      heroImage,
      breaks: breakMatches
    });
  }
}

console.log(`Total articles found: ${results.length}`);

const missingHero = results.filter(r => !r.heroImage || r.heroImage.trim() === '');
console.log(`Articles with missing heroImage: ${missingHero.length}`);
if (missingHero.length > 0) {
  console.log(missingHero);
}

// Check which images are on disk vs unsplash
let totalImages = 0;
let missingFiles = 0;
for (const r of results) {
  const allImgs = [r.heroImage, ...r.breaks].filter(Boolean);
  for (const img of allImgs) {
    totalImages++;
    if (!img.startsWith('http')) {
      const local = path.join('public', img.startsWith('/') ? img.slice(1) : img);
      if (!fs.existsSync(local)) {
        missingFiles++;
        console.log(`Missing file on disk: ${img} (in ${r.section}/${r.slug})`);
      }
    }
  }
}
console.log(`Total image occurrences checked: ${totalImages}`);
console.log(`Missing files on disk: ${missingFiles}`);
