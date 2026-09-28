const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const screenshotsDir = 'C:\\Royals-Gallery\\screenshots';

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

function runEdgeScreenshot(url, windowSize, outputFile) {
  return new Promise((resolve, reject) => {
    const tempDir = path.join(process.env.TEMP, `edge-ss-${Date.now()}-${Math.random().toString(36).substring(7)}`);
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      `--user-data-dir=${tempDir}`,
      `--window-size=${windowSize}`,
      `--screenshot=${outputFile}`,
      url,
    ];

    execFile(edgePath, args, (err) => {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (e) {}

      if (err && !fs.existsSync(outputFile)) {
        return reject(err);
      }
      resolve(outputFile);
    });
  });
}

async function main() {
  console.log('Capturing desktop article at 1440px...');
  const desktopOut = path.join(screenshotsDir, 'shivanjali-desktop-1440px.png');
  await runEdgeScreenshot(
    'http://localhost:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty',
    '1440,1100',
    desktopOut
  );
  console.log('Saved:', desktopOut);

  console.log('Capturing mobile article at 375px...');
  const mobileOut = path.join(screenshotsDir, 'shivanjali-mobile-375px.png');
  await runEdgeScreenshot(
    'http://localhost:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty',
    '375,812',
    mobileOut
  );
  console.log('Saved:', mobileOut);

  console.log('Done capturing screenshots!');
}

main().catch(console.error);
