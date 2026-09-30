const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = path.join(__dirname, '..', 'public', 'images', 'collections');

const list = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kelly_Bag.jpg/1280px-Kelly_Bag.jpg',
    cat: 'fashion',
    name: 'hermes-kelly-box-calf.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Aston_Martin_DB5_%28Skyfall%29.jpg/1280px-Aston_Martin_DB5_%28Skyfall%29.jpg',
    cat: 'automobiles',
    name: 'aston-martin-db5-heritage.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/2019_Rolls-Royce_Phantom_V12_Automatic_6.75.jpg/1280px-2019_Rolls-Royce_Phantom_V12_Automatic_6.75.jpg',
    cat: 'automobiles',
    name: 'rolls-royce-phantom-viii.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Fifteenth_Anniversary_%28Faberg%C3%A9_egg%29.jpg',
    cat: 'objects',
    name: 'faberge-imperial-egg.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dior_denver_art1.jpg/1280px-Dior_denver_art1.jpg',
    cat: 'fashion',
    name: 'dior-bar-suit-couture.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log(`Failed ${url}: ${res.statusCode}`);
        return resolve(false);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close(() => {
          console.log(`[SAVED] ${dest} (${fs.statSync(dest).size} bytes)`);
          resolve(true);
        });
      });
    }).on('error', (e) => {
      console.log(`Error ${url}: ${e.message}`);
      resolve(false);
    });
  });
}

async function run() {
  for (const item of list) {
    const dest = path.join(baseDir, item.cat, item.name);
    await download(item.url, dest);
    await new Promise(r => setTimeout(r, 1200));
  }
  console.log('List download completed.');
}

run();
