const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (url.startsWith('//')) url = 'https:' + url;
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 RoyalsGallery/1.0',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsed = new URL(url);
          redirectUrl = parsed.origin + redirectUrl;
        }
        return downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(destPath));
      });
      file.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });
    req.on('error', reject);
    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error('Timeout downloading ' + url));
    });
  });
}

function getVAImageUrls(assetRefs) {
  return assetRefs.map(ref => `https://framemark.vam.ac.uk/collections/${ref}/full/!1200,1200/0/default.jpg`);
}

async function run() {
  const testDir = 'public/images/catalog/jewellery/test-downloads';
  if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

  const testUrl = 'https://framemark.vam.ac.uk/collections/2006AH3676/full/!1200,1200/0/default.jpg';
  const dest = path.join(testDir, 'cartier-manchester-tiara-1.jpg');
  console.log('Downloading test V&A image:', testUrl);
  try {
    await downloadFile(testUrl, dest);
    const stats = fs.statSync(dest);
    console.log('Downloaded successfully! File size:', stats.size, 'bytes');
  } catch (err) {
    console.error('Download failed:', err.message);
  }
}

run();
