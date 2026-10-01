const fs = require('fs');
const path = require('path');

// Let's verify existing files on disk so we never reference a missing file
function fileExists(relPath) {
  const full = path.join(__dirname, '..', 'public', relPath.replace(/^\//, ''));
  return fs.existsSync(full);
}

console.log("Checking critical files...");
console.log("purdey-turnover-pistols view-1:", fileExists('/images/catalog/firearms/purdey-turnover-pistols/view-1.jpg'));
console.log("devshree-deogarh-01:", fileExists('/images/private-world/06-palace/devshree-deogarh-01.jpg'));
console.log("rolls-royce-phantom-viii view-1:", fileExists('/images/catalog/automobiles/rolls-royce-phantom-viii/view-1.jpg'));
console.log("rolex-daytona view-1:", fileExists('/images/catalog/watches/rolex-daytona/view-1.jpg'));
