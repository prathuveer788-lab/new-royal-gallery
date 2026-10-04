const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, '..', 'public', 'images', 'uk-heritage');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function searchCommons(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&srlimit=8`;
    https.get(url, { headers: { 'User-Agent': 'RoyalsGalleryUK/1.0 (info@theroyalgallerys.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const results = (json.query && json.query.search) || [];
          resolve(results.map(r => r.title));
        } catch (e) {
          console.error(e);
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

function getImageInfo(fileTitle) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    https.get(url, { headers: { 'User-Agent': 'RoyalsGalleryUK/1.0 (info@theroyalgallerys.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pid = Object.keys(pages)[0];
          const info = pages[pid].imageinfo && pages[pid].imageinfo[0];
          if (!info) return resolve(null);
          const meta = info.extmetadata || {};
          resolve({
            title: fileTitle,
            url: info.url,
            width: info.width,
            height: info.height,
            artist: meta.Artist ? meta.Artist.value : 'Public Domain / Commons',
            license: meta.LicenseShortName ? meta.LicenseShortName.value : 'CC',
          });
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

const targets = [
  { key: 'balmoral-castle', query: 'Balmoral Castle Aberdeenshire Scotland' },
  { key: 'holyroodhouse', query: 'Palace of Holyroodhouse facade Edinburgh' },
  { key: 'castle-of-mey', query: 'Castle of Mey Caithness Scotland' },
  { key: 'highclere-castle', query: 'Highclere Castle Hampshire landscape' },
  { key: 'chatsworth-house', query: 'Chatsworth House Derbyshire facade' },
  { key: 'blenheim-palace', query: 'Blenheim Palace Oxfordshire south facade' },
  { key: 'inverlochy-castle', query: 'Inverlochy Castle Torlundy hotel' },
  { key: 'inveraray-castle', query: 'Inveraray Castle Argyll Loch Fyne' },
  { key: 'gleneagles-hotel', query: 'Gleneagles Hotel Perthshire exterior' },
  { key: 'eilean-donan-castle', query: 'Eilean Donan Castle Loch Duich' },
];

async function run() {
  console.log("Searching candidates...");
  for (const t of targets) {
    console.log(`\n=== Target: ${t.key} (${t.query}) ===`);
    const results = await searchCommons(t.query);
    for (const title of results.slice(0, 5)) {
      const info = await getImageInfo(title);
      if (info && info.width > 1200) {
        console.log(`- ${info.title} | ${info.width}x${info.height} | ${info.url}`);
      }
    }
  }
}

run();
