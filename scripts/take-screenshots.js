const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const screenshotsDir = path.join(__dirname, '..', 'screenshots');

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

    execFile(edgePath, args, (err, stdout, stderr) => {
      // Remove tempDir if possible
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
  const desktopOut = path.join(screenshotsDir, 'aaliya-article-desktop-1440px.png');
  await runEdgeScreenshot(
    'http://localhost:3000/society/aaliya-sultana-babi-dinosaur-princess-balasinor',
    '1440,1100',
    desktopOut
  );
  console.log('Saved:', desktopOut);

  console.log('Capturing mobile article at 375px...');
  const mobileOut = path.join(screenshotsDir, 'aaliya-article-mobile-375px.png');
  await runEdgeScreenshot(
    'http://localhost:3000/society/aaliya-sultana-babi-dinosaur-princess-balasinor',
    '375,812',
    mobileOut
  );
  console.log('Saved:', mobileOut);

  console.log('Capturing homepage Society section...');
  // Capture full tall homepage or large viewport
  const homepageFull = path.join(screenshotsDir, 'homepage-full.png');
  await runEdgeScreenshot(
    'http://localhost:3000/',
    '1440,6500',
    homepageFull
  );

  // Read homepageFull and crop around Society section (08 — Society)
  if (fs.existsSync(homepageFull)) {
    const meta = await sharp(homepageFull).metadata();
    console.log('Homepage dimensions:', meta.width, 'x', meta.height);
    
    // Society section is section 08, around y: 4400 to 5500
    // Let's create a cropped screenshot focused on Society section
    // Or save homepage-society-section.png
    const societyCrop = path.join(screenshotsDir, 'homepage-society-section.png');
    
    // Find Society header if needed, or crop typical height
    // We can crop with sharp: top around 4100, height 1200
    await sharp(homepageFull)
      .extract({ left: 0, top: 4050, width: 1440, height: 1100 })
      .toFile(societyCrop);
    
    console.log('Saved:', societyCrop);
    
    // Clean up temporary full homepage
    fs.unlinkSync(homepageFull);
  }

  console.log('All screenshots captured successfully!');
}

main().catch(console.error);
