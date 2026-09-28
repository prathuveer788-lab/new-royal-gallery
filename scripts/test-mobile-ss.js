const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outFile = 'C:\\Royals-Gallery\\screenshots\\shivanjali-mobile-375px.png';
const tempDir = path.join(process.env.TEMP, `edge-clean-${Date.now()}`);

const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--incognito',
  `--user-data-dir=${tempDir}`,
  '--window-size=375,812',
  `--screenshot=${outFile}`,
  'http://127.0.0.1:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty',
];

execFile(edgePath, args, (err) => {
  try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  if (err) console.error('Error:', err);
  else console.log('Successfully saved to:', outFile);
});
