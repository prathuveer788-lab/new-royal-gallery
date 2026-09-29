const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targets = [
  { url: 'http://localhost:3000/', name: 'preview-home-desktop.png', size: '1440,900' },
  { url: 'http://localhost:3000/', name: 'preview-home-mobile.png', size: '375,812' },
  { url: 'http://localhost:3000/motoring', name: 'preview-motoring-desktop.png', size: '1440,900' },
  { url: 'http://localhost:3000/motoring/the-maharajas-garage-royal-vintage-cars', name: 'preview-article-desktop.png', size: '1440,900' },
  { url: 'http://localhost:3000/not-found-page', name: 'preview-404-desktop.png', size: '1440,900' },
];

for (const t of targets) {
  const outPath = path.join(__dirname, '../public', t.name);
  const cmd = `"${edge}" --headless --window-size=${t.size} --screenshot="${outPath}" ${t.url}`;
  try {
    execSync(cmd, { stdio: 'ignore' });
    console.log(`Generated: ${t.name} (exists: ${fs.existsSync(outPath)})`);
  } catch (e) {
    console.error(`Failed ${t.name}:`, e.message);
  }
}
