const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('lib/travel-articles.ts', 'utf8');
const lines = content.split('\n');
let currentSlug = '';
const remoteHeroes = [];

lines.forEach((line) => {
  const sm = line.match(/slug:\s*"([^"]+)"/);
  if (sm) currentSlug = sm[1];
  const hm = line.match(/heroImage:\s*"([^"]+)"/);
  if (hm && hm[1].startsWith('http')) {
    remoteHeroes.push({ slug: currentSlug, url: hm[1] });
  }
});

console.log(`Found ${remoteHeroes.length} remote heroes:`);
const expDirs = fs.readdirSync('public/images/experiences');

remoteHeroes.forEach((h) => {
  const dirMatch = expDirs.find(d => d.endsWith(h.slug) || d.includes(h.slug.replace(/-/g, '')));
  let localFiles = [];
  if (dirMatch) {
    localFiles = fs.readdirSync(path.join('public/images/experiences', dirMatch)).filter(f => !f.startsWith('.'));
  }
  console.log(`  ${h.slug} (dir: ${dirMatch || 'NONE'}):`);
  console.log(`    URL: ${h.url}`);
  console.log(`    Files: ${localFiles.slice(0, 5).join(', ')}${localFiles.length > 5 ? '... (' + localFiles.length + ' total)' : ''}`);
});
