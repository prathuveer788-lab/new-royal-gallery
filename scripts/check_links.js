const fs = require('fs');
const path = require('path');

const allHrefs = [];

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      
      // Match href="..." and href='...'
      const r1 = /href\s*=\s*["']([^"']+)["']/g;
      let m;
      while ((m = r1.exec(content)) !== null) {
        allHrefs.push({ file: path.relative(process.cwd(), full).replace(/\\/g, '/'), href: m[1].trim() });
      }

      // Match href={`...`}
      const r2 = /href\s*=\s*\{`([^`]+)`\}/g;
      while ((m = r2.exec(content)) !== null) {
        allHrefs.push({ file: path.relative(process.cwd(), full).replace(/\\/g, '/'), href: m[1].trim() });
      }

      // Match href={something} where it's a string literal or variable
      const r3 = /href\s*:\s*["']([^"']+)["']/g;
      while ((m = r3.exec(content)) !== null) {
        allHrefs.push({ file: path.relative(process.cwd(), full).replace(/\\/g, '/'), href: m[1].trim() });
      }

      // Match raw href="#"
      const r4 = /href\s*=\s*["']#["']/g;
      while ((m = r4.exec(content)) !== null) {
        allHrefs.push({ file: path.relative(process.cwd(), full).replace(/\\/g, '/'), href: '#' });
      }
    }
  }
}

scanDir(path.join(process.cwd(), 'app'));
scanDir(path.join(process.cwd(), 'lib'));

console.log('Total href count:', allHrefs.length);

const exactHash = allHrefs.filter(h => h.href === '#');
console.log('--- EXACT HASH # (DEAD LINKS) count:', exactHash.length, '---');
exactHash.forEach(h => console.log(`  ${h.file} -> ${h.href}`));

const inPageAnchors = allHrefs.filter(h => h.href.startsWith('#') && h.href.length > 1);
console.log('--- IN-PAGE ANCHORS count:', inPageAnchors.length, '---');
inPageAnchors.forEach(h => console.log(`  ${h.file} -> ${h.href}`));

const internal = allHrefs.filter(h => h.href.startsWith('/') && !h.href.startsWith('//'));
const uniqueInternal = [...new Set(internal.map(h => h.href))].sort();
console.log('--- ALL UNIQUE INTERNAL PATHS (' + uniqueInternal.length + ') ---');
console.log(uniqueInternal);
