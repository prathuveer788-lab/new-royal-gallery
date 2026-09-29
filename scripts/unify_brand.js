const fs = require('fs');
const path = require('path');

// 1. Update lib/travel-articles.ts
const pTravel = path.join(__dirname, '../lib/travel-articles.ts');
if (fs.existsSync(pTravel)) {
  let content = fs.readFileSync(pTravel, 'utf8');
  const countBefore = (content.match(/The Royal Gallery Editorial/g) || []).length;
  content = content.replace(/The Royal Gallery Editorial/g, 'The Royal Gallerys Editorial');
  content = content.replace(/The Royal Gallery\b/g, 'The Royal Gallerys');
  fs.writeFileSync(pTravel, content, 'utf8');
  console.log('lib/travel-articles.ts updated. Replacements:', countBefore);
}

// 2. Update lib/content/*.ts
const contentDir = path.join(__dirname, '../lib/content');
if (fs.existsSync(contentDir)) {
  const files = fs.readdirSync(contentDir);
  let contentFilesUpdated = 0;
  for (const f of files) {
    if (f.endsWith('.ts')) {
      const full = path.join(contentDir, f);
      let c = fs.readFileSync(full, 'utf8');
      if (c.includes('The Royal Gallery Editorial') || c.includes('The Royal Gallery')) {
        c = c.replace(/The Royal Gallery Editorial/g, 'The Royal Gallerys Editorial');
        c = c.replace(/The Royal Gallery\b/g, 'The Royal Gallerys');
        fs.writeFileSync(full, c, 'utf8');
        contentFilesUpdated++;
      }
    }
  }
  console.log('lib/content files updated:', contentFilesUpdated);
}

// 3. Scan app/ for any "The Royal Gallery " without 's'
const appDir = path.join(__dirname, '../app');
function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (['node_modules', '.next', '.git'].includes(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      scanDir(full);
    } else if (e.name.endsWith('.tsx') || e.name.endsWith('.ts')) {
      let c = fs.readFileSync(full, 'utf8');
      if (c.includes('The Royal Gallery ') || c.includes('The Royal Gallery"')) {
        c = c.replace(/The Royal Gallery(?![s'’])/g, 'The Royal Gallerys');
        fs.writeFileSync(full, c, 'utf8');
        console.log('Updated app file:', path.relative(process.cwd(), full));
      }
    }
  }
}
scanDir(appDir);
console.log('Brand unification complete.');
