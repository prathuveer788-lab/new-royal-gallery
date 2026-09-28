/**
 * Simple mobile screenshot using Edge --screenshot flag (same approach that works for desktop)
 */
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const screenshotsDir = 'C:\\Royals-Gallery\\screenshots';
const outputFile = path.join(screenshotsDir, 'shivanjali-mobile-375px.png');

function runEdgeScreenshot(url, windowSize, outputPath) {
  return new Promise((resolve, reject) => {
    const tempDir = path.join(os.tmpdir(), `edge-simple-${Date.now()}`);
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      `--user-data-dir=${tempDir}`,
      `--window-size=${windowSize}`,
      `--screenshot=${outputPath}`,
      url,
    ];

    console.log('Running Edge with args:', args.slice(-4).join(' '));
    execFile(edgePath, args, { timeout: 20000 }, (err) => {
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
      if (err && !fs.existsSync(outputPath)) return reject(err);
      resolve(outputPath);
    });
  });
}

async function main() {
  console.log('Capturing mobile at 375x812...');
  await runEdgeScreenshot(
    'http://localhost:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty',
    '375,812',
    outputFile
  );
  console.log('✓ Saved:', outputFile);
  console.log('File size:', fs.statSync(outputFile).size, 'bytes');
}

main().catch(console.error);
