const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchCommonsUrl(title) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url&format=json';
    https.get(url, {
      headers: {
        'User-Agent': 'RoyalsGalleryEditorial/2.0 (contact@royalsgallery.com)'
      }
    }, (res) => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const p = Object.values(j.query.pages)[0];
          resolve(p && p.imageinfo && p.imageinfo[0] ? p.imageinfo[0].url : null);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (url.startsWith('//')) url = 'https:' + url;
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'RoyalsGalleryEditorial/2.0 (https://royalsgallery.com; curatorial@royalsgallery.com) HeritageArchives/1.0',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, async (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsed = new URL(url);
          redirectUrl = parsed.origin + redirectUrl;
        }
        return downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode === 429) {
        console.log('    ⚠ 429 Rate limited. Sleeping 5s before retry...');
        await sleep(5000);
        return downloadFile(url, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(destPath)));
      file.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const COLLECTIONS = [
  {
    folder: 'public/images/catalog/jewellery/graff-wittelsbach',
    files: [
      'File:Wittelsbach Graff Diamond.JPG',
      'File:Wittelsbach diamond, before beeing recut by Graff.png'
    ]
  },
  {
    folder: 'public/images/catalog/jewellery/harry-winston-hope',
    files: [
      'File:The Hope Diamond - SIA.jpg',
      'File:Hope Diamond Closeup.jpg',
      'File:Hope Diamond.jpg',
      'File:Hope Diamond (2010).jpg'
    ]
  },
  {
    folder: 'public/images/catalog/jewellery/harry-winston-napoleon',
    files: [
      'File:Napoleon Diamond Necklace.jpg',
      'File:Napolean 1 Diamond Necklace.jpg',
      'File:Napoleon-diamond-necklace.jpg'
    ]
  },
  {
    folder: 'public/images/catalog/jewellery/harry-winston-inquisition',
    files: [
      'File:Spanish Inquisition Necklace 2.jpg',
      'File:Spanish Inquisition Necklace.jpg'
    ]
  },
  {
    folder: 'public/images/catalog/jewellery/cartier-bismarck-sapphire',
    files: [
      'File:Bismarck Necklace.jpg',
      'File:Bismarck Necklace (crop).jpg',
      'File:National Museum of Natural History Sapphires.JPG'
    ]
  },
  {
    folder: 'public/images/catalog/jewellery/cartier-hooker-emerald',
    files: [
      'File:Hooker Emerald Brooch.jpg',
      'File:Hooker emerald.jpg',
      'File:Hooker emerald at the Smithsonian.jpg'
    ]
  },
  {
    folder: 'public/images/catalog/jewellery/cartier-tutti-frutti',
    files: [
      'File:Tutti frutti bracelet - Cartier (25802475508).jpg'
    ]
  },
  {
    folder: 'public/images/catalog/jewellery/van-cleef-mystery-set',
    files: [
      'File:Van Cleef & Arpels Serti Mysterieux Brooch clip.jpg',
      'File:Van Cleef & Arpels Brooch clip.jpg'
    ]
  }
];

async function run() {
  console.log('=== ACQUIRING CANONICAL COMMONS IMAGES ===');
  for (const item of COLLECTIONS) {
    console.log(`\nDirectory: ${item.folder}`);
    ensureDir(item.folder);
    let viewIdx = 1;
    for (const title of item.files) {
      const dest = path.join(item.folder, `view-${viewIdx}.jpg`);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
        console.log(`  ✓ view-${viewIdx}.jpg exists (${fs.statSync(dest).size} bytes), skipping`);
        viewIdx++;
        continue;
      }
      console.log(`  Querying URL for ${title}...`);
      const directUrl = await fetchCommonsUrl(title);
      await sleep(1000);
      if (!directUrl) {
        console.log(`    ✕ Could not resolve URL for ${title}`);
        continue;
      }
      try {
        console.log(`  Downloading ${title} -> view-${viewIdx}.jpg...`);
        await downloadFile(directUrl, dest);
        const s = fs.statSync(dest);
        console.log(`    ✓ Saved view-${viewIdx}.jpg (${s.size} bytes)`);
        viewIdx++;
      } catch (e) {
        console.log(`    ✕ Download failed: ${e.message}`);
      }
      await sleep(2500); // Polite rate limit
    }

    // If folder has fewer than 4 views, create distinct crops/perspectives from view-1
    const existing = fs.readdirSync(item.folder).filter(f => f.startsWith('view-') && f.endsWith('.jpg'));
    console.log(`  Total views for ${item.folder}: ${existing.length}`);
  }
  console.log('\n=== ACQUISITION COMPLETED ===');
}

run();
