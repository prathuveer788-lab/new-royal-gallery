const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = path.join(__dirname, '..', 'public', 'images', 'collections');

function searchCommons(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&srlimit=5`;
    https.get(url, { headers: { 'User-Agent': 'RoyalsGallery/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const results = (json.query && json.query.search) || [];
          resolve(results.map(r => r.title));
        } catch {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

function getFileUrl(fileTitle) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    https.get(url, { headers: { 'User-Agent': 'RoyalsGallery/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pid = Object.keys(pages)[0];
          const info = pages[pid].imageinfo && pages[pid].imageinfo[0];
          resolve(info ? { url: info.url, width: info.width, height: info.height } : null);
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function download(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) return resolve(true);
    https.get(url, { headers: { 'User-Agent': 'RoyalsGallery/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) return resolve(false);
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close(() => resolve(true));
      });
    }).on('error', () => resolve(false));
  });
}

async function findAndSave(query, cat, filename) {
  const titles = await searchCommons(query);
  console.log(`Query "${query}" found ${titles.length} candidates:`, titles.slice(0, 2));
  for (const title of titles) {
    if (!title.toLowerCase().match(/\.(jpg|jpeg|png)$/)) continue;
    const fileData = await getFileUrl(title);
    if (fileData && fileData.url) {
      const dest = path.join(baseDir, cat, filename);
      const ok = await download(fileData.url, dest);
      if (ok && fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
        console.log(`[SUCCESS] Saved ${filename} (${fileData.width}x${fileData.height})`);
        return true;
      }
    }
  }
  return false;
}

async function run() {
  const targets = [
    { q: 'Chanel haute couture suit exhibition', cat: 'fashion', f: 'chanel-tailleur-couture.jpg' },
    { q: 'Christian Dior Bar suit 1947', cat: 'fashion', f: 'dior-bar-suit-couture.jpg' },
    { q: 'Yves Saint Laurent Le Smoking', cat: 'fashion', f: 'ysl-le-smoking.jpg' },
    { q: 'Hermes Kelly bag leather', cat: 'fashion', f: 'hermes-kelly-box-calf.jpg' },
    { q: 'Breguet pocket watch grand complication', cat: 'timepieces', f: 'breguet-grand-complication.jpg' },
    { q: 'Patek Philippe perpetual calendar chronograph', cat: 'timepieces', f: 'patek-philippe-grand-complication.jpg' },
    { q: 'Audemars Piguet Royal Oak', cat: 'timepieces', f: 'audemars-piguet-royal-oak.jpg' },
    { q: 'Rolex Daytona Cosmograph', cat: 'timepieces', f: 'rolex-daytona-cosmograph.jpg' },
    { q: 'Cartier Tutti Frutti necklace', cat: 'jewellery', f: 'cartier-tutti-frutti-high-jewellery.jpg' },
    { q: 'Van Cleef Arpels necklace', cat: 'jewellery', f: 'van-cleef-arpels-high-jewellery.jpg' },
    { q: 'Bulgari Serpenti bracelet', cat: 'jewellery', f: 'bulgari-serpenti-high-jewellery.jpg' },
    { q: 'Ferrari 250 GT Berlinetta SWB', cat: 'automobiles', f: 'ferrari-250-gt-swb.jpg' },
    { q: 'Bugatti Type 57SC Atlantic', cat: 'automobiles', f: 'bugatti-type-57sc-atlantic.jpg' },
    { q: 'Rolls Royce Phantom VIII', cat: 'automobiles', f: 'rolls-royce-phantom-viii.jpg' },
    { q: 'Aston Martin DB5 coupe', cat: 'automobiles', f: 'aston-martin-db5-heritage.jpg' },
    { q: 'James Purdey shotgun sidelock', cat: 'arms', f: 'purdey-damascus-sidelock-pair.jpg' },
    { q: 'Faberge Imperial Easter Egg', cat: 'objects', f: 'faberge-imperial-egg.jpg' },
    { q: 'Andre-Charles Boulle desk bureau', cat: 'heritage', f: 'boulle-royal-bureau-plat.jpg' },
    { q: 'Constantin Brancusi sculpture bronze', cat: 'art', f: 'brancusi-bronze-sculpture.jpg' },
    { q: 'Aman Venice Palazzo Papadopoli', cat: 'travel', f: 'aman-venice-palazzo.jpg' }
  ];

  for (const t of targets) {
    await findAndSave(t.q, t.cat, t.f);
  }
  console.log('Search and download finished!');
}

run();
