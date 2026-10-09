const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'public', 'images', 'uk-heritage');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const downloads = [
  {
    name: 'chatsworth-house',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Chatsworth_house_fountain_frontage.jpg',
    source: 'File:Chatsworth_house_fountain_frontage.jpg',
    artist: 'Wikimedia Commons / Mike Peel',
    license: 'CC BY-SA 4.0'
  },
  {
    name: 'inveraray-castle',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Inveraray_Castle_-_south-west_facade.jpg',
    source: 'File:Inveraray_Castle_-_south-west_facade.jpg',
    artist: 'Wikimedia Commons / DeFacto',
    license: 'CC BY-SA 4.0'
  },
  {
    name: 'highclere-castle',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Highclere_Castle_%282019%29.jpg',
    source: 'File:Highclere_Castle_(2019).jpg',
    artist: 'Wikimedia Commons / Chensiyuan',
    license: 'CC BY-SA 4.0'
  },
  {
    name: 'holyroodhouse',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Edinburgh_Palace_of_Holyroodhouse_20211019.jpg',
    source: 'File:Edinburgh_Palace_of_Holyroodhouse_20211019.jpg',
    artist: 'Wikimedia Commons / Steffen Schmitz',
    license: 'CC BY-SA 4.0'
  },
  {
    name: 'castle-of-mey',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Mey_castle_2.JPG',
    source: 'File:Mey_castle_2.JPG',
    artist: 'Wikimedia Commons / Supergolden',
    license: 'CC BY-SA 3.0'
  },
  {
    name: 'inverlochy-castle',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Inverlochy_castle_front_20211023.jpg',
    source: 'File:Inverlochy_castle_front_20211023.jpg',
    artist: 'Wikimedia Commons / Steffen Schmitz',
    license: 'CC BY-SA 4.0'
  },
  {
    name: 'blenheim-palace',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Blenheim_Palace_facade_October_2016.jpg',
    source: 'File:Blenheim_Palace_facade_October_2016.jpg',
    artist: 'Wikimedia Commons / DeFacto',
    license: 'CC BY-SA 4.0'
  },
  {
    name: 'eilean-donan-castle',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Eilean_Donan_Castle%2C_Scotland_-_Jan_2011.jpg',
    source: 'File:Eilean_Donan_Castle,_Scotland_-_Jan_2011.jpg',
    artist: 'Wikimedia Commons / Diliff',
    license: 'CC BY-SA 3.0'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'RoyalsGalleryBot/2.0 (info@theroyalgallerys.com; photography research)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => stream.close(() => resolve()));
      stream.on('error', reject);
    }).on('error', reject);
  });
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log("Starting high-resolution downloads...");
  for (const item of downloads) {
    const jpgDest = path.join(dir, `${item.name}.jpg`);
    const webpDest = path.join(dir, `${item.name}.webp`);
    console.log(`Downloading ${item.name}...`);
    try {
      await downloadFile(item.url, jpgDest);
      const stat = fs.statSync(jpgDest);
      console.log(`  Downloaded ${item.name}.jpg (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);

      // Optimize and convert to WebP with Sharp (maintain max 2400px width for supreme crispness)
      await sharp(jpgDest)
        .resize({ width: 2400, withoutEnlargement: true })
        .webp({ quality: 88, effort: 5 })
        .toFile(webpDest);

      const webpStat = fs.statSync(webpDest);
      console.log(`  Optimized ${item.name}.webp (${(webpStat.size / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`  Error downloading ${item.name}:`, err.message);
    }
    await sleep(1500); // Respectful pause
  }
  console.log("Finished all downloads.");
}

main();
