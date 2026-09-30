const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const baseDir = path.join(__dirname, '..', 'public', 'images', 'collections');

const categories = [
  'fashion',
  'timepieces',
  'jewellery',
  'automobiles',
  'objects',
  'heritage',
  'arms',
  'art',
  'travel'
];

categories.forEach((cat) => {
  const dir = path.join(baseDir, cat);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Download helper with redirects
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 5000) {
      console.log(`[SKIP] Already exists: ${destPath}`);
      return resolve(true);
    }

    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsed = new URL(url);
          redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
        }
        return downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          console.log(`[OK] Saved: ${destPath} (${fs.statSync(destPath).size} bytes)`);
          resolve(true);
        });
      });
    });

    req.on('error', (err) => {
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });

    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error(`Timeout for ${url}`));
    });
  });
}

// Search Wikimedia Commons image direct URL from Commons API
function getCommonsImageUrl(filename) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
    https.get(apiUrl, {
      headers: { 'User-Agent': 'RoyalsGalleryBot/1.0 (editorial research)' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
            resolve(pages[pageId].imageinfo[0].url);
          } else {
            reject(new Error(`No imageinfo found for ${filename}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Met Museum API helper
function getMetMuseumImageUrl(objectId) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
    https.get(apiUrl, {
      headers: { 'User-Agent': 'RoyalsGalleryBot/1.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.primaryImage) {
            resolve(json.primaryImage);
          } else if (json.primaryImageSmall) {
            resolve(json.primaryImageSmall);
          } else {
            reject(new Error(`No primaryImage for Met object ${objectId}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching curated collection assets...');

  const queue = [
    // 01 FASHION
    {
      cat: 'fashion',
      name: 'chanel-couture-suit-1960.jpg',
      type: 'met',
      id: 84080 // Chanel suit Met Museum
    },
    {
      cat: 'fashion',
      name: 'dior-bar-suit-1947.jpg',
      type: 'met',
      id: 81458 // Dior ensemble Met Museum
    },
    {
      cat: 'fashion',
      name: 'schiaparelli-zodiac-jacket.jpg',
      type: 'met',
      id: 156314 // Elsa Schiaparelli Zodiac Jacket 1938
    },
    {
      cat: 'fashion',
      name: 'ysl-le-smoking-tuxedo.jpg',
      type: 'met',
      id: 158913 // YSL evening ensemble
    },
    {
      cat: 'fashion',
      name: 'hermes-kelly-vintage-box.jpg',
      type: 'commons',
      filename: 'Kelly_bag_Hermes_1950s.jpg'
    },

    // 02 TIMEPIECES
    {
      cat: 'timepieces',
      name: 'breguet-marie-antoinette-160.jpg',
      type: 'commons',
      filename: 'Marie-Antoinette_Pocket_Watch_-_L._A._Mayer_Museum_-_Jerusalem.jpg'
    },
    {
      cat: 'timepieces',
      name: 'patek-philippe-perpetual-pocket.jpg',
      type: 'met',
      id: 193910 // Patek Philippe openface pocket watch
    },
    {
      cat: 'timepieces',
      name: 'cartier-tank-normale.jpg',
      type: 'commons',
      filename: 'Cartier_Tank_Normale_1919.jpg'
    },
    {
      cat: 'timepieces',
      name: 'vacheron-constantin-pocket-chronograph.jpg',
      type: 'met',
      id: 193918 // Vacheron Constantin watch Met
    },

    // 03 JEWELLERY
    {
      cat: 'jewellery',
      name: 'cartier-tutti-frutti-bracelet.jpg',
      type: 'met',
      id: 824367 // Cartier Tutti Frutti piece
    },
    {
      cat: 'jewellery',
      name: 'french-crown-jewels-reliquary-brooch.jpg',
      type: 'commons',
      filename: 'Reliquary_brooch_of_Queen_Marie-Amélie,_Louvre_OA_11041.jpg'
    },
    {
      cat: 'jewellery',
      name: 'castellani-emerald-gold-necklace.jpg',
      type: 'met',
      id: 231804 // Castellani archaeological revival gold necklace
    },

    // 04 AUTOMOBILES
    {
      cat: 'automobiles',
      name: 'bugatti-type-57sc-atlantic.jpg',
      type: 'commons',
      filename: 'Bugatti_Type_57_SC_Atlantic_1936_(27471957291).jpg'
    },
    {
      cat: 'automobiles',
      name: 'ferrari-250-gt-swb.jpg',
      type: 'commons',
      filename: 'Ferrari_250_GT_SWB_Berlinetta_Competizione_(1960)_(50974558237).jpg'
    },
    {
      cat: 'automobiles',
      name: 'rolls-royce-silver-ghost-1907.jpg',
      type: 'commons',
      filename: '1907_Rolls-Royce_Silver_Ghost_(35700511874).jpg'
    },
    {
      cat: 'automobiles',
      name: 'aston-martin-db5-silver-birch.jpg',
      type: 'commons',
      filename: '1964_Aston_Martin_DB5_(42999813590).jpg'
    },

    // 05 OBJECTS & CURIOSITIES
    {
      cat: 'objects',
      name: 'faberge-imperial-lilies-egg.jpg',
      type: 'commons',
      filename: 'Fabergé_egg_Lilies_of_the_Valley.jpg'
    },
    {
      cat: 'objects',
      name: 'ormolu-french-astronomical-clock.jpg',
      type: 'met',
      id: 198895 // French mantel clock Met
    },
    {
      cat: 'objects',
      name: 'sevres-porcelain-royal-tureen.jpg',
      type: 'met',
      id: 206989 // Sèvres porcelain tureen Met
    },

    // 06 ANTIQUES & HERITAGE
    {
      cat: 'heritage',
      name: 'boulle-marquetry-commode-louis-xiv.jpg',
      type: 'met',
      id: 202237 // André-Charles Boulle commode Met
    },
    {
      cat: 'heritage',
      name: 'mughal-royal-silk-carpet-17th-century.jpg',
      type: 'met',
      id: 451551 // Mughal carpet Met
    },

    // 07 HISTORICAL ARMS HERITAGE (Design / Auction context only)
    {
      cat: 'arms',
      name: 'royal-garniture-flintlock-gun.jpg',
      type: 'met',
      id: 24941 // Flintlock sporting gun of Louis XIV / Boutet
    },
    {
      cat: 'arms',
      name: 'pair-of-damascus-dueling-pistols-boutet.jpg',
      type: 'met',
      id: 24947 // Boutet cased pair
    },

    // 08 ART & DESIGN
    {
      cat: 'art',
      name: 'brancusi-bird-in-space-bronze.jpg',
      type: 'met',
      id: 489978 // Brancusi Bird in Space Met
    },
    {
      cat: 'art',
      name: 'carlo-bugatti-throne-chair.jpg',
      type: 'met',
      id: 485122 // Carlo Bugatti chair Met
    }
  ];

  for (const item of queue) {
    const dest = path.join(baseDir, item.cat, item.name);
    try {
      let imgUrl = null;
      if (item.type === 'met') {
        imgUrl = await getMetMuseumImageUrl(item.id);
      } else if (item.type === 'commons') {
        imgUrl = await getCommonsImageUrl(item.filename);
      }

      if (imgUrl) {
        console.log(`Downloading ${item.name} from ${imgUrl.slice(0, 60)}...`);
        await downloadFile(imgUrl, dest);
      }
    } catch (err) {
      console.warn(`Failed downloading ${item.name}: ${err.message}`);
    }
  }

  console.log('Curated collection assets download routine complete.');
}

run();
