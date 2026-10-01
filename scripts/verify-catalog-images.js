const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('lib/membership/private-world-catalog.ts', 'utf8');
const regex = /['"](\/images\/[^'"]+)['"]/g;
let match;
let missing = 0;
let total = 0;
const missingFiles = [];

while ((match = regex.exec(content)) !== null) {
  total++;
  const fileRel = match[1];
  const full = path.join(__dirname, '..', 'public', fileRel.replace(/^\//, ''));
  if (!fs.existsSync(full)) {
    missingFiles.push(fileRel);
    missing++;
  }
}

console.log(`Verification: total image references = ${total}, missing = ${missing}`);
if (missing > 0) {
  console.log("Missing files:", missingFiles);
}
