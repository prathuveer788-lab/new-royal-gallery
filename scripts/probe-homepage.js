const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const screenshotsDir = path.join(__dirname, '..', 'screenshots');

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
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
      if (!fs.existsSync(outputFile)) return reject(err);
      resolve(outputFile);
    });
  });
}

async function run() {
  const tallFile = path.join(screenshotsDir, 'homepage-tall.png');
  console.log('Capturing tall homepage...');
  await runEdgeScreenshot('http://localhost:3000/', '1440,9000', tallFile);

  const meta = await sharp(tallFile).metadata();
  console.log('Tall homepage dimensions:', meta.width, 'x', meta.height);

  // Let's create an inspect strip or find section 08
  // We can slice slices every 1000px from 4000 to 8000 to see where Section 08 is
  for (let top = 4500; top <= 7500; top += 500) {
    if (top + 600 <= meta.height) {
      await sharp(tallFile)
        .extract({ left: 100, top, width: 400, height: 100 })
        .toFile(path.join(screenshotsDir, `probe-${top}.png`));
    }
  }

  console.log('Probes created');
}

run().catch(console.error);
