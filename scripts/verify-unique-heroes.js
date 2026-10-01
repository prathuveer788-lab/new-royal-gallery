const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('lib/membership/private-world-catalog.ts', 'utf8');
const regex = /heroImage:\s*['"]([^'"]+)['"]/g;
let match;
const seen = new Set();
const duplicates = [];

while ((match = regex.exec(content)) !== null) {
  const url = match[1];
  if (seen.has(url)) {
    duplicates.push(url);
  }
  seen.add(url);
}

console.log(`Total hero images: ${seen.size}, Duplicates: ${duplicates.length}`);
if (duplicates.length > 0) {
  console.log("Duplicate hero images:", duplicates);
} else {
  console.log("✓ ALL HERO IMAGES ARE 100% UNIQUE! Zero repetition on cards!");
}
