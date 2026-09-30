const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = path.join(__dirname, '..', 'public', 'images', 'collections');

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'RoyalsGallery/1.0' } }, res => {
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

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000) return resolve(true);
    https.get(url, { headers: { 'User-Agent': 'RoyalsGallery/1.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve);
      }
      if (res.statusCode !== 200) return resolve(false);
      const stream = fs.createWriteStream(destPath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close(() => resolve(true));
      });
    }).on('error', () => resolve(false));
  });
}

async function findAndDownloadMetObject(query, cat, filename) {
  try {
    const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(query)}&hasImages=true`;
    const searchData = await getJson(searchUrl);
    if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
      console.log(`No objects found for query: ${query}`);
      return null;
    }

    // Try first 10 objects until we find one with a valid primaryImage
    for (const objId of searchData.objectIDs.slice(0, 10)) {
      const objUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objId}`;
      const objData = await getJson(objUrl);
      if (objData.primaryImage || objData.primaryImageSmall) {
        const imgUrl = objData.primaryImage || objData.primaryImageSmall;
        const dest = path.join(baseDir, cat, filename);
        console.log(`Downloading [${objData.title}] for ${cat}/${filename}...`);
        const ok = await downloadImage(imgUrl, dest);
        if (ok) {
          console.log(`[SAVED] ${filename} - Title: ${objData.title} (${objData.objectDate})`);
          return {
            title: objData.title,
            artist: objData.artistDisplayName,
            date: objData.objectDate,
            medium: objData.medium,
            dimensions: objData.dimensions,
            creditLine: objData.creditLine,
            accessionNumber: objData.accessionNumber,
            objectURL: objData.objectURL,
            dest: `/images/collections/${cat}/${filename}`
          };
        }
      }
    }
  } catch (err) {
    console.error(`Error searching ${query}:`, err.message);
  }
  return null;
}

async function run() {
  const tasks = [
    { q: 'Chanel evening dress silk', cat: 'fashion', f: 'chanel-couture-evening-dress.jpg' },
    { q: 'Christian Dior evening dress', cat: 'fashion', f: 'dior-haute-couture-ballgown.jpg' },
    { q: 'Yves Saint Laurent evening', cat: 'fashion', f: 'ysl-couture-evening.jpg' },
    { q: 'Madame Gres silk jersey dress', cat: 'fashion', f: 'gres-draped-couture-gown.jpg' },
    { q: 'Cartier mystery clock', cat: 'objects', f: 'cartier-mystery-clock.jpg' },
    { q: 'Cartier pocket watch gold platinum', cat: 'timepieces', f: 'cartier-art-deco-pocket-watch.jpg' },
    { q: 'Breguet gold pocket watch repeater', cat: 'timepieces', f: 'breguet-repeater-pocket-watch.jpg' },
    { q: 'Faberge gold enamel box', cat: 'objects', f: 'faberge-imperial-enamel-snuffbox.jpg' },
    { q: 'Tiffany Schlumberger gold brooch', cat: 'jewellery', f: 'tiffany-schlumberger-brooch.jpg' },
    { q: 'Cartier diamond platinum necklace', cat: 'jewellery', f: 'cartier-belle-epoque-diamond-collier.jpg' },
    { q: 'Mughal jade dagger hilt', cat: 'arms', f: 'mughal-imperial-jade-dagger.jpg' },
    { q: 'Flintlock sporting rifle Boutet', cat: 'arms', f: 'boutet-imperial-flintlock-rifle.jpg' },
    { q: 'Sevres porcelain vase royal', cat: 'objects', f: 'sevres-porcelain-royal-garniture.jpg' },
    { q: 'Boulle marquetry table', cat: 'heritage', f: 'boulle-marquetry-writing-table.jpg' },
    { q: 'Persian royal silk carpet', cat: 'heritage', f: 'persian-imperial-silk-hunting-carpet.jpg' }
  ];

  const metadata = [];
  for (const t of tasks) {
    const res = await findAndDownloadMetObject(t.q, t.cat, t.f);
    if (res) metadata.push({ key: t.f, ...res });
  }

  fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'met-curated-metadata.json'),
    JSON.stringify(metadata, null, 2)
  );
  console.log(`Finished. Saved ${metadata.length} objects metadata.`);
}

run();
