const fs = require('fs');

const content = fs.readFileSync('C:/Users/PC/.gemini/antigravity/brain/4b294b02-3bfc-4949-a9e2-557d1cda474d/.system_generated/steps/2693/content.md', 'utf8');

const regex = /https:\/\/assets\.simplotel\.com\/[^\s"'<>)]+/g;
let m;
const urls = [];
while ((m = regex.exec(content)) !== null) {
  urls.push(m[0]);
}

const unique = [...new Set(urls)].filter(u => !u.endsWith('.svg') && !u.endsWith('.css') && !u.includes('Rectangle_297') && !u.includes('pngwing'));
console.log(`Found ${unique.length} authentic Devshree Deogarh images from official site:`);
unique.forEach((u, i) => console.log(`${i+1}. ${u}`));
