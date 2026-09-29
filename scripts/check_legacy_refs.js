const fs = require('fs');

const content = fs.readFileSync('lib/membership/private-world-data.ts', 'utf8');
const regex = /"(\/images\/[^"]+)"/g;

let m;
const allPaths = [];
const legacyPaths = [];

while ((m = regex.exec(content)) !== null) {
  const p = m[1];
  allPaths.push(p);
  if (!p.startsWith('/images/private-world/')) {
    legacyPaths.push(p);
  }
}

console.log('Total /images/ paths:', allPaths.length);
console.log('Private world paths:', allPaths.length - legacyPaths.length);
console.log('Legacy paths remaining:', legacyPaths.length);
if (legacyPaths.length > 0) {
  console.log('Legacy list:', legacyPaths);
}
