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

const ITEMS_TO_DOWNLOAD = [
  // Watches
  { type: 'wiki', title: "Rolex_Daytona", destFolder: "public/images/catalog/watches/rolex-daytona", max: 4 },
  { type: 'wiki', title: "Audemars_Piguet_Royal_Oak", destFolder: "public/images/catalog/watches/audemars-piguet-royal-oak", max: 4 },
  { type: 'wiki', title: "Cartier_Tank", destFolder: "public/images/catalog/watches/cartier-tank", max: 4 },
  { type: 'wiki', title: "A._Lange_%26_S%C3%B6hne", destFolder: "public/images/catalog/watches/a-lange-sohne-datograph", max: 4 },
  { type: 'wiki', title: "Patek_Philippe_Nautilus", destFolder: "public/images/catalog/watches/patek-philippe-nautilus", max: 4 },
  { type: 'met', objectId: 193364, destFolder: "public/images/catalog/watches/breguet-repeater-pocket", max: 4 },
  { type: 'met', objectId: 195584, destFolder: "public/images/catalog/watches/vacheron-constantin-pocket", max: 4 },

  // Antiques & Curiosities
  { type: 'met', objectId: 207758, destFolder: "public/images/catalog/antiques/boulle-commode-marquetry", max: 4 }, // Boulle marquetry
  { type: 'met', objectId: 202206, destFolder: "public/images/catalog/antiques/sevres-porcelain-vase", max: 4 }, // Sèvres porcelain
  { type: 'met', objectId: 447065, destFolder: "public/images/catalog/antiques/mughal-silk-carpet-met", max: 4 }, // Mughal carpet
  { type: 'met', objectId: 23785, destFolder: "public/images/catalog/antiques/mughal-jade-dagger-khanjar", max: 4 }, // Mughal jade katar/dagger
  { type: 'wiki', title: "Faberg%C3%A9_egg", destFolder: "public/images/catalog/antiques/faberge-imperial-egg", max: 4 },
  { type: 'wiki', title: "Jaquet-Droz_automata", destFolder: "public/images/catalog/cabinet/jaquet-droz-automata", max: 4 },

  // Jewellery
  { type: 'wiki', title: "Cartier_Panth%C3%A8re", destFolder: "public/images/catalog/jewellery/cartier-panthere", max: 4 },
  { type: 'wiki', title: "Bulgari", destFolder: "public/images/catalog/jewellery/bulgari-serpenti", max: 4 },
  { type: 'wiki', title: "Van_Cleef_%26_Arpels", destFolder: "public/images/catalog/jewellery/van-cleef-arpels", max: 4 },

  // Fashion / Haute Couture
  { type: 'wiki', title: "Christian_Dior_SE", destFolder: "public/images/catalog/fashion/dior-haute-couture", max: 4 },
  { type: 'wiki', title: "Balenciaga", destFolder: "public/images/catalog/fashion/balenciaga-couture", max: 4 },
  { type: 'wiki', title: "Yves_Saint_Laurent_(fashion_house)", destFolder: "public/images/catalog/fashion/saint-laurent-couture", max: 4 },
  { type: 'wiki', title: "Alexander_McQueen_(brand)", destFolder: "public/images/catalog/fashion/alexander-mcqueen-couture", max: 4 },
];

async function run() {
  console.log("=== DOWNLOADING SECOND BATCH OF AUTHENTIC PRODUCT IMAGES ===");

  for (const item of ITEMS_TO_DOWNLOAD) {
    ensureDir(item.destFolder);

    if (item.type === 'wiki') {
      try {
        console.log(`\nFetching Wikipedia for ${item.title}...`);
        const data = await fetchWikiMediaList(item.title);
        if (!data || !Array.isArray(data.items)) {
          console.log(`  No items found`);
          continue;
        }

        const images = data.items
          .filter(it => it.type === 'image' && it.srcset && it.srcset.length > 0)
          .slice(0, item.max || 4);

        console.log(`Found ${images.length} images for ${item.title}`);
        let idx = 1;
        for (const img of images) {
          const dest = path.join(item.destFolder, `view-${idx}.jpg`);
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
        console.log(`Error fetching ${item.title}: ${err.message}`);
      }
    } else if (item.type === 'met') {
      try {
        console.log(`\nFetching Met Object ${item.objectId}...`);
        const data = await fetchMetObject(item.objectId);
        const urls = [];
        if (data.primaryImageSmall || data.primaryImage) {
          urls.push(data.primaryImageSmall || data.primaryImage);
        }
        if (Array.isArray(data.additionalImages)) {
          for (const add of data.additionalImages) {
            if (urls.length >= (item.max || 4)) break;
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
        console.log(`Error processing Met ${item.objectId}: ${err.message}`);
      }
    }
  }

  console.log("\n=== SECOND BATCH COMPLETE ===");
}

run().catch(console.error);
