const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (url.startsWith('//')) {
      url = 'https:' + url;
    }

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
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
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
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function fetchMetObject(objectId) {
  return new Promise((resolve, reject) => {
    https.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function fetchWikiMediaList(title) {
  return new Promise((resolve, reject) => {
    https.get(`https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(title)}`, {
      headers: {
        'User-Agent': 'RoyalsGalleryBot/1.0 (info@royalsgallery.com)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Complete Met Firearms list
const MET_FIREARMS = [
  { id: "firearms-louis-xiii-flintlock", objectId: 24865, destFolder: "public/images/catalog/firearms/louis-xiii-flintlock" },
  { id: "firearms-french-empire-dueling-pair", objectId: 25170, destFolder: "public/images/catalog/firearms/french-empire-dueling-pair" },
  { id: "firearms-leopold-wheellock-rifle", objectId: 22387, destFolder: "public/images/catalog/firearms/leopold-wheellock-rifle" },
  { id: "firearms-brescian-flintlock-pistols", objectId: 24844, destFolder: "public/images/catalog/firearms/brescian-flintlock-pistols" },
  { id: "firearms-manton-double-flintlock", objectId: 22626, destFolder: "public/images/catalog/firearms/manton-double-flintlock" },
  { id: "firearms-napoleon-presentation-rifle", objectId: 23950, destFolder: "public/images/catalog/firearms/napoleon-presentation-rifle" },
  { id: "firearms-german-wheellock-garniture", objectId: 22115, destFolder: "public/images/catalog/firearms/german-wheellock-garniture" },
];

// Wikipedia Automobiles list
const WIKI_CARS = [
  { title: "Rolls-Royce_Phantom_VIII", destFolder: "public/images/catalog/automobiles/rolls-royce-phantom-viii" },
  { title: "Ferrari_Daytona_SP3", destFolder: "public/images/catalog/automobiles/ferrari-daytona-sp3" },
  { title: "Aston_Martin_Valkyrie", destFolder: "public/images/catalog/automobiles/aston-martin-valkyrie" },
  { title: "Porsche_911_GT3", destFolder: "public/images/catalog/automobiles/porsche-911-gt3-rs" },
  { title: "Bentley_Batur", destFolder: "public/images/catalog/automobiles/bentley-batur" },
  { title: "McLaren_Speedtail", destFolder: "public/images/catalog/automobiles/mclaren-speedtail" },
  { title: "Bugatti_Chiron", destFolder: "public/images/catalog/automobiles/bugatti-chiron-pur-sport" },
];

async function run() {
  console.log("=== DOWNLOADING MET FIREARMS ===");
  for (const item of MET_FIREARMS) {
    try {
      console.log(`Checking Met Object ${item.objectId}...`);
      ensureDir(item.destFolder);
      const data = await fetchMetObject(item.objectId);

      const urls = [];
      if (data.primaryImageSmall || data.primaryImage) {
        urls.push(data.primaryImageSmall || data.primaryImage);
      }
      if (Array.isArray(data.additionalImages)) {
        for (const add of data.additionalImages) {
          if (urls.length >= 4) break;
          // Use web-large if possible
          const webLarge = add.replace('/original/', '/web-large/');
          urls.push(webLarge);
        }
      }

      console.log(`Found ${urls.length} images for ${data.title}`);
      let idx = 1;
      for (const u of urls) {
        const dest = path.join(item.destFolder, `view-${idx}.jpg`);
        if (!fs.existsSync(dest)) {
          try {
            await downloadFile(u, dest);
            console.log(`  ✓ view-${idx} saved`);
          } catch (e) {
            console.log(`  ✕ view-${idx} failed: ${e.message}`);
          }
        } else {
          console.log(`  ✓ view-${idx} exists`);
        }
        idx++;
      }
    } catch (err) {
      console.log(`Error processing ${item.id}: ${err.message}`);
    }
  }

  console.log("\n=== DOWNLOADING WIKIPEDIA CARS ===");
  for (const car of WIKI_CARS) {
    try {
      console.log(`Checking Wikipedia for ${car.title}...`);
      ensureDir(car.destFolder);
      const data = await fetchWikiMediaList(car.title);

      if (!data || !Array.isArray(data.items)) {
        console.log(`  No items found`);
        continue;
      }

      const images = data.items
        .filter(it => it.type === 'image' && it.srcset && it.srcset.length > 0)
        .slice(0, 4);

      console.log(`Found ${images.length} images for ${car.title}`);
      let idx = 1;
      for (const img of images) {
        const dest = path.join(car.destFolder, `view-${idx}.jpg`);
        if (!fs.existsSync(dest)) {
          const src = img.srcset[img.srcset.length - 1].src;
          const full = src.startsWith('http') ? src : `https:${src}`;
          try {
            await downloadFile(full, dest);
            console.log(`  ✓ view-${idx} saved`);
          } catch (e) {
            console.log(`  ✕ view-${idx} failed: ${e.message}`);
          }
        } else {
          console.log(`  ✓ view-${idx} exists`);
        }
        idx++;
      }
    } catch (err) {
      console.log(`Error for ${car.title}: ${err.message}`);
    }
  }

  console.log("\n=== ALL DOWNLOADS COMPLETE ===");
}

run().catch(console.error);
